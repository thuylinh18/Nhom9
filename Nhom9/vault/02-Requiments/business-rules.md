# Business Rules

Business Rules mô tả các quy tắc nghiệp vụ mà hệ thống AI Customer Feedback & Survey Platform phải tuân thủ trong quá trình tạo Survey, Publish Survey, thu thập Response, lưu Feedback và thực hiện AI Analysis.

Các Business Rules này được sử dụng làm cơ sở cho:
- Thiết kế Database và các constraint liên quan.
- Thiết kế API và validation ở Backend.
- Thiết kế Authorization theo Role.
- Xây dựng User Story và Use Case.
- Viết Test Case và kiểm thử failure path.
- Truy vết từ Requirement → Business Rule → Use Case → Code → Test.

---

## BR-001 — Chỉ Published Survey mới cho phép Respondent xem và tham gia

| Thuộc tính            | Chi tiết                                                                                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID**                | BR-001                                                                                                                                                                                       |
| **Tên Rule**          | Chỉ Published Survey mới cho phép Respondent xem và tham gia                                                                                                                                 |
| **Đối tượng áp dụng** | Respondent, Survey                                                                                                                                                                           |
| **Điều kiện**         | Survey phải tồn tại trong hệ thống và có trạng thái `Published`. User thực hiện thao tác phải có role `Respondent`.                                                                          |
| **Quy tắc**           | Respondent chỉ được phép xem nội dung Survey, xem các Question và thực hiện trả lời khi Survey đang ở trạng thái `Published`.                                                                |
| **Trường hợp Draft**  | Nếu Survey đang ở trạng thái `Draft`, Respondent không được phép xem Survey để tham gia hoặc thực hiện trả lời.                                                                              |
| **Trường hợp Closed** | Nếu Survey đang ở trạng thái `Closed`, Respondent không được phép tham gia hoặc gửi Response mới.                                                                                            |
| **Backend**           | Backend phải kiểm tra trạng thái Survey trước khi trả dữ liệu Survey hoặc xử lý các thao tác liên quan đến việc trả lời. Không được chỉ dựa vào việc ẩn Survey hoặc ẩn button trên Frontend. |
| **Kết quả mong đợi**  | `Published` → Respondent được phép xem và tham gia. `Draft/Closed` → Respondent bị từ chối tham gia.                                                                                         |
| **Liên quan**         | REQ-007, REQ-008, UC-007, UC-008                                                                                                                                                             |

---

## BR-002 — Survey ở trạng thái Closed không nhận Response mới

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-002 |
| **Tên Rule** | Survey ở trạng thái Closed không nhận Response mới |
| **Đối tượng áp dụng** | Respondent, Survey, Response |
| **Điều kiện** | Survey tồn tại và đang có trạng thái `Closed`. Respondent thực hiện thao tác Submit Response. |
| **Quy tắc** | Khi Survey đã chuyển sang `Closed`, hệ thống phải ngừng tiếp nhận Response mới đối với Survey đó. |
| **Khi Submit** | Backend phải kiểm tra trạng thái Survey tại thời điểm Respondent Submit Response. |
| **Nếu Closed** | Hệ thống phải từ chối Request và không tạo Response mới cho Survey. |
| **Frontend** | Frontend có thể hiển thị thông báo Survey đã đóng để người dùng hiểu lý do không thể gửi, nhưng việc kiểm tra cuối cùng phải được thực hiện ở Backend. |
| **Dữ liệu** | Không được tạo hoặc lưu một Response mới nếu Survey đã `Closed`. |
| **Kết quả mong đợi** | Survey `Published` có thể nhận Response; Survey `Closed` không được nhận Response mới. |
| **Liên quan** | REQ-006, REQ-009, UC-006, UC-009 |

---

## BR-003 — Mỗi Response phải thuộc về một Survey cụ thể

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-003 |
| **Tên Rule** | Mỗi Response phải thuộc về một Survey cụ thể |
| **Đối tượng áp dụng** | Response, Survey |
| **Điều kiện** | Respondent thực hiện Submit một Survey và hệ thống chuẩn bị tạo Response. |
| **Quy tắc** | Mỗi Response được tạo phải xác định rõ Survey mà Respondent đã thực hiện trả lời. |
| **Database** | Response phải có quan hệ rõ ràng với Survey tương ứng thông qua khóa tham chiếu phù hợp. |
| **Validation** | Survey được Response tham chiếu phải tồn tại trong hệ thống. Không được tạo Response nếu không xác định được Survey tương ứng. |
| **Không hợp lệ** | Response không có Survey hoặc tham chiếu đến Survey không tồn tại phải bị từ chối. |
| **Kết quả mong đợi** | Từ một Response có thể xác định chính xác Response đó thuộc Survey nào. |
| **Liên quan** | REQ-009, REQ-010, UC-009, UC-010 |

