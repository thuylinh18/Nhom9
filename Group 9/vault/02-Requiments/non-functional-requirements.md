# Non-functional Requirements

Tài liệu này mô tả các yêu cầu phi chức năng của hệ thống AI Customer Feedback & Survey Platform. Các yêu cầu được xây dựng dựa trên Project Charter, Problem Statement, Project Goal và các quyết định đã được xác nhận trong quá trình phân tích yêu cầu.

---

## NFR-001 — Bảo mật và phân quyền

- **ID:** NFR-001

- **Name:** Bảo mật và phân quyền

- **Description:** Hệ thống phải kiểm soát quyền truy cập dựa trên vai trò của người dùng. Researcher chỉ được quản lý survey của mình; Respondent chỉ được tham gia survey được phép; Manager chỉ được xem kết quả và feedback thuộc phạm vi được cấp quyền; Admin được quản lý tài khoản và các chức năng quản trị hệ thống.

- **Actor:** Researcher; Respondent; Manager; Admin

- **Priority:** Must

- **Source:** Project Charter; Stakeholders & Personas; Requirements

- **Status:** CONFIRMED

---

## NFR-002 — Bảo vệ dữ liệu feedback và response

- **ID:** NFR-002

- **Name:** Bảo vệ dữ liệu

- **Description:** Hệ thống phải bảo vệ dữ liệu survey, câu trả lời và feedback của Respondent khỏi truy cập trái phép. Chỉ những người dùng có quyền tương ứng mới được xem, quản lý hoặc phân tích dữ liệu.

- **Actor:** System

- **Priority:** Must

- **Source:** Problem Statement; Project Charter; Requirements

- **Status:** CONFIRMED

---

## NFR-003 — Hiệu năng phản hồi

- **ID:** NFR-003

- **Name:** Hiệu năng phản hồi

- **Description:** Các thao tác thông thường của hệ thống như đăng nhập, xem survey, xem danh sách survey, gửi response và xem kết quả phải có thời gian phản hồi phù hợp để người dùng có thể sử dụng hệ thống mà không bị gián đoạn đáng kể. Các tác vụ AI có thời gian xử lý riêng và phải thông báo trạng thái đang xử lý cho người dùng khi cần.

- **Actor:** Researcher; Respondent; Manager; Admin

- **Priority:** Should

- **Source:** Project Charter; Non-functional Requirements

- **Status:** CONFIRMED

---

## NFR-004 — Tính sẵn sàng và ổn định

- **ID:** NFR-004

- **Name:** Tính sẵn sàng và ổn định

- **Description:** Hệ thống phải duy trì hoạt động ổn định trong thời gian sử dụng và hạn chế lỗi làm mất dữ liệu survey, response hoặc feedback. Khi xảy ra lỗi trong quá trình xử lý, hệ thống phải thông báo trạng thái phù hợp và không làm mất dữ liệu đã được lưu thành công.

- **Actor:** System

- **Priority:** Must

- **Source:** Project Charter; Requirements

- **Status:** CONFIRMED

---

## NFR-005 — Tính toàn vẹn dữ liệu

- **ID:** NFR-005

- **Name:** Tính toàn vẹn dữ liệu

- **Description:** Hệ thống phải đảm bảo dữ liệu survey, question, response và feedback được lưu trữ nhất quán. Response chỉ được ghi nhận cho survey hợp lệ và kết quả survey phải được tính toán từ dữ liệu response đã được lưu.

- **Actor:** System

- **Priority:** Must

- **Source:** Project Charter; Functional Requirements; Business Rules

- **Status:** CONFIRMED

---

## NFR-006 — Khả năng sử dụng

- **ID:** NFR-006

- **Name:** Khả năng sử dụng

- **Description:** Giao diện phải cho phép Researcher tạo và quản lý survey, Respondent thực hiện survey và gửi response, Manager xem kết quả và feedback một cách rõ ràng. Các trạng thái quan trọng như loading, success, error và empty state phải được thể hiện rõ ràng.

- **Actor:** Researcher; Respondent; Manager; Admin

- **Priority:** Must

- **Source:** Stakeholders & Personas; User Research; Project Charter

- **Status:** CONFIRMED

---

## NFR-007 — Tính nhất quán của kết quả AI

- **ID:** NFR-007

- **Name:** Tính nhất quán của kết quả AI

- **Description:** Kết quả phân tích sentiment, topic và summary phải được tạo từ nội dung feedback thực tế được lưu trong hệ thống. Hệ thống không được tự tạo feedback hoặc sử dụng dữ liệu không thuộc survey đang được phân tích. Kết quả AI phải được lưu hoặc truy xuất cùng với dữ liệu đầu vào để có thể kiểm tra lại.

- **Actor:** System

- **Priority:** Must

- **Source:** Project Goal; AI Feature Requirements

- **Status:** CONFIRMED

---

## NFR-008 — Khả năng xử lý lỗi AI

- **ID:** NFR-008

- **Name:** Xử lý lỗi AI

- **Description:** Khi dịch vụ AI không phản hồi, trả về kết quả không hợp lệ hoặc xảy ra lỗi trong quá trình phân tích, hệ thống phải xử lý lỗi một cách an toàn, thông báo cho người dùng và không làm mất dữ liệu feedback hoặc response đã được lưu.

- **Actor:** System

- **Priority:** Must

- **Source:** Project Goal; AI Feature Requirements; Technical Constraints

- **Status:** CONFIRMED

---

## NFR-009 — Khả năng mở rộng

- **ID:** NFR-009

- **Name:** Khả năng mở rộng

- **Description:** Kiến trúc hệ thống phải cho phép mở rộng số lượng survey, question, response và feedback mà không yêu cầu thay đổi lớn đối với các chức năng cốt lõi. Các chức năng AI phải được tổ chức tách biệt ở mức service/module để có thể thay đổi hoặc nâng cấp model AI trong tương lai.

- **Actor:** System

- **Priority:** Should

- **Source:** Project Charter; Technical Constraints

- **Status:** CONFIRMED

---

## NFR-010 — Khả năng truy vết

- **ID:** NFR-010

- **Name:** Khả năng truy vết

- **Description:** Các dữ liệu và chức năng quan trọng của hệ thống phải có khả năng truy vết từ yêu cầu đến chức năng tương ứng. Các thay đổi quan trọng đối với requirement, business rule hoặc quyết định thiết kế phải được ghi nhận để nhóm có thể kiểm tra lại nguồn và lý do thay đổi.

- **Actor:** System; Project Team

- **Priority:** Should

- **Source:** Project Requirements; Project Vault; Decision Log

- **Status:** CONFIRMED