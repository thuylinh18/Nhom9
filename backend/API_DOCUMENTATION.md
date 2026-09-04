# Bảng Tổng hợp & Giải thích Chi tiết REST API

Hệ thống: **AI Customer Feedback & Survey Platform**  
Base URL: `http://127.0.0.1:8000/api/v1`  
Xác thực: Header `Authorization: Bearer <access_token>`

---

## 📊 Bảng tổng hợp tất cả API Endpoints

| STT | Method | Endpoint | Quyền hạn (Role) | User Story & Req | Mô tả tóm tắt |
|:---:|:---:|---|---|---|---|
| **1** | `POST` | `/api/v1/auth/register/` | Public | US-001 (REQ-001) | Đăng ký tài khoản mới (`email`, `password`, `role`) |
| **2** | `POST` | `/api/v1/auth/login/` | Public | US-001 (REQ-001) | Đăng nhập lấy cặp JWT Token (`access`, `refresh`) & Role |
| **3** | `POST` | `/api/v1/auth/refresh/` | Public | US-001 (REQ-001) | Làm mới Access Token khi token cũ hết hạn |
| **4** | `GET` | `/api/v1/auth/me/` | Authenticated | US-001 (REQ-001) | Lấy thông tin tài khoản và vai trò đang đăng nhập |
| **5** | `POST` | `/api/v1/surveys/` | Researcher | US-002 (REQ-002) | Tạo bài khảo sát mới (mặc định trạng thái `DRAFT`) |
| **6** | `GET` | `/api/v1/surveys/` | Researcher | US-002 (REQ-002) | Lấy danh sách khảo sát do Researcher hiện tại tạo |
| **7** | `GET` | `/api/v1/surveys/available/` | Authenticated / All | US-007 (REQ-007) | Danh sách khảo sát đang `PUBLISHED` cho Respondent xem |
| **8** | `GET` | `/api/v1/surveys/{id}/` | Owner / All (nếu Published) | US-007 (REQ-007) | Xem chi tiết bài khảo sát kèm danh sách các câu hỏi |
| **9** | `PUT/PATCH` | `/api/v1/surveys/{id}/` | Researcher (Owner) | US-003 (REQ-003) | Sửa khảo sát (chỉ được sửa khi đang ở trạng thái `DRAFT`) |
| **10** | `DELETE` | `/api/v1/surveys/{id}/` | Researcher (Owner) | US-003 (REQ-003) | Xóa khảo sát (chỉ được xóa khi đang ở trạng thái `DRAFT`) |
| **11** | `POST` | `/api/v1/surveys/{id}/publish/` | Researcher (Owner) | US-005 (REQ-005) | Xuất bản khảo sát (bắt buộc phải có ít nhất 1 câu hỏi) |
| **12** | `POST` | `/api/v1/surveys/{id}/close/` | Researcher (Owner) | US-006 (REQ-006) | Đóng khảo sát (ngừng tiếp nhận câu trả lời mới) |
| **13** | `GET` | `/api/v1/surveys/{survey_id}/questions/` | Researcher (Owner) | US-004 (REQ-004) | Xem danh sách câu hỏi trong bài khảo sát |
| **14** | `POST` | `/api/v1/surveys/{survey_id}/questions/` | Researcher (Owner) | US-004 (REQ-004) | Thêm câu hỏi mới (`Rating`, `Multiple choice`, `Text`) |
| **15** | `PUT/DELETE` | `/api/v1/surveys/{survey_id}/questions/{id}/` | Researcher (Owner) | US-004 (REQ-004) | Sửa hoặc xóa câu hỏi (chỉ khi khảo sát là `DRAFT`) |
| **16** | `POST` | `/api/v1/surveys/{id}/submit/` | Respondent | US-008 -> US-010 | Nộp bài khảo sát (kiểm tra câu hỏi bắt buộc & lưu feedback) |
| **17** | `GET` | `/api/v1/surveys/{id}/results/` | Manager | US-011 (REQ-011) | Thống kê kết quả khảo sát (tổng bài nộp, điểm TB, tỷ lệ sao) |
| **18** | `GET` | `/api/v1/surveys/{id}/feedback/` | Manager | US-012 (REQ-012) | Xem danh sách các ý kiến phản hồi dạng văn bản |
| **19** | `GET` | `/api/v1/surveys/{id}/ai-analysis/` | Manager | US-014 (REQ-016) | Xem kết quả phân tích AI (Sentiment, Topics, Summary) |
| **20** | `POST` | `/api/v1/surveys/{id}/ai-analysis/` | Manager | US-013 (REQ-013) | Kích hoạt AI phân tích lại toàn bộ feedback hiện có |
| **21** | `GET` | `/api/v1/dashboard/` | Manager | US-015 (REQ-017) | Xem Dashboard KPI tổng quan của toàn bộ hệ thống |

---

## 🔍 Giải thích Chi tiết từng Chức năng & Luồng Nghiệp vụ