---

## BR-004 — Respondent chỉ có thể Submit Response cho Survey đang ở trạng thái Published

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-004 |
| **Tên Rule** | Respondent chỉ có thể Submit Response cho Published Survey |
| **Đối tượng áp dụng** | Respondent, Survey, Response |
| **Điều kiện** | Respondent đã trả lời Survey và thực hiện thao tác Submit Response. |
| **Quy tắc** | Tại thời điểm Submit, Survey phải tồn tại và có trạng thái `Published`. |
| **Published** | Nếu Survey đang `Published`, hệ thống được phép tiếp tục validation dữ liệu và xử lý lưu Response. |
| **Draft** | Nếu Survey đang `Draft`, hệ thống phải từ chối Submit Response. |
| **Closed** | Nếu Survey đang `Closed`, hệ thống phải từ chối Submit Response. |
| **Backend** | Kiểm tra trạng thái Survey phải được thực hiện ở Backend trước khi tạo Response. |
| **Kết quả mong đợi** | Chỉ Request Submit đối với Survey `Published` mới được tiếp tục xử lý. |
| **Liên quan** | REQ-008, REQ-009, UC-008, UC-009 |

---

## BR-005 — Response và Feedback phải được lưu trữ sau khi Respondent Submit Survey

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-005 |
| **Tên Rule** | Response và Feedback phải được lưu sau khi Submit |
| **Đối tượng áp dụng** | Respondent, Response, Feedback, System |
| **Điều kiện** | Respondent đã hoàn thành các Question cần thiết và Submit Survey với dữ liệu hợp lệ. |
| **Quy tắc** | Sau khi Submit thành công, hệ thống phải lưu dữ liệu Response và Feedback được Respondent cung cấp. |
| **Response** | Các Answer của Respondent phải được lưu và liên kết với Survey tương ứng. |
| **Feedback** | Feedback dạng văn bản được Respondent cung cấp phải được lưu trong hệ thống để phục vụ việc xem và phân tích. |
| **Mục đích lưu trữ** | Dữ liệu được lưu phải có thể được sử dụng cho việc tổng hợp Survey Results, xem Feedback và thực hiện AI Analysis. |
| **Lỗi lưu dữ liệu** | Nếu hệ thống không lưu thành công dữ liệu, hệ thống không được xác nhận Submit thành công như thể Response đã được lưu. |
| **Kết quả mong đợi** | Sau Submit thành công, Response và Feedback tương ứng tồn tại trong hệ thống và có thể được truy xuất cho các chức năng tiếp theo. |
| **Liên quan** | REQ-009, REQ-010, UC-009, UC-010 |

---

## BR-006 — Feedback dạng văn bản có thể được AI phân tích Sentiment

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-006 |
| **Tên Rule** | Feedback dạng văn bản có thể được AI phân tích Sentiment |
| **Đối tượng áp dụng** | Feedback, AI Analysis |
| **Điều kiện** | Feedback dạng văn bản đã được Respondent gửi và được hệ thống lưu trữ. |
| **Quy tắc** | Hệ thống có thể sử dụng nội dung Feedback đã lưu làm dữ liệu đầu vào cho AI Sentiment Analysis. |
| **Input** | Nội dung Feedback dạng văn bản đã được hệ thống lưu trữ. |
| **AI Processing** | AI phân tích nội dung Feedback để xác định sentiment hoặc xu hướng cảm xúc của Feedback. |
| **Output** | Hệ thống nhận được kết quả Sentiment Analysis theo cấu trúc được định nghĩa trong AI Feature Specification. |
| **Dữ liệu gốc** | Kết quả Sentiment không được dùng để thay thế hoặc ghi đè nội dung Feedback gốc. |
| **Kết quả mong đợi** | Feedback hợp lệ có thể được đưa vào AI Analysis và tạo ra kết quả Sentiment phục vụ Manager. |
| **Liên quan** | REQ-013, UC-013 |

