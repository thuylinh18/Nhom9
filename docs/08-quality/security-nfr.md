# InsightFlow — Bằng chứng Security và NFR

**Trạng thái:** Bản ghi bằng chứng hiện trạng và kế hoạch xác minh
**Ngày rà soát:** 2026-10-09
**Phạm vi:** Frontend React/Vite, backend Django REST API, xác thực/phân quyền, lưu trữ dữ liệu và tích hợp Gemini
**Tài liệu liên quan:** [Báo cáo QA](./QA_REPORT.md), [Bug Log](../../Nhom9/vault/07-testing/Bug%20Log.md)

> Tài liệu phân biệt giữa **có trong mã nguồn**, **đã kiểm thử**, và **chưa có bằng chứng**. Việc tìm thấy middleware hoặc cấu hình trong code không đồng nghĩa đã chứng minh hệ thống an toàn khi triển khai. Không có kiểm thử penetration, staging hoặc production trong lần rà soát này.

## 1. Tóm tắt trạng thái

| Hạng mục | Hiện trạng | Đánh giá |
|---|---|---|
| RBAC / phân quyền | Có JWT và permission theo role ở một số endpoint. | **Chưa đạt:** đăng ký công khai cho phép client yêu cầu role `ADMIN` (BUG-02); submit response chưa giới hạn role Respondent (BUG-03). |
| Validation đầu vào | Có validation cho một số trường, câu hỏi bắt buộc, trạng thái survey và khoảng rating. | **Một phần:** chưa kiểm tra nhất quán answer theo question type/options (BUG-04). |
| Secrets / cấu hình triển khai | `.env` được Git ignore; cấu hình đọc secret từ biến môi trường. | **Rủi ro cấu hình:** `SECRET_KEY` có giá trị mặc định, `DEBUG` mặc định bật, `ALLOWED_HOSTS` mặc định có `*`. Chưa xác minh cấu hình triển khai. |
| Dependency security | CI cài dependency và chạy kiểm tra/test/build. | **Chưa đạt bằng chứng:** chưa thấy bước audit lỗ hổng dependency như `pip-audit` hoặc `npm audit` trong CI. |
| Hiệu năng cơ bản | Có giới hạn pagination API 20 bản ghi/trang và timeout gọi Gemini. | **Chưa đo:** chưa có benchmark, load test hoặc ngưỡng hiệu năng được xác nhận. |
| Accessibility | Có một số `aria-label`, `role="dialog"` và trạng thái modal. | **Chưa đánh giá:** chưa có audit WCAG hoặc kiểm thử accessibility tự động/thủ công có ghi nhận. |
| Logging / điều tra | Gemini service có log thành công và lỗi gọi provider. | **Một phần:** chưa có bằng chứng audit log xuyên suốt cho hành động bảo mật/đối tượng nghiệp vụ, correlation ID hoặc quy trình điều tra. |
| Không lộ secret/stack trace | Chưa có kiểm thử bảo đảm response production không chứa secret hoặc stack trace. | **Chưa xác minh:** phải kiểm tra với `DEBUG=False` trên cấu hình production-like. |

## 2. Ma trận Security evidence

### 2.1 Xác thực và phân quyền theo vai trò (RBAC)

**Cơ chế tìm thấy**

- Django REST Framework cấu hình JWT authentication và mặc định yêu cầu `IsAuthenticated`.
- Các permission class có `IsResearcher`, `IsRespondent`, `IsManager`, `IsAdmin`.
- Endpoint quản lý users và xem analytics yêu cầu role tương ứng.
- JWT access token mặc định 60 phút, refresh token 7 ngày theo cấu hình.

**Bằng chứng mã nguồn**

- `backend/config/settings.py` — `REST_FRAMEWORK`, `SIMPLE_JWT`.
- `backend/apps/accounts/permissions.py` — permission theo role.
- `backend/apps/accounts/views.py` — đăng ký/đăng nhập và endpoint Admin.
- `backend/apps/analytics/views.py` — endpoint analytics yêu cầu Manager.
- `backend/apps/responses/views.py` — endpoint submit response.

**Kết quả và điểm cần xử lý**

- **Không đạt — BUG-02:** endpoint đăng ký dùng `AllowAny`; serializer nhận trường `role` từ request. Cần buộc public registration tạo `RESPONDENT` ở server và kiểm thử việc cấp role quản trị chỉ qua đường tin cậy.
- **Chưa khớp nghiệp vụ — BUG-03:** submit response chỉ yêu cầu user đăng nhập; permission `IsRespondent` hiện không được áp dụng cho endpoint đó. Cần xác nhận chính sách sản phẩm; nếu chỉ Respondent được submit thì phải kiểm tra role tại backend.
- Backend vẫn phải là nơi thực thi quyền; ẩn nút hoặc chuyển màn hình ở frontend không được xem là kiểm soát truy cập.

