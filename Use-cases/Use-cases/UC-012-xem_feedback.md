# UC-012 Xem feedback

## Related Requirements

- `REQ-012` — Xem feedback.

## Related Business Rules

- Manager có thể xem feedback được gửi bởi Respondent.

## Primary Actor

Manager.

## Supporting Actor

System.

## Preconditions

1. Manager đã đăng nhập.
2. Manager có quyền xem feedback.
3. Survey có feedback được lưu.

## Trigger

Manager truy cập chức năng xem feedback.

## Main Flow

1. Manager chọn survey.
2. System lấy feedback thuộc survey.
3. System hiển thị danh sách feedback.
4. Manager xem nội dung feedback.
5. Manager sử dụng feedback để đánh giá và phân tích.

## Alternative Flows

### AF-01 — Survey chưa có feedback

1. Manager chọn survey.
2. System không tìm thấy feedback.
3. System hiển thị trạng thái chưa có feedback.

### AF-02 — Manager xem feedback theo survey

1. Manager chọn một survey.
2. System lọc feedback thuộc survey.
3. System hiển thị feedback tương ứng.

## Exception Flows

### EF-01 — Không thể tải feedback

1. System không thể lấy dữ liệu feedback.
2. System thông báo lỗi.
3. Feedback không được hiển thị đầy đủ.

### EF-02 — Survey không tồn tại

1. System không tìm thấy survey.
2. System không hiển thị feedback.

## Data Requirements

### Confirmed data and controls

- Feedback ID.
- Survey ID.
- Respondent.
- Feedback content.
- Feedback liên quan đến response.

### Undefined data

- Cách sắp xếp feedback.
- Pagination.
- Search/filter.
- Có ẩn danh Respondent hay không.

## Postconditions

### Success

1. Manager xem được feedback.
2. Feedback có thể được sử dụng cho AI analysis.

### Failure

1. Feedback không được hiển thị.
2. Dữ liệu feedback không bị thay đổi.

## Open Questions

1. Feedback có hiển thị danh tính Respondent không?
2. Có cần ẩn danh feedback không?
3. Có search/filter feedback không?
4. Có pagination không?
5. Có cho phép Manager export feedback không?