---

## BR-007 — Feedback dạng văn bản có thể được AI phân tích Topic

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-007 |
| **Tên Rule** | Feedback dạng văn bản có thể được AI phân tích Topic |
| **Đối tượng áp dụng** | Feedback, AI Analysis |
| **Điều kiện** | Feedback dạng văn bản đã được hệ thống lưu trữ. |
| **Quy tắc** | Hệ thống có thể sử dụng nội dung Feedback đã lưu làm dữ liệu đầu vào cho AI Topic Analysis. |
| **Input** | Nội dung Feedback của Respondent đã được lưu trữ trong hệ thống. |
| **AI Processing** | AI xác định các Topic hoặc chủ đề chính được đề cập trong Feedback. |
| **Output** | Hệ thống nhận được danh sách hoặc kết quả Topic theo cấu trúc được định nghĩa trong AI Feature Specification. |
| **Dữ liệu gốc** | Topic do AI tạo ra chỉ là kết quả phân tích và không được thay đổi Feedback gốc. |
| **Kết quả mong đợi** | Manager có thể sử dụng Topic Analysis để nhận biết các chủ đề hoặc vấn đề thường xuất hiện trong Feedback. |
| **Liên quan** | REQ-014, UC-013 |

---

## BR-008 — AI có thể tạo Summary dựa trên dữ liệu Feedback đã thu thập

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-008 |
| **Tên Rule** | AI có thể tạo Summary từ Feedback đã thu thập |
| **Đối tượng áp dụng** | Feedback, AI Analysis, Manager |
| **Điều kiện** | Hệ thống đã thu thập và lưu trữ Feedback từ Respondent. |
| **Quy tắc** | Hệ thống có thể sử dụng dữ liệu Feedback đã lưu để AI tạo Summary nhằm hỗ trợ Manager hiểu các ý kiến và vấn đề chính. |
| **Input** | Các Feedback đã được hệ thống thu thập và lưu trữ. |
| **AI Processing** | AI tổng hợp các nội dung chính từ Feedback được cung cấp làm input. |
| **Output** | Hệ thống tạo ra Summary phản ánh các nội dung chính được phát hiện từ tập Feedback. |
| **Mục đích** | Summary giúp Manager nhanh chóng nắm được các vấn đề, ý kiến hoặc xu hướng chính trong Feedback. |
| **Giới hạn** | Summary là kết quả hỗ trợ phân tích và không được thay thế Feedback gốc của Respondent. |
| **Kết quả mong đợi** | Manager có thể xem Summary cùng với dữ liệu phân tích để hỗ trợ việc đánh giá Feedback. |
| **Liên quan** | REQ-015, UC-013 |

---

## BR-009 — Kết quả AI Analysis chỉ có vai trò hỗ trợ và không thay thế Response hoặc Feedback gốc

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-009 |
| **Tên Rule** | AI Analysis không thay thế dữ liệu gốc |
| **Đối tượng áp dụng** | Response, Feedback, AI Analysis |
| **Điều kiện** | Hệ thống đã có Response/Feedback và AI đã tạo kết quả phân tích. |
| **Quy tắc** | Sentiment, Topic và Summary do AI tạo ra chỉ được xem là kết quả phân tích hỗ trợ. |
| **Response gốc** | Response của Respondent phải được giữ nguyên sau khi AI Analysis được thực hiện. |
| **Feedback gốc** | Nội dung Feedback của Respondent phải được giữ nguyên sau khi AI Analysis được thực hiện. |
| **AI Result** | Kết quả AI được lưu hoặc hiển thị như dữ liệu phân tích bổ sung cho dữ liệu gốc. |
| **Khi AI sai** | Nếu kết quả AI không chính xác, việc xử lý kết quả AI không được làm thay đổi dữ liệu Response hoặc Feedback gốc. |
| **Kết quả mong đợi** | Người dùng có thể phân biệt được dữ liệu gốc của Respondent và kết quả do AI tạo ra. |
| **Liên quan** | REQ-010, REQ-013, REQ-014, REQ-015, REQ-016, UC-010, UC-013, UC-014 |

---

