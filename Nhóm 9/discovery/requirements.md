# Requirements

## 1. Functional Requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| REQ-001 | User có thể đăng nhập hệ thống | Must | Project Charter |
| REQ-002 | Researcher có thể tạo survey | Must | Project Charter |
| REQ-003 | Researcher có thể chỉnh sửa survey | Must | Project Charter |
| REQ-004 | Researcher có thể thêm question vào survey | Must | Project Charter |
| REQ-005 | Researcher có thể publish survey | Must | Project Charter |
| REQ-006 | Researcher có thể close survey | Must | Project Charter |
| REQ-007 | Respondent có thể xem survey đã publish | Must | Problem Statement |
| REQ-008 | Respondent có thể trả lời survey | Must | Project Charter |
| REQ-009 | Respondent có thể submit response | Must | Project Charter |
| REQ-010 | System có thể lưu response và feedback | Must | Project Charter |
| REQ-011 | Manager có thể xem kết quả survey | Must | Project Charter |
| REQ-012 | Manager có thể xem feedback | Must | Project Charter |
| REQ-013 | System hỗ trợ AI phân tích sentiment của feedback | Must | Project Goal |
| REQ-014 | System hỗ trợ AI phân tích topic của feedback | Should | Project Goal |
| REQ-015 | System hỗ trợ AI tạo summary từ feedback | Should | Project Goal |
| REQ-016 | Manager có thể xem kết quả phân tích AI | Should | Project Goal |
| REQ-017 | Manager có thể xem dashboard kết quả survey | Should | Project Charter |

---

## 2. Non-Functional Requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR-001 | Hệ thống yêu cầu user đăng nhập để sử dụng các chức năng cần xác thực | Must | Project Charter |
| NFR-002 | Hệ thống phải kiểm soát quyền truy cập theo role | Must | Project Charter |
| NFR-003 | Hệ thống phải lưu trữ response và feedback chính xác | Must | Project Goal |
| NFR-004 | Giao diện phải dễ sử dụng đối với Respondent | Should | Problem Statement |
| NFR-005 | Hệ thống phải có khả năng xử lý nhiều response trong phạm vi MVP | Should | Project Constraint |

---

## 3. Business Rules

| ID | Business Rule | Priority | Source |
|---|---|---|---|
| BR-001 | Chỉ survey đã Published mới cho phép Respondent trả lời | Must | Project Charter |
| BR-002 | Survey đã Closed không nhận thêm response | Must | Project Charter |
| BR-003 | Response phải được lưu trước khi hiển thị trong kết quả survey | Must | Project Goal |
| BR-004 | AI chỉ phân tích feedback đã được lưu trong hệ thống | Must | Project Charter |
| BR-005 | AI analysis chỉ có vai trò hỗ trợ, không thay thế dữ liệu response gốc | Must | Project Charter |

---

## 4. Constraints

| ID | Constraint | Source |
|---|---|---|
| CON-001 | Project được xây dựng dưới dạng web application | Project Charter |
| CON-002 | Project tập trung vào MVP và phạm vi đồ án | Project Charter |
| CON-003 | Không training AI model từ đầu | Project Charter |
| CON-004 | Sử dụng AI model/API có sẵn | Project Charter |
| CON-005 | Không sử dụng microservice architecture | Project Charter |
| CON-006 | Công nghệ và phạm vi phải phù hợp với thời gian thực hiện | Project Charter |

---

## 5. Assumptions

| ID | Assumption | Source |
|---|---|---|
| ASM-001 | Project sử dụng AI API/model có sẵn để phân tích feedback | Project Charter |
| ASM-002 | Project sử dụng dữ liệu feedback mẫu để kiểm thử AI | Project Charter |
| ASM-003 | Respondent có thể truy cập survey thông qua web application | Problem Statement |
| ASM-004 | Manager có quyền xem kết quả và feedback của survey được quản lý | Project Charter |

---

## 6. Open Questions

Các câu hỏi chưa được quyết định được quản lý trong file:

[Open Questions](open-questions.md)