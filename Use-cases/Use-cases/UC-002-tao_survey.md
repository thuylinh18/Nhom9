# UC-002 Tạo survey

## Related Requirements

- `REQ-002` — Tạo survey.

## Related Business Rules

- Chỉ Researcher được phép tạo survey.
- Survey mới được tạo phải bắt đầu ở trạng thái Draft.

## Primary Actor

Researcher.

## Supporting Actor

System.

## Preconditions

1. Researcher đã đăng nhập.
2. Researcher có quyền tạo survey.
3. System đang hoạt động.

## Trigger

Researcher chọn chức năng tạo survey mới.

## Main Flow

1. Researcher truy cập chức năng tạo survey.
2. System hiển thị form tạo survey.
3. Researcher nhập các thông tin cần thiết của survey.
4. Researcher gửi yêu cầu tạo survey.
5. System kiểm tra dữ liệu được nhập.
6. System tạo survey mới.
7. System gán trạng thái ban đầu là Draft.
8. System lưu survey.
9. System thông báo survey đã được tạo thành công.

## Alternative Flows

### AF-01 — Researcher tiếp tục chỉnh sửa survey

1. System tạo survey với trạng thái Draft.
2. Researcher mở survey vừa tạo.
3. Researcher tiếp tục chỉnh sửa thông tin hoặc quản lý question.

## Exception Flows

### EF-01 — Thông tin survey không hợp lệ

1. System phát hiện dữ liệu không hợp lệ hoặc thiếu dữ liệu cần thiết.
2. System không tạo survey hoặc không hoàn tất việc lưu.
3. System hiển thị thông báo lỗi.

### EF-02 — Researcher không có quyền

1. System xác định User không có quyền Researcher.
2. System từ chối thao tác tạo survey.

## Data Requirements

### Confirmed data and controls

- Thông tin cần thiết của survey.
- Researcher tạo survey.
- Survey status.
- Survey ID.

### Undefined data

- Danh sách field cụ thể của survey.
- Quy tắc validation chi tiết.
- Giới hạn số lượng survey.
- Quy tắc đặt tên survey.

## Postconditions

### Success

1. Một survey mới được tạo.
2. Survey được lưu trong System.
3. Survey có trạng thái Draft.
4. Researcher có thể tiếp tục chỉnh sửa survey.

### Failure

1. Survey không được tạo hoặc không được lưu thành công.
2. Không có survey mới ở trạng thái hợp lệ.

## Open Questions

1. Survey cần những trường thông tin bắt buộc nào?
2. Survey title có giới hạn độ dài không?
3. Có cần description cho survey không?
4. Có cần category/topic cho survey không?
5. Có cần validation riêng cho từng field không?
6. Survey Draft có thể bị xóa không?