# UC-013 Phân tích AI

## Related Requirements

- `REQ-013` — Phân tích sentiment.
- `REQ-014` — Phân tích topic.
- `REQ-015` — Tạo AI summary.

## Related Business Rules

- System sử dụng AI để phân tích feedback.
- Kết quả phân tích phải dựa trên feedback được lưu trong hệ thống.

## Primary Actor

System.

## Supporting Actor

AI Service.

## Preconditions

1. Feedback đã được lưu trong System.
2. System có thể truy cập AI Service.
3. Feedback có dữ liệu phù hợp để phân tích.

## Trigger

System thực hiện AI analysis trên feedback đã được lưu.

## Main Flow

1. System lấy feedback cần phân tích.
2. System gửi feedback đến AI Service.
3. AI Service thực hiện sentiment analysis.
4. AI Service xác định topic/chủ đề chính.
5. AI Service tạo summary từ feedback.
6. AI Service trả kết quả về System.
7. System kiểm tra kết quả AI.
8. System lưu kết quả phân tích.
9. Kết quả được cung cấp cho Manager thông qua `UC-014`.

## Alternative Flows

### AF-01 — Phân tích nhiều feedback

1. System lấy tập hợp feedback của một survey.
2. System gửi dữ liệu đến AI Service.
3. AI Service phân tích tập feedback.
4. System lưu kết quả phân tích tổng hợp.

### AF-02 — Phân tích feedback mới

1. System nhận feedback mới.
2. System đưa feedback vào quá trình AI analysis.
3. System cập nhật kết quả phân tích.

## Exception Flows

### EF-01 — AI Service không khả dụng

1. System gửi yêu cầu phân tích.
2. AI Service không phản hồi.
3. System không tạo kết quả AI hoàn chỉnh.
4. System xử lý lỗi theo cơ chế hệ thống.

### EF-02 — Feedback không có dữ liệu phù hợp

1. System lấy feedback.
2. System xác định feedback không đủ dữ liệu để phân tích.
3. System không tạo hoặc không lưu kết quả không hợp lệ.

### EF-03 — AI trả về kết quả không hợp lệ

1. AI Service trả kết quả.
2. System kiểm tra kết quả.
3. System phát hiện kết quả không đúng format hoặc thiếu dữ liệu.
4. System không sử dụng kết quả không hợp lệ.

## Data Requirements

### Confirmed data and controls

- Feedback content.
- Survey ID.
- Sentiment result.
- Topic result.
- AI summary.
- AI analysis result.
- Thông tin liên kết giữa feedback và kết quả AI.

### Undefined data

- AI model cụ thể.
- Prompt cụ thể.
- Confidence score.
- Format response của AI Service.
- Cách versioning AI model.
- Thời điểm chạy AI analysis.
- Cơ chế retry.

## Postconditions

### Success

1. Feedback được phân tích sentiment.
2. Topic chính được xác định.
3. AI summary được tạo.
4. Kết quả AI được lưu.
5. Manager có thể xem kết quả thông qua `UC-014`.

### Failure

1. Kết quả AI không được xác nhận.
2. System không sử dụng kết quả AI không hợp lệ.

## Open Questions

1. AI model nào sẽ được sử dụng?
2. AI analysis chạy tự động hay do Manager/Researcher kích hoạt?
3. Sentiment có bao nhiêu mức?
4. Topic được xác định theo danh sách cố định hay AI tự tạo?
5. Summary có giới hạn độ dài không?
6. Có lưu prompt và AI response không?
7. Có cần confidence score không?
8. Khi AI Service lỗi thì có retry không?
9. Có cần cho phép chạy lại AI analysis không?