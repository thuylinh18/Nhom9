# Domain Business Rules

## 1. Survey Lifecycle

Survey có vòng đời:

`DRAFT → PUBLISHED → CLOSED`

### DRAFT

Survey đang được tạo hoặc chỉnh sửa.

Respondent chưa thể gửi response.

### PUBLISHED

Survey đã được publish.

Respondent có thể xem và trả lời survey.

### CLOSED

Survey đã được đóng.

Respondent không thể gửi response mới.

---

## 2. Survey Publishing

Một survey chỉ được publish khi đã có question.

Related Rule:

- BR-003

---

## 3. Response

Response được tạo khi Respondent submit survey.

Response phải liên kết với survey tương ứng.

Related Requirements:

- REQ-008
- REQ-009
- REQ-010

---

## 4. Feedback

Feedback là dữ liệu do Respondent cung cấp và có thể được sử dụng cho AI analysis.

AI có thể phân tích:

- Sentiment.
- Topic.
- Summary.

---

## 5. AI Analysis

AI analysis được thực hiện trên feedback đã được lưu.

Kết quả AI bao gồm:

- Sentiment.
- Topic.
- Summary.

Kết quả AI phục vụ mục đích hỗ trợ Manager.

AI không phải là người đưa ra quyết định cuối cùng.

---

## 6. Role

### Researcher

Quản lý survey.

### Respondent

Tham gia survey và gửi response.

### Manager

Xem kết quả và AI insights.

### Admin

Quản lý user và hệ thống cơ bản.