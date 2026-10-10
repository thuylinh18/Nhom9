# AI USAGE LOG — INSIGHTFLOW | NHÓM 9
**Trạng thái:** BẢN NHÁP CÓ ĐỐI CHIẾU SOURCE — cần thành viên xác nhận hoạt động cá nhân.

## Lưu ý quan trọng

Đây là **mẫu AI Usage Log được điền dựa trên artifact thực tế**, không phải nhật ký lịch sử lời nhắc được phục hồi. Source code và tài liệu chứng minh hệ thống có artifact, nhưng không đủ chứng minh ai đã dùng công cụ AI nào, đã gõ prompt nào, tốn bao lâu hoặc ai phê duyệt. Các trường đó được để trống có chủ đích.

**Phân biệt hai loại:** (1) AI hỗ trợ quá trình phát triển như phân tích yêu cầu/Vault; (2) AI Feature vận hành trong sản phẩm như Gemini phân tích feedback. Chỉ ghi loại (1) vào bảng AI Usage Log phát triển nếu có bằng chứng thực tế.

## AI-LOG-01 — Thiết lập ngữ cảnh và thứ tự ưu tiên nguồn trong Project Vault

**Phân loại:** AI hỗ trợ phát triển / Vault  
**Mức xác minh:** Có tài liệu; CHƯA xác nhận lịch sử gọi AI

| Trường | Nội dung |
|---|---|
| Task | Thiết lập nguyên tắc cung cấp context để AI đọc đúng tài liệu dự án InsightFlow. |
| Input/Context | Customer Brief; Interview Notes; Functional Requirements; Business Rules; Open Questions. |
| AI/Tool | [CẦN XÁC NHẬN: ChatGPT / Claude / công cụ khác đã thực sự sử dụng] |
| Prompt/Skill | [DÁN PROMPT GỐC]. Gợi ý mô tả: yêu cầu AI chỉ trả lời theo Project Vault, ghi nguồn/REQ ID, không tự tạo business rule và dùng “KHÔNG ĐỦ DỮ LIỆU” nếu nguồn thiếu. |
| Output | Có Index.md và source-priority.md; quy tắc ghi nhận Interview Notes ưu tiên đối với thông tin được xác nhận, Customer Brief cho bối cảnh/phạm vi. |
| Human Verification | [CẦN XÁC NHẬN AI/Vault đã rà soát ra sao]. Có thể đối chiếu Index, source-priority và các source gốc. |
| Decision | [CẦN ĐIỀN: chấp nhận/chỉnh sửa/từ chối đề xuất nào và vì sao]. |
| Time | [Ngày, thời gian thủ công và thời gian sử dụng AI — nếu có ghi chép]. |

**Evidence:** `Nhom9/vault/00-Index/Index.md`, `Nhom9/vault/00-Index/source-priority.md`, `Nhom9/vault/01-Source/Customer Brief.md`, `Nhom9/vault/01-Source/Interview Notes.md`

## AI-LOG-02 — Rà soát Q&A benchmark dựa trên Project Vault

**Phân loại:** AI hỗ trợ phát triển / Vault  
**Mức xác minh:** Có bộ benchmark MẪU; CHƯA xác nhận run độc lập

| Trường | Nội dung |
|---|---|
| Task | Xây dựng/đánh giá câu hỏi kiểm tra AI có trả lời đúng requirement và biết từ chối suy đoán. |
| Input/Context | REQ-001 đến REQ-017; Use Cases; Business Rules; Source Priority. |
| AI/Tool | [CẦN XÁC NHẬN công cụ đã dùng để chạy benchmark] |
| Prompt/Skill | [DÁN PROMPT GỐC]. Gợi ý mô tả: trả lời 30 câu hỏi chỉ theo Vault, chỉ rõ REQ/UC; khi thiếu dữ liệu trả “KHÔNG ĐỦ DỮ LIỆU”. |
| Output | BENCHMARKS.md chứa 30 câu, expected answers và cột KQ đều ghi Correct; tài liệu mô tả đây là “kết quả benchmark mẫu” 30/30. |
| Human Verification | [CẦN BỔ SUNG log câu trả lời của AI và người chấm]. File hiện có không thể tự chứng minh 30 lần chạy thật. |
| Decision | [CẦN ĐIỀN quyết định giữ/sửa câu hỏi, expected answers và lỗi AI được xử lý]. |
| Time | [Ngày và thời gian thực tế]. |

