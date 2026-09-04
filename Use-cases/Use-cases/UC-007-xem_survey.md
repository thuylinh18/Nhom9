# UC-007 Xem survey

## Related Requirements

- `REQ-007` — Xem survey.

## Related Business Rules

- Respondent có thể xem các survey đang ở trạng thái Published.

## Primary Actor

Respondent.

## Supporting Actor

System.

## Preconditions

1. System đang hoạt động.
2. Có survey ở trạng thái Published.
3. Respondent có thể truy cập hệ thống.

## Trigger

Respondent truy cập danh sách survey.

## Main Flow

1. Respondent truy cập chức năng xem survey.
2. System lấy danh sách survey.
3. System lọc các survey đang ở trạng thái Published.
4. System hiển thị danh sách survey cho Respondent.
5. Respondent chọn một survey.
6. System hiển thị thông tin và question của survey.

## Alternative Flows

### AF-01 — Không có survey Published

1. Respondent truy cập danh sách survey.
2. System không tìm thấy survey Published.
3. System hiển thị trạng thái không có survey phù hợp.

## Exception Flows

### EF-01 — Survey không còn Published

1. Respondent chọn survey.
2. System kiểm tra trạng thái survey.
3. System xác định survey không còn Published.
4. System không cho phép truy cập survey để trả lời.

### EF-02 — Không thể tải survey

1. System không thể lấy dữ liệu survey.
2. System không hiển thị đầy đủ survey.
3. System thông báo lỗi.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Survey title/thông tin survey.
- Survey status.
- Question thuộc survey.

### Undefined data

- Cách sắp xếp danh sách survey.
- Search/filter survey.
- Pagination.
- Các thông tin survey hiển thị trong danh sách.

## Postconditions

### Success

1. Respondent xem được survey Published.
2. Respondent có thể tiếp tục sang bước trả lời survey.

### Failure

1. Respondent không xem được survey.
2. Không có response nào được tạo.

## Open Questions

1. Danh sách survey được sắp xếp theo tiêu chí nào?
2. Có cần search survey không?
3. Có cần filter survey không?
4. Survey nào được hiển thị ngoài status Published?
5. Respondent có thể xem survey đã tham gia trước đó không?