### 2.2 Validation và toàn vẹn dữ liệu

**Cơ chế tìm thấy**

- Serializer registration yêu cầu mật khẩu tối thiểu 6 ký tự.
- Survey phải có ít nhất một question trước khi publish.
- Chỉ survey `PUBLISHED` mới nhận response.
- Các question bắt buộc phải có câu trả lời.
- Rating có kiểm tra giá trị trong khoảng 1–5 nếu gửi `rating_value`.
- Tạo response, answer và feedback được đặt trong `transaction.atomic()`.

**Bằng chứng mã nguồn**

- `backend/apps/accounts/serializers.py` — validation mật khẩu đăng ký.
- `backend/apps/surveys/services.py` — điều kiện publish/close/edit.
- `backend/apps/surveys/serializers.py` — multiple-choice cần có options.
- `backend/apps/responses/services.py` — kiểm tra trạng thái survey, câu bắt buộc và rating; lưu dữ liệu nguyên tử.

**Kết quả và điểm cần xử lý**

- **Chưa đạt đầy đủ — BUG-04:** backend chưa xác thực answer field phù hợp loại question; `selected_option` chưa được đối chiếu với options đã cấu hình.
- Cần kiểm tra dữ liệu sai/thiếu trước khi ghi response và xác nhận transaction rollback khi có validation error.
- Cần quyết định và ghi rõ giới hạn độ dài cho nội dung phản hồi, tiêu đề, câu hỏi và feedback; không giả định đã có giới hạn bảo vệ chỉ từ kiểu field.

### 2.3 Secrets và cấu hình production

**Cơ chế tìm thấy**

- `.gitignore` loại `.env` và các biến thể khỏi Git, ngoại trừ `.env.example`.
- `SECRET_KEY`, `GEMINI_API_KEY`, database và một số tuỳ chọn được đọc từ environment.
- `SecurityMiddleware`, `CsrfViewMiddleware` và `XFrameOptionsMiddleware` có trong Django middleware.

**Bằng chứng mã nguồn**

- `.gitignore` — quy tắc loại file môi trường.
- `backend/.env.example` — cấu hình mẫu, không dùng thay cho secret production.
- `backend/config/settings.py` — secret, debug, allowed hosts, middleware và Gemini config.
- `.github/workflows/ci.yml` — CI cung cấp secret/test values cho job backend.

**Rủi ro / điều kiện bắt buộc trước khi triển khai**

- `SECRET_KEY` có fallback dạng development trong source. Production phải cung cấp secret mạnh, riêng tư; cân nhắc fail-fast khi `DEBUG=False` mà thiếu secret an toàn.
- `DEBUG` mặc định `True`; production phải đặt `DEBUG=False`.
- `ALLOWED_HOSTS` mặc định chứa `*`; production phải cấu hình danh sách host cụ thể.
- `CORS_ALLOW_ALL_ORIGINS` bật khi `DEBUG=True`; production phải tắt debug và giới hạn origin theo frontend triển khai.
- Không đưa nội dung `.env`, `GEMINI_API_KEY`, password hoặc token vào bug report, screenshot, log, commit hay tài liệu QA.
- Chưa xác minh secret rotation, secret scanning trong CI, TLS termination hoặc cấu hình security headers trên host triển khai.

### 2.4 Dependency security

**Hiện trạng:** CI chạy cài package, test, type-check và build. Chưa thấy bước quét CVE/license hoặc cảnh báo dependency lỗi thời cho Python/npm.

**Bằng chứng mã nguồn**

- `.github/workflows/ci.yml`
- `backend/requirements.txt`
- `frontend/package.json`, `frontend/package-lock.json`

**Kết luận:** **Chưa đạt bằng chứng dependency audit.** Chưa chạy `pip-audit`, `npm audit` hoặc công cụ tương đương trong lần QA này; do đó không thể kết luận dependency hiện tại không có lỗ hổng.

### 2.5 Logging, lỗi và điều tra sự cố

**Cơ chế tìm thấy**

- Gemini service dùng Python logger cho kết quả gọi model và lỗi HTTP/provider.
- Django REST Framework dùng exception handler mặc định.

