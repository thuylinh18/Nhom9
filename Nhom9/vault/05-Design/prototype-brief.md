# Prototype Brief

## 1. Project

AI Customer Feedback & Survey Platform

## 2. Prototype Purpose

Prototype được sử dụng để kiểm tra user flow, wording và usability
trước khi triển khai frontend production.

Prototype không phải production system.

---

# 3. Critical User Flows

## FLOW-001 — Researcher Create and Publish Survey

### Requirements

- REQ-002 — Tạo survey
- REQ-003 — Chỉnh sửa survey
- REQ-004 — Thêm question
- REQ-005 — Publish survey

### Persona

Researcher

### Goal

Researcher có thể tạo survey, thêm câu hỏi, chỉnh sửa và publish survey.

### Screens

1. Login
2. Survey List
3. Create Survey
4. Add Question
5. Edit Survey
6. Preview Survey
7. Publish Confirmation
8. Publish Success

---

## FLOW-002 — Respondent Complete Survey

### Requirements

- REQ-007 — Xem survey
- REQ-008 — Trả lời survey
- REQ-009 — Submit response
- REQ-010 — Lưu response và feedback

### Persona

Respondent

### Goal

Respondent có thể mở survey đã publish, trả lời câu hỏi và submit response.

### Screens

1. Login
2. Published Survey List
3. Survey Detail
4. Answer Questions
5. Submit Confirmation
6. Submit Success

---

## FLOW-003 — Manager View AI Analysis

### Requirements

- REQ-011 — Xem kết quả survey
- REQ-012 — Xem feedback
- REQ-013 — Sentiment Analysis
- REQ-014 — Topic Analysis
- REQ-015 — AI Summary
- REQ-016 — Xem kết quả AI
- REQ-017 — Survey Dashboard

### Persona

Manager

### Goal

Manager có thể xem kết quả survey, feedback và kết quả phân tích AI.

### Screens

1. Login
2. Dashboard
3. Survey Result
4. Feedback List
5. AI Analysis
6. AI Result
7. Summary

---

# 4. Required States

Prototype phải thể hiện các trạng thái:

- Default
- Loading
- Empty
- Error
- Permission denied
- Confirmation
- Success

---

# 5. Sample Data

## Survey

Title:
Customer Service Feedback Survey

Description:
Please provide feedback about your recent customer service experience.

Questions:

1. How satisfied are you with our service?
2. How would you rate the response time?
3. What could we improve?

## Sample Responses

Response 1:
"Overall the service was good, but the response time was slow."

Response 2:
"The staff were very helpful and friendly."

Response 3:
"I had to wait too long before receiving support."

## AI Sample Result

Sentiment:
Positive: 33%
Neutral: 0%
Negative: 67%

Topics:

- Response Time
- Customer Service
- Staff Support

Summary:

"Most respondents were satisfied with staff support,
but response time was a recurring concern."

---

# 6. Design Constraints

- Simple enterprise dashboard
- Clear navigation
- Easy-to-understand buttons
- Responsive layout
- No unnecessary features
- Do not add features outside confirmed requirements
- Prototype data may be static
- AI results may be mocked
- Backend is not required for prototype

---

# 7. Prototype Assumptions

The following assumptions are ONLY for prototype demonstration:

1. Authentication is mocked.
2. Survey data is static.
3. Response data is static.
4. AI analysis result is mocked.
5. No real database is required.
6. No real AI API is required.
7. Buttons simulate the expected workflow.

These assumptions must not be treated as confirmed production requirements.