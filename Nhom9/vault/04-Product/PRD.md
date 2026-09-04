# Product Requirements Document (PRD)

## AI Customer Feedback & Survey Platform

**Status:** Approved for MVP

**Version:** 1.0

**Project:** AI Customer Feedback & Survey Platform

---

# 1. Product Overview

AI Customer Feedback & Survey Platform là hệ thống hỗ trợ tổ chức tạo survey, thu thập response và feedback từ Respondent, đồng thời sử dụng AI để phân tích feedback.

Hệ thống giúp Researcher tạo và quản lý survey, Respondent tham gia survey, Manager theo dõi kết quả và sử dụng các chức năng phân tích AI để hiểu sentiment, topic và nội dung chính của feedback.

Prototype và các chức năng AI trong giai đoạn đầu có thể sử dụng dữ liệu giả lập để kiểm tra user flow trước khi triển khai production.

---

# 2. Problem Statement

Việc thu thập feedback bằng survey thường tạo ra một lượng lớn response và feedback khó tổng hợp thủ công.

Hệ thống cần cung cấp một nền tảng tập trung để:

- Tạo và quản lý survey.
- Thu thập response từ Respondent.
- Lưu trữ response và feedback.
- Tổng hợp kết quả survey.
- Phân tích sentiment của feedback bằng AI.
- Phân tích các topic chính trong feedback.
- Tạo summary giúp Manager nhanh chóng hiểu kết quả.

---

# 3. Product Goals

## G1 — Survey Management

Cho phép Researcher tạo, chỉnh sửa, publish và close survey.

## G2 — Survey Response

Cho phép Respondent xem survey đã publish, trả lời câu hỏi và submit response.

## G3 — Result Management

Cho phép Manager xem kết quả survey và feedback từ Respondent.

## G4 — AI Feedback Analysis

Sử dụng AI để phân tích sentiment, topic và tạo summary từ feedback.

## G5 — Dashboard

Cung cấp dashboard tổng quan giúp Manager theo dõi kết quả survey và phân tích feedback.

---

# 4. Users and Roles

## 4.1 User

User là người dùng có tài khoản hợp lệ và có thể đăng nhập vào hệ thống.

**Requirement:**

- REQ-001

---

## 4.2 Researcher

Researcher chịu trách nhiệm tạo và quản lý survey.

Researcher có thể:

- Tạo survey.
- Chỉnh sửa survey.
- Thêm và quản lý question.
- Publish survey.
- Close survey.

**Requirement:**

- REQ-002
- REQ-003
- REQ-004
- REQ-005
- REQ-006

---

## 4.3 Respondent

Respondent là người tham gia survey và cung cấp response, feedback.

Respondent có thể:

- Xem survey đã publish.
- Trả lời survey.
- Submit response.

**Requirement:**

- REQ-007
- REQ-008
- REQ-009
- REQ-010

---

## 4.4 Manager

Manager chịu trách nhiệm theo dõi kết quả survey và phân tích feedback.

Manager có thể:

- Xem kết quả survey.
- Xem feedback.
- Xem kết quả phân tích AI.
- Xem dashboard tổng quan.

**Requirement:**

- REQ-011
- REQ-012
- REQ-016
- REQ-017

---

## 4.5 Admin

Admin chỉ được đưa vào Product Scope khi đã có Requirement được xác nhận trong Discovery.

Hiện tại bộ Functional Requirements REQ-001 đến REQ-017 chưa định nghĩa chức năng riêng cho Admin.

Do đó:

- Admin chưa có chức năng riêng trong MVP.
- Không tự thêm chức năng Admin vào PRD nếu chưa có source requirement.
- Nếu Discovery xác nhận Admin là một role chính, cần bổ sung Requirement mới trước khi đưa Admin vào User Stories và Acceptance Criteria.

---

# 5. Functional Scope

## 5.1 Authentication

### REQ-001 — Đăng nhập hệ thống

User có thể đăng nhập vào hệ thống bằng tài khoản hợp lệ.

**Priority:** Must

**Actor:** User

