# UC-009 Submit response

## Related Requirements

- `REQ-009` — Submit response.

## Related Business Rules

- Respondent chỉ được submit response cho survey đã publish.
- Các question bắt buộc phải được hoàn thành trước khi submit.

## Primary Actor

Respondent.

## Supporting Actor

System.

## Preconditions

1. Respondent đang trả lời một survey.
2. Survey đang ở trạng thái Published.
3. Respondent đã nhập các câu trả lời.
4. Các question bắt buộc đã được hoàn thành.

## Trigger

Respondent chọn Submit Response.

## Main Flow

1. Respondent hoàn thành survey.
2. Respondent chọn Submit.
3. System kiểm tra các question bắt buộc.
4. System kiểm tra dữ liệu response.
5. System xác nhận response hợp lệ.
6. System tiếp nhận response.
7. System chuyển response sang trạng thái đã submit.
8. System thực hiện lưu response và feedback theo `UC-010`.
9. System thông báo submit thành công.

## Alternative Flows

### AF-01 — Respondent chưa hoàn thành question bắt buộc

1. Respondent chọn Submit.
2. System kiểm tra response.
3. System phát hiện question bắt buộc chưa được trả lời.
4. System yêu cầu Respondent hoàn thành question còn thiếu.
5. Respondent quay lại survey và bổ sung câu trả lời.

## Exception Flows

### EF-01 — Survey đã đóng

1. Respondent chọn Submit.
2. System kiểm tra survey.
3. System xác định survey đã Closed.
4. System không tiếp nhận response mới.

### EF-02 — Response không hợp lệ

1. System phát hiện dữ liệu response không hợp lệ.
2. System không submit response.
3. System thông báo lỗi.

### EF-03 — Lỗi khi lưu response

1. System xác nhận response hợp lệ.
2. System gặp lỗi khi lưu response.
3. System thông báo submit chưa hoàn tất.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Respondent.
- Question ID.
- Answer.
- Feedback nếu có.
- Response status.

### Undefined data

- Response ID format.
- Validation rules chi tiết.
- Cơ chế chống submit trùng.
- Transaction behavior.

## Postconditions

### Success

1. Response được submit thành công.
2. Response được chuyển sang bước lưu dữ liệu.
3. Response có thể được sử dụng cho việc tổng hợp và phân tích.

### Failure

1. Response không được submit.
2. Response không được xem là response hoàn chỉnh.

## Open Questions

1. Có cho phép Respondent submit nhiều lần cho cùng một survey không?
2. Có cần chống duplicate response không?
3. Có hiển thị confirmation trước submit không?
4. Sau khi submit có cho phép chỉnh sửa response không?
5. Khi submit thất bại, Respondent có thể retry không?