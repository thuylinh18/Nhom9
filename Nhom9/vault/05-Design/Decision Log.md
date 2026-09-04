# Prototype Decision Log

## 1. Purpose

Ghi lại các quyết định được đưa ra sau khi xây dựng và usability test prototype.

---

# 2. Prototype Assumptions

Các nội dung sau chỉ phục vụ prototype:

- Authentication được mock.
- Survey data là static.
- Response data là static.
- AI analysis được mock.
- Không sử dụng database thật.
- Không sử dụng AI API thật.
- Các button mô phỏng workflow.
- Prototype không phải production system.

---

# 3. Decisions

## DEC-001 — Authentication

### Decision

Sử dụng authentication mock trong prototype.

### Reason

Mục tiêu của prototype là kiểm tra user flow, không kiểm tra authentication backend.

### Status

Prototype only

---

## DEC-002 — Survey Data

### Decision

Sử dụng sample survey data cố định.

### Reason

Giúp kiểm tra workflow nhanh mà không cần database.

### Status

Prototype only

---

## DEC-003 — AI Analysis

### Decision

Sử dụng AI result mock.

### Reason

Prototype chỉ cần kiểm tra cách Manager xem và hiểu kết quả AI.

### Status

Prototype only

---

## DEC-004 — Researcher Flow

### Decision

Giữ workflow:

Login
→ Dashboard
→ Create Survey
→ Add Question
→ Preview
→ Publish Confirmation
→ Publish Success

### Reason

Đây là critical flow của Researcher.

### Related Requirements

- REQ-002
- REQ-003
- REQ-004
- REQ-005

---

## DEC-005 — Respondent Flow

### Decision

Giữ confirmation trước khi submit survey.

### Reason

Giúp người dùng xác nhận trước khi gửi response.

### Related Requirements

- REQ-007
- REQ-008
- REQ-009
- REQ-010

---

## DEC-006 — Manager AI Analysis

### Decision

AI Analysis hiển thị:

- Sentiment
- Topics
- Summary

### Reason

Đây là các thông tin chính cần thiết để Manager hiểu feedback.

### Related Requirements

- REQ-011
- REQ-012
- REQ-013
- REQ-014
- REQ-015
- REQ-016
- REQ-017

---

# 4. UX Decisions

## DEC-007 — Button Wording

Sử dụng wording rõ ràng:

- Create Survey
- Add Question
- Preview
- Publish
- Submit
- Back to Dashboard

Không sử dụng wording quá kỹ thuật.

---

## DEC-008 — Validation

Các form quan trọng phải có validation.

Ví dụ:

"Please answer all required questions."

---

## DEC-009 — Confirmation

Các action quan trọng phải có confirmation:

- Publish Survey
- Submit Survey

---

## DEC-010 — Success State

Sau khi hoàn thành action, hiển thị success message.

Ví dụ:

"Survey published successfully."

"Your response has been submitted successfully."

---

# 5. Prototype vs Confirmed Requirements

## Prototype Assumptions

- Mock authentication.
- Static data.
- Mock AI result.
- No real database.
- No real AI API.

## Confirmed Requirements

- Researcher có thể tạo survey.
- Researcher có thể chỉnh sửa survey.
- Researcher có thể thêm questions.
- Researcher có thể publish survey.
- Respondent có thể xem survey.
- Respondent có thể trả lời survey.
- Respondent có thể submit response.
- Manager có thể xem survey results.
- Manager có thể xem feedback.
- Manager có thể xem AI analysis.
- Manager có thể xem AI summary.

---

# 6. Final Decision

Prototype được sử dụng để kiểm chứng:

1. User flow
2. Screen flow
3. Button wording
4. Validation
5. Confirmation
6. Success states
7. AI result presentation

Prototype không được xem là production frontend.

Các quyết định và issue phát hiện từ usability test sẽ được sử dụng để cập nhật requirements và design trước khi triển khai production.