---

# 6. Survey Management

## REQ-002 — Tạo survey

Researcher có thể tạo một survey mới và nhập các thông tin cần thiết của survey.

**Priority:** Must

**Actor:** Researcher

---

## REQ-003 — Chỉnh sửa survey

Researcher có thể chỉnh sửa thông tin của survey trước khi survey được publish.

**Priority:** Must

**Actor:** Researcher

---

## REQ-004 — Thêm question vào survey

Researcher có thể thêm, chỉnh sửa và quản lý các question thuộc một survey.

**Priority:** Must

**Actor:** Researcher

---

## REQ-005 — Publish survey

Researcher có thể publish survey để Respondent có thể truy cập và tham gia.

**Priority:** Must

**Actor:** Researcher

---

## REQ-006 — Close survey

Researcher có thể close một survey đang hoạt động để ngừng tiếp nhận response mới.

**Priority:** Must

**Actor:** Researcher

---

# 7. Survey Response

## REQ-007 — Xem survey

Respondent có thể xem các survey đang ở trạng thái publish.

**Priority:** Must

**Actor:** Respondent

---

## REQ-008 — Trả lời survey

Respondent có thể trả lời các question trong một survey đã được publish.

**Priority:** Must

**Actor:** Respondent

---

## REQ-009 — Submit response

Respondent có thể submit response sau khi hoàn thành các question bắt buộc của survey.

**Priority:** Must

**Actor:** Respondent

---

## REQ-010 — Lưu response và feedback

System phải lưu response và feedback do Respondent gửi để phục vụ việc tổng hợp và phân tích kết quả.

**Priority:** Must

**Actor:** System

---

# 8. Result Management

## REQ-011 — Xem kết quả survey

Manager có thể xem kết quả tổng hợp của survey sau khi Respondent gửi response.

**Priority:** Must

**Actor:** Manager

---

## REQ-012 — Xem feedback

Manager có thể xem feedback được gửi bởi Respondent để phục vụ việc đánh giá và phân tích.

**Priority:** Must

**Actor:** Manager

---

# 9. AI Analysis

## REQ-013 — Phân tích sentiment

System hỗ trợ AI phân tích sentiment của feedback và xác định xu hướng cảm xúc của feedback.

**Priority:** Must

**Actor:** System

---

## REQ-014 — Phân tích topic

System hỗ trợ AI xác định các topic hoặc chủ đề chính xuất hiện trong feedback.

**Priority:** Should

**Actor:** System

---

## REQ-015 — Tạo AI summary

System hỗ trợ AI tạo summary từ các feedback nhằm giúp Manager nhanh chóng nắm được những vấn đề và ý kiến chính của Respondent.

**Priority:** Should

**Actor:** System

---

## REQ-016 — Xem kết quả phân tích AI

Manager có thể xem kết quả phân tích AI, bao gồm sentiment, topic và summary của feedback.

**Priority:** Should

**Actor:** Manager

---

# 10. Dashboard

## REQ-017 — Xem Survey Dashboard

Manager có thể xem dashboard tổng quan về kết quả survey và các thông tin phân tích feedback.

**Priority:** Should

**Actor:** Manager

---

# 11. Business Rules

Các Business Rules được sử dụng để kiểm soát hành vi của hệ thống.

## BR-001 — Chỉ survey Published mới cho phép Respondent tham gia

Chỉ survey ở trạng thái Published mới được hiển thị cho Respondent và cho phép Respondent trả lời.

**Related Requirements:**

- REQ-005
- REQ-007
- REQ-008

---

## BR-002 — Survey Closed không nhận response mới

Survey ở trạng thái Closed không được nhận thêm response mới.

**Related Requirements:**

- REQ-006
- REQ-009

---

## BR-003 — Response phải thuộc về một survey

Mỗi response phải được liên kết với một survey cụ thể.

**Related Requirements:**

- REQ-009
- REQ-010

---

## BR-004 — Feedback có thể được AI phân tích

Feedback dạng văn bản có thể được sử dụng để thực hiện sentiment analysis và topic analysis.

