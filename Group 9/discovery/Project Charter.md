# Project Charter

## 1. Project Information

**Project Name:** AI Customer Feedback & Survey Platform

**Project Type:** Web Application

**Project Goal:**  
Xây dựng nền tảng web hỗ trợ doanh nghiệp thiết kế survey, thu thập feedback khách hàng và sử dụng AI để phân tích kết quả.

---

## 2. Problem

Doanh nghiệp cần thu thập feedback để hiểu mức độ hài lòng của khách hàng. Tuy nhiên, việc tạo survey, thu thập và phân tích feedback thủ công mất nhiều thời gian, đặc biệt với feedback dạng văn bản.

---

## 3. Proposed Solution

Xây dựng nền tảng web cho phép:

- Manager/Researcher tạo và quản lý survey.
- Respondent trả lời survey và gửi feedback.
- Hệ thống lưu trữ response.
- Manager xem kết quả survey.
- AI phân tích sentiment, topic và summary của feedback.
- Manager xem insight để hỗ trợ đưa ra action.

---

## 4. Target Users

**Researcher:** Tạo survey và theo dõi kết quả.

**Respondent:** Tham gia survey và gửi feedback.

**Manager:** Xem và phân tích kết quả, feedback.

**Admin:** Quản lý tài khoản và hệ thống cơ bản.

---

## 5. Project Goals

**G-01** Cho phép tạo và quản lý survey.

**G-02** Cho phép Respondent trả lời survey.

**G-03** Lưu trữ response và feedback.

**G-04** Cho phép Manager xem kết quả survey.

**G-05** Hỗ trợ AI phân tích feedback.

**G-06** Hiển thị insight từ kết quả phân tích.

---

## 6. Success Metrics

**M-01** Hoàn thành critical flow:

Create Survey → Publish → Collect Response → Analyze → View Result.

**M-02** Có ít nhất 10 functional requirements có ID.

**M-03** Có ít nhất 5 non-functional requirements.

**M-04** Có tối thiểu 15 câu hỏi Q&A benchmark cho Project Vault.

**M-05** Q&A benchmark đạt ≥80% câu trả lời đúng dựa trên Vault.

**M-06** AI phân tích được feedback mẫu của project.

---

## 7. MVP Scope

### Must Have

- Authentication cơ bản.
- Survey creation/editing.
- Publish/Close survey.
- Respondent trả lời survey.
- Submit response.
- Lưu response.
- Xem feedback.
- Xem kết quả survey.
- AI sentiment analysis.
- AI topic analysis.
- AI summary.

### Should Have

- Dashboard thống kê.
- Filter feedback.
- Basic charts.

### Could Have

- Export CSV/Excel.
- So sánh nhiều survey.
- AI đề xuất action đơn giản.

### Out of Scope

- Thanh toán.
- Mobile native app.
- Training AI model từ đầu.
- Xây dựng LLM riêng.
- Recommendation system phức tạp.
- Predictive analytics.
- Microservice.
- Real-time analytics phức tạp.

---

## 8. Constraints

**CON-01** Project được xây dựng dưới dạng web application.

**CON-02** Tập trung vào MVP và phạm vi đồ án.

**CON-03** Không training AI model từ đầu.

**CON-04** Sử dụng AI model/API có sẵn.

**CON-05** Không sử dụng microservice architecture.

**CON-06** Công nghệ và phạm vi phải phù hợp với thời gian thực hiện.

---

## 9. Key Risks

**RISK-01** Scope quá lớn → Ưu tiên Must Have.

**RISK-02** AI phân tích không chính xác → Kiểm thử bằng dữ liệu mẫu.

**RISK-03** Thiếu feedback thực tế → Chuẩn bị dataset mẫu.

**RISK-04** Requirement thay đổi → Quản lý bằng Project Vault.

---

## 10. Open Decisions

- Respondent có cần đăng nhập không?
- Respondent có được trả lời một survey nhiều lần không?
- Survey hỗ trợ những loại câu hỏi nào?
- Feedback text có bắt buộc không?
- AI phân tích sentiment/topic/summary ở mức nào?
- Có cần export CSV/Excel không?