**Bằng chứng mã nguồn**

- `backend/apps/analytics/gemini_service.py` — logger cho quá trình gọi Gemini.
- `backend/config/settings.py` — cấu hình REST framework và exception handler.

**Chưa có bằng chứng**

- Audit event có actor, action, object ID và timestamp cho các thay đổi nhạy cảm (đổi role, xóa user, publish/close survey).
- Correlation/request ID để nối frontend request với backend log.
- Chính sách retention, quyền truy cập log và quy trình điều tra.
- Kiểm thử bảo đảm log không ghi password, JWT, API key hoặc nội dung feedback không cần thiết.

**Yêu cầu kiểm chứng**

- Log lỗi cần đủ thông tin vận hành để điều tra nhưng không chứa credential hoặc dữ liệu cá nhân không cần thiết.
- API production phải trả thông báo lỗi an toàn; stack trace chỉ ở log server được kiểm soát, không trả về client.

## 3. NFR và bằng chứng hiện có

### 3.1 Hiệu năng

- API pagination được bật với `PAGE_SIZE = 20`.
- Gemini client có timeout cấu hình qua `GEMINI_TIMEOUT_SECONDS` (mặc định 15 giây) và có thử model dự phòng.
- QA hiện chưa đo latency, throughput, tải đồng thời, kích thước dữ liệu lớn hoặc thời gian phản hồi p95.
- Chưa có ngưỡng SLA/SLO hiệu năng được xác nhận. Không đặt hoặc tuyên bố đạt một ngưỡng chưa được chủ sản phẩm thống nhất.

**Bằng chứng:** `backend/config/settings.py`; `backend/apps/analytics/gemini_service.py`.
**Kết quả:** Cấu hình cơ bản có trong code; **chưa có kết quả benchmark/load test**.

### 3.2 Accessibility

- Một số component có dùng `aria-label`, `role="dialog"`, `aria-modal` và `aria-labelledby`.
- Chưa có báo cáo WCAG, axe/Lighthouse accessibility run, kiểm thử bàn phím hoặc screen reader.
- Chưa xác minh focus trap/restore trong modal, thứ tự heading, contrast, label của toàn bộ form và thông báo lỗi cho công nghệ hỗ trợ.

**Bằng chứng:** các component trong `frontend/src/components/ui/` và `frontend/src/layouts/AppLayout.tsx`.
**Kết quả:** Có một số thuộc tính hỗ trợ accessibility; **chưa đủ bằng chứng đạt WCAG**.

### 3.3 Độ tin cậy và hành vi khi lỗi

- Gemini có cơ chế fallback theo luật trong backend.
- Frontend có mock fallback; riêng một số mutation có thể báo thành công dù backend request thất bại (BUG-01).
- Chưa chạy E2E/browser hoặc smoke test trên staging trong báo cáo QA hiện tại.

**Kết quả:** Có xử lý fallback, nhưng cần phân biệt rõ demo/mock với dữ liệu production và kiểm thử phản hồi lỗi trước phát hành.

## 4. Demo kiểm thử bảo mật và NFR

Các case dưới đây là **kế hoạch cần chạy**, không phải kết quả đã đạt. Chỉ thực hiện trên local/test database hoặc staging được cho phép. Không dùng dữ liệu khách hàng thật.