## BR-010 — Chỉ Researcher có quyền tạo, chỉnh sửa, Publish và Close Survey

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-010 |
| **Tên Rule** | Researcher là Role được phép quản lý Survey |
| **Đối tượng áp dụng** | Researcher, Respondent, Manager, Survey |
| **Điều kiện** | User phải đăng nhập và hệ thống xác định được Role của User. |
| **Quy tắc** | Chỉ User có role `Researcher` được phép thực hiện các thao tác quản lý Survey được xác định trong scope. |
| **Create** | Researcher được phép tạo Survey mới. |
| **Edit** | Researcher được phép chỉnh sửa Survey theo điều kiện của hệ thống. |
| **Question** | Researcher được phép thêm, chỉnh sửa và quản lý Question thuộc Survey. |
| **Publish** | Researcher được phép Publish Survey khi Survey đáp ứng các điều kiện Publish. |
| **Close** | Researcher được phép Close Survey đang hoạt động. |
| **Respondent** | Respondent không được phép thực hiện các thao tác quản lý Survey trên. |
| **Manager** | Manager không được mặc định thực hiện các thao tác quản lý Survey trên nếu không có quyền được xác nhận trong requirement. |
| **Backend** | Backend phải kiểm tra Role/Authorization trước khi xử lý Request. Việc chỉ ẩn chức năng trên Frontend không được xem là đủ. |
| **Kết quả mong đợi** | Chỉ Researcher có quyền thực hiện các thao tác quản lý Survey được quy định. |
| **Liên quan** | REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, UC-002, UC-003, UC-004, UC-005, UC-006 |

---

## BR-011 — Chỉ Manager có quyền xem Survey Results, Feedback và AI Analysis

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-011 |
| **Tên Rule** | Manager là Role được phép xem dữ liệu kết quả và phân tích |
| **Đối tượng áp dụng** | Manager, Survey Results, Feedback, AI Analysis |
| **Điều kiện** | User đã đăng nhập và có role `Manager`. |
| **Survey Results** | Manager được phép xem kết quả tổng hợp của Survey sau khi Response đã được thu thập. |
| **Feedback** | Manager được phép xem Feedback được Respondent gửi để phục vụ đánh giá và phân tích. |
| **AI Analysis** | Manager được phép xem các kết quả Sentiment, Topic và Summary do AI tạo ra. |
| **Dashboard** | Manager được phép xem Survey Dashboard theo phạm vi chức năng đã xác định. |
| **Respondent** | Respondent không được phép truy cập các chức năng xem kết quả quản lý và AI Analysis. |
| **Authorization** | Backend phải kiểm tra Role trước khi trả dữ liệu Results, Feedback và AI Analysis. |
| **Kết quả mong đợi** | User có role `Manager` được phép truy cập; User không có quyền phù hợp bị từ chối. |
| **Liên quan** | REQ-011, REQ-012, REQ-016, REQ-017, UC-011, UC-012, UC-014, UC-015 |

---

## BR-012 — Survey phải có Question trước khi được Publish

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-012 |
| **Tên Rule** | Survey phải có Question trước khi Publish |
| **Đối tượng áp dụng** | Researcher, Survey, Question |
| **Điều kiện** | Researcher thực hiện thao tác Publish một Survey. |
| **Kiểm tra** | Hệ thống phải kiểm tra Survey đã có Question thuộc Survey đó hay chưa trước khi chuyển Survey sang `Published`. |
| **Có Question** | Nếu Survey đã có Question, hệ thống có thể tiếp tục kiểm tra các điều kiện Publish khác và thực hiện Publish nếu hợp lệ. |
| **Không có Question** | Nếu Survey chưa có Question, hệ thống phải từ chối thao tác Publish. |
| **Thông báo** | Hệ thống phải cung cấp thông tin để Researcher biết Survey cần được thêm Question trước khi Publish. |
| **Backend** | Kiểm tra phải được thực hiện ở Backend trước khi thay đổi trạng thái Survey. |
| **Kết quả mong đợi** | Không thể Publish một Survey không có Question. |
| **Liên quan** | REQ-004, REQ-005, UC-004, UC-005 |

---

