# UC-006 Close survey

## Related Requirements

- `REQ-006` — Close survey.

## Related Business Rules

- Researcher có thể close survey đang hoạt động.
- Survey đã close không tiếp nhận response mới.

## Primary Actor

Researcher.

## Supporting Actor

System.

## Preconditions

1. Researcher đã đăng nhập.
2. Survey tồn tại.
3. Survey đang ở trạng thái Published/đang hoạt động.
4. Researcher có quyền close survey.

## Trigger

Researcher chọn chức năng Close Survey.

## Main Flow

1. Researcher mở survey đang hoạt động.
2. Researcher chọn Close Survey.
3. System xác nhận survey cần được đóng.
4. System thay đổi trạng thái survey thành Closed.
5. System lưu trạng thái mới.
6. System ngừng tiếp nhận response mới.
7. System thông báo close thành công.

## Alternative Flows

### AF-01 — Researcher hủy thao tác close

1. Researcher chọn Close Survey.
2. System yêu cầu xác nhận.
3. Researcher hủy thao tác.
4. Survey tiếp tục ở trạng thái hiện tại.

## Exception Flows

### EF-01 — Survey không tồn tại

1. System không tìm thấy survey.
2. System không thực hiện close.

### EF-02 — Survey không ở trạng thái hoạt động

1. System xác định survey không còn hoạt động.
2. System không thực hiện close.
3. System thông báo trạng thái hiện tại.

### EF-03 — Researcher không có quyền

1. System xác định User không có quyền.
2. System từ chối thao tác close.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Survey status.
- Researcher.
- Closed status.

### Undefined data

- Close timestamp.
- Có cho phép reopen survey không.
- Quy tắc xử lý response đang được nhập khi survey bị close.

## Postconditions

### Success

1. Survey chuyển sang trạng thái Closed.
2. Survey không tiếp nhận response mới.

### Failure

1. Survey vẫn giữ trạng thái hiện tại.
2. Response mới tiếp tục được xử lý nếu survey vẫn đang hoạt động.

## Open Questions

1. Có cho phép reopen survey không?
2. Close survey có cần confirmation không?
3. Response đang được nhập nhưng chưa submit khi survey close sẽ được xử lý thế nào?
4. Có lưu thời gian close không?