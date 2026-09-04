# Usability Test Script

## 1. Purpose

Kiểm tra prototype AI Customer Feedback & Survey Platform có dễ sử dụng hay không và người dùng có hoàn thành được các workflow chính hay không.

Không đánh giá mức độ đẹp của giao diện.

Không giải thích cách sử dụng prototype trước khi người dùng thực hiện task.

---

# 2. Participants

Số lượng: 3 người

## Participant 1

Role: Researcher

## Participant 2

Role: Respondent

## Participant 3

Role: Manager

---

# 3. Test Rules

- Không hướng dẫn người dùng cách sử dụng trước khi test.
- Chỉ đọc task cho người dùng.
- Quan sát người dùng thực hiện task.
- Không hỏi "Bạn có thích giao diện không?".
- Ghi lại hành động, lỗi và thời gian hoàn thành.
- Nếu người dùng bị mắc kẹt, ghi nhận vấn đề thay vì lập tức hướng dẫn.
- Prototype sử dụng mock data.
- Không đánh giá backend hoặc database.

---

# 4. Test Flow 1 — Researcher

## Goal

Tạo và publish một survey.

## Task

"Bạn là Researcher. Hãy tạo một survey để thu thập feedback về dịch vụ khách hàng và publish survey đó."

## Expected Flow

Login
↓
Survey Dashboard
↓
Create Survey
↓
Survey Editor
↓
Add Question
↓
Preview
↓
Publish Confirmation
↓
Publish Success
↓
Survey Dashboard

## Success Criteria

- Người dùng tìm được chức năng Create Survey.
- Người dùng nhập được title và description.
- Người dùng thêm được question.
- Người dùng preview được survey.
- Người dùng publish được survey.
- Người dùng quay lại Dashboard sau khi publish.

## Observe

- Người dùng có tìm được Create Survey không?
- Người dùng có hiểu nút Add Question không?
- Người dùng có hiểu Preview và Publish khác nhau không?
- Người dùng có hiểu màn hình Confirmation không?
- Người dùng có hoàn thành task mà không cần hướng dẫn không?

---

# 5. Test Flow 2 — Respondent

## Goal

Hoàn thành một survey đã được publish.

## Task

"Bạn là Respondent. Hãy mở Customer Service Feedback Survey, trả lời tất cả câu hỏi bắt buộc và submit survey."

## Expected Flow

Login
↓
Available Surveys
↓
Survey Detail
↓
Answer Survey
↓
Submit Confirmation
↓
Submission Success

## Success Criteria

- Người dùng tìm được survey.
- Người dùng mở được survey.
- Người dùng trả lời được các câu hỏi.
- Người dùng hiểu validation khi thiếu câu trả lời.
- Người dùng submit được survey.
- Người dùng nhìn thấy thông báo thành công.

## Observe

- Người dùng có hiểu survey nào cần chọn không?
- Người dùng có hiểu required question không?
- Người dùng có hiểu nút Submit không?
- Người dùng có hiểu confirmation không?
- Người dùng có nhận biết submission thành công không?

---

# 6. Test Flow 3 — Manager

## Goal

Xem kết quả survey và AI analysis.

## Task

"Bạn là Manager. Hãy xem kết quả Customer Service Feedback Survey và tìm ra vấn đề chính được người dùng phản ánh."

## Expected Flow

Login
↓
Manager Dashboard
↓
Select Survey
↓
Survey Result
↓
Response List
↓
Feedback
↓
AI Analysis
↓
Summary

## Success Criteria

- Người dùng tìm được survey.
- Người dùng xem được số lượng responses.
- Người dùng xem được feedback.
- Người dùng tìm được AI Analysis.
- Người dùng hiểu sentiment.
- Người dùng xác định được main topic.
- Người dùng đọc được AI Summary.

## Observe

- Người dùng có tìm được Survey Result không?
- Người dùng có hiểu các chỉ số dashboard không?
- Người dùng có tìm được AI Analysis không?
- Người dùng có hiểu Positive / Neutral / Negative không?
- Người dùng có xác định được vấn đề chính không?

---

# 7. Test Recording

| Participant | Role       | Task                    | Completed | Problems | Notes |
| ----------- | ---------- | ----------------------- | --------- | -------- | ----- |
| P1          | Researcher | Create & Publish Survey |           |          |       |
| P2          | Respondent | Complete Survey         |           |          |       |
| P3          | Manager    | View AI Analysis        |           |          |       |

---

# 8. Final Observation

Sau khi test 3 người:

- Ghi lại các task không hoàn thành.
- Ghi lại các bước người dùng bị nhầm.
- Ghi lại các button hoặc wording gây khó hiểu.
- Xác định vấn đề cần sửa trong prototype.