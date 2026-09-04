# User Stories

## US-001 — Đăng nhập hệ thống

### User Story

**As a** User,  
**I want** đăng nhập vào hệ thống bằng tài khoản hợp lệ,  
**so that** tôi có thể truy cập hệ thống và sử dụng các chức năng phù hợp với role của mình.

### Context

User cần đăng nhập vào hệ thống trước khi sử dụng các chức năng được cung cấp.

### Requirement IDs

- `REQ-001`

### Related Use Case

- `UC-001` — Đăng nhập.

### Related Business Rules

- Chưa có Business Rule được xác nhận.

### Priority

- Not specified.

### Dependencies

- Tài khoản User hợp lệ.
- Hệ thống authentication hoạt động.

### Estimate

- **2 points**

---

## US-002 — Tạo survey

### User Story

**As a** Researcher,  
**I want** tạo một survey mới và nhập các thông tin cần thiết,  
**so that** tôi có thể chuẩn bị survey để thu thập response và feedback.

### Context

Researcher cần tạo survey trước khi thêm question và publish survey.

### Requirement IDs

- `REQ-002`

### Related Use Case

- `UC-002` — Tạo survey.

### Related Business Rules

- Chưa có Business Rule được xác nhận.

### Priority

- Not specified.

### Dependencies

- `US-001` — Đăng nhập hệ thống.
- Researcher đã đăng nhập.
- Database lưu thông tin survey.

### Estimate

- **2 points**

---

## US-003 — Chỉnh sửa survey

### User Story

**As a** Researcher,  
**I want** chỉnh sửa thông tin survey trước khi publish,  
**so that** tôi có thể đảm bảo thông tin survey chính xác trước khi Respondent tham gia.

### Context

Researcher có thể chỉnh sửa thông tin survey trong giai đoạn trước khi survey được publish.

### Requirement IDs

- `REQ-003`

### Related Use Case

- `UC-003` — Chỉnh sửa survey.

### Related Business Rules

- Researcher chỉ được chỉnh sửa survey trước khi publish.

### Priority

- Not specified.

### Dependencies

- `US-001` — Đăng nhập hệ thống.
- `US-002` — Tạo survey.
- Survey đã tồn tại.
- Survey chưa được publish.

### Estimate

- **2 points**

---

## US-004 — Quản lý question

### User Story

**As a** Researcher,  
**I want** thêm, chỉnh sửa và quản lý các question thuộc survey,  
**so that** tôi có thể xây dựng nội dung question cần thiết cho survey.

### Context

Researcher cần quản lý các question thuộc một survey cụ thể để Respondent có thể trả lời.

### Requirement IDs

- `REQ-004`

### Related Use Case

- `UC-004` — Quản lý question.

### Related Business Rules

- Question phải thuộc một survey cụ thể.

### Priority

- Not specified.

### Dependencies

- `US-001` — Đăng nhập hệ thống.
- `US-002` — Tạo survey.
- Survey đã tồn tại.

### Estimate

- **3 points**

---

## US-005 — Publish survey

### User Story

**As a** Researcher,  
**I want** publish một survey đã được chuẩn bị,  
**so that** Respondent có thể truy cập và tham gia survey.

### Context

Survey cần được publish để Respondent có thể xem và trả lời.

### Requirement IDs

- `REQ-005`

### Related Use Case

- `UC-005` — Publish survey.

### Related Business Rules

- Survey có trạng thái Published có thể được Respondent truy cập và tham gia.

### Priority

- Not specified.

### Dependencies

- `US-002` — Tạo survey.
- `US-004` — Quản lý question.
- Researcher đã đăng nhập.

### Estimate

- **2 points**

---

## US-006 — Close survey

### User Story

**As a** Researcher,  
**I want** close một survey đang hoạt động,  
**so that** hệ thống ngừng tiếp nhận response mới.

### Context

Researcher có thể close survey khi không muốn tiếp tục nhận response.

### Requirement IDs

- `REQ-006`

### Related Use Case

- `UC-006` — Close survey.

### Related Business Rules

- Survey đã Closed không tiếp nhận response mới.

### Priority

- Not specified.

### Dependencies

- `US-005` — Publish survey.
- Survey đang hoạt động.
- Researcher đã đăng nhập.

### Estimate

- **1 point**

---

## US-007 — Xem survey

### User Story

**As a** Respondent,  
**I want** xem các survey có trạng thái Published,  
**so that** tôi có thể lựa chọn survey để tham gia.

### Context

Respondent cần xem danh sách các survey đang Published để lựa chọn survey muốn tham gia.

### Requirement IDs

- `REQ-007`

### Related Use Case

- `UC-007` — Xem survey.

### Related Business Rules

- Respondent chỉ có thể truy cập survey có trạng thái Published.

### Priority

- Not specified.

### Dependencies

- `US-005` — Publish survey.
- Có survey ở trạng thái Published.
- Respondent có thể truy cập hệ thống.

### Estimate

- **2 points**

---

## US-008 — Trả lời survey

### User Story

**As a** Respondent,  
**I want** trả lời các question trong survey đã Published,  
**so that** tôi có thể cung cấp response và feedback của mình.

### Context

Respondent thực hiện survey bằng cách trả lời các question do Researcher tạo.

### Requirement IDs

- `REQ-008`

### Related Use Case

- `UC-008` — Trả lời survey.

### Related Business Rules

- Respondent có thể trả lời survey có trạng thái Published.

### Priority

- Not specified.

### Dependencies

- `US-007` — Xem survey.
- Survey Published.
- Các question của survey đã được tạo.

### Estimate

- **2 points**

---

## US-009 — Submit response

