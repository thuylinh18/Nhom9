# UC-003 Chỉnh sửa survey

## Related Requirements

- `REQ-003` — Chỉnh sửa survey.

## Related Business Rules

- Researcher chỉ được chỉnh sửa survey trước khi survey được publish.

## Primary Actor

Researcher.

## Supporting Actor

System.

## Preconditions

1. Researcher đã đăng nhập.
2. Researcher có quyền chỉnh sửa survey.
3. Survey tồn tại.
4. Survey chưa được publish.

## Trigger

Researcher chọn một survey chưa publish và thực hiện chỉnh sửa.

## Main Flow

1. Researcher mở survey cần chỉnh sửa.
2. System hiển thị thông tin hiện tại của survey.
3. Researcher thay đổi thông tin survey.
4. Researcher gửi yêu cầu lưu thay đổi.
5. System kiểm tra dữ liệu.
6. System cập nhật thông tin survey.
7. System lưu thay đổi.
8. System thông báo cập nhật thành công.

## Alternative Flows

### AF-01 — Researcher không thay đổi dữ liệu

1. Researcher mở survey.
2. Researcher không thực hiện thay đổi.
3. Researcher rời khỏi màn hình chỉnh sửa.
4. System giữ nguyên dữ liệu hiện tại.

## Exception Flows

### EF-01 — Survey đã publish

1. Researcher cố gắng chỉnh sửa survey đã publish.
2. System từ chối thay đổi.
3. System thông báo survey không còn được phép chỉnh sửa theo requirement hiện tại.

### EF-02 — Dữ liệu không hợp lệ

1. System phát hiện dữ liệu không hợp lệ.
2. System không lưu thay đổi.
3. System hiển thị thông báo lỗi.

### EF-03 — Survey không tồn tại

1. System không tìm thấy survey.
2. System không thực hiện cập nhật.
3. System thông báo survey không tồn tại.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Thông tin survey.
- Survey status.
- Researcher thực hiện chỉnh sửa.

### Undefined data

- Các field cụ thể được phép chỉnh sửa.
- Quy tắc validation.
- Audit log của thay đổi.

## Postconditions

### Success

1. Thông tin survey được cập nhật.
2. Survey vẫn ở trạng thái trước khi publish.

### Failure

1. Dữ liệu survey không thay đổi.
2. Survey giữ nguyên trạng thái hiện tại.

## Open Questions

1. Những field nào được phép chỉnh sửa?
2. Có lưu lịch sử thay đổi survey không?
3. Có autosave không?
4. Survey có được chỉnh sửa sau khi có response nhưng chưa publish không?
5. Thông báo lỗi cụ thể là gì?