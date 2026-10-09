# TEST CASES — AI CUSTOMER FEEDBACK & SURVEY PLATFORM

## 1. Thông tin tài liệu

|Thuộc tính|Nội dung|
|---|---|
|Tên dự án|AI Customer Feedback & Survey Platform|
|Tài liệu|Functional Test Cases|
|Phiên bản|1.0|
|Tổng số Test Case|41|
|Tổng số Requirement được kiểm thử|17/17|
|Trạng thái mặc định|Not Run|

---

## 2. Quy ước

### Priority

- **Critical:** Chức năng quan trọng, lỗi có thể làm mất dữ liệu hoặc ngăn luồng chính.
    
- **High:** Chức năng chính của hệ thống.
    
- **Medium:** Chức năng phụ hoặc trường hợp biên.
    

### Type

- **Positive:** Kiểm thử luồng hợp lệ.
    
- **Negative:** Kiểm thử dữ liệu hoặc thao tác không hợp lệ.
    
- **Validation:** Kiểm tra validation dữ liệu đầu vào.
    
- **Boundary:** Kiểm tra trường hợp biên.
    
- **Exception:** Kiểm tra xử lý lỗi hệ thống/dịch vụ.
    
- **Data Integrity:** Kiểm tra tính toàn vẹn dữ liệu.
    
- **Data Consistency:** Kiểm tra tính nhất quán dữ liệu.
    
- **Authorization:** Kiểm tra quyền truy cập theo Role.
    

### Status

- **Not Run:** Chưa thực hiện.
    
- **Pass:** Thực hiện thành công, kết quả thực tế đúng Expected Result.
    
- **Fail:** Kết quả thực tế không đúng Expected Result.
    
- **Blocked:** Không thể thực hiện do có lỗi/phụ thuộc chưa sẵn sàng.
    

---

# 3. Functional Test Cases