### 1. Nhóm Xác thực & Quản lý Người dùng (Auth)
- **Đăng ký (`POST /api/v1/auth/register/`)**: Người dùng tạo tài khoản với vai trò mong muốn (`RESEARCHER`, `RESPONDENT`, `MANAGER`). Mật khẩu được mã hóa an toàn bằng PBKDF2/SHA256, không lưu plaintext.
- **Đăng nhập (`POST /api/v1/auth/login/`)**: Dùng `email` và `password`. Khi hợp lệ, trả về cặp JWT Token (`access` có hạn 60 phút, `refresh` có hạn 7 ngày) kèm thông tin Role để Frontend điều hướng trang phù hợp.
- **Profile (`GET /api/v1/auth/me/`)**: Truyền Header `Authorization: Bearer <access>` để kiểm tra token và lấy thông tin user hiện tại.

---

### 2. Nhóm Quản lý Khảo sát (Surveys & Questions)
- **Vòng đời khảo sát**: Tuân thủ quy tắc `DRAFT` → `PUBLISHED` → `CLOSED`.
  - **Tạo khảo sát (`POST /api/v1/surveys/`)**: Khảo sát mới tạo luôn ở trạng thái `DRAFT`.
  - **Thêm câu hỏi (`POST .../questions/`)**: Hỗ trợ 3 kiểu câu hỏi theo Prototype:
    1. `Rating`: Đánh giá thang điểm từ 1 đến 5 sao.
    2. `Multiple choice`: Trắc nghiệm, bắt buộc gửi kèm danh sách mảng các lựa chọn (ví dụ: `["Excellent", "Good", "Fair", "Poor"]`).
    3. `Text`: Câu hỏi mở để người dùng điền nhận xét tự do.
  - **Chỉnh sửa / Xóa (`PUT / DELETE`)**: Áp dụng quy tắc nghiệp vụ `UC-003`: Chỉ cho phép chỉnh sửa tiêu đề, mô tả hoặc xóa câu hỏi khi khảo sát còn ở trạng thái `DRAFT`. Nếu đã xuất bản, hệ thống sẽ chặn sửa để bảo toàn tính toàn vẹn dữ liệu.
  - **Xuất bản (`POST .../publish/`)**: Áp dụng quy tắc `BR-003`: Bắt buộc bài khảo sát phải có ít nhất 1 câu hỏi mới được phép Publish. Sau khi Publish, bài khảo sát sẽ xuất hiện trong danh sách khảo sát công khai cho Respondent.
  - **Đóng khảo sát (`POST .../close/`)**: Áp dụng quy tắc `BR-002`: Khi đã đóng, bài khảo sát dừng tiếp nhận toàn bộ phản hồi mới.

---

### 3. Nhóm Nộp bài Khảo sát (Survey Response)
- **Nộp bài (`POST /api/v1/surveys/{id}/submit/`)**:
  - Dành cho **Respondent** gửi câu trả lời và ý kiến đóng góp (`feedback_text`).
  - **Kiểm tra nghiệp vụ**:
    1. Kiểm tra bài khảo sát có đang `PUBLISHED` hay không.
    2. Quét qua toàn bộ câu hỏi: nếu câu hỏi nào có `required: true` mà Respondent bỏ trống, hệ thống sẽ lập tức báo lỗi `400 Bad Request: Please answer all required questions`.
    3. Lưu toàn bộ `Response`, các câu trả lời `Answer` và nhận xét `Feedback` trong một Transaction nguyên tử (`transaction.atomic()`).

---

### 4. Nhóm Báo cáo, AI Analysis & Dashboard (Analytics)
- **Xem kết quả tổng hợp (`GET .../results/`)**: Dành riêng cho **Manager**, tự động tính toán tổng số lượt nộp, điểm rating trung bình (thang điểm 5) và phân bổ tỷ lệ phần trăm theo từng mức sao (5 sao, 4 sao, 3 sao, 2 sao, 1 sao).
- **Xem feedback văn bản (`GET .../feedback/`)**: Trả về toàn bộ danh sách các câu nhận xét của khách hàng kèm thời gian gửi để người quản lý theo dõi.
- **Phân tích AI Feedback (`GET / POST .../ai-analysis/`)**:
  - Áp dụng quy tắc `BR-004` & `BR-005`: Dữ liệu phân tích AI được lưu trữ độc lập trong bảng `ai_analysis_results`, tuyệt đối không làm thay đổi nội dung câu trả lời gốc.
  - Kết quả AI gồm 3 phần:
    1. `sentiment`: Cảm xúc chủ đạo (`Positive`, `Neutral`, `Negative`) và phân bổ tỷ lệ phần trăm (`sentiment_breakdown`).
    2. `topics`: Các chủ đề chính được nhắc đến (ví dụ: `Response Time`, `Customer Service`, `Staff Support`).
    3. `summary`: Đoạn tóm tắt tổng hợp ý kiến của khách hàng giúp nhà quản lý nắm bắt vấn đề nhanh chóng.
- **Dashboard tổng quan (`GET /api/v1/dashboard/`)**: Cung cấp các chỉ số KPI cấp cao nhất của toàn hệ thống (Tổng số survey, tổng response, điểm đánh giá trung bình, biểu đồ cảm xúc, top topics) khớp với giao diện màn hình Dashboard của Manager trong Prototype.

---

## 🚀 Trải nghiệm API trực quan với Swagger UI
Bạn có thể thử nghiệm trực tiếp từng API (nhập tham số, gửi request và xem kết quả ngay trên trình duyệt) tại:  
👉 **[http://127.0.0.1:8000/api/schema/swagger-ui/](http://127.0.0.1:8000/api/schema/swagger-ui/)** (hoặc truy cập trực tiếp trang chủ **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**).
