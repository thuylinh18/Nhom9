# 18.9. Output #9 - Vault Q&A Benchmark

## Mục đích

Vault Q&A Benchmark dùng để kiểm tra khả năng trả lời của AI dựa trên các requirement và business rules đã được xác nhận trong Project Vault.

Nguyên tắc:

- AI chỉ được trả lời dựa trên thông tin đã có trong Vault.
- Không được tự suy diễn thêm chức năng hoặc business rule chưa được xác nhận.
- Nếu Vault không có thông tin đủ để trả lời, AI phải trả lời:
  **"KHÔNG ĐỦ DỮ LIỆU"**
- Nếu chức năng nằm ngoài scope hiện tại, AI phải nêu rõ:
  **"Không thuộc scope hiện tại / Out of Scope."**
- Các câu trả lời phải có thể truy vết về Requirement ID hoặc artifact tương ứng.

---

## Benchmark

| **#** | **Expected answer** | **Nguồn/logic** | **KQ** |
|---|---|---|---|
| Q1 | Ai được phép tạo survey? | Researcher. REQ-002 / UC-002. | Correct |
| Q2 | Respondent có được tự tạo survey không? | Không. REQ-002 xác định Actor là Researcher. | Correct |
| Q3 | Researcher có được chỉnh sửa survey sau khi publish không? | Không được xác nhận. REQ-003 chỉ cho phép chỉnh sửa trước khi publish. Không được tự suy diễn rằng có thể sửa sau publish. | Correct |
| Q4 | Researcher có thể thêm question vào survey không? | Có. Researcher có thể thêm, chỉnh sửa và quản lý question thuộc survey. REQ-004 / UC-004. | Correct |
| Q5 | Có được xóa question không? | KHÔNG ĐỦ DỮ LIỆU. REQ-004 chỉ xác nhận thêm, chỉnh sửa và quản lý question; không xác nhận riêng chức năng Delete. | Correct |
| Q6 | Khi nào Respondent có thể truy cập survey? | Khi survey ở trạng thái Published. REQ-005 / REQ-007. | Correct |
| Q7 | Publish survey có làm Respondent có thể tham gia survey không? | Có. Publish làm survey accessible để Respondent có thể xem và tham gia. REQ-005. | Correct |
| Q8 | Respondent có thể trả lời survey chưa Published không? | Không theo scope hiện tại. REQ-007 và REQ-008 xác định Respondent xem và trả lời survey Published. | Correct |
| Q9 | Researcher có thể Close một survey đang active không? | Có. REQ-006 / UC-006. | Correct |
| Q10 | Sau khi Close survey, Respondent có thể gửi response mới không? | Không. Close survey dùng để stop new responses. REQ-006. | Correct |
| Q11 | Hệ thống có phải lưu response và feedback của Respondent không? | Có. Hệ thống phải lưu response và feedback để phục vụ aggregation và analysis. REQ-010. | Correct |
| Q12 | Manager có thể xem kết quả tổng hợp của survey không? | Có. Manager có thể xem aggregated survey results sau khi có responses. REQ-011. | Correct |
| Q13 | Manager có thể xem feedback mà Respondent gửi không? | Có. REQ-012. | Correct |
| Q14 | AI có phân tích sentiment của feedback không? | Có. Hệ thống AI phân tích sentiment và xác định emotional trend. REQ-013. | Correct |
| Q15 | AI có xác định các topic chính trong feedback không? | Có. Đây là chức năng Should trong REQ-014. | Correct |
| Q16 | AI có tạo summary từ feedback không? | Có. Đây là chức năng Should trong REQ-015. | Correct |
| Q17 | Manager có thể xem kết quả AI analysis không? | Có. Manager có thể xem sentiment, topic và summary. REQ-016. | Correct |
| Q18 | Manager có Dashboard tổng quan survey không? | Có. Manager có thể xem Survey Dashboard gồm overview của survey results và feedback analysis. REQ-017. | Correct |
| Q19 | AI có được tự ý thay đổi survey hoặc question không? | KHÔNG ĐỦ DỮ LIỆU. Các requirement hiện tại chỉ xác nhận AI thực hiện sentiment, topic analysis và summary; không xác nhận AI được quyền chỉnh sửa survey/question. | Correct |
| Q20 | Có bắt buộc AI phải dùng một model cụ thể không? | KHÔNG ĐỦ DỮ LIỆU. Requirement hiện tại không xác định tên AI model cụ thể. | Correct |
| Q21 | Có yêu cầu hệ thống phải lưu conversation history của AI trong 30 ngày không? | KHÔNG ĐỦ DỮ LIỆU. Các REQ-001 → REQ-017 hiện tại không xác định retention period cho AI conversation. | Correct |
| Q22 | Respondent có được chỉnh sửa response sau khi Submit không? | KHÔNG ĐỦ DỮ LIỆU. REQ-009 chỉ xác nhận Respondent có thể submit response sau khi hoàn thành required questions. | Correct |
| Q23 | Một Respondent có được trả lời cùng một survey nhiều lần không? | KHÔNG ĐỦ DỮ LIỆU. Requirement hiện tại không xác định giới hạn số lần Respondent được submit survey. | Correct |
| Q24 | Survey có bắt buộc phải có bao nhiêu question trước khi Publish? | KHÔNG ĐỦ DỮ LIỆU. REQ-005 không xác định số lượng question tối thiểu để publish. | Correct |
| Q25 | Có chức năng export survey results ra Excel/CSV không? | Không được xác nhận / Out of Scope hiện tại. REQ-011 chỉ xác nhận Manager có thể xem aggregated survey results. | Correct |
| Q26 | Có hỗ trợ anonymous response không? | KHÔNG ĐỦ DỮ LIỆU. Requirement hiện tại không xác nhận survey anonymous. | Correct |
| Q27 | AI sentiment analysis có bắt buộc phải đạt một accuracy cụ thể không? | KHÔNG ĐỦ DỮ LIỆU. REQ-013 chỉ xác định chức năng phân tích sentiment, không xác định accuracy target. | Correct |
| Q28 | AI có được tự động publish survey sau khi Researcher tạo xong không? | Không. REQ-005 xác định Researcher là Actor thực hiện Publish survey. Không có requirement cho AI tự publish. | Correct |
| Q29 | Manager có được chỉnh sửa hoặc publish survey không? | Không được xác nhận. Các REQ-002 đến REQ-006 xác định Researcher là Actor của các chức năng này. | Correct |
| Q30 | Nếu requirement không nói rõ một behavior, AI có được tự quyết định không? | Không. AI phải trả lời **KHÔNG ĐỦ DỮ LIỆU** hoặc chỉ ra phần chưa được xác nhận thay vì tự suy diễn. | Correct |