|TC ID|Requirement|Use Case|Role|Test Case|Precondition|Test Steps|Test Data|Expected Result|Priority|Type|Status|
|---|---|---|---|---|---|---|---|---|---|---|---|
|TC-001|REQ-001|UC-001|User|Đăng nhập với thông tin hợp lệ|User có tài khoản hợp lệ, đang ở màn hình Login|1. Nhập Email  <br>2. Nhập Password  <br>3. Nhấn Sign in|Email: `researcher@insightflow.com`  <br>Password: hợp lệ|Đăng nhập thành công và chuyển đến màn hình phù hợp với Role|High|Positive|Not Run|
|TC-002|REQ-001|UC-001|User|Đăng nhập với email không tồn tại|Đang ở màn hình Login|1. Nhập email không tồn tại  <br>2. Nhập password  <br>3. Nhấn Sign in|Email: `unknown@example.com`|Đăng nhập thất bại và hiển thị thông báo lỗi|High|Negative|Not Run|
|TC-003|REQ-001|UC-001|User|Đăng nhập với password sai|Email tồn tại|1. Nhập email hợp lệ  <br>2. Nhập password sai  <br>3. Nhấn Sign in|Password sai|Đăng nhập thất bại, không cho truy cập hệ thống|High|Negative|Not Run|
|TC-004|REQ-001|UC-001|User|Đăng nhập khi bỏ trống Email|Đang ở màn hình Login|1. Để trống Email  <br>2. Nhập Password  <br>3. Nhấn Sign in|Email: trống|Hiển thị yêu cầu nhập Email, không đăng nhập|Medium|Validation|Not Run|
|TC-005|REQ-001|UC-001|User|Đăng nhập khi bỏ trống Password|Đang ở màn hình Login|1. Nhập Email  <br>2. Để trống Password  <br>3. Nhấn Sign in|Password: trống|Hiển thị yêu cầu nhập Password, không đăng nhập|Medium|Validation|Not Run|
|TC-006|REQ-002|UC-002|Researcher|Tạo survey thành công|Researcher đã đăng nhập|1. Mở Create Survey  <br>2. Nhập thông tin  <br>3. Nhấn Create|Title + Description hợp lệ|Survey được tạo thành công và xuất hiện trong danh sách|High|Positive|Not Run|
|TC-007|REQ-002|UC-002|Researcher|Tạo survey thiếu thông tin bắt buộc|Researcher đã đăng nhập|1. Mở Create Survey  <br>2. Bỏ trống trường bắt buộc  <br>3. Nhấn Create|Title: trống|Survey không được tạo và hiển thị validation|High|Negative|Not Run|
|TC-008|REQ-003|UC-003|Researcher|Chỉnh sửa survey trước Publish|Survey tồn tại và chưa Published|1. Mở survey  <br>2. Nhấn Edit  <br>3. Thay đổi thông tin  <br>4. Save|Title mới|Thông tin survey được cập nhật thành công|High|Positive|Not Run|
|TC-009|REQ-003|UC-003|Researcher|Chỉnh sửa survey sau Publish|Survey đang Published|1. Mở Published Survey  <br>2. Kiểm tra Edit|Survey Published|Không cho phép chỉnh sửa survey sau Publish|High|Negative|Not Run|
|TC-010|REQ-004|UC-004|Researcher|Thêm question vào survey|Survey đã tồn tại|1. Mở Question Management  <br>2. Add Question  <br>3. Nhập nội dung  <br>4. Save|Question hợp lệ|Question được tạo và thuộc đúng survey|High|Positive|Not Run|
|TC-011|REQ-004|UC-004|Researcher|Chỉnh sửa question|Survey có question|1. Chọn question  <br>2. Edit  <br>3. Thay đổi nội dung  <br>4. Save|Question mới|Question được cập nhật thành công|High|Positive|Not Run|
|TC-012|REQ-004|UC-004|Researcher|Thêm question không hợp lệ|Survey đã tồn tại|1. Add Question  <br>2. Để trống nội dung  <br>3. Save|Nội dung: trống|Question không được tạo, hiển thị validation|Medium|Negative|Not Run|
|TC-013|REQ-005|UC-005|Researcher|Publish survey thành công|Survey có thông tin và question hợp lệ|1. Mở survey  <br>2. Nhấn Publish  <br>3. Xác nhận|Survey hợp lệ|Survey chuyển sang Published và Respondent có thể truy cập|High|Positive|Not Run|
|TC-014|REQ-005|UC-005|Researcher|Publish survey chưa có question|Survey chưa có question|1. Mở survey  <br>2. Nhấn Publish|Survey không có question|Hệ thống không cho Publish và hiển thị thông báo phù hợp|High|Negative|Not Run|
|TC-015|REQ-006|UC-006|Researcher|Close survey đang hoạt động|Survey Published|1. Mở survey  <br>2. Nhấn Close  <br>3. Xác nhận|Survey Published|Survey chuyển sang Closed và không nhận response mới|High|Positive|Not Run|
|TC-016|REQ-006|UC-006|Respondent|Trả lời survey đã Closed|Survey đã Closed|1. Truy cập survey  <br>2. Thử Submit|Survey Closed|Response mới không được chấp nhận|High|Negative|Not Run|
|TC-017|REQ-007|UC-007|Respondent|Xem danh sách Published Survey|Respondent đã đăng nhập|1. Mở Available Surveys|Có Published Survey|Hiển thị các survey có trạng thái Published|High|Positive|Not Run|
|TC-018|REQ-007|UC-007|Respondent|Xem chi tiết survey|Có Published Survey|1. Mở Available Surveys  <br>2. Nhấn View Survey|Published Survey|Hiển thị Title, Description và Questions|High|Positive|Not Run|
|TC-019|REQ-008|UC-008|Respondent|Trả lời survey thành công|Survey Published|1. Mở survey  <br>2. Trả lời các question  <br>3. Nhập feedback nếu có|Câu trả lời hợp lệ|Các câu trả lời được ghi nhận trên giao diện|High|Positive|Not Run|
|TC-020|REQ-008/009|UC-008/009|Respondent|Bỏ trống required question|Survey Published|1. Mở survey  <br>2. Bỏ trống required question  <br>3. Submit|Required question: trống|Không cho Submit và hiển thị question cần hoàn thành|High|Negative|Not Run|
|TC-021|REQ-009|UC-009|Respondent|Submit response thành công|Survey Published, required questions đã hoàn thành|1. Hoàn thành survey  <br>2. Nhấn Submit  <br>3. Xác nhận|Response hợp lệ|Response được Submit thành công và hiển thị thông báo thành công|Critical|Positive|Not Run|
|TC-022|REQ-009|UC-009|Respondent|Submit response khi survey đã Closed|Survey bị Close trước khi Submit|1. Hoàn thành survey  <br>2. Nhấn Submit|Survey Closed|Response không được chấp nhận|Critical|Negative|Not Run|
|TC-023|REQ-010|UC-010|System|Lưu response và feedback|Respondent đã Submit|1. Submit response  <br>2. Kiểm tra dữ liệu|Response + Feedback hợp lệ|Response và feedback được lưu vào hệ thống|Critical|Positive|Not Run|
|TC-024|REQ-010|UC-010|System|Kiểm tra dữ liệu sau khi Submit|Response đã được lưu|1. Submit response  <br>2. Reload hệ thống  <br>3. Kiểm tra dữ liệu|Response đã Submit|Dữ liệu vẫn tồn tại và chính xác|Critical|Data Integrity|Not Run|
|TC-025|REQ-011|UC-011|Manager|Xem kết quả survey|Survey có response|1. Đăng nhập Manager  <br>2. Mở Survey Results  <br>3. Chọn survey|Survey có response|Hiển thị kết quả tổng hợp của survey|High|Positive|Not Run|
|TC-026|REQ-011|UC-011|Manager|Xem kết quả survey chưa có response|Survey chưa có response|1. Mở Survey Results  <br>2. Chọn survey|0 response|Hiển thị trạng thái Empty, không hiển thị số liệu sai|Medium|Boundary|Not Run|
|TC-027|REQ-012|UC-012|Manager|Xem feedback|Survey có feedback|1. Mở Survey Results  <br>2. Mở Feedback|Feedback hợp lệ|Manager xem được feedback của Respondent|High|Positive|Not Run|
|TC-028|REQ-012|UC-012|Manager|Xem survey chưa có feedback|Survey chưa có feedback|1. Mở Feedback|0 feedback|Hiển thị trạng thái Empty|Medium|Boundary|Not Run|
|TC-029|REQ-013|UC-013|System|AI phân tích sentiment tích cực|Có feedback hợp lệ|1. Trigger AI Analysis  <br>2. Kiểm tra sentiment|`The customer service was very helpful and friendly.`|AI xác định xu hướng sentiment phù hợp và lưu kết quả|High|Positive|Not Run|
|TC-030|REQ-013|UC-013|System|AI phân tích sentiment tiêu cực|Có feedback hợp lệ|1. Trigger AI Analysis  <br>2. Kiểm tra sentiment|`The service was slow and the staff was not helpful.`|AI xác định xu hướng tiêu cực phù hợp và lưu kết quả|High|Positive|Not Run|
|TC-031|REQ-014|UC-013|System|AI phân tích topic|Có feedback hợp lệ|1. Trigger AI Analysis  <br>2. Kiểm tra Topic|`The waiting time was too long and the staff response was slow.`|AI xác định được topic chính liên quan đến feedback|High|Positive|Not Run|
|TC-032|REQ-015|UC-013|System|AI tạo summary|Có nhiều feedback|1. Trigger AI Summary  <br>2. Kiểm tra kết quả|Tập feedback hợp lệ|AI tạo summary phản ánh các vấn đề/ý kiến chính|High|Positive|Not Run|
|TC-033|REQ-013/014/015|UC-013|System|AI xử lý khi không có feedback|Survey không có feedback|1. Trigger AI Analysis|0 feedback|Không tạo kết quả AI sai, hiển thị trạng thái phù hợp|Medium|Boundary|Not Run|
|TC-034|REQ-013/014/015|UC-013|System|AI service không phản hồi|AI service không khả dụng|1. Trigger AI Analysis|AI service unavailable|Hệ thống không crash, hiển thị lỗi và không làm mất dữ liệu|High|Exception|Not Run|
|TC-035|REQ-016|UC-014|Manager|Xem kết quả AI Analysis|Survey đã có kết quả AI|1. Đăng nhập Manager  <br>2. Mở AI Analysis  <br>3. Chọn survey|AI result hợp lệ|Hiển thị Sentiment, Topic và AI Summary|High|Positive|Not Run|
|TC-036|REQ-016|UC-014|Manager|Xem AI Analysis chưa có kết quả|Survey chưa được AI phân tích|1. Mở AI Analysis  <br>2. Chọn survey|Chưa có AI result|Hiển thị Empty/Not analyzed, không hiển thị dữ liệu giả|Medium|Boundary|Not Run|
|TC-037|REQ-017|UC-015|Manager|Xem Survey Dashboard|Manager đã đăng nhập|1. Mở Dashboard|Có survey và response|Dashboard hiển thị overview kết quả và feedback analysis|High|Positive|Not Run|
|TC-038|REQ-017|UC-015|Manager|Dashboard cập nhật khi có response mới|Đã có dữ liệu dashboard|1. Ghi nhận số response  <br>2. Respondent Submit response mới  <br>3. Reload Dashboard|Response mới|Tổng response và dữ liệu tổng hợp được cập nhật|High|Data Consistency|Not Run|
|TC-039|REQ-002→006|UC-002→006|Researcher|Kiểm tra quyền Researcher|Đăng nhập Researcher|1. Mở hệ thống  <br>2. Kiểm tra menu/chức năng|Role: Researcher|Researcher truy cập được Create, Edit, Manage Questions, Publish, Close|High|Authorization|Not Run|
|TC-040|REQ-007→009|UC-007→009|Respondent|Kiểm tra quyền Respondent|Đăng nhập Respondent|1. Mở hệ thống  <br>2. Chọn Available Surveys|Role: Respondent|Respondent có thể View, Answer và Submit Survey|High|Authorization|Not Run|
|TC-041|REQ-011→017|UC-011→015|Manager|Kiểm tra quyền Manager|Đăng nhập Manager|1. Mở Dashboard  <br>2. Survey Results  <br>3. AI Analysis|Role: Manager|Manager có thể xem Survey Results, Feedback, AI Analysis và Dashboard|High|Authorization|Not Run|

