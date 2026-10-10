# Project Vault Index

> **Project:** AI Customer Feedback & Survey Platform  
> **Team:** Nhóm 9  
> **Purpose:** Source of Truth cho project

---

## 1. Source Documents

Thư mục `01-Source/` chứa các tài liệu gốc của project. Nội dung source không được tự ý chỉnh sửa để phù hợp với ý tưởng nhóm.

| File | Status | Description |
|---|---|---|
| [[../01-Source/Customer Brief]] | CURRENT | Tài liệu mô tả nhu cầu và phạm vi ban đầu của project |
| [[../01-Source/Interview Notes]] | CURRENT | Ghi chú phỏng vấn và các thông tin được xác nhận |

---

## 2. Requirements

Thư mục `02-Requirements/` chứa các requirement đã được chuẩn hóa từ source.

| File                                   | Status  | Description                              |
| -------------------------------------- | ------- | ---------------------------------------- |
| [[Functional Requirements]]            | CURRENT | Functional requirements của hệ thống     |
| [[non-functional-requirements]]        | CURRENT | Non-functional requirements của hệ thống |
| [[vault/02-Requiments/business-rules]] | CURRENT | Business rules của hệ thống              |
| [[vault/02-Requiments/open-questions]] | CURRENT | Các vấn đề chưa được xác nhận            |

---

## 3. Domain

Thư mục `03-Domain/` chứa kiến thức domain được chuẩn hóa.

| File | Status | Description |
|---|---|---|
| [[../03-Domain/glossary]] | CURRENT | Thuật ngữ và định nghĩa thống nhất của project |
| [[../03-Domain/business-rules]] | CURRENT | Business rules được sử dụng trong domain |
| [[../03-Domain/workflows]] | CURRENT | Các workflow chính của hệ thống |

---

## 4. Product

Thư mục `04-Product/` chứa tài liệu về product scope, feature và hành vi sản phẩm.

**Status:** CURRENT

---

## 5. Design

Thư mục `05-Design/` chứa tài liệu thiết kế UI/UX và các sơ đồ thiết kế.

**Status:** CURRENT

---

## 6. Technical

Thư mục `06-technical/` chứa tài liệu kiến trúc, công nghệ, database và API.

**Status:** CURRENT

---

## 7. Testing

Thư mục `07-testing/` chứa test plan, test cases, bug log và kết quả kiểm thử.

| File | Status | Description |
|---|---|---|
| [[../07-testing/Bug Log]] | DRAFT | Các lỗi đã xác nhận từ source review và kế hoạch kiểm thử hồi quy |

**Status:** CURRENT

---

## 8. Decisions

Thư mục `08-decisions/` chứa các quyết định quan trọng của project.

Mọi quyết định mới ảnh hưởng đến requirement, business rule, architecture hoặc design phải được ghi lại tại đây.

**Status:** CURRENT

---

## 9. Meetings

Thư mục `09-meetings/` chứa meeting notes, action items và các nội dung trao đổi quan trọng.

**Status:** CURRENT

---

# Source Status

| Status | Meaning |
|---|---|
| CURRENT | Tài liệu hiện đang được sử dụng |
| SUPERSEDED | Đã bị thay thế bởi tài liệu mới |
| DRAFT | Đang soạn thảo, chưa được xác nhận |
| ARCHIVED | Không còn sử dụng |

---

# Source of Truth

Khi AI hoặc thành viên project cần trả lời câu hỏi:

1. Ưu tiên tài liệu trong 
2. Requirement chính thức lấy từ `02-Requirements/`.
3. Domain knowledge lấy từ `03-Domain/`.
4. Các quyết định đã được xác nhận lấy từ `08-decisions/`.
5. Nếu tài liệu không đủ thông tin → **KHÔNG ĐỦ DỮ LIỆU**.
6. Không tự suy diễn hoặc bổ sung thông tin ngoài source.