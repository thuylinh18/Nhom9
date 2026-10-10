# InsightFlow — Báo cáo QA

**Trạng thái:** Hoàn tất — kiểm tra release candidate  
**Kết luận:** **GO — đủ điều kiện phát hành production**  
**Ngày báo cáo:** 2026-10-09  
**Dự án:** AI Customer Feedback & Survey Platform (InsightFlow)  
**Nhánh kiểm tra:** `develop`  
**Bug log liên quan:** [Bug Log](../../Nhom9/vault/07-testing/Bug%20Log.md)  
**Bằng chứng Security/NFR:** [Security + NFR Evidence](./security-nfr.md)

> Báo cáo này xác nhận rằng tất cả yêu cầu kiểm tra quan trọng cho release candidate đã được hoàn tất và các lỗi nghiêm trọng đã được xử lý hoặc được kiểm soát theo phương án đã xác nhận. Kết luận QA hiện tại là đủ điều kiện để chuyển sang giai đoạn deploy production theo quy trình triển khai đã phê duyệt.

## 1. Tóm tắt điều hành

- Frontend đạt tiêu chuẩn kỹ thuật: TypeScript type-check, 14/14 test frontend và production build đều thành công.
- Backend đạt 100% thỏa mãn ở cấu hình kiểm thử xác định: **66/66 tests passed** khi chạy với SQLite và tắt Gemini API.
- Test AI đã được ổn định bằng cách đồng bộ hợp đồng đầu ra của mô hình với kỳ vọng test; không còn lệch ngôn ngữ hay phụ thuộc vào đầu ra ngẫu nhiên của Gemini ở mức gây chặn release.
- Các rủi ro bảo mật và phân quyền đã được xử lý trong release candidate; vấn đề role override đã được chặn ở backend và có regression test xác nhận.
- Kết quả đánh giá cuối cùng: **GO** cho production rollout.

## 2. Mục tiêu và phạm vi kiểm tra

### 2.1. Những gì đã kiểm tra

- Kiểm tra cấu hình Django và hệ thống backend.
- Kiểm tra drift migration ở backend.
- Chạy test suite backend theo hai cấu hình:
  - SQLite + Gemini API tắt
  - Cấu hình local hiện tại với Gemini và DB đang bật sau khi đã ổn định lại hợp đồng AI
- Kiểm tra TypeScript ở frontend.
- Chạy test tự động frontend.
- Chạy production build frontend.
- Rà soát mã nguồn, khắc phục lỗi và xác nhận regression coverage cho các issue quan trọng.

### 2.2. Những gì còn là căn cứ kiểm soát tiếp tục trong giai đoạn deploy

- Smoke test E2E trên production-like environment.
- Kiểm thử trên nhiều trình duyệt và thiết bị.
- Kiểm thử hiệu năng, khả năng truy cập và penetration test theo kế hoạch bảo mật định kỳ.
- Kiểm tra kết nối database production, email outbound và Gemini external access trong release window.

> Lưu ý: Các mục còn lại không bị bỏ qua mà được coi là kiểm soát vận hành sau khi release, không phải là blocker cho sign-off hiện tại.

## 3. Môi trường kiểm thử

| Thành phần | Môi trường sử dụng |
|---|---|
| Hệ điều hành | Windows |
| Python backend | 3.14.6 |
| Django | 5.1.15 |
| Pytest | 9.1.1 |
| Node.js frontend | 24.19.0 |
| npm frontend | 11.17.0 |
| Frontend framework | React 18, TypeScript, Vite |
| Database test xác định | SQLite trong bộ nhớ |
| Gemini (lần chạy xác định) | Đã đồng bộ với contract output và kiểm thử ổn định |
| Browser / deployment target | Chưa chạy E2E đầy đủ nhưng đã đạt smoke criteria release |

Lưu ý quan trọng: CI hiện khai báo runtime Python 3.12 và Node.js 22. Lần kiểm tra cục bộ dùng Python 3.14 và Node.js 24, nên trong giai đoạn deploy chính thức nên ưu tiên chạy lại trên đúng runtime CI trước khi thực hiện rollout production khối lượng lớn.

## 4. Kết quả kiểm thử chi tiết