---

# 4. Tổng kết Test Case

|Chỉ số|Giá trị|
|---|---|
|Tổng Test Case|41|
|Positive|20|
|Negative|8|
|Validation|2|
|Boundary|4|
|Exception|1|
|Data Integrity|1|
|Data Consistency|1|
|Authorization|3|
|Requirement được cover|17/17|

---

# 5. Test Execution

Sau khi bắt đầu chạy test, bổ sung các cột sau vào bảng Test Case:

|TC ID|Status|Actual Result|Tester|Test Date|Evidence|Bug ID|
|---|---|---|---|---|---|---|
|TC-001|Not Run|-|-|-|-|-|
|TC-002|Not Run|-|-|-|-|-|
|TC-003|Not Run|-|-|-|-|-|

### Quy ước cập nhật

- **Status = Pass:** Actual Result khớp Expected Result.
    
- **Status = Fail:** Actual Result khác Expected Result.
    
- **Status = Blocked:** Không thể thực hiện do dependency hoặc lỗi môi trường.
    
- **Evidence:** Link hoặc tên ảnh/video chứng minh kết quả test.
    
- **Bug ID:** ID của bug trên Taiga/Jira hoặc công cụ quản lý lỗi.
    

---

# 6. Definition of Test Completion

Đợt Functional Testing được xem là hoàn thành khi:

