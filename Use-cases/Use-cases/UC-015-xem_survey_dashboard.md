# UC-015 Xem Survey Dashboard

## Related Requirements

- `REQ-017` — Xem Survey Dashboard.

## Related Business Rules

- Manager có thể xem dashboard tổng quan về kết quả survey và thông tin phân tích feedback.

## Primary Actor

Manager.

## Supporting Actor

System.

## Preconditions

1. Manager đã đăng nhập.
2. Manager có quyền truy cập Survey Dashboard.
3. System có dữ liệu survey hoặc feedback để hiển thị.

## Trigger

Manager truy cập Survey Dashboard.

## Main Flow

1. Manager mở Survey Dashboard.
2. System lấy dữ liệu survey.
3. System lấy dữ liệu response.
4. System lấy dữ liệu feedback.
5. System lấy kết quả AI analysis nếu đã có.
6. System tổng hợp dữ liệu.
7. System hiển thị thông tin tổng quan.
8. Manager xem dashboard để đánh giá tình hình survey và feedback.

## Alternative Flows

### AF-01 — Dashboard chưa có dữ liệu

1. Manager mở Dashboard.
2. System không tìm thấy dữ liệu survey/response/feedback.
3. System hiển thị dashboard ở trạng thái chưa có dữ liệu.

### AF-02 — Chưa có AI analysis

1. Manager mở Dashboard.
2. System có survey và feedback.
3. System chưa có AI analysis.
4. System vẫn hiển thị các dữ liệu survey và feedback hiện có.
5. Phần AI analysis được hiển thị ở trạng thái chưa có dữ liệu nếu cần.

## Exception Flows

### EF-01 — Không thể tải dữ liệu dashboard

1. System cố gắng lấy dữ liệu.
2. System gặp lỗi.
3. Dashboard không hiển thị đầy đủ dữ liệu.
4. System thông báo lỗi.

### EF-02 — Dữ liệu không đầy đủ

1. System phát hiện một hoặc nhiều nguồn dữ liệu không đầy đủ.
2. System hiển thị các dữ liệu có thể lấy được.
3. System thông báo phần dữ liệu chưa sẵn sàng nếu cần.

## Data Requirements

### Confirmed data and controls

- Survey information.
- Response data.
- Feedback data.
- Survey result.
- Sentiment analysis.
- Topic analysis.
- AI summary.
- Manager.

### Undefined data

- Các KPI cụ thể trên dashboard.
- Loại biểu đồ.
- Filter theo survey.
- Filter theo thời gian.
- Cách tính các chỉ số tổng quan.
- Export dashboard.

## Postconditions

### Success

1. Manager xem được Survey Dashboard.
2. Dashboard hiển thị thông tin tổng quan về survey.
3. Dashboard hiển thị thông tin liên quan đến response và feedback.
4. Dashboard có thể hiển thị thông tin AI analysis khi dữ liệu đã có.

### Failure

1. Dashboard không hiển thị đầy đủ dữ liệu.
2. Dữ liệu survey và feedback không bị thay đổi.

## Open Questions

1. Dashboard cần hiển thị những KPI nào?
2. Có hiển thị tổng số survey không?
3. Có hiển thị tổng số response không?
4. Có hiển thị sentiment distribution không?
5. Có hiển thị top topics không?
6. Có hiển thị AI summary trên dashboard không?
7. Có filter theo survey không?
8. Có filter theo thời gian không?
9. Có cần chart/graph không?
10. Có cần export dashboard không?