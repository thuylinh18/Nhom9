# Functional Requirements

Tài liệu này tổng hợp các yêu cầu chức năng của hệ thống AI Customer Feedback & Survey Platform.

Các Requirement ID được đánh số tuần tự theo dạng REQ-XXX và được sử dụng thống nhất để truy vết giữa Requirement, Use Case, Design, Testing và Decision Log.

---

## 1. Authentication

### REQ-001 — Đăng nhập hệ thống

**Requirement:** User có thể đăng nhập vào hệ thống bằng tài khoản hợp lệ.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** User

**Status:** CONFIRMED

---

## 2. Survey Management

### REQ-002 — Tạo survey

**Requirement:** Researcher có thể tạo một survey mới và nhập các thông tin cần thiết của survey.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Researcher

**Status:** CONFIRMED

---

### REQ-003 — Chỉnh sửa survey

**Requirement:** Researcher có thể chỉnh sửa thông tin của survey trước khi survey được publish.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Researcher

**Status:** CONFIRMED

---

### REQ-004 — Thêm question vào survey

**Requirement:** Researcher có thể thêm, chỉnh sửa và quản lý các question thuộc một survey.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Researcher

**Status:** CONFIRMED

---

### REQ-005 — Publish survey

**Requirement:** Researcher có thể publish survey để Respondent có thể truy cập và tham gia.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Researcher

**Status:** CONFIRMED

---

### REQ-006 — Close survey

**Requirement:** Researcher có thể close một survey đang hoạt động để ngừng tiếp nhận response mới.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Researcher

**Status:** CONFIRMED

---

## 3. Survey Response

### REQ-007 — Xem survey

**Requirement:** Respondent có thể xem các survey đang ở trạng thái publish.

**Priority:** Must

**Source:** `vault/00-discovery/problem-statement.md`

**Actor:** Respondent

**Status:** CONFIRMED

---

### REQ-008 — Trả lời survey

**Requirement:** Respondent có thể trả lời các question trong một survey đã được publish.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Respondent

**Status:** CONFIRMED

---

### REQ-009 — Submit response

**Requirement:** Respondent có thể submit response sau khi hoàn thành các question bắt buộc của survey.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Respondent

**Status:** CONFIRMED

---

### REQ-010 — Lưu response và feedback

**Requirement:** System phải lưu response và feedback do Respondent gửi để phục vụ việc tổng hợp và phân tích kết quả.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** System

**Status:** CONFIRMED

---

## 4. Result Management

### REQ-011 — Xem kết quả survey

**Requirement:** Manager có thể xem kết quả tổng hợp của survey sau khi Respondent gửi response.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Manager

**Status:** CONFIRMED

---

### REQ-012 — Xem feedback

**Requirement:** Manager có thể xem feedback được gửi bởi Respondent để phục vụ việc đánh giá và phân tích.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Manager

**Status:** CONFIRMED

---

## 5. AI Analysis

### REQ-013 — Phân tích sentiment

**Requirement:** System hỗ trợ AI phân tích sentiment của feedback và xác định xu hướng cảm xúc của feedback.

**Priority:** Must

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** System

**Status:** CONFIRMED

---

### REQ-014 — Phân tích topic

**Requirement:** System hỗ trợ AI xác định các topic hoặc chủ đề chính xuất hiện trong feedback.

**Priority:** Should

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** System

**Status:** CONFIRMED

---

### REQ-015 — Tạo AI summary

**Requirement:** System hỗ trợ AI tạo summary từ các feedback nhằm giúp Manager nhanh chóng nắm được những vấn đề và ý kiến chính của Respondent.

**Priority:** Should

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** System

**Status:** CONFIRMED

---

### REQ-016 — Xem kết quả phân tích AI

**Requirement:** Manager có thể xem kết quả phân tích AI, bao gồm sentiment, topic và summary của feedback.

**Priority:** Should

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Manager

**Status:** CONFIRMED

---

## 6. Dashboard

### REQ-017 — Xem Survey Dashboard

**Requirement:** Manager có thể xem dashboard tổng quan về kết quả survey và các thông tin phân tích feedback.

**Priority:** Should

**Source:** `vault/00-discovery/Project Charter.md`

**Actor:** Manager

**Status:** CONFIRMED