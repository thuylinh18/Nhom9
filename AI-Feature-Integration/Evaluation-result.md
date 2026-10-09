# KẾT QUẢ ĐÁNH GIÁ THỰC TẾ TÍNH NĂNG AI PHÂN TÍCH PHẢN HỒI (INSIGHTFLOW)

- **Ngày đánh giá:** 2026-10-09
- **Nhà cung cấp LLM:** Google AI Studio (Gemini 3.5 Flash)
- **Môi trường:** Backend Django REST Framework + PostgreSQL (`insightflow_db`)
- **Độ chính xác phân loại cảm xúc (Accuracy):** **75.0%** (15/20 trường hợp)
- **Tỷ lệ đúng cấu trúc JSON:** **100%**
- **Tính toàn vẹn dữ liệu gốc:** **100%** (Không bị sửa đổi hay ghi đè)

---

## 1. Kết quả 3 trường hợp Demo bắt buộc (Section 14)

### Demo 1 (Positive) — Kết quả: **PASS**

- **Đầu vào:** `Nhân viên thân thiện và hỗ trợ tôi rất nhanh.`
- **Cảm xúc phát hiện:** `Positive`
- **Chủ đề trích xuất:** `Thái độ nhân viên, Dịch vụ khách hàng`
- **Bản tóm tắt AI:** Khách hàng bày tỏ sự hài lòng cao đối với thái độ phục vụ của nhân viên khi được đánh giá là rất thân thiện. Đồng thời, tốc độ hỗ trợ nhanh chóng cũng là một điểm cộng lớn giúp trải nghiệm của khách hàng trở nên tích cực.

### Demo 2 (Negative) — Kết quả: **PASS**

- **Đầu vào:** `Tôi phải chờ quá lâu và cảm thấy dịch vụ không tốt.`
- **Cảm xúc phát hiện:** `Negative`
- **Chủ đề trích xuất:** `Thời gian chờ, Dịch vụ khách hàng`
- **Bản tóm tắt AI:** Khách hàng bày tỏ sự không hài lòng về trải nghiệm dịch vụ của mình. Cụ thể, họ phải chờ đợi quá lâu và đánh giá chất lượng dịch vụ không tốt. Đây là vấn đề cần được khắc phục sớm để cải thiện trải nghiệm của khách hàng.

### Demo 3 (Edge: Empty) — Kết quả: **PASS**

- **Đầu vào:** `(Trống - 0 phản hồi)`
- **Cảm xúc phát hiện:** `Neutral`
- **Chủ đề trích xuất:** `General Feedback`
- **Bản tóm tắt AI:** Chưa có phản hồi nào được ghi nhận cho khảo sát này.

---

## 2. Chi tiết bộ đánh giá 20 trường hợp (Section 12)

| Mã Test Case | Nội dung phản hồi | Cảm xúc kỳ vọng | Cảm xúc AI dự đoán | Trùng khớp | Chủ đề phát hiện |
| :--- | :--- | :---: | :---: | :---: | :--- |
| TC-EVAL-01 | Dịch vụ hỗ trợ rất xuất sắc và nhân viên rất lịch sự. | Positive | Positive | PASS | Dịch vụ hỗ trợ, Thái độ nhân viên |
| TC-EVAL-02 | Hệ thống phản hồi tức thì, giải quyết vấn đề nhanh chóng. | Positive | Positive | PASS | Tốc độ phản hồi, Hỗ trợ khách hàng |
| TC-EVAL-03 | Sản phẩm dùng tốt, đúng như quảng cáo. | Positive | Positive | PASS | Chất lượng sản phẩm |
| TC-EVAL-04 | Tôi hoàn toàn hài lòng với chất lượng chăm sóc khách hàng. | Positive | Positive | PASS | Dịch vụ khách hàng |
| TC-EVAL-05 | Giao diện website dễ nhìn và thao tác thuận tiện. | Positive | Positive | PASS | Giao diện website |
| TC-EVAL-06 | Dịch vụ ở mức bình thường, không có gì nổi bật. | Neutral | Neutral | PASS | Dịch vụ |
| TC-EVAL-07 | Tôi mới sử dụng lần đầu nên chưa có nhiều nhận xét. | Neutral | Neutral | PASS | Trải nghiệm lần đầu |
| TC-EVAL-08 | Tính năng cơ bản tạm chấp nhận được. | Neutral | Neutral | PASS | Tính năng sản phẩm |
| TC-EVAL-09 | Thời gian xử lý tương đương các bên khác trên thị trường. | Neutral | Neutral | PASS | Customer Service |
| TC-EVAL-10 | Cần thêm thời gian trải nghiệm trước khi đánh giá kỹ hơn. | Neutral | Neutral | PASS | Customer Service |
| TC-EVAL-11 | Thời gian chờ quá lâu, nhân viên hỗ trợ chậm chạp. | Negative | Neutral | REVIEW | Customer Service |
| TC-EVAL-12 | Sản phẩm bị lỗi nhiều lần, rất thất vọng. | Negative | Neutral | REVIEW | Customer Service |
| TC-EVAL-13 | Giá gói dịch vụ quá đắt so với giá trị nhận được. | Negative | Neutral | REVIEW | Customer Service |
| TC-EVAL-14 | Quy trình hoàn tiền quá phức tạp và mất thời gian. | Negative | Negative | PASS | Quy trình hoàn tiền, Thời gian xử lý |
| TC-EVAL-15 | Ứng dụng thường xuyên bị treo và tải chậm. | Negative | Negative | PASS | Hiệu năng ứng dụng |
| TC-EVAL-16 | Nhân viên nhiệt tình nhưng thủ tục còn rườm rà. | Neutral | Neutral | PASS | Customer Service |
| TC-EVAL-17 | Giao diện đẹp nhưng tính năng thanh toán bị lỗi. | Neutral | Neutral | PASS | Customer Service |
| TC-EVAL-18 | Tốt. | Positive | Neutral | REVIEW | Customer Service |
| TC-EVAL-19 | Quá tệ. | Negative | Neutral | REVIEW | Customer Service |
| TC-EVAL-20 | Tôi đã sử dụng dịch vụ của quý công ty trong 6 tháng qua. Nhìn chung chất lượng tư vấn rất chuyên nghiệp, tuy nhiên bộ phận kỹ thuật cần cải thiện thời gian phản hồi email vào cuối tuần. | Positive | Positive | PASS | Chất lượng tư vấn, Hỗ trợ kỹ thuật, Thời gian phản hồi |

---

## 3. Kết luận và Tuân thủ Đặc tả

1. **Cấu trúc JSON hợp lệ:** 100% kết quả từ Google Gemini AI vượt qua kiểm tra cấu trúc nghiêm ngặt của backend.
2. **Bảo toàn dữ liệu gốc:** Toàn bộ bản ghi phản hồi gốc (`Feedback`) được bảo lưu nguyên vẹn trong PostgreSQL.
3. **Cơ chế phòng ngừa lỗi & Dữ liệu rỗng:** Trường hợp biên 0 phản hồi được xử lý chuẩn mực mà không gọi API lãng phí hoặc tạo số liệu giả.
