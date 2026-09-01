# Interview Notes

## 1. Thông tin phỏng vấn

- **Ngày:** 2026-08-27
- **Người tham gia:** Project Owner / Người dùng giả lập
- **Mục đích:** Xác nhận nhu cầu thu thập, quản lý và phân tích phản hồi khách hàng.
- **Trạng thái:** CONFIRMED

## 2. Kết quả phỏng vấn

### Decision — Quy trình khảo sát

- **Quyết định:** Quy trình khảo sát chính gồm:
  **Tạo Survey → Publish → Respondent trả lời → Submit Response → Manager xem kết quả.**
- **Lý do:** Đây là luồng nghiệp vụ chính của hệ thống và cần được hỗ trợ trong MVP.
- **Trạng thái:** CONFIRMED

### Decision — Vai trò người dùng

- **Quyết định:**
  - **Researcher:** Tạo, chỉnh sửa, publish và close survey.
  - **Respondent:** Xem và trả lời survey đã được publish.
  - **Manager:** Xem kết quả, feedback và kết quả phân tích AI.
  - **Admin:** Quản lý tài khoản và các chức năng quản trị cơ bản.
- **Lý do:** Phân tách trách nhiệm giữa người tạo khảo sát, người tham gia, người phân tích kết quả và người quản trị hệ thống.
- **Trạng thái:** CONFIRMED

### Decision — Phân tích feedback bằng AI

- **Quyết định:** AI được sử dụng để hỗ trợ phân tích feedback dạng văn bản, tập trung vào:
  - Sentiment analysis.
  - Topic analysis.
  - Summary.
- **Lý do:** Giúp Manager nhanh chóng nhận biết sentiment, topic và nội dung nổi bật trong feedback.
- **Trạng thái:** CONFIRMED

### Decision — AI không thay thế dữ liệu nghiệp vụ

- **Quyết định:** Dữ liệu survey, response và feedback được lưu trữ bởi hệ thống. Kết quả AI chỉ đóng vai trò hỗ trợ phân tích và không được xem là source-of-truth cho dữ liệu nghiệp vụ.
- **Lý do:** Kết quả AI có thể không chính xác và cần được xem như thông tin hỗ trợ.
- **Trạng thái:** CONFIRMED

## 3. Các điểm chưa xác nhận

- **Q-01:** Respondent có cần đăng nhập trước khi tham gia survey không?
- **Q-02:** Một Respondent có được submit cùng một survey nhiều lần không?
- **Q-03:** Survey sẽ hỗ trợ những loại question nào?
- **Q-04:** Có cần export kết quả survey ra Excel/PDF không?
- **Q-05:** Nhóm sẽ sử dụng AI API nào?
- **Trạng thái:** OPEN