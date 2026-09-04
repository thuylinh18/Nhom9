# UC-008 Trả lời survey

## Related Requirements

- `REQ-008` — Trả lời survey.

## Related Business Rules

- Respondent chỉ trả lời survey đã được publish.

## Primary Actor

Respondent.

## Supporting Actor

System.

## Preconditions

1. Respondent có thể truy cập hệ thống.
2. Survey tồn tại.
3. Survey đang ở trạng thái Published.
4. Survey có các question cần trả lời.

## Trigger

Respondent mở một survey Published và bắt đầu trả lời.

## Main Flow

1. Respondent mở survey.
2. System hiển thị các question.
3. Respondent đọc question.
4. Respondent nhập/chọn câu trả lời.
5. System ghi nhận các câu trả lời.
6. Respondent tiếp tục hoàn thành các question.
7. Respondent chuyển sang bước submit response.

## Alternative Flows

### AF-01 — Respondent thay đổi câu trả lời

1. Respondent đã nhập câu trả lời.
2. Respondent thay đổi câu trả lời.
3. System cập nhật dữ liệu đang được nhập.

### AF-02 — Respondent chưa hoàn thành survey

1. Respondent chưa trả lời đầy đủ các question.
2. Respondent tiếp tục nhập câu trả lời.
3. System giữ dữ liệu cho đến khi Respondent submit.

## Exception Flows

### EF-01 — Survey đã đóng

1. Respondent truy cập survey.
2. System xác định survey không còn hoạt động.
3. System không cho phép tiếp tục gửi response mới.

### EF-02 — Câu trả lời không hợp lệ

1. System phát hiện câu trả lời không phù hợp với yêu cầu của question.
2. System yêu cầu Respondent sửa câu trả lời.
3. Respondent tiếp tục hoàn thành survey.

### EF-03 — Không tải được question

1. System không thể lấy question.
2. System không thể hiển thị đầy đủ survey.
3. System thông báo lỗi.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Question ID.
- Response/answer.
- Respondent.
- Survey status.

### Undefined data

- Các loại answer cụ thể.
- Validation cho từng loại question.
- Có autosave hay không.
- Có cho phép chỉnh sửa câu trả lời trước submit không.

## Postconditions

### Success

1. Respondent đã nhập các câu trả lời.
2. Response sẵn sàng cho bước submit.

### Failure

1. Response chưa được submit.
2. Dữ liệu chưa hoàn thành có thể bị giữ hoặc mất tùy cơ chế chưa được xác định.

## Open Questions

1. Những loại question nào được hỗ trợ?
2. Có bắt buộc tất cả question phải trả lời không?
3. Có autosave câu trả lời không?
4. Respondent có được quay lại sửa câu trả lời không?
5. Có giới hạn thời gian trả lời không?