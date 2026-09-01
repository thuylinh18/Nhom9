# Source Priority

## 1. Mục đích

Tài liệu này quy định thứ tự ưu tiên của các nguồn thông tin được sử dụng trong Project Vault.

Mục tiêu là đảm bảo khi các tài liệu có thông tin khác nhau hoặc mâu thuẫn, nhóm và AI biết tài liệu nào được ưu tiên và không tự suy đoán.

---

## 2. Các nguồn chính thức

Project hiện có 2 nguồn gốc được lưu trong thư mục `01-Source/`:

| Source | Status | Vai trò |
|---|---|---|
| [[Customer Brief]] | CURRENT | Nguồn chính mô tả bài toán, mục tiêu, phạm vi và yêu cầu ban đầu |
| [[Interview Notes]] | CURRENT | Nguồn bổ sung từ phỏng vấn và các thông tin được xác nhận |

Hai tài liệu trên là **source of truth** của Project Vault.

---

## 3. Thứ tự ưu tiên nguồn

Khi có thông tin khác nhau giữa các tài liệu, áp dụng thứ tự sau:

### Priority 1 — Interview Notes

Thông tin được xác nhận trực tiếp thông qua phỏng vấn được ưu tiên cao nhất đối với các vấn đề đã được trao đổi và xác nhận.

Đặc biệt áp dụng cho:

- nhu cầu thực tế của người dùng;
- hành vi sử dụng hệ thống;
- business rules;
- các quyết định đã được xác nhận;
- các vấn đề được làm rõ sau khi trao đổi.

---

### Priority 2 — Customer Brief

Customer Brief là nguồn chính cho:

- mục tiêu project;
- problem context;
- phạm vi ban đầu;
- đối tượng sử dụng;
- các yêu cầu được mô tả trong brief;
- các giới hạn hoặc giả định được nêu trong brief.

Nếu Interview Notes không đề cập hoặc không làm rõ một vấn đề, sử dụng Customer Brief.

---

## 4. Discovery documents

Các tài liệu trong thư mục `discovery/` là tài liệu **phân tích và tổng hợp từ source**, không phải source gốc.

Ví dụ:

- `discovery/requirements`
- `discovery/scope`
- `discovery/glossary`
- `discovery/open-questions`
- `discovery/requirement-review`
- `discovery/problem-statement`
- `discovery/stakeholders-personas`
- `discovery/user-research`
- `discovery/Project Charter`

Các tài liệu này được sử dụng để:

- tổng hợp thông tin;
- phân tích yêu cầu;
- xác định phạm vi;
- phát hiện vấn đề;
- chuẩn hóa thuật ngữ;
- chuẩn bị cho các bước thiết kế tiếp theo.

Tuy nhiên, các tài liệu discovery **không được tự động xem là nguồn cao hơn source gốc**.

Nếu discovery document khác với source gốc:

1. Kiểm tra lại `Customer Brief`.
2. Kiểm tra `Interview Notes`.
3. Xác định thông tin nào đã được xác nhận.
4. Nếu chưa thể xác định nguồn nào đúng, không tự chọn.
5. Ghi vấn đề vào `open-questions.md` để làm rõ.

---

## 5. Requirement documents

Các tài liệu requirement trong `02-Requirements/` là phiên bản requirement đã được nhóm chuẩn hóa từ source.

Ví dụ:

- `Functional Requirements`
- `non-functional-requirements`
- `business-rules.md`
- `open-questions.md`

Các requirement phải có khả năng truy ngược về source.

Requirement không được tự tạo ra chỉ dựa trên kiến thức bên ngoài hoặc suy đoán của nhóm.

---

## 6. Khi hai source bị xung đột

Nếu `Customer Brief` và `Interview Notes` chứa thông tin mâu thuẫn:

### Trường hợp 1 — Interview Notes xác nhận rõ

Ưu tiên `Interview Notes`.

Ví dụ:

> Customer Brief nói một chức năng là optional, nhưng trong Interview Notes người dùng xác nhận chức năng đó là bắt buộc.

→ Sử dụng thông tin đã được xác nhận trong Interview Notes.

---

### Trường hợp 2 — Interview Notes không xác nhận rõ

Không được tự suy đoán.

→ Giữ thông tin từ Customer Brief và ghi vấn đề cần làm rõ trong `open-questions.md`.

---

### Trường hợp 3 — Hai nguồn đều không đủ thông tin

Không được tự bổ sung bằng kiến thức bên ngoài.

→ Trả lời:

**KHÔNG ĐỦ DỮ LIỆU**

và ghi rõ cần bổ sung thông tin gì.

---

## 7. Quy tắc sử dụng nguồn cho AI

Khi AI trả lời câu hỏi về project, AI phải:

1. Chỉ sử dụng thông tin có trong Project Vault.
2. Ưu tiên source theo thứ tự được quy định trong file này.
3. Không sử dụng kiến thức bên ngoài để lấp khoảng trống.
4. Không tự tạo requirement hoặc business rule.
5. Nêu rõ ID của requirement/business rule nếu có.
6. Nêu file nguồn được sử dụng.
7. Nếu có xung đột, phải chỉ ra xung đột.
8. Nếu không đủ thông tin, trả lời `KHÔNG ĐỦ DỮ LIỆU`.

---

## 8. Source status

Các source hiện tại:

| File | Status | Ghi chú |
|---|---|---|
| [[Customer Brief]] | CURRENT | Source gốc hiện tại |
| [[Interview Notes]] | CURRENT | Source gốc hiện tại |

Chưa có source nào được đánh dấu `SUPERSEDED`.

---

## 9. Quy tắc cập nhật

Khi có source mới:

1. Đưa source gốc vào `01-Source/`.
2. Không chỉnh sửa nội dung source gốc.
3. Thêm source mới vào `00-Index/Index.md`.
4. Xác định source mới là `CURRENT` hay `SUPERSEDED`.
5. Cập nhật file này nếu source mới làm thay đổi thứ tự ưu tiên.
6. Cập nhật requirement/domain documents nếu source mới tạo ra thay đổi.
7. Nếu thay đổi là một quyết định của Project Owner, ghi lại trong `08-decisions/`.

---

## 10. Nguyên tắc quan trọng

**Source gốc là bằng chứng.**

**Discovery là phân tích.**

**Requirement là phiên bản chuẩn hóa của thông tin đã được xác nhận.**

**Decision Log là nơi ghi các quyết định mới của project.**

Không được sửa source gốc để làm cho nó phù hợp với ý tưởng của nhóm.