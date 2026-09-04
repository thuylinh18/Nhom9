# UC-005 Publish survey

## Related Requirements

- `REQ-005` — Publish survey.

## Related Business Rules

- Chỉ Researcher được phép publish survey.
- Survey được publish để Respondent có thể truy cập và tham gia.

## Primary Actor

Researcher.

## Supporting Actor

System.

## Preconditions

1. Researcher đã đăng nhập.
2. Survey tồn tại.
3. Researcher có quyền publish survey.
4. Survey đang ở trạng thái cho phép publish.

## Trigger

Researcher chọn chức năng Publish Survey.

## Main Flow

1. Researcher mở survey cần publish.
2. Researcher chọn Publish.
3. System kiểm tra survey.
4. System kiểm tra các dữ liệu cần thiết để publish.
5. System thay đổi trạng thái survey thành Published.
6. System lưu trạng thái mới.
7. System cho phép Respondent truy cập survey.
8. System thông báo publish thành công.

## Alternative Flows

### AF-01 — Researcher hủy thao tác publish

1. Researcher chọn Publish.
2. System hiển thị xác nhận publish.
3. Researcher hủy xác nhận.
4. System giữ nguyên trạng thái survey.

## Exception Flows

### EF-01 — Survey chưa đủ dữ liệu

1. System phát hiện survey chưa đủ dữ liệu cần thiết.
2. System không publish survey.
3. System hiển thị thông báo lỗi.

### EF-02 — Survey không tồn tại

1. System không tìm thấy survey.
2. System không thực hiện publish.

### EF-03 — Researcher không có quyền

1. System xác định User không có quyền Researcher.
2. System từ chối thao tác publish.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Survey status.
- Survey information.
- Researcher thực hiện publish.
- Published status.

### Undefined data

- Điều kiện cụ thể để survey được publish.
- Có cần tất cả question trước khi publish không.
- Publish timestamp.
- Public URL hoặc survey identifier.

## Postconditions

### Success

1. Survey chuyển sang trạng thái Published.
2. Respondent có thể truy cập survey.
3. Survey sẵn sàng tiếp nhận response.

### Failure

1. Survey không được publish.
2. Trạng thái survey không thay đổi.

## Open Questions

1. Điều kiện tối thiểu để publish survey là gì?
2. Survey có bắt buộc phải có question không?
3. Có cần confirmation trước khi publish không?
4. Survey có thể unpublish không?
5. Có tạo public link cho survey không?