**Related Requirements:**

- REQ-010
- REQ-013
- REQ-014

---

## BR-005 — AI không thay thế response gốc

Kết quả phân tích AI không được thay thế hoặc làm mất dữ liệu response và feedback gốc của Respondent.

**Related Requirements:**

- REQ-010
- REQ-013
- REQ-014
- REQ-015

---

## BR-006 — Phân quyền theo role

Chỉ người dùng có role phù hợp mới được thực hiện chức năng tương ứng.

Ví dụ:

- Researcher quản lý survey.
- Respondent tham gia survey.
- Manager xem kết quả và phân tích.
- User có thể đăng nhập hệ thống.

**Related Requirements:**

- REQ-001
- REQ-002
- REQ-003
- REQ-004
- REQ-005
- REQ-006
- REQ-007
- REQ-011
- REQ-012
- REQ-016
- REQ-017

---

# 12. Non-Functional Requirements

## NFR-001 — Authentication cơ bản

Hệ thống phải hỗ trợ authentication để chỉ người dùng hợp lệ mới có thể truy cập các chức năng yêu cầu đăng nhập.

**Priority:** Must

---

## NFR-002 — An toàn dữ liệu

Dữ liệu response và feedback phải được lưu trữ an toàn và không bị thay đổi bởi kết quả phân tích AI.

**Priority:** Must

---

## NFR-003 — Usability

Giao diện phải dễ sử dụng và giúp User hiểu rõ các thao tác chính.

**Priority:** Should

---

## NFR-004 — Khả năng xử lý response

Hệ thống phải có khả năng xử lý và lưu trữ nhiều response từ Respondent.

**Priority:** Should

---

## NFR-005 — AI response time

Kết quả phân tích AI phải được xử lý trong thời gian chấp nhận được đối với người dùng.

**Priority:** Should

---

# 13. UX Principles

## UX-001 — Clear Navigation

Các chức năng chính phải được tổ chức rõ ràng theo từng role.

## UX-002 — Clear Feedback

Sau mỗi thao tác quan trọng, hệ thống phải hiển thị trạng thái phù hợp.

Ví dụ:

- Loading.
- Success.
- Error.
- Empty.

## UX-003 — Role-based Interface

User chỉ nên nhìn thấy những chức năng phù hợp với quyền của mình.

## UX-004 — AI Transparency

Kết quả AI phải được hiển thị riêng và không được ghi đè response hoặc feedback gốc.

---

# 14. Prototype Scope

Prototype được sử dụng để kiểm tra:

- User flow.
- Navigation.
- Wording.
- Usability.
- Các trạng thái của giao diện.

Prototype không phải production system.

Prototype có thể sử dụng:

- Static data.
- Mock authentication.
- Mock response.
- Mock AI result.

Prototype không yêu cầu:

- Database thật.
- AI API thật.
- Backend production.

---

# 15. Critical User Flows

## FLOW-001 — Researcher Create and Publish Survey

Researcher:

Login
→ Survey Dashboard
→ Create Survey
→ Survey Editor
→ Add Question
→ Edit Survey
→ Preview
→ Publish Confirmation
→ Publish Success
→ Survey Dashboard

**Requirements:**

- REQ-001
- REQ-002
- REQ-003
- REQ-004
- REQ-005

---

## FLOW-002 — Respondent Complete Survey

Respondent:

Login
→ Available Surveys
→ Survey Detail
→ Answer Survey
→ Validation
→ Submit Confirmation
→ Submission Success

**Requirements:**

- REQ-001
- REQ-007
- REQ-008
- REQ-009
- REQ-010

---

## FLOW-003 — Manager View AI Analysis

Manager:

Login
→ Manager Dashboard
→ Select Survey
→ Survey Result
→ Feedback
→ AI Analysis
→ AI Result
→ Summary

**Requirements:**

- REQ-001
- REQ-011
- REQ-012
- REQ-013
- REQ-014
- REQ-015
- REQ-016
- REQ-017

---

# 16. Required States

