# Q&A Benchmark — Food Survey

## 1. Mục đích

Q&A Benchmark dùng để kiểm tra khả năng của AI trong việc phân tích feedback của khách hàng về đồ ăn.

Benchmark tập trung vào các chức năng:

- Sentiment Analysis
- Topic Analysis
- AI Summary
- Xác định vấn đề chính
- Đưa ra insight và recommendation cho Manager

---

# 2. Dataset mẫu

| ID | Feedback |
|---|---|
| FB-001 | Món phở rất ngon, nước dùng đậm đà và thịt mềm. Tôi sẽ quay lại. |
| FB-002 | Đồ ăn ngon nhưng giá hơi cao so với khẩu phần. |
| FB-003 | Tôi rất thất vọng vì món ăn bị nguội khi được giao đến. |
| FB-004 | Nhân viên phục vụ rất nhiệt tình và thân thiện. |
| FB-005 | Gà rán rất giòn, ngon và vừa miệng. |
| FB-006 | Thời gian giao hàng quá lâu, tôi phải chờ gần một tiếng. |
| FB-007 | Món ăn không được tươi và có mùi không dễ chịu. |
| FB-008 | Nhà hàng sạch sẽ, không gian thoải mái và đồ ăn khá ngon. |
| FB-009 | Giá đồ ăn hợp lý nhưng phần ăn hơi nhỏ. |
| FB-010 | Tôi không hài lòng với cách phục vụ vì nhân viên phản hồi rất chậm. |
| FB-011 | Pizza ngon, nhiều phô mai và được giao khá nhanh. |
| FB-012 | Tôi muốn nhà hàng có thêm nhiều món ăn chay. |
| FB-013 | Đồ ăn rất ngon nhưng đóng gói khi giao hàng chưa tốt. |
| FB-014 | Món bún hơi mặn và không giống hình ảnh trên menu. |
| FB-015 | Nhìn chung tôi hài lòng với chất lượng đồ ăn và dịch vụ. |

---

# 3. Q&A Benchmark

## Q01 — Sentiment tổng thể

**Question:**

Sentiment tổng thể của khách hàng đối với đồ ăn và dịch vụ như thế nào?

**Expected Answer:**

Sentiment tổng thể khá tích cực nhưng vẫn có một số phản hồi tiêu cực. Khách hàng đánh giá tốt về hương vị món ăn, chất lượng phục vụ và không gian. Các vấn đề tiêu cực chủ yếu liên quan đến giá cả, giao hàng, độ tươi của món ăn và chất lượng phục vụ.

---

## Q02 — Feedback Positive

**Question:**

Những feedback nào có sentiment Positive?

**Expected Answer:**

Các feedback tích cực:

- FB-001
- FB-004
- FB-005
- FB-008
- FB-011
- FB-015

---

## Q03 — Feedback Negative

**Question:**

Những feedback nào có sentiment Negative?

**Expected Answer:**

Các feedback tiêu cực:

- FB-003
- FB-006
- FB-007
- FB-010
- FB-014

---

## Q04 — Chất lượng món ăn

**Question:**

Khách hàng đánh giá chất lượng món ăn như thế nào?

**Expected Answer:**

Phần lớn khách hàng đánh giá món ăn ngon và có chất lượng tốt. Tuy nhiên, vẫn có phản hồi về món ăn không tươi, bị nguội, quá mặn hoặc không giống hình ảnh trên menu.

---

## Q05 — Hương vị

**Question:**

Khách hàng nhận xét gì về hương vị món ăn?

**Expected Answer:**

Các phản hồi tích cực cho rằng món ăn ngon, nước dùng đậm đà, gà rán giòn và pizza nhiều phô mai.

Tuy nhiên, có phản hồi cho rằng món bún hơi mặn.

---

## Q06 — Giá cả

**Question:**

Khách hàng có phàn nàn về giá đồ ăn không?

**Expected Answer:**

Có. Một số khách hàng cho rằng giá hơi cao so với khẩu phần.

Feedback liên quan:

- FB-002
- FB-009

---

## Q07 — Delivery

**Question:**

Khách hàng gặp những vấn đề gì liên quan đến Delivery?

**Expected Answer:**

Các vấn đề chính:

- Đồ ăn bị nguội khi giao.
- Thời gian giao hàng quá lâu.
- Đóng gói khi giao hàng chưa tốt.

Feedback liên quan:

- FB-003
- FB-006
- FB-013

---

## Q08 — Customer Service

**Question:**

Khách hàng đánh giá Customer Service như thế nào?

**Expected Answer:**

Customer Service nhận được cả phản hồi tích cực và tiêu cực.