**Evidence:** `Nhom9/BENCHMARKS.md`, `Nhom9/vault/00-Index/source-priority.md`

## AI-LOG-03 — Thiết kế prompt và đầu ra AI Feature

**Phân loại:** AI Feature trong sản phẩm  
**Mức xác minh:** ĐÃ CÓ đặc tả và mã nguồn; CHƯA xác nhận người thực hiện

| Trường | Nội dung |
|---|---|
| Task | Định nghĩa prompt để xử lý phản hồi khách hàng bằng Gemini, có định dạng đầu ra JSON. |
| Input/Context | REQ-013 (sentiment), REQ-014 (topic), REQ-015 (summary); feedback đã lưu của từng survey. |
| AI/Tool | Google Gemini qua backend; đây là AI tích hợp sản phẩm, không tự chứng minh người phát triển đã dùng AI hỗ trợ code. |
| Prompt/Skill | Prompt thực tế trong build_analysis_prompt(): phân loại positive/neutral/negative; đếm số lượng; dominant_sentiment; topics; tóm tắt tiếng Việt 2–4 câu; cấm bịa dữ liệu và sửa feedback gốc. |
| Output | JSON gồm feedback_count, sentiment_distribution, dominant_sentiment, topics(name/count), summary. Backend chuyển topics thành danh sách nhãn và tính phần trăm sentiment. |
| Human Verification | Đã đối chiếu đặc tả với gemini_service.py và services.py. [BỔ SUNG kết quả chạy request thực tế của nhóm]. |
| Decision | Trong code có validation của JSON và lưu AIAnalysisResult. [BỔ SUNG PR/commit, quyết định kỹ thuật của thành viên]. |
| Time | [Ngày phát triển, thời gian dùng AI/thủ công nếu có]. |

**Evidence:** `AI-Feature-Integration/AI Feature Specification.md`, `backend/apps/analytics/gemini_service.py`, `backend/apps/analytics/services.py`, `backend/apps/analytics/models.py`

## AI-LOG-04 — Xử lý ngoại lệ, lỗi Gemini và dữ liệu rỗng

**Phân loại:** AI Feature trong sản phẩm  
**Mức xác minh:** ĐÃ CÓ code fallback; CHƯA xác nhận kết quả thử nghiệm trực tiếp

| Trường | Nội dung |
|---|---|
| Task | Giữ luồng phân tích hoạt động khi không có feedback hoặc khi API Gemini không khả dụng. |
| Input/Context | Đặc tả mục 8 và 14.3; feedback trống; lỗi API/quota/timeout. |
| AI/Tool | Gemini REST API kết hợp local rule-based fallback ở backend. |
| Prompt/Skill | Không dùng prompt khi count = 0; khi Gemini lỗi, backend gọi _rule_based_fallback_analysis(). |
| Output | Code tạo AIAnalysisResult với Neutral, 100% neutral, General Feedback và thông báo chưa có phản hồi khi count = 0; nếu API lỗi, sử dụng rule-based fallback. |
| Human Verification | Đối chiếu services.py với eval-set.csv (TC-26) và Evaluation-result.md Demo 3. LƯU Ý: CSV dự kiến NO_FEEDBACK, nhưng code trả Neutral/General Feedback; nhóm cần thống nhất kỳ vọng trước khi kết luận PASS. |
| Decision | [CẦN ĐIỀN quyết định nhóm về trạng thái NO_FEEDBACK so với Neutral, cùng bằng chứng chạy thử]. |
| Time | [Ngày thực hiện và thời gian thực tế]. |

**Evidence:** `backend/apps/analytics/services.py`, `backend/apps/analytics/gemini_service.py`, `eval-set.csv`, `AI-Feature-Integration/Evaluation-result.md`

## AI-LOG-05 — Đánh giá phân loại cảm xúc và rút kinh nghiệm