## BR-013 — Response đã Submit phải gắn với các Question thuộc Survey tương ứng

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-013 |
| **Tên Rule** | Answer trong Response phải thuộc Question của Survey tương ứng |
| **Đối tượng áp dụng** | Response, Survey, Question, Answer |
| **Điều kiện** | Respondent Submit Response chứa các Answer cho các Question của Survey. |
| **Quy tắc** | Mỗi Answer được lưu trong Response phải tham chiếu đến Question thuộc chính Survey mà Respondent đang trả lời. |
| **Validation** | Backend phải kiểm tra Question tồn tại và Question đó thuộc đúng Survey của Response. |
| **Dữ liệu hợp lệ** | Question thuộc Survey hiện tại → Answer được phép tiếp tục xử lý. |
| **Dữ liệu không hợp lệ** | Question thuộc Survey khác hoặc không tồn tại → Answer phải bị từ chối và không được lưu vào Response hiện tại. |
| **Database** | Quan hệ giữa Survey, Question và Response/Answer phải được thiết kế để hạn chế dữ liệu không hợp lệ. |
| **Kết quả mong đợi** | Một Response của Survey A chỉ chứa Answer cho các Question thuộc Survey A. |
| **Liên quan** | REQ-008, REQ-009, REQ-010, UC-008, UC-009, UC-010 |

---

## BR-014 — AI chỉ được phân tích Feedback đã được hệ thống lưu trữ

| Thuộc tính | Chi tiết |
|---|---|
| **ID** | BR-014 |
| **Tên Rule** | AI chỉ phân tích Feedback đã lưu |
| **Đối tượng áp dụng** | Feedback, AI Analysis |
| **Điều kiện** | Hệ thống thực hiện Sentiment Analysis, Topic Analysis hoặc Summary. |
| **Kiểm tra trước AI** | Hệ thống phải xác nhận Feedback tồn tại và đã được lưu trữ thành công trước khi sử dụng Feedback làm input cho AI. |
| **Feedback tồn tại** | Nếu Feedback đã tồn tại trong hệ thống, hệ thống có thể tiếp tục thực hiện AI Analysis. |
| **Feedback chưa lưu** | Nếu Feedback chưa được lưu hoặc không tồn tại, hệ thống không được sử dụng Feedback đó để thực hiện AI Analysis. |
| **Thứ tự xử lý** | Workflow phải đảm bảo dữ liệu được lưu trước khi AI sử dụng dữ liệu đó để phân tích. |
| **Kết quả mong đợi** | Chỉ Feedback đã được hệ thống lưu trữ mới trở thành input hợp lệ cho AI Analysis. |
| **Liên quan** | REQ-010, REQ-013, REQ-014, REQ-015, UC-010, UC-013 |

---

## BR-015 — Response và Feedback gốc không được thay đổi bởi AI Analysis

| Thuộc tính               | Chi tiết                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ID**                   | BR-015                                                                                                                                           |
| **Tên Rule**             | AI Analysis không được thay đổi dữ liệu Response và Feedback gốc                                                                                 |
| **Đối tượng áp dụng**    | Response, Feedback, AI Analysis                                                                                                                  |
| **Điều kiện**            | Response và Feedback đã được lưu trữ; hệ thống thực hiện hoặc cập nhật AI Analysis.                                                              |
| **Quy tắc**              | Kết quả AI phải được xử lý như dữ liệu phân tích bổ sung và không được ghi đè dữ liệu gốc.                                                       |
| **Response**             | Nội dung Response đã Submit phải được giữ nguyên sau khi AI Analysis hoàn thành.                                                                 |
| **Feedback**             | Nội dung Feedback gốc của Respondent phải được giữ nguyên sau khi AI Analysis hoàn thành.                                                        |
| **Sentiment**            | Kết quả Sentiment chỉ được lưu như kết quả AI Analysis, không thay thế Feedback.                                                                 |
| **Topic**                | Kết quả Topic chỉ được lưu như kết quả AI Analysis, không thay thế Feedback.                                                                     |
| **Summary**              | Summary chỉ là nội dung AI tổng hợp, không được dùng để ghi đè Feedback gốc.                                                                     |
| **Khi AI phân tích lại** | Nếu hệ thống chạy lại AI Analysis hoặc cập nhật kết quả AI, chỉ dữ liệu AI Analysis được thay đổi; Response và Feedback gốc vẫn phải giữ nguyên. |
| **Kết quả mong đợi**     | Có thể xem đồng thời dữ liệu gốc của Respondent và kết quả AI Analysis mà không làm mất hoặc thay đổi dữ liệu gốc.                               |
| **Liên quan**            | REQ-010, REQ-013, REQ-014, REQ-015, REQ-016, UC-010, UC-013, UC-014                                                                              |