### User Story

**As a** Respondent,  
**I want** submit response sau khi hoàn thành survey,  
**so that** câu trả lời và feedback của tôi được gửi đến hệ thống.

### Context

Respondent submit survey sau khi hoàn thành các question bắt buộc.

### Requirement IDs

- `REQ-009`

### Related Use Case

- `UC-009` — Submit response.

### Related Business Rules

- Respondent phải hoàn thành các question bắt buộc trước khi submit response.

### Priority

- Not specified.

### Dependencies

- `US-008` — Trả lời survey.
- Các question bắt buộc đã được hoàn thành.
- Survey vẫn đang nhận response.

### Estimate

- **2 points**

---

## US-010 — Lưu response và feedback

### User Story

**As a** System,  
**I want** lưu response và feedback do Respondent gửi,  
**so that** dữ liệu có thể được sử dụng cho việc tổng hợp và phân tích.

### Context

Sau khi Respondent submit response, System cần lưu response và feedback để sử dụng cho các chức năng tiếp theo.

### Requirement IDs

- `REQ-010`

### Related Use Case

- `UC-010` — Lưu response và feedback.

### Related Business Rules

- System phải lưu response và feedback của Respondent để phục vụ aggregation và analysis.

### Priority

- Not specified.

### Dependencies

- `US-009` — Submit response.
- Database.
- Response và feedback hợp lệ.

### Estimate

- **2 points**

---

## US-011 — Xem kết quả survey

### User Story

**As a** Manager,  
**I want** xem kết quả tổng hợp của survey,  
**so that** tôi có thể đánh giá kết quả từ các response của Respondent.

### Context

Manager cần xem kết quả tổng hợp sau khi Respondent đã gửi response.

### Requirement IDs

- `REQ-011`

### Related Use Case

- `UC-011` — Xem kết quả survey.

### Related Business Rules

- Manager có thể xem kết quả tổng hợp của survey sau khi có response.

### Priority

- Not specified.

### Dependencies

- `US-010` — Lưu response và feedback.
- Response đã được lưu.
- Manager đã đăng nhập.

### Estimate

- **2 points**

---

## US-012 — Xem feedback

### User Story

**As a** Manager,  
**I want** xem feedback do Respondent gửi,  
**so that** tôi có thể đánh giá và phân tích ý kiến của Respondent.

### Context

Manager cần xem feedback đã được lưu để hiểu các ý kiến được Respondent gửi.

### Requirement IDs

- `REQ-012`

### Related Use Case

- `UC-012` — Xem feedback.

### Related Business Rules

- Manager có thể xem feedback được gửi bởi Respondent.

### Priority

- Not specified.

### Dependencies

- `US-010` — Lưu response và feedback.
- Feedback đã được lưu.
- Manager đã đăng nhập.

### Estimate

- **2 points**

---

## US-013 — Phân tích feedback bằng AI

### User Story

**As a** System,  
**I want** phân tích feedback bằng AI theo sentiment, topic và summary,  
**so that** tôi có thể cung cấp thông tin phân tích hữu ích cho Manager.

### Context

System sử dụng AI để phân tích feedback đã được lưu và tạo ra các kết quả phân tích.

### Requirement IDs

- `REQ-013` — Phân tích sentiment.
- `REQ-014` — Phân tích topic.
- `REQ-015` — Tạo AI summary.

### Related Use Case

- `UC-013` — Phân tích AI.

### Related Business Rules

- System sử dụng AI để phân tích feedback.
- Kết quả phân tích bao gồm sentiment, topic và summary.

### Priority

- Not specified.

### Dependencies

- `US-010` — Lưu response và feedback.
- Feedback đã được lưu.
- AI Service.
- Feedback có dữ liệu hợp lệ.

### Estimate

- **3 points**

### Split Proposal

Story này có nhiều giá trị độc lập nên có thể tách thành:

- `US-013A` — Phân tích sentiment.
- `US-013B` — Phân tích topic.
- `US-013C` — Tạo AI summary.

Chưa tạo task cho các story này cho đến khi danh sách User Story được duyệt.

---

## US-014 — Xem kết quả phân tích AI

### User Story

**As a** Manager,  
**I want** xem kết quả phân tích AI của feedback,  
**so that** tôi có thể hiểu sentiment, topic và summary từ feedback của Respondent.

### Context

Manager sử dụng kết quả phân tích AI để hỗ trợ việc đánh giá và hiểu feedback.

### Requirement IDs

- `REQ-016`

### Related Use Case

- `UC-014` — Xem kết quả phân tích AI.

### Related Business Rules

- Kết quả AI bao gồm sentiment, topic và summary.

### Priority

- Not specified.

### Dependencies

- `US-013` — Phân tích feedback bằng AI.
- Kết quả AI đã được tạo.
- Manager đã đăng nhập.

### Estimate

- **2 points**

---

## US-015 — Xem Survey Dashboard

### User Story

**As a** Manager,  
**I want** xem Survey Dashboard tổng quan,  
**so that** tôi có thể nhanh chóng theo dõi kết quả survey và feedback analysis.

### Context

Survey Dashboard cung cấp cho Manager cái nhìn tổng quan về survey results và feedback analysis.

### Requirement IDs

- `REQ-017`

### Related Use Case

- `UC-015` — Xem Survey Dashboard.

### Related Business Rules

- Manager có thể xem tổng quan về survey results và feedback analysis.

### Priority

- Not specified.

### Dependencies

- `US-011` — Xem kết quả survey.
- `US-012` — Xem feedback.
- `US-013` — Phân tích feedback bằng AI.
- Manager đã đăng nhập.

### Estimate

- **3 points**