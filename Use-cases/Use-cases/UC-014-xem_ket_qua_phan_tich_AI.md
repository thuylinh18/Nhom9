# UC-014 Xem kết quả phân tích AI

## Related Requirements

- `REQ-016` — Xem kết quả phân tích AI.

## Related Business Rules

- Manager có thể xem kết quả AI của feedback.
- Kết quả bao gồm sentiment, topic và summary.

## Primary Actor

Manager.

## Supporting Actor

System.

## Preconditions

1. Manager đã đăng nhập.
2. Manager có quyền xem kết quả AI.
3. Survey có feedback đã được phân tích hoặc có kết quả AI được lưu.

## Trigger

Manager truy cập chức năng xem kết quả phân tích AI.

## Main Flow

1. Manager chọn survey.
2. System lấy kết quả AI của survey.
3. System lấy sentiment analysis.
4. System lấy topic analysis.
5. System lấy AI summary.
6. System hiển thị các kết quả cho Manager.
7. Manager xem và đánh giá insight từ feedback.

## Alternative Flows

### AF-01 — Chỉ có một phần kết quả AI

1. Manager mở kết quả AI.
2. System xác định một số loại phân tích chưa có.
3. System hiển thị các kết quả đã có.
4. System thông báo phần phân tích chưa sẵn sàng nếu cần.

## Exception Flows

### EF-01 — Chưa có kết quả AI

1. Manager truy cập AI analysis.
2. System không tìm thấy kết quả.
3. System thông báo chưa có kết quả phân tích.

### EF-02 — Không thể tải kết quả AI

1. System không thể lấy dữ liệu.
2. System thông báo lỗi.
3. Manager không nhận được kết quả đầy đủ.

## Data Requirements

### Confirmed data and controls

- Survey ID.
- Feedback.
- Sentiment result.
- Topic result.
- AI summary.
- AI analysis result.

### Undefined data

- Cách hiển thị sentiment.
- Cách hiển thị topic.
- Chart cho sentiment/topic.
- Filter AI result.
- Confidence score.

## Postconditions

### Success

1. Manager xem được sentiment.
2. Manager xem được topic.
3. Manager xem được AI summary.
4. Manager có thể sử dụng kết quả để đánh giá feedback.

### Failure

1. Manager không xem được kết quả AI.
2. Không có dữ liệu AI bị thay đổi.

## Open Questions

1. Sentiment hiển thị dưới dạng text, percentage hay chart?
2. Topic hiển thị dưới dạng danh sách hay biểu đồ?
3. Summary hiển thị ở vị trí nào?
4. Có cần filter theo sentiment không?
5. Có cần xem AI result của từng feedback riêng lẻ không?
6. Có cần hiển thị confidence score không?