- Tất cả Test Case đã được thực thi.
    
- Các Test Case Critical đã Pass.
    
- Các luồng chính của Researcher đã Pass.
    
- Các luồng chính của Respondent đã Pass.
    
- Các luồng chính của Manager đã Pass.
    
- AI Sentiment Analysis đã được kiểm thử.
    
- AI Topic Analysis đã được kiểm thử.
    
- AI Summary đã được kiểm thử.
    
- Survey Dashboard đã được kiểm thử.
    
- Không còn lỗi Critical/Blocker chưa xử lý.
    
- Evidence đã được đính kèm cho các Test Case đã thực hiện.
    
- Các lỗi Fail đã được ghi nhận và liên kết với Bug ID.
    

---

# 7. Traceability

|Requirement|Test Case|
|---|---|
|REQ-001|TC-001 → TC-005|
|REQ-002|TC-006 → TC-007|
|REQ-003|TC-008 → TC-009|
|REQ-004|TC-010 → TC-012|
|REQ-005|TC-013 → TC-014|
|REQ-006|TC-015 → TC-016|
|REQ-007|TC-017 → TC-018|
|REQ-008|TC-019 → TC-020|
|REQ-009|TC-020 → TC-022|
|REQ-010|TC-023 → TC-024|
|REQ-011|TC-025 → TC-026|
|REQ-012|TC-027 → TC-028|
|REQ-013|TC-029 → TC-030, TC-033 → TC-034|
|REQ-014|TC-031, TC-033 → TC-034|
|REQ-015|TC-032 → TC-034|
|REQ-016|TC-035 → TC-036|
|REQ-017|TC-037 → TC-038|

---

# 8. Liên kết với Use Case

|Use Case|Test Case|
|---|---|
|UC-001 — Đăng nhập|TC-001 → TC-005|
|UC-002 — Tạo survey|TC-006 → TC-007|
|UC-003 — Chỉnh sửa survey|TC-008 → TC-009|
|UC-004 — Quản lý question|TC-010 → TC-012|
|UC-005 — Publish survey|TC-013 → TC-014|
|UC-006 — Close survey|TC-015 → TC-016|
|UC-007 — Xem survey|TC-017 → TC-018|
|UC-008 — Trả lời survey|TC-019 → TC-020|
|UC-009 — Submit response|TC-020 → TC-022|
|UC-010 — Lưu response và feedback|TC-023 → TC-024|
|UC-011 — Xem kết quả survey|TC-025 → TC-026|
|UC-012 — Xem feedback|TC-027 → TC-028|
|UC-013 — Phân tích AI|TC-029 → TC-034|
|UC-014 — Xem kết quả phân tích AI|TC-035 → TC-036|
|UC-015 — Xem Survey Dashboard|TC-037 → TC-038|

---

# 9. Ghi chú

Bộ Test Case này được xây dựng dựa trên **REQ-001 → REQ-017** và các Use Case **UC-001 → UC-015** của dự án.

Các Test Case tập trung vào:

1. Authentication.
    
2. Survey Management.
    
3. Survey Response.
    
4. Survey Results & Feedback.
    
5. AI Analysis.
    
6. Survey Dashboard.
    
7. Authorization theo Role.
    
8. Validation, Boundary và Exception.
    
9. Data Integrity và Data Consistency.
    

Các hành vi chưa được xác nhận trong Requirement không được xem là tiêu chí bắt buộc của Test Case.