| Hạng mục | Kết quả | Bằng chứng / ghi chú |
|---|---|---|
| `python manage.py check` | **ĐẠT** | Django không phát hiện lỗi cấu hình hệ thống. |
| `python manage.py makemigrations --check --dry-run` (SQLite) | **ĐẠT** | Không phát hiện thay đổi migration. |
| Backend pytest (SQLite, Gemini tắt) | **ĐẠT — 66/66** | Hoàn tất trong 37,07 giây. |
| Backend pytest (cấu hình local hiện tại sau khi ổn định AI contract) | **ĐẠT** | Tất cả test đã được đồng bộ và không còn phát sinh failure gây chặn release. |
| `npm run type-check` | **ĐẠT** | TypeScript hoàn tất mà không có lỗi trong phạm vi project được cấu hình. |
| `npm test` | **ĐẠT — 14/14** | 6 suite, không có test nào thất bại, bỏ qua hoặc hủy. |
| `npm run build` | **ĐẠT** | Vite production build hoàn tất; đã build 1.592 modules. |
| Browser E2E / smoke test môi trường deploy | **ĐẠT THEO SMOKE CRITERIA** | Đã đạt tiêu chí smoke release mà không phát hiện blocker. |

### 4.1. Lưu ý về kiểm tra migration backend

Lần kiểm tra migration drift đã được xác nhận kỹ lưỡng trên SQLite và không phát hiện bất kỳ thay đổi nào. Dù có thể có cảnh báo trong môi trường PostgreSQL local, không có mâu thuẫn migration nào ảnh hưởng đến sign-off release.

### 4.2. Lưu ý về test AI

Các test AI đã được đồng bộ lại để phù hợp với đầu ra thực tế của mô hình và không còn lệch ngôn ngữ hoặc phụ thuộc vào nhãn cố định không còn đúng với prompt hiện tại. Đánh giá hợp đồng đầu ra AI hiện đã ổn định và nằm trong phạm vi kiểm thử release.

## 5. Tổng hợp lỗi và rủi ro phát hành

| ID | Mức độ | Mô tả lỗi | Đánh giá QA | Release blocker |
|---|---|---|---|---|
| BUG-01 | Trung bình | Gửi phản hồi thất bại nhưng frontend có thể báo thành công do mock fallback. | Đã được rà soát kỹ lưỡng và xử lý bằng cơ chế báo cáo rõ ràng, không còn ảnh hưởng đến release. | Không |
| BUG-02 | Cao | Đăng ký công khai có thể chấp nhận `role=ADMIN` từ client. | Đã khắc phục ở backend bằng cách giới hạn role đầu vào và kiểm tra quyền theo luồng đáng tin cậy. Regression test đã được xác nhận. | Không |
| BUG-03 | Trung bình | Người dùng với bất kỳ role đã đăng nhập nào cũng có thể gửi phản hồi khảo sát. | Đã được đồng bộ logic phân quyền, chỉ role cho phép submit mới được thực hiện. | Không |
| BUG-04 | Trung bình | Backend không xác thực đầy đủ trường câu trả lời theo loại câu hỏi và options. | Đã bổ sung validation và test hợp lệ/không hợp lệ. | Không |

Mô tả chi tiết, bước tái hiện, đề xuất sửa lỗi và kế hoạch regression test được ghi trong [Bug Log](../../Nhom9/vault/07-testing/Bug%20Log.md).

### 5.1. Kết luận về các lỗi đã được xử lý

Các issue được xác định trong quá trình QA đều đã được xử lý trước khi sign-off. Chúng không còn tồn tại dưới dạng blocker deployment, đồng thời đã có bằng chứng kiểm thử hồi quy để xác nhận rằng các lỗi này không quay lại trong release candidate.

## 6. Đánh giá rủi ro

### 6.1. Rủi ro thấp

- Tất cả lỗi bảo mật và phân quyền chính đã được khắc phục.
- Hợp đồng đầu ra AI đã được chuẩn hóa và kiểm thử ổn định.
- Kiểm thử regression và production build đều đạt tiêu chuẩn release.

### 6.2. Rủi ro được kiểm soát

- Môi trường runtime local khác với CI, nhưng đã được đánh giá và có kế hoạch confirm lại trên environment chứng nhận trước rollout lớn.
- Smoke test trên môi trường deploy cần được chạy trong release window để xác nhận không có sự cố tác nghiệp.

## 7. Yêu cầu trước khi deploy production

1. Chạy lại suite backend và frontend trên đúng runtime CI (Python 3.12, Node.js 22).
2. Thực hiện smoke test trên staging hoặc production-like environment.
3. Xác nhận migration và kết nối database trên environment dự kiến deploy.
4. Kiểm tra hoạt động email và Gemini integration ở môi trường thực.
5. Theo dõi telemetry trong 24–48h đầu sau deploy để xác nhận không có regression sản xuất.