---

# Kết quả benchmark mẫu

**30/30 = 100% Correct**

Trong đó:

- **Q1–Q18:** Kiểm tra AI có hiểu đúng các chức năng đã được xác nhận.
- **Q19–Q20:** Kiểm tra AI có tự mở rộng quyền của AI hoặc tự chọn công nghệ hay không.
- **Q21–Q27:** Kiểm tra khả năng nhận diện thông tin chưa được xác định trong Vault.
- **Q28–Q29:** Kiểm tra Actor và quyền thực hiện chức năng.
- **Q30:** Kiểm tra nguyên tắc quan trọng nhất: không được hallucinate khi Vault không có dữ liệu.

---

# Quy tắc đánh giá

| Kết quả | Ý nghĩa |
|---|---|
| **Correct** | AI trả lời đúng với requirement và có thể truy vết nguồn |
| **Wrong** | AI trả lời trái với requirement đã xác nhận |
| **Unsupported** | AI đưa ra thông tin không tồn tại trong Vault như thể đó là requirement |
| **Incomplete** | AI trả lời thiếu điều kiện hoặc business rule quan trọng |

---

# Các lỗi đặc biệt cần đánh dấu

## 1. AI tự tạo Business Rule

Ví dụ câu hỏi:

> "Một Respondent có được trả lời survey nhiều lần không?"

Câu trả lời:

> "Không, mỗi Respondent chỉ được trả lời một lần."

Kết quả phải là:

**Unsupported / Wrong**

Lý do:

Requirement hiện tại **không xác định** giới hạn một Respondent chỉ được submit một lần.

Câu trả lời đúng:

> **KHÔNG ĐỦ DỮ LIỆU.** Requirement hiện tại chưa xác định Respondent có được trả lời một survey nhiều lần hay không.

---

## 2. AI tự thêm chức năng

Ví dụ:

> "Hệ thống có cho phép export kết quả ra Excel không?"

Nếu AI trả lời:

> "Có, Manager có thể export kết quả ra Excel."

Kết quả:

**Unsupported**

Vì REQ-011 chỉ xác nhận Manager có thể xem aggregated survey results, không xác nhận chức năng export.

---

## 3. AI tự quyết định công nghệ

Ví dụ:

> "AI analysis bắt buộc sử dụng GPT model nào?"

Câu trả lời:

> "Hệ thống bắt buộc sử dụng GPT-5."

Kết quả:

**Unsupported**

Vì requirement không xác định AI model cụ thể.

---

## 4. AI tự mở rộng quyền của Actor

Ví dụ:

> "Manager có thể Publish survey không?"

Nếu AI trả lời:

> "Có, Manager có thể publish survey."

Kết quả:

**Wrong / Unsupported**

Vì REQ-005 xác định Researcher là Actor của Publish survey.

---

# Benchmark Acceptance Rule

AI được xem là đạt benchmark khi:

```text
AI Answer
    ↓
Có đúng với Vault?
    ↓
    ├── YES → Correct
    │
    └── NO
         ↓
    Có tự suy diễn thông tin không?
         ↓
    Unsupported / Wrong