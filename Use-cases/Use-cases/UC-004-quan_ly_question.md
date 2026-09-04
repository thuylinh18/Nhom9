# UC-004 Quản lý question

## Related Requirements

- `REQ-004` — Thêm question vào survey.

## Related Business Rules

- Researcher quản lý question thuộc survey.
- Question phải thuộc một survey cụ thể.

## Primary Actor

Researcher.

## Supporting Actor

System.

## Preconditions

1. Researcher đã đăng nhập.
2. Researcher có quyền quản lý survey.
3. Survey tồn tại.
4. Survey đang ở trạng thái cho phép quản lý question.

## Trigger

Researcher truy cập phần question của một survey.

## Main Flow

1. Researcher mở một survey.
2. System hiển thị danh sách question hiện tại.
3. Researcher chọn thêm hoặc chỉnh sửa question.
4. Researcher nhập hoặc cập nhật nội dung question.
5. Researcher gửi yêu cầu lưu.
6. System kiểm tra dữ liệu question.
7. System lưu question thuộc survey.
8. System cập nhật danh sách question.
9. System hiển thị kết quả cập nhật.

## Alternative Flows

### AF-01 — Thêm question mới

1. Researcher chọn Add Question.
2. System hiển thị form question.
3. Researcher nhập thông tin question.
4. System kiểm tra dữ liệu.
5. System lưu question vào survey.

### AF-02 — Chỉnh sửa question

1. Researcher chọn một question.
2. System hiển thị thông tin hiện tại.
3. Researcher chỉnh sửa nội dung.
4. System lưu thay đổi.

## Exception Flows

### EF-01 — Question thiếu dữ liệu bắt buộc

1. System phát hiện dữ liệu thiếu.
2. System không lưu question.
3. System hiển thị thông báo lỗi.

### EF-02 — Survey không tồn tại

1. System không tìm thấy survey.
2. System không cho phép quản lý question.

### EF-03 — Dữ liệu question không hợp lệ

1. System phát hiện dữ liệu không hợp lệ.
2. System từ chối thao tác.
3. System hiển thị thông báo lỗi.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Question ID.
- Nội dung question.
- Question thuộc survey.
- Thông tin cần thiết để quản lý question.

### Undefined data

- Các loại question cụ thể.
- Các option của question.
- Quy tắc question bắt buộc/không bắt buộc.
- Giới hạn số lượng question.
- Có cho phép xóa question hay không.

## Postconditions

### Success

1. Question được thêm hoặc cập nhật.
2. Question được liên kết với survey.
3. Danh sách question được cập nhật.

### Failure

1. Question không được lưu.
2. Dữ liệu question hiện tại không bị thay đổi.

## Open Questions

1. Hệ thống hỗ trợ những loại question nào?
2. Question có bắt buộc trả lời không?
3. Có cho phép xóa question không?
4. Có giới hạn số lượng question không?
5. Có cho phép sắp xếp thứ tự question không?
6. Có cho phép question có nhiều lựa chọn không?