| ID | Demo / thao tác | Kết quả mong đợi | Trạng thái |
|---|---|---|---|
| SEC-01 | Không token gọi `GET /api/v1/dashboard/`. | Trả `401`; không trả dashboard data. | Có test backend liên quan quyền analytics; chạy riêng case này trên API chưa được ghi nhận trong report. |
| SEC-02 | Đăng nhập Respondent rồi gọi `GET /api/v1/auth/users/`. | Trả `403`; không lộ danh sách user. | Có backend test non-admin không được list users; tổng suite deterministic pass. |
| SEC-03 | Gọi đăng ký công khai với `"role": "ADMIN"`, sau đó thử API user management bằng tài khoản mới. | Server không cấp Admin; API quản trị từ chối tài khoản đó. | **Không đạt theo source review — BUG-02.** Chưa chạy demo request. |
| SEC-04 | Dùng Manager/Researcher/Admin token submit response tới survey Published. | Nếu chính sách chỉ cho Respondent submit, server trả `403` và không lưu dữ liệu. | **Chưa đạt theo source review — BUG-03.** Cần xác nhận chính sách và chạy test. |
| VAL-01 | Gửi rating bằng `0`, `6`, sai answer field; gửi multiple-choice option ngoài danh sách. | Server trả lỗi validation; không tạo response/answer/feedback. | **Không đạt đầy đủ theo source review — BUG-04.** |
| SEC-05 | Gửi dữ liệu sai định dạng trong môi trường `DEBUG=False`, ví dụ JSON không hợp lệ hoặc ID không tồn tại. | Client nhận lỗi HTTP có thông báo an toàn; response không chứa stack trace, source path, secret hoặc cấu hình. | Chưa chạy trên production-like settings. |
| SEC-06 | Tìm kiếm test log/server log sau đăng nhập thất bại và lỗi Gemini. | Không có password, JWT, `GEMINI_API_KEY` hoặc secret; có đủ ngữ cảnh để truy vấn lỗi. | Chưa audit log đầy đủ. |
| NFR-01 | Chạy dependency audit trên backend và frontend. | Báo cáo package advisory, mức độ, package/version và quyết định xử lý; CI lưu được kết quả. | Chưa cấu hình/chưa chạy. |
| NFR-02 | Chạy accessibility scan và kiểm thử keyboard cho login, survey form, modal, dashboard. | Ghi nhận lỗi theo WCAG impact; điều hướng và trạng thái form dùng được bằng bàn phím. | Chưa chạy. |
| NFR-03 | Đo endpoint list/dashboard và luồng Gemini bằng dataset test có quy mô đã thống nhất. | Ghi lại dataset, tải, latency phân vị và ngưỡng được Product/Engineering phê duyệt. | Chưa có ngưỡng/chưa chạy. |

Ví dụ request đăng ký để kiểm tra SEC-03 (chỉ dùng local/test):

```http
POST /api/v1/auth/register/
Content-Type: application/json

{
  "email": "security-test@example.test",
  "password": "Test-Only-Password-123",
  "full_name": "Security Test",
  "role": "ADMIN"
}
```

Không tái sử dụng email hoặc password này ở môi trường thật. Sau khi endpoint được sửa, test phải xác nhận role cuối cùng do server cấp là `RESPONDENT` hoặc request bị từ chối; không chỉ kiểm tra status code.

## 5. Tiêu chí không lộ secret/stack trace

Trước khi ký duyệt release, chạy các negative case trên cấu hình production-like (`DEBUG=False`) và xác nhận:

- Response 4xx/5xx không có traceback Python, tên file/đường dẫn source hoặc thông tin kết nối database.
- Không có `SECRET_KEY`, `GEMINI_API_KEY`, JWT, password hoặc header Authorization trong response/log.
- Người dùng nhận mã lỗi và thông báo đủ để biết thao tác thất bại; log nội bộ có timestamp, endpoint, status và request/correlation ID nếu đã cấu hình.
- Lỗi Gemini được ghi đủ để điều tra provider/model/status, nhưng không ghi URL chứa API key hoặc toàn bộ nội dung feedback nếu không cần thiết.

**Trạng thái hiện tại:** Chưa có bằng chứng kiểm thử các tiêu chí này trên production-like environment; không tuyên bố đạt.

## 6. Điều kiện sign-off

Chỉ chuyển trạng thái các mục sang **PASS** khi lưu được bằng chứng chạy tương ứng (test output, report hoặc staging result) và chỉ rõ commit/build đã kiểm tra.

Các điều kiện tối thiểu cần đóng:

1. Khắc phục BUG-02; API regression test chứng minh đăng ký công khai không thể tự cấp role quản trị.
2. Xác nhận chính sách role submit và khắc phục/kiểm thử BUG-03 theo chính sách đã chốt.
3. Hoàn thiện validation theo loại question và options; kiểm thử BUG-04.
4. Khắc phục hành vi mock fallback của mutation production; kiểm thử BUG-01.
5. Xác minh secrets, `DEBUG=False`, `ALLOWED_HOSTS` cụ thể và CORS giới hạn trên môi trường triển khai.
6. Chạy dependency audit và lưu kết quả.
7. Chạy kiểm tra lỗi không lộ secret/stack trace và lưu response/log đã khử dữ liệu nhạy cảm.
8. Thống nhất ngưỡng hiệu năng và phạm vi accessibility; chạy và lưu kết quả.
9. Hoàn tất browser/staging smoke test theo [Báo cáo QA](./QA_REPORT.md).

**Sign-off Security/NFR hiện tại:** **CHƯA ĐẠT / CHƯA ĐỦ BẰNG CHỨNG.** BUG-02 là release blocker; các mục chưa kiểm thử không được xem là PASS.