**Phân loại:** AI Evaluation  
**Mức xác minh:** CÓ tài liệu kết quả 20 ca; CHƯA có raw run logs

| Trường | Nội dung |
|---|---|
| Task | Đánh giá sentiment, topics, tính hợp lệ của JSON và khả năng bảo toàn feedback gốc. |
| Input/Context | eval-set.csv gồm 30 test case; tài liệu Evaluation-result.md ghi kết quả 20 test case chi tiết. |
| AI/Tool | Google Gemini (theo tài liệu Evaluation-result.md). |
| Prompt/Skill | Prompt xử lý phản hồi trong backend/apps/analytics/gemini_service.py; không có lịch sử prompt đánh giá riêng trong ZIP. |
| Output | Evaluation-result.md ghi 15/20 sentiment đúng (75%), 5 ca REVIEW là TC-EVAL-11/12/13/18/19; tài liệu cũng ghi JSON hợp lệ 100% và bảo toàn dữ liệu gốc 100%. |
| Human Verification | Kiểm tra lại 5 ca REVIEW, lưu input/expected/actual/log API và cách chấm; chưa tìm thấy log chạy nguyên bản trong ZIP. |
| Decision | [CẦN ĐIỀN việc nhóm đã làm sau 5 ca REVIEW, ví dụ sửa prompt/label hoặc chấp nhận giới hạn]. Không ghi “đã cải tiến” nếu chưa có bằng chứng. |
| Time | Tài liệu ghi ngày đánh giá 09/10/2026; [điền thời gian thực tế]. |

**Evidence:** `eval-set.csv`, `AI-Feature-Integration/Evaluation-result.md`, `AI-Feature-Integration/AI Feature Specification.md`

## AI-LOG-06 — Kiểm thử API và luồng Manager xem AI Analysis

**Phân loại:** AI Verification / Integration  
**Mức xác minh:** CÓ mã test; CHƯA xác nhận test được chạy trong phiên này

| Trường | Nội dung |
|---|---|
| Task | Kiểm thử chức năng Manager trigger và xem AI Analysis, hạn chế truy cập trái quyền. |
| Input/Context | US-013, US-014, UC-013, UC-014; API /surveys/<id>/ai-analysis/. |
| AI/Tool | [CẦN XÁC NHẬN có dùng AI hỗ trợ viết test hay không; test framework là pytest]. |
| Prompt/Skill | [DÁN PROMPT GỐC nếu thực sự nhờ AI viết/review test]. |
| Output | Có test_manager_trigger_and_view_ai_analysis() cho POST/GET và test_non_manager_cannot_view_results() cho quyền truy cập kết quả survey. |
| Human Verification | [DÁN log pytest/CI và link PR]. README công bố suite 66 backend + 14 frontend test nhưng chưa xác minh thực chạy từ ZIP. |
| Decision | [CẦN ĐIỀN kết luận sau khi chạy test và lỗi đã sửa]. |
| Time | [Thời gian thực tế]. |

**Evidence:** `backend/tests/test_analytics.py`, `backend/apps/analytics/views.py`, `frontend/src/pages/manager/AIAnalysisScreen.tsx`, `.github/workflows/ci.yml`

## Kiểm tra chéo trước khi nộp

- [ ] Thay các trường `[CẦN ...]` bằng dữ kiện từ prompt history, PR/commit, người review, ngày và thời gian thật.
- [ ] Kiểm tra lại 5 trường hợp sentiment REVIEW trong Evaluation-result.md.
- [ ] Làm rõ sự khác biệt: bộ eval-set.csv có 30 ca, tài liệu kết quả chi tiết có 20 ca.
- [ ] Không biến chữ “kết quả benchmark mẫu 30/30” thành tuyên bố đã chạy benchmark độc lập nếu thiếu log.
- [ ] Xác nhận với nhóm quy ước phản hồi rỗng: CSV kỳ vọng NO_FEEDBACK; code hiện lưu Neutral và General Feedback.
- [ ] Đính kèm bằng chứng test/CI, ảnh demo 2 pass + 1 edge, và link PR của phần mình phụ trách.