Positive:
- Nhân viên nhiệt tình.
- Nhân viên thân thiện.

Negative:
- Nhân viên phản hồi chậm.

Feedback liên quan:

- FB-004
- FB-010

---

## Q09 — Topic Analysis

**Question:**

Những topic chính xuất hiện trong các feedback là gì?

**Expected Answer:**

Các topic chính:

1. Food Quality
2. Taste
3. Price
4. Delivery
5. Customer Service
6. Packaging
7. Restaurant Environment
8. Menu Options

---

## Q10 — Food Quality

**Question:**

Những feedback nào liên quan đến Food Quality?

**Expected Answer:**

Các feedback liên quan:

- FB-001
- FB-003
- FB-005
- FB-007
- FB-008
- FB-011
- FB-013
- FB-014
- FB-015

Các vấn đề được đề cập gồm:

- Hương vị.
- Độ tươi.
- Nhiệt độ món ăn.
- Chất lượng món ăn.
- Món ăn có giống menu hay không.

---

## Q11 — Menu

**Question:**

Khách hàng mong muốn cải thiện điều gì về Menu?

**Expected Answer:**

Một khách hàng mong muốn nhà hàng có thêm nhiều lựa chọn món ăn chay.

Feedback liên quan:

- FB-012

---

## Q12 — Packaging

**Question:**

Khách hàng đánh giá Packaging như thế nào?

**Expected Answer:**

Packaging có vấn đề cần cải thiện khi giao hàng. Một feedback cho rằng đồ ăn được đóng gói chưa tốt.

Feedback liên quan:

- FB-013

---

## Q13 — AI Summary

**Question:**

Hãy tạo summary cho toàn bộ feedback.

**Expected Answer:**

Khách hàng nhìn chung hài lòng với chất lượng và hương vị đồ ăn, đặc biệt là các món phở, gà rán và pizza. Tuy nhiên, một số vấn đề cần cải thiện gồm giá cả, thời gian giao hàng, nhiệt độ món ăn, độ tươi, đóng gói và tốc độ phản hồi của nhân viên.

---

## Q14 — Recommendation

**Question:**

Dựa trên feedback, AI nên đề xuất những cải thiện nào cho nhà hàng?

**Expected Answer:**

AI đề xuất:

1. Cải thiện thời gian giao hàng.
2. Đảm bảo đồ ăn được giữ nóng trong quá trình giao.
3. Cải thiện Packaging.
4. Kiểm soát độ tươi và chất lượng nguyên liệu.
5. Xem xét lại giá và khẩu phần.
6. Cải thiện tốc độ phản hồi của nhân viên.
7. Bổ sung thêm món ăn chay.

---

## Q15 — Manager Insight

**Question:**

Nếu bạn là Manager, insight quan trọng nhất từ feedback là gì?

**Expected Answer:**

Khách hàng nhìn chung đánh giá tích cực về hương vị và chất lượng đồ ăn. Tuy nhiên, trải nghiệm Delivery và một số vấn đề về chất lượng món ăn đang tạo ra phản hồi tiêu cực. Manager nên ưu tiên cải thiện Delivery, giữ nhiệt độ món ăn, Packaging và kiểm soát chất lượng nguyên liệu.

---

# 4. Evaluation Criteria

| Tiêu chí | Mô tả |
|---|---|
| Correctness | Câu trả lời đúng với dataset |
| Relevance | Trả lời đúng câu hỏi |
| Completeness | Không bỏ sót thông tin quan trọng |
| Sentiment Accuracy | Phân loại Positive/Negative hợp lý |
| Topic Accuracy | Xác định đúng topic |
| Summary Quality | Summary phản ánh đúng feedback |
| Recommendation Quality | Đề xuất phù hợp với feedback |
| Hallucination | Không tự tạo thông tin không có trong dataset |

---

# 5. Benchmark Result

| Metric | Result |
|---|---:|
| Total Questions | 15 |
| Correct Answers | TBD |
| Accuracy | TBD |
| Sentiment Accuracy | TBD |
| Topic Accuracy | TBD |
| Summary Quality | TBD |
| Recommendation Quality | TBD |
| Hallucination Cases | TBD |

---

# 6. Pass Criteria

Benchmark được xem là đạt khi:

- AI trả lời đúng phần lớn 15 câu hỏi.
- AI xác định đúng sentiment của feedback.
- AI xác định được các topic chính.
- AI summary phản ánh đúng nội dung feedback.
- AI đưa ra recommendation dựa trên dữ liệu thực tế.
- AI không tự tạo thông tin không tồn tại trong dataset.
- Kết quả phân tích có thể hỗ trợ Manager đánh giá chất lượng đồ ăn và dịch vụ.