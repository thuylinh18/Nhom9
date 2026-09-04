# Domain Workflows

## Workflow 1 — Tạo và publish survey

### Actor

Researcher

### Flow

1. Researcher đăng nhập.
2. Researcher tạo survey.
3. Researcher nhập thông tin survey.
4. Researcher thêm question.
5. System kiểm tra survey có question.
6. Researcher publish survey.
7. Survey chuyển sang trạng thái `PUBLISHED`.
8. Respondent có thể xem survey.

### Related Requirements

- REQ-001
- REQ-002
- REQ-003
- REQ-004
- REQ-005

---

## Workflow 2 — Respondent trả lời survey

### Actor

Respondent

### Flow

1. Respondent truy cập survey.
2. System kiểm tra survey ở trạng thái `PUBLISHED`.
3. Respondent xem các question.
4. Respondent nhập câu trả lời.
5. Respondent nhập feedback nếu có.
6. Respondent submit response.
7. System validate response.
8. System lưu response.
9. System lưu feedback.

### Related Requirements

- REQ-007
- REQ-008
- REQ-009
- REQ-010

---

## Workflow 3 — Manager xem kết quả

### Actor

Manager

### Flow

1. Manager đăng nhập.
2. Manager chọn survey.
3. System lấy dữ liệu response.
4. System tổng hợp kết quả.
5. Manager xem kết quả survey.
6. Manager xem feedback.

### Related Requirements

- REQ-011
- REQ-012

---

## Workflow 4 — AI phân tích feedback

### Actor

System / AI

### Flow

1. Response được lưu.
2. System lấy feedback dạng văn bản.
3. System gửi feedback đến AI service/API.
4. AI phân tích sentiment.
5. AI xác định topic.
6. AI tạo summary.
7. System lưu kết quả AI.
8. Manager xem AI analysis.

### Related Requirements

- REQ-013
- REQ-014
- REQ-015
- REQ-016