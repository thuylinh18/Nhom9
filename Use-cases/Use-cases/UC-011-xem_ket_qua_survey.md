# UC-011 Xem kết quả survey

## Related Requirements

- `REQ-011` — Xem kết quả survey.

## Related Business Rules

- Manager có thể xem kết quả tổng hợp của survey sau khi Respondent gửi response.

## Primary Actor

Manager.

## Supporting Actor

System.

## Preconditions

1. Manager đã đăng nhập.
2. Manager có quyền xem kết quả.
3. Survey tồn tại.
4. Survey đã có response.

## Trigger

Manager truy cập chức năng xem kết quả của survey.

## Main Flow

1. Manager chọn một survey.
2. System lấy các response của survey.
3. System tổng hợp dữ liệu response.
4. System tính toán các kết quả cần thiết.
5. System hiển thị kết quả tổng hợp cho Manager.
6. Manager xem kết quả survey.

## Alternative Flows

### AF-01 — Survey chưa có response

1. Manager mở survey.
2. System không tìm thấy response.
3. System hiển thị trạng thái chưa có dữ liệu kết quả.

## Exception Flows

### EF-01 — Survey không tồn tại

1. System không tìm thấy survey.
2. System không hiển thị kết quả.

### EF-02 — Không thể tổng hợp dữ liệu

1. System không thể lấy hoặc tổng hợp response.
2. System thông báo lỗi.
3. Manager không nhận được kết quả hoàn chỉnh.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Response data.
- Answer data.
- Kết quả tổng hợp.
- Manager.

### Undefined data

- Các loại biểu đồ.
- Công thức aggregation cụ thể.
- Filter và sorting.
- Export result.

## Postconditions

### Success

1. Manager xem được kết quả tổng hợp survey.
2. Kết quả được sử dụng để đánh giá survey.

### Failure

1. Manager không xem được kết quả.
2. Dữ liệu survey không bị thay đổi.

## Open Questions

1. Kết quả survey hiển thị dưới dạng nào?
2. Có cần chart/graph không?
3. Manager có thể filter kết quả không?
4. Có cần export kết quả không?
5. Có cần xem kết quả theo từng question không?