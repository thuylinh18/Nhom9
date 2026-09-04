# UC-010 Lưu response và feedback

## Related Requirements

- `REQ-010` — Lưu response và feedback.

## Related Business Rules

- System phải lưu response và feedback do Respondent gửi.
- Dữ liệu được lưu phục vụ tổng hợp và phân tích kết quả.

## Primary Actor

System.

## Supporting Actor

Database.

## Preconditions

1. Respondent đã submit response.
2. Response đã vượt qua validation cần thiết.
3. Database có thể tiếp nhận dữ liệu.

## Trigger

System nhận được response đã submit từ Respondent.

## Main Flow

1. System nhận response từ `UC-009`.
2. System xác định survey và Respondent liên quan.
3. System lưu response.
4. System lưu các answer tương ứng với question.
5. System lưu feedback nếu Respondent gửi feedback.
6. System xác nhận dữ liệu đã được lưu.
7. Dữ liệu được cung cấp cho các chức năng tổng hợp và AI analysis.

## Alternative Flows

### AF-01 — Response không có feedback

1. System nhận response.
2. System lưu các answer.
3. System không tạo dữ liệu feedback nếu Respondent không gửi feedback.
4. Response vẫn được lưu thành công.

## Exception Flows

### EF-01 — Database không thể lưu dữ liệu

1. System cố gắng lưu response.
2. Database trả về lỗi.
3. System không xác nhận lưu thành công.
4. System xử lý lỗi theo cơ chế hệ thống.

### EF-02 — Dữ liệu response không hợp lệ

1. System kiểm tra dữ liệu.
2. System phát hiện dữ liệu không hợp lệ.
3. System không lưu dữ liệu không hợp lệ.

## Data Requirements

### Confirmed data and controls

- Response ID.
- Survey ID.
- Respondent.
- Question ID.
- Answer.
- Feedback.
- Response status.
- Timestamp liên quan đến response nếu cần.

### Undefined data

- Database schema chi tiết.
- Quan hệ chính xác giữa Response, Answer và Feedback.
- Quy tắc retention dữ liệu.
- Audit log.

## Postconditions

### Success

1. Response được lưu.
2. Answer được lưu.
3. Feedback được lưu nếu có.
4. Dữ liệu sẵn sàng cho Result Management và AI Analysis.

### Failure

1. Response chưa được xác nhận lưu thành công.
2. System không cung cấp dữ liệu chưa được lưu cho bước phân tích.

## Open Questions

1. Feedback có phải là một field riêng của Response không?
2. Có cho phép một response có nhiều feedback không?
3. Có cần timestamp cho từng answer không?
4. Có cần soft delete response không?
5. Dữ liệu response được lưu trong bao lâu?