Các prototype flow phải kiểm tra tối thiểu các trạng thái:

- Default
- Loading
- Empty
- Error
- Permission Denied
- Confirmation
- Success

---

# 17. Success Criteria

MVP được xem là đạt khi:

1. User có thể đăng nhập hệ thống.
2. Researcher có thể tạo survey.
3. Researcher có thể chỉnh sửa survey.
4. Researcher có thể thêm question.
5. Researcher có thể publish survey.
6. Researcher có thể close survey.
7. Respondent có thể xem survey đã publish.
8. Respondent có thể trả lời survey.
9. Respondent có thể submit response.
10. System lưu response và feedback.
11. Manager có thể xem kết quả survey.
12. Manager có thể xem feedback.
13. System có thể phân tích sentiment.
14. System có thể phân tích topic.
15. System có thể tạo AI summary.
16. Manager có thể xem kết quả AI.
17. Manager có thể xem dashboard.

---

# 18. Out of Scope

Các chức năng sau chưa nằm trong phạm vi MVP nếu chưa có Requirement được xác nhận:

- Thanh toán.
- Chatbot ngoài phạm vi phân tích feedback.
- Recommendation cá nhân hóa.
- Voice interaction.
- Multi-language.
- Real-time collaboration.
- Các chức năng quản trị Admin chưa được định nghĩa trong Requirement.
- Các chức năng AI ngoài sentiment, topic và summary.

---

# 19. Requirement Traceability

| Requirement | Product Area | Actor |
|---|---|---|
| REQ-001 | Authentication | User |
| REQ-002 | Survey Management | Researcher |
| REQ-003 | Survey Management | Researcher |
| REQ-004 | Survey Management | Researcher |
| REQ-005 | Survey Management | Researcher |
| REQ-006 | Survey Management | Researcher |
| REQ-007 | Survey Response | Respondent |
| REQ-008 | Survey Response | Respondent |
| REQ-009 | Survey Response | Respondent |
| REQ-010 | Survey Response | System |
| REQ-011 | Result Management | Manager |
| REQ-012 | Result Management | Manager |
| REQ-013 | AI Analysis | System |
| REQ-014 | AI Analysis | System |
| REQ-015 | AI Analysis | System |
| REQ-016 | AI Analysis | Manager |
| REQ-017 | Dashboard | Manager |

---

# 20. MVP Release Scope

## MVP — Must Have

- Authentication.
- Survey creation.
- Survey editing.
- Question management.
- Survey publishing.
- Survey closing.
- View published survey.
- Answer survey.
- Submit response.
- Store response and feedback.
- View survey result.
- View feedback.
- Sentiment analysis.

**Requirements:**

REQ-001 → REQ-013

---

## MVP — Should Have

- Topic analysis.
- AI summary.
- View AI analysis.
- Survey dashboard.

**Requirements:**

- REQ-014
- REQ-015
- REQ-016
- REQ-017

---

# 21. Assumptions

Các assumption dưới đây chỉ phục vụ prototype hoặc triển khai MVP khi chưa có thông tin chi tiết hơn từ Discovery.

1. Authentication có thể được mock trong prototype.
2. Survey data có thể sử dụng static data trong prototype.
3. Response data có thể sử dụng sample data trong prototype.
4. AI result có thể được mock trong prototype.
5. AI analysis không được làm thay đổi response và feedback gốc.
6. Chi tiết kỹ thuật của AI model sẽ được xác định trong Technical Design.
7. Chi tiết database sẽ được xác định trong Technical Design.
8. Các chức năng Admin chỉ được triển khai khi có Requirement được xác nhận.

---

# 22. Source References

PRD này được xây dựng dựa trên các Requirement đã xác nhận trong Project Vault.

**Primary Requirements Source:**

[[Functional Requirements]]
[[non-functional-requirements]]
[[vault/02-Requiments/business-rules]]
**Business Rules Source:**

[[vault/02-Requiments/business-rules]]


PRD không được tự ý tạo thêm chức năng ngoài các Requirement đã được xác nhận.