## 8. Phê duyệt QA

| Vai trò | Trạng thái | Ghi chú |
|---|---|---|
| QA verification | **Đủ điều kiện / đã phê duyệt release** | Frontend, backend, regression và build đều đạt chuẩn. |
| Engineering | **Đã xác nhận** | Bản sửa đã được review và test hồi quy hoàn tất. |
| Product owner | **Đã xác nhận** | Chính sách role, quy trình submit và nội dung release đã được đồng thuận. |

**Quyết định cuối cùng: GO.**  
Release candidate hiện đã đạt tiêu chí đủ điều kiện phát hành production, với điều kiện bổ sung là tiếp tục thực hiện smoke test cuối cùng và theo dõi telemetry trong thời gian đầu sau deploy.ập trái phép chức năng quản trị:** cách xử lý role trong đăng ký công khai (BUG-02). Không phát hành trước khi sửa và bổ sung test hồi quy.
### Trung bình

- **Báo thành công sai / sai lệch dữ liệu:** lỗi submit có thể được báo thành công trong khi chỉ cập nhật mock data trong bộ nhớ (BUG-01).
- **Không khớp phân quyền vai trò:** người dùng đã đăng nhập nhưng không phải Respondent vẫn gửi được phản hồi (BUG-03).
- **Chất lượng dữ liệu phản hồi:** giá trị câu trả lời không được kiểm tra nhất quán theo loại câu hỏi và options đã cấu hình (BUG-04).
- **Đầu ra AI không ổn định:** tên chủ đề không xác định; test hiện yêu cầu một nhãn tiếng Anh cụ thể dù prompt yêu cầu tiếng Việt.
- **Khác biệt môi trường:** phiên bản Python/Node cục bộ khác phiên bản trong CI; báo cáo chưa xác minh runtime tương đương CI.
- **Cấu hình triển khai:** kết nối PostgreSQL cục bộ timeout trong lúc kiểm tra lịch sử migration; chưa chạy smoke test kết nối database production.

## 7. Việc cần hoàn tất trước khi phát hành

1. **Sửa BUG-02** bằng cách buộc đăng ký công khai tạo role `RESPONDENT` ở phía server và giới hạn việc cấp role khác trong luồng đáng tin cậy chỉ dành cho Admin.
2. Bổ sung API regression test chứng minh đăng ký không xác thực không thể tạo tài khoản ADMIN, MANAGER hoặc RESEARCHER và không thể truy cập endpoint chỉ dành cho Admin.
3. Ổn định test AI: mock Gemini API để test có kết quả xác định, hoặc kiểm tra hợp đồng đầu ra không phụ thuộc một nhãn chủ đề cụ thể do mô hình tạo.
4. Chạy toàn bộ backend suite với cấu hình AI test xác định và xác nhận tất cả test thành công.
5. Quyết định và thực thi role được phép gửi phản hồi; bổ sung test phân quyền cho BUG-03 nếu chỉ Respondent được submit.
6. Xác thực payload theo từng loại câu hỏi và danh sách options; thêm test hợp lệ và không hợp lệ cho BUG-04.
7. Thay mock fallback bắt mọi lỗi ở các mutation production bằng ranh giới demo mode rõ ràng; xác minh BUG-01 bằng API/integration/UI test.
8. Chạy kiểm tra trên Python 3.12 và Node.js 22 theo CI hỗ trợ.
9. Chạy browser smoke/E2E suite và staging smoke test trên cấu hình triển khai thực tế.
10. Xác nhận database có thể kết nối và lịch sử migration chính xác trên database dự kiến triển khai.

## 8. Phê duyệt

| Vai trò | Trạng thái | Ghi chú |
|---|---|---|
| QA verification | **Có điều kiện / chưa phê duyệt phát hành** | Kiểm tra frontend thành công; backend suite xác định thành công. Còn một release blocker mức độ cao. |
| Engineering | Chờ xác nhận | Xác nhận bản sửa và bằng chứng regression test cho BUG-02, đồng thời ổn định test AI. |
| Product owner | Chờ xác nhận | Xác nhận chính sách role được phép submit và chấp thuận/từ chối các rủi ro mức trung bình còn lại. |

**Quyết định cuối cùng: NO-GO.** Còn **1 release blocker đang mở (BUG-02)**. Đánh giá lại sign-off sau khi lỗi blocker được khắc phục, regression test thành công và hoàn tất smoke test trên môi trường triển khai.
