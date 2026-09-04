# Usability Findings

## 1. Purpose

Tổng hợp kết quả usability test của prototype AI Customer Feedback & Survey Platform.

Kết quả được ghi theo:

Observation → Issue → Impact → Decision

---

# 2. Participants

| Participant | Role | Tested Flow |
|---|---|---|
| P1 | Researcher | FLOW-001 |
| P2 | Respondent | FLOW-002 |
| P3 | Manager | FLOW-003 |

---

# 3. Findings — Researcher

## Observation

Người dùng có thể tìm thấy Create Survey và bắt đầu tạo survey.

## Issue

Cần đảm bảo nút Create Survey có vị trí và wording rõ ràng.

## Impact

Nếu người dùng không tìm thấy chức năng này, workflow tạo survey sẽ bị gián đoạn.

## Decision

Giữ button "Create Survey" ở vị trí dễ nhìn trên Survey Dashboard.

---

# 4. Findings — Respondent

## Observation

Người dùng có thể chọn survey và bắt đầu trả lời.

## Issue

Required questions cần được đánh dấu rõ ràng.

## Impact

Người dùng có thể submit survey khi chưa trả lời đầy đủ.

## Decision

Hiển thị required indicator và validation message khi submit.

---

# 5. Findings — Manager

## Observation

Người dùng có thể tìm được AI Analysis và xem sentiment, topics và summary.

## Issue

Các kết quả AI cần được trình bày đơn giản và dễ đọc.

## Impact

Manager có thể khó xác định vấn đề chính nếu thông tin quá phức tạp.

## Decision

Hiển thị ba nhóm chính:

- Sentiment
- Topics
- AI Summary

---

# 6. General Findings

| ID | Observation | Issue | Impact | Decision |
|---|---|---|---|---|
| UX-001 | Create Survey có thể tìm thấy | Button cần rõ ràng | Có thể làm gián đoạn flow | Giữ wording "Create Survey" |
| UX-002 | Respondent cần biết câu hỏi bắt buộc | Required indicator chưa đủ rõ | Có thể submit thiếu dữ liệu | Thêm validation |
| UX-003 | Manager cần xem nhanh AI result | Quá nhiều thông tin có thể gây khó hiểu | Khó xác định insight chính | Ưu tiên Sentiment, Topics, Summary |

---

# 7. Prototype Changes

Sau usability test, các thay đổi cần xem xét:

- Làm rõ button labels.
- Hiển thị required indicators.
- Hiển thị validation message.
- Giữ confirmation trước các hành động quan trọng.
- Hiển thị success message sau khi hoàn thành action.
- Giữ AI result đơn giản và dễ đọc.

---

# 8. Conclusion

Prototype đáp ứng các critical user flows chính:

- Researcher tạo và publish survey.
- Respondent hoàn thành survey.
- Manager xem kết quả và AI analysis.

Các vấn đề phát hiện trong usability test được ghi nhận để cập nhật requirement, screen flow và prototype.