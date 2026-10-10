# Bug Log — InsightFlow

## BUG-01 — Gửi phản hồi thất bại nhưng giao diện vẫn báo thành công

**Status:** Confirmed by source review; chưa chạy xác nhận trên trình duyệt.  
**Severity:** Medium  
**Regression Risk:** Medium

### Summary

Khi backend từ chối gửi phản hồi, frontend vẫn có thể trả về trạng thái thành công bằng cách ghi dữ liệu vào mock store trong bộ nhớ. Người trả lời được chuyển sang màn hình thành công dù phản hồi không được lưu trong database.

### Environment

- Frontend React/Vite gọi backend Django REST API.
- Xảy ra khi request gửi phản hồi nhận lỗi HTTP hoặc không thể kết nối backend.
- Đã đối chiếu source code; trình duyệt và môi trường triển khai chưa được kiểm chứng.

### Reproduction

1. Khởi chạy frontend và backend, đăng nhập bằng tài khoản demo, rồi mở một khảo sát đang xuất bản.
2. Trong lúc người trả lời vẫn đang ở màn hình khảo sát, đóng khảo sát bằng tài khoản researcher khác.
3. Hoàn tất các câu hỏi bắt buộc và gửi phản hồi.
4. Backend từ chối request vì khảo sát không còn ở trạng thái `PUBLISHED`.
5. Quan sát frontend vẫn chuyển sang trạng thái gửi thành công, trong khi không có response mới được lưu vào database.

Có thể tái hiện tương tự khi request gửi phản hồi nhận lỗi mạng hoặc lỗi HTTP khác.

### Expected

- Chỉ hiển thị thành công sau khi backend xác nhận phản hồi đã được lưu.
- Nếu backend từ chối request, giữ người dùng ở quy trình gửi phản hồi và hiển thị lỗi phù hợp.
- Không cập nhật dữ liệu mock như thể đó là dữ liệu backend.

### Actual

- `api.submitSurvey()` bắt lỗi request và luôn trả `{ success: true }` từ nhánh mock.
- Màn hình gửi phản hồi xem promise hoàn tất là thành công và gọi `onSubmitSuccess()`.
- Response/feedback mock không được lưu trong database backend.

### Root Cause

Nhánh `catch` trong `submitSurvey()` không phân biệt lỗi nghiệp vụ/API (ví dụ khảo sát đã đóng, HTTP 400) với lỗi mạng hoặc chế độ demo. Nhánh này tăng bộ đếm phản hồi mock (nếu khảo sát có trong mock store), thêm feedback mock và trả về thông báo thành công.

### Proposed Fix

- Chỉ sử dụng mock khi bật chế độ demo rõ ràng; không dùng mock fallback ngầm trong luồng tích hợp backend.
- Trong chế độ backend, giữ nguyên và hiển thị lỗi API/network thay vì trả kết quả thành công.
- Rà soát các mutation khác trong API service vì một số thao tác tạo/sửa/xuất bản/đóng khảo sát cũng dùng catch-all mock fallback.

### Regression Test Plan

- **Unit:** Khi request submit trả HTTP 400/403/500 hoặc lỗi mạng trong chế độ backend, `submitSurvey()` phải reject và không tăng mock response count/feedback.
- **Integration:** Gửi phản hồi cho khảo sát đã đóng phải nhận lỗi từ backend; không tạo `Response`, `Answer` hay `Feedback` mới.
- **E2E:** Mở khảo sát cho respondent, đóng khảo sát trước khi submit, rồi gửi; UI không được hiện thành công hoặc điều hướng sang màn hình hoàn tất.
- **Demo mode:** Khi chế độ demo được bật rõ ràng, xác nhận hành vi mock vẫn hoạt động theo thiết kế.

### Source Evidence

- `frontend/src/services/api.ts:381-411` — `submitSurvey()` bắt lỗi rồi trả thành công từ mock fallback.
- `frontend/src/pages/respondent/SurveyAnswerScreen.tsx:71-78` — promise hoàn tất sẽ gọi `onSubmitSuccess()`.
- `backend/apps/responses/services.py:16-18` — backend chỉ chấp nhận response khi survey có trạng thái `PUBLISHED`.

## BUG-02 — API đăng ký công khai cho phép tự tạo tài khoản ADMIN

**Status:** Confirmed by source review; chưa chạy kiểm thử khai thác.  
**Severity:** High  
**Regression Risk:** High

### Summary

Endpoint đăng ký cho phép người chưa đăng nhập gửi trường `role`. Giá trị `ADMIN` là một role hợp lệ của model và được lưu vào tài khoản mới. Các endpoint quản trị kiểm tra role này, nên người dùng có thể tự đăng ký tài khoản mang quyền ADMIN.

### Environment

- Backend Django REST API.
- Endpoint `POST /api/v1/auth/register/`.
- Đã xác nhận từ permission và serializer; chưa chạy request trên môi trường thật.

### Reproduction

1. Gửi `POST /api/v1/auth/register/` không kèm thông tin xác thực.
2. Gửi body có email mới, mật khẩu hợp lệ và `"role": "ADMIN"`.
3. Đăng nhập bằng tài khoản vừa tạo.
4. Dùng token mới gọi `GET /api/v1/auth/users/`.
5. Quan sát tài khoản được nhận quyền quản trị thay vì chỉ được đăng ký như Respondent.

### Expected

- Đăng ký công khai chỉ tạo tài khoản với role `RESPONDENT`.
- Chỉ ADMIN hiện hữu hoặc quy trình quản trị đáng tin cậy mới được cấp role quản trị.

### Actual

- Register endpoint cho phép truy cập công khai.
- Serializer nhận trường `role`, trong đó `ADMIN` là lựa chọn hợp lệ.
- User mới được tạo với role nhận từ request; permission quản trị chấp nhận người dùng có role ADMIN.

### Root Cause

`RegisterView` dùng `AllowAny`, trong khi `UserRegistrationSerializer` đưa `role` vào các trường được ghi và lưu role do client gửi. Server không ép role đăng ký công khai về `RESPONDENT`.

### Proposed Fix

- Không nhận role quản trị từ request đăng ký công khai; luôn gán role `RESPONDENT` ở server.
- Nếu cần tạo tài khoản nội bộ với role khác, dùng endpoint quản trị riêng, yêu cầu ADMIN và kiểm tra quyền ở backend.
- Bổ sung test từ chối yêu cầu đăng ký công khai có role `ADMIN`, `MANAGER` hoặc `RESEARCHER`.

### Regression Test Plan

- **API test:** đăng ký không truyền role tạo Respondent theo mặc định.
- **API test:** đăng ký công khai gửi `role=ADMIN` không tạo được tài khoản ADMIN.
- **Integration:** xác nhận tài khoản đăng ký công khai không gọi được API chỉ dành cho Admin.

### Source Evidence

- `backend/apps/accounts/views.py:18-24` — register endpoint cho phép anonymous request.
- `backend/apps/accounts/serializers.py:13-24` — serializer nhận role từ request và truyền vào tạo user.
- `backend/apps/accounts/permissions.py:34-44` — quyền Admin được cấp khi user có role ADMIN hoặc is_staff.

## BUG-03 — Tài khoản đã đăng nhập ở vai trò bất kỳ có thể submit survey

**Status:** Confirmed by source review; chưa chạy kiểm thử API.  
**Severity:** Medium  
**Regression Risk:** Medium

### Summary

API nhận câu trả lời chỉ yêu cầu người dùng đã đăng nhập, không yêu cầu role `RESPONDENT`. Vì vậy Manager, Researcher hoặc Admin cũng có thể gửi response qua API.

### Environment

- Backend Django REST API.
- `POST /api/v1/surveys/{survey_id}/submit/`.
- Yêu cầu survey ở trạng thái `PUBLISHED`.

### Reproduction

1. Đăng nhập bằng tài khoản Manager, Researcher hoặc Admin.
2. Lấy access token hợp lệ và ID của một survey đang Published.
3. Gọi `POST /api/v1/surveys/{survey_id}/submit/` với token đó và body response hợp lệ.
4. Quan sát backend chấp nhận request và tạo response.

### Expected

- Chỉ Respondent được phép gửi phản hồi, theo phân vai trong yêu cầu và quy trình nghiệp vụ.

### Actual

- Endpoint kiểm tra `IsAuthenticated` nhưng không kiểm tra role.
- Permission `IsRespondent` đã có trong codebase nhưng không được áp dụng cho endpoint gửi response.

### Root Cause

`SubmitResponseView.permission_classes` chỉ gồm `IsAuthenticated`; xác thực danh tính được thực hiện nhưng authorization theo vai trò bị bỏ sót.

### Proposed Fix

- Áp dụng permission `IsRespondent` cho endpoint submit nếu role restriction là rule của sản phẩm.
- Bổ sung test với từng role: Respondent được phép; Researcher, Manager và Admin bị từ chối.

### Regression Test Plan

- **API test:** submit với JWT Respondent và survey Published trả thành công.
- **API test:** submit với JWT của mỗi role không phải Respondent bị từ chối và không tạo response/answer/feedback.
- **Regression:** giữ nguyên validation trạng thái Published và câu hỏi bắt buộc.

### Source Evidence

- `backend/apps/responses/views.py:15-20` — submit endpoint chỉ yêu cầu authenticated user.
- `backend/apps/accounts/permissions.py:17-26` — permission `IsRespondent` kiểm tra role Respondent.
- `Nhom9/vault/02-Requiments/Functional Requirements.md` — REQ-008/009 xác định Respondent là actor trả lời và submit survey.

## BUG-04 — Backend chấp nhận câu trả lời không khớp loại câu hỏi

**Status:** Confirmed by source review; chưa chạy kiểm thử API.  
**Severity:** Medium  
**Regression Risk:** Medium

### Summary

Backend chỉ kiểm tra rating nằm trong khoảng 1–5 khi có `rating_value`; chưa xác nhận mỗi câu trả lời dùng đúng trường tương ứng với loại câu hỏi. Giá trị lựa chọn cũng chưa được kiểm tra có nằm trong options của câu hỏi hay không.

### Environment

- Backend Django REST API.
- `POST /api/v1/surveys/{survey_id}/submit/`.
- Survey Published với câu hỏi bắt buộc.

### Reproduction

1. Tạo và publish survey có câu hỏi bắt buộc loại Rating.
2. Gửi response có câu trả lời cho question đó chỉ chứa `selected_option: "Excellent"` (không có `rating_value`).
3. Quan sát backend coi câu hỏi đã được trả lời và lưu response cùng answer không có rating.
4. Tương tự, gửi một `selected_option` không có trong danh sách options của câu hỏi Multiple choice.

### Expected

- Rating chỉ được trả lời bằng số nguyên từ 1 đến 5.
- Multiple choice chỉ chấp nhận option đã cấu hình cho câu hỏi.
- Text chỉ nhận nội dung văn bản; câu trả lời sai loại bị từ chối trước khi tạo dữ liệu.

### Actual

- Kiểm tra câu hỏi bắt buộc chấp nhận bất kỳ giá trị truthy nào trong `rating_value`, `selected_option` hoặc `text_value`.
- Validation theo loại câu hỏi chỉ kiểm tra biên rating khi `rating_value` khác `None`.
- `selected_option` không được đối chiếu với `question.options`.

### Root Cause

`submit_survey_response()` xác nhận sự hiện diện của câu trả lời nhưng không xác thực payload theo `question.question_type`.

### Proposed Fix

- Viết validator theo từng `QuestionType`, yêu cầu đúng answer field và từ chối field không liên quan.
- Kiểm tra rating là số nguyên trong miền 1–5 và lựa chọn multiple choice thuộc danh sách options.
- Thực hiện toàn bộ validation trước khi lưu response, answer hoặc feedback.

### Regression Test Plan

- **Unit:** câu trả lời sai trường theo loại question bị từ chối.
- **Unit:** multiple-choice option ngoài danh sách bị từ chối; option hợp lệ được chấp nhận.
- **Integration:** payload sai không tạo response hoặc answer; payload hợp lệ vẫn lưu nguyên tử.

### Source Evidence

- `backend/apps/responses/services.py:25-40` — kiểm tra câu hỏi bắt buộc bằng các trường answer dùng chung, chưa xét loại câu hỏi.
- `backend/apps/responses/services.py:54-68` — validation rating có điều kiện; các loại câu hỏi khác không được kiểm tra tương đương.
- `backend/apps/surveys/models.py` — question type và options được lưu riêng trên Question.
