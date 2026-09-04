# AI Customer Feedback & Survey Platform
# Thiết kế Prototype & Engineering Handoff

## 1. Trạng thái tài liệu

- **Design system:** InsightFlow Core v0.1
- **Đối tượng:** Ứng dụng Web Responsive
- **Frontend:** React + TypeScript
- **Database:** PostgreSQL
- **Nguồn thông tin chính:** `vault/`
- **Người dùng chính:** User, Researcher, Respondent, Manager
- **Múi giờ:** `Asia/Ho_Chi_Minh`
- **Mục tiêu Accessibility:** WCAG 2.1 Level AA
- **Trạng thái:** DESIGN PROTOTYPE — sẵn sàng cho giai đoạn lập kế hoạch triển khai, phụ thuộc vào các câu hỏi chưa được xác nhận ở mục 15

Tài liệu này định nghĩa hệ thống giao diện, cấu trúc màn hình, hành vi component, quy tắc responsive và luồng prototype cần thiết để triển khai hệ thống **AI Customer Feedback & Survey Platform**.

Tài liệu này không thay thế:

- Functional Requirements
- User Stories
- Use Cases
- Acceptance Criteria
- Non-functional Requirements
- Các tài liệu chính thức khác trong Vault

Khi có xung đột giữa tài liệu này và tài liệu Requirement, **Requirement là nguồn có độ ưu tiên cao hơn**.

### 1.1 Mức độ xác thực của thông tin

Mỗi quyết định thiết kế thuộc một trong ba mức:

1. **Bắt buộc**

   Được xác nhận trực tiếp từ REQ, UC, US, AC hoặc NFR.

2. **Quyết định Prototype**

   Là lựa chọn giao diện cần thiết để Prototype hoàn chỉnh và nhất quán.

   Đây chưa phải là Product Requirement mới.

3. **Câu hỏi chưa xác nhận**

   Hành vi nghiệp vụ chưa được xác nhận.

   Developer không được tự động xem Prototype là yêu cầu chính thức.

---

# 2. Phạm vi và truy vết

## 2.1 Bản đồ Capability

| Khu vực | User Story | Use Case | Functional Requirement |
|---|---|---|---|
| Đăng nhập | US-001 | UC-001 | REQ-001 |
| Tạo Survey | US-002 | UC-002 | REQ-002 |
| Chỉnh sửa Survey | US-003 | UC-003 | REQ-003 |
| Quản lý Question | US-004 | UC-004 | REQ-004 |
| Publish Survey | US-005 | UC-005 | REQ-005 |
| Close Survey | US-006 | UC-006 | REQ-006 |
| Xem Survey | US-007 | UC-007 | REQ-007 |
| Trả lời Survey | US-008 | UC-008 | REQ-008 |
| Submit Response | US-009 | UC-009 | REQ-009 |
| Lưu Response và Feedback | US-010 | UC-010 | REQ-010 |
| Xem kết quả Survey | US-011 | UC-011 | REQ-011 |
| Xem Feedback | US-012 | UC-012 | REQ-012 |
| Phân tích Feedback bằng AI | US-013 | UC-013 | REQ-013, REQ-014, REQ-015 |
| Xem kết quả phân tích AI | US-014 | UC-014 | REQ-016 |
| Survey Dashboard | US-015 | UC-015 | REQ-017 |

Toàn bộ **17 Requirement đã xác nhận** được bao phủ bởi **15 User Story** và **15 Use Case** hiện tại.

`REQ-013`, `REQ-014`, `REQ-015` hiện được gom vào `US-013 / UC-013` vì cả ba đều thuộc một capability xử lý AI của System, bao gồm:

- Phân tích sentiment.
- Phân tích topic.
- Tạo AI summary.

Việc tách `US-013` thành:

- `US-013A` — Phân tích sentiment.
- `US-013B` — Phân tích topic.
- `US-013C` — Tạo AI summary.

có thể được đề xuất trong quá trình refinement, nhưng **chưa được xem là scope chính thức** trong tài liệu này.

---

# 3. Nguyên tắc trải nghiệm

## 3.1 Đơn giản khi thu thập Feedback

Respondent phải có thể hiểu câu hỏi và gửi Feedback mà không phải thực hiện các bước không cần thiết.

## 3.2 Trạng thái Survey phải rõ ràng

Published Survey có thể được Respondent truy cập và tham gia.

Closed Survey không tiếp nhận Response mới.

## 3.3 Researcher phải dễ kiểm soát Survey

Các chức năng:

- Tạo Survey.
- Chỉnh sửa Survey.
- Quản lý Question.
- Publish Survey.
- Close Survey.

phải dễ tìm và phân biệt rõ ràng.

## 3.4 AI phải hỗ trợ ra quyết định

AI không nên làm giao diện trở nên phức tạp.

Các kết quả:

- Sentiment.
- Topic.
- Summary.

phải được trình bày dưới dạng thông tin dễ hiểu để Manager có thể sử dụng.

## 3.5 Không làm mất dữ liệu người dùng

Khi xảy ra lỗi Validation hoặc Server Error:

- Không tự động xoá dữ liệu người dùng đã nhập.
- Cho phép người dùng sửa và gửi lại.

## 3.6 Phân biệt rõ quyền của từng Role

Giao diện của:

- Researcher
- Respondent
- Manager

chỉ nên hiển thị những chức năng phù hợp với Role tương ứng.

## 3.7 Không sử dụng màu làm tín hiệu duy nhất

Ví dụ:

- Published.
- Closed.
- Positive.
- Neutral.
- Negative.

phải được thể hiện bằng text cùng với màu sắc hoặc icon khi cần.

## 3.8 AI phải được nhận diện rõ

Thông tin được tạo bởi AI phải có cách trình bày khác biệt với dữ liệu Response hoặc Feedback thông thường.

## 3.9 Accessibility là yêu cầu cơ bản

Hệ thống phải hỗ trợ:

- Keyboard.
- Focus.
- Screen reader.
- Label.
- Error message.
- Touch target.

## 3.10 Thiết kế nhất quán

Không tạo style riêng cho từng màn hình nếu component tương ứng đã tồn tại.

---

# 4. Information Architecture

## 4.1 Danh sách màn hình

| ID | Màn hình | Actor | User Story | Requirement |
|---|---|---|---|---|
| SCR-001 | Đăng nhập | User | US-001 | REQ-001 |
| SCR-002 | Danh sách Survey của Researcher | Researcher | US-002 | REQ-002 |
| SCR-003 | Tạo Survey | Researcher | US-002 | REQ-002 |
| SCR-004 | Chỉnh sửa Survey | Researcher | US-003 | REQ-003 |
| SCR-005 | Quản lý Question | Researcher | US-004 | REQ-004 |
| SCR-006 | Publish Survey | Researcher | US-005 | REQ-005 |
| SCR-007 | Close Survey | Researcher | US-006 | REQ-006 |
| SCR-008 | Danh sách Survey Published | Respondent | US-007 | REQ-007 |
| SCR-009 | Chi tiết và trả lời Survey | Respondent | US-008 | REQ-008 |
| SCR-010 | Submit Response | Respondent | US-009 | REQ-009 |
| SCR-011 | Submit Success | Respondent | US-009 | REQ-009 |
| SCR-012 | Survey Results | Manager | US-011 | REQ-011 |
| SCR-013 | Feedback | Manager | US-012 | REQ-012 |
| SCR-014 | AI Analysis | Manager | US-014 | REQ-016 |
| SCR-015 | Survey Dashboard | Manager | US-015 | REQ-017 |

`US-010` là quá trình System lưu Response và Feedback sau khi Respondent Submit nên không cần tạo một màn hình riêng.

`US-013` là quá trình System xử lý AI nên cũng không cần tạo một màn hình riêng.

---

## 4.2 Navigation theo Role

### User

```text
Login
```

### Researcher

```text
Dashboard / Surveys
│
├── Create Survey
├── Edit Survey
├── Question Management
├── Publish Survey
└── Close Survey
```

### Respondent

```text
Surveys
│
└── Survey Detail
      │
      └── Submit Response
```

### Manager

```text
Dashboard
│
├── Survey Results
├── Feedback
└── AI Analysis
```

---

## 4.3 Prototype Route Map

Các route dưới đây là **quyết định Prototype**, không phải API Contract.

| Route | Screen |
|---|---|
| `/login` | Đăng nhập |
| `/researcher/surveys` | Danh sách Survey |
| `/researcher/surveys/new` | Tạo Survey |
| `/researcher/surveys/:surveyId/edit` | Chỉnh sửa Survey |
| `/researcher/surveys/:surveyId/questions` | Quản lý Question |
| `/researcher/surveys/:surveyId/publish` | Publish Survey |
| `/researcher/surveys/:surveyId/close` | Close Survey |
| `/surveys` | Danh sách Published Survey |
| `/surveys/:surveyId` | Chi tiết / Trả lời Survey |
| `/surveys/:surveyId/submit` | Submit Response |
| `/surveys/:surveyId/success` | Submit Success |
| `/manager/dashboard` | Survey Dashboard |
| `/manager/results` | Survey Results |
| `/manager/feedback` | Feedback |
| `/manager/ai-analysis` | AI Analysis |

---

# 5. Design System

## 5.1 Color

Màu chủ đạo của hệ thống:

- **Dark Forest Green:** `#193B2B`
- **Green:** `#276746`
- **AI Lime:** `#B8ED64`
- **Off White:** `#F6F8F4`
- **White:** `#FFFFFF`

### Color tokens

```css
:root {
  --color-primary: #193B2B;
  --color-primary-hover: #102A1F;

  --color-secondary: #276746;
  --color-secondary-hover: #193B2B;

  --color-ai: #B8ED64;
  --color-ai-soft: #EAF8D8;

  --color-background: #F6F8F4;
  --color-surface: #FFFFFF;

  --color-border: #CCD8CE;
  --color-border-light: #DFE7DF;

  --color-text-primary: #193B2B;
  --color-text-secondary: #5F766A;
  --color-text-muted: #789087;

  --color-success: #276746;
  --color-warning: #A66B16;
  --color-error: #A33E3B;
  --color-info: #467A68;

  --color-success-bg: #EEF8EF;
  --color-warning-bg: #FFF8E8;
  --color-error-bg: #FDF0EF;
  --color-info-bg: #EEF7F5;
}
```

### Quy tắc sử dụng màu

| Mục đích | Màu |
|---|---|
| Brand chính | `#193B2B` |
| Primary button | `#276746` |
| Hover primary | `#193B2B` |
| AI | `#B8ED64` |
| AI background | `#EAF8D8` |
| Page background | `#F6F8F4` |
| Card / Surface | `#FFFFFF` |
| Text chính | `#193B2B` |
| Text phụ | `#5F766A` |
| Success | `#276746` |
| Warning | `#A66B16` |
| Error | `#A33E3B` |

Không sử dụng màu trực tiếp trong từng component nếu token tương ứng đã tồn tại.

---

## 5.2 Typography

Font chính:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

| Kiểu | Size | Line Height | Weight | Sử dụng |
|---|---:|---:|---:|---|
| Display | 48px | 56px | 700 | Login |
| H1 | 30px | 38px | 700 | Page title |
| H2 | 24px | 32px | 700 | Section title |
| H3 | 20px | 30px | 650 | Card title |
| Body | 16px | 24px | 400 | Nội dung |
| Label | 14px | 20px | 600 | Form label |
| Supporting | 14px | 20px | 400 | Mô tả |
| Caption | 12px | 16px | 500 | Metadata |

---

## 5.3 Spacing

Sử dụng hệ thống spacing dựa trên đơn vị cơ sở 4px.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

Không tự tạo các giá trị như:

```css
margin: 13px;
padding: 27px;
gap: 19px;
```

nếu không có lý do thiết kế cụ thể.

---

## 5.4 Radius

```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-pill: 999px;
```

Sử dụng:

| Radius | Component |
|---|---|
| Small | Input nhỏ, badge |
| Medium | Button, Input |
| Large | Card |
| XL | Modal / khu vực lớn |
| Pill | Status badge |

---

## 5.5 Shadow

```css
--shadow-sm:
  0 1px 2px rgba(25, 59, 43, 0.06);

--shadow-md:
  0 8px 24px rgba(25, 59, 43, 0.10);
```

Sử dụng shadow cho:

- Card.
- Modal.
- Dropdown.
- Floating UI.

Không sử dụng shadow cho mọi element.

---

## 5.6 Grid và Breakpoint

| Breakpoint | Quy tắc |
|---|---|
| `< 768px` | Mobile |
| `768px – 1199px` | Tablet |
| `≥ 1200px` | Desktop |

### Mobile

- 1 column.
- Padding 16px.
- Card xếp dọc.
- Navigation dạng drawer.

### Tablet

- 2 column khi phù hợp.
- Padding 24px.

### Desktop

- 12 column grid.
- Sidebar khoảng 240px.
- Content tối đa khoảng 1440px.

---

# 6. Application Shell

## 6.1 Desktop

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│ Sidebar             Header                    User            │
│                                                               │
│ InsightFlow         Page title                                │
│ Dashboard           Supporting text            [Action]       │
│ Surveys                                                         │
│ Feedback            ───────────────────────────────────────   │
│ AI Analysis         Main Content                              │
│                                                               │
│                                                               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Sidebar:

- InsightFlow logo.
- Navigation theo Role.
- Active state rõ ràng.
- Không hiển thị chức năng không thuộc Role.

Header:

- Tên trang.
- User menu.
- Có thể có breadcrumb ở màn hình detail.

---

## 6.2 Mobile

```text
┌──────────────────────────────┐
│ ☰  InsightFlow          User │
├──────────────────────────────┤
│                              │
│ Page Title                   │
│                              │
│ Main Content                 │
│                              │
│                              │
└──────────────────────────────┘
```

Navigation mở bằng drawer.

Drawer phải:

- Trap focus.
- Đóng bằng Escape.
- Có nút đóng.
- Trả focus về button mở drawer.

---

# 7. Core Components

## 7.1 Button

Variants:

```text
Primary
Secondary
Tertiary
AI
Danger
Icon
```

States:

```text
Default
Hover
Active
Focus
Disabled
Loading
```

Ví dụ:

```text
[ Create Survey ]

[ Save Changes ]

[ Publish Survey ]

[ ✨ AI Analysis ]
```

Button loading:

```text
[     Loading...     ]
```

Không thay đổi kích thước button khi loading.

---

## 7.2 Input

Cấu trúc:

```text
Label
↓
Input
↓
Help text
↓
Error message
```

Ví dụ:

```text
Survey title *

[ Customer Feedback Survey                  ]

Tên Survey phải được nhập.
```

Input states:

```text
Default
Focus
Filled
Disabled
Error
```

---

## 7.3 Textarea

Sử dụng cho:

- Survey description.
- Feedback.
- Nội dung cần nhiều dòng.

Ví dụ:

```text
Description

┌───────────────────────────────────────────┐
│                                           │
│                                           │
│                                           │
└───────────────────────────────────────────┘
```

---

## 7.4 Card

Card được sử dụng cho:

- Survey.
- Question.
- Feedback.
- AI Insight.
- Dashboard KPI.

Card anatomy:

```text
Title
Description / Metadata
Status
Content
Action
```

---

## 7.5 Survey Card

```text
┌─────────────────────────────────────────────┐
│ Customer Feedback Survey                    │
│                                             │
│ Khảo sát mức độ hài lòng của khách hàng.    │
│                                             │
│ [Published]                                 │
│                                             │
│                     [View Survey]           │
└─────────────────────────────────────────────┘
```

Researcher có thể có:

```text
[Edit]
[Manage Questions]
[Publish]
[Close]
```

Respondent:

```text
[Participate]
```

Manager:

```text
[View Results]
```

Action phụ thuộc vào Role và trạng thái Survey.

---

## 7.6 Question Card

### Researcher

```text
┌────────────────────────────────────────────┐
│ Question 1                    Required     │
│                                            │
│ How satisfied are you with our service?   │
│                                            │
│ Type: Rating                               │
│                                            │
│                           [Edit]           │
└────────────────────────────────────────────┘
```

### Respondent

```text
┌────────────────────────────────────────────┐
│ 1. How satisfied are you? *                │
│                                            │
│ [ Answer control ]                         │
└────────────────────────────────────────────┘
```

Không xem `Delete Question` là chức năng bắt buộc vì REQ-004 hiện tại chưa xác nhận hành vi Delete.

---

## 7.7 Status Badge

```text
[Draft]
[Published]
[Closed]
```

AI:

```text
[Analyzing]
[AI Ready]
```

Sentiment:

```text
[Positive]
[Neutral]
[Negative]
```

Không chỉ dùng màu để phân biệt trạng thái.

---

## 7.8 AI Insight Card

Các loại:

```text
Sentiment
Topics
Summary
```

Ví dụ:

```text
┌────────────────────────────────────────────┐
│ ✨ AI Analysis                             │
│                                            │
│ Sentiment                                  │
│                                            │
│ Positive                                   │
│                                            │
└────────────────────────────────────────────┘
```

AI section sử dụng:

- Dark Forest Green.
- AI Lime.
- AI Soft Background.

Không hiển thị thông tin kỹ thuật về model nếu chưa được yêu cầu.

---

## 7.9 Table

Sử dụng cho:

- Survey Results.
- Feedback list.

Desktop:

```text
┌───────────────────────────────────────────────┐
│ Survey        Responses       Result          │
├───────────────────────────────────────────────┤
│ Survey A      120             View            │
│ Survey B      80              View            │
└───────────────────────────────────────────────┘
```

Mobile:

- Chuyển thành Card.
- Không ép bảng rộng gây horizontal scroll nếu không cần thiết.

---

## 7.10 Modal / Confirm

Sử dụng cho:

- Publish Survey.
- Close Survey.
- Submit Response.

Ví dụ:

```text
┌────────────────────────────────────────┐
│ Publish Survey?                        │
│                                        │
│ Sau khi Publish, Respondent có thể     │
│ truy cập và tham gia Survey.           │
│                                        │
│ [Cancel]             [Publish Survey]  │
└────────────────────────────────────────┘
```

Modal:

- Focus trap.
- Escape để đóng.
- Trả focus về trigger.
- Không đóng khi mutation đang xử lý nếu việc đóng gây mất dữ liệu.

---

## 7.11 Toast

Success:

```text
✓ Survey created successfully.
```

```text
✓ Survey published successfully.
```

```text
✓ Response submitted successfully.
```

Error không được chỉ hiển thị bằng Toast.

---

## 7.12 Empty State

Ví dụ:

```text
No surveys yet.

Create your first survey to start collecting
customer feedback.

[Create Survey]
```

---

## 7.13 Error State

Ví dụ:

```text
Unable to load survey data.

Please try again.

[Try Again]
```

---

# 8. Frontend View Models

Các model dưới đây chỉ là **Frontend View Model**.

Không xem chúng là Database Model của PostgreSQL.

```ts
type EntityId = string;

type UserRole =
  | "USER"
  | "RESEARCHER"
  | "RESPONDENT"
  | "MANAGER";

type SurveyStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "CLOSED";

type Sentiment =
  | "POSITIVE"
  | "NEUTRAL"
  | "NEGATIVE";

interface CurrentUser {
  id: EntityId;
  role: UserRole;
}

interface Survey {
  id: EntityId;
  title: string;
  description?: string;
  status: SurveyStatus;
}

interface Question {
  id: EntityId;
  surveyId: EntityId;
  content: string;
  required: boolean;
  type: string;
}

interface SurveyAnswer {
  questionId: EntityId;
  value: unknown;
}

interface SurveyResponse {
  id: EntityId;
  surveyId: EntityId;
  answers: SurveyAnswer[];
  feedback?: string;
}

interface Feedback {
  id: EntityId;
  responseId: EntityId;
  content: string;
}

interface AIAnalysis {
  sentiment?: Sentiment;
  topics: string[];
  summary?: string;
}

interface SurveyResult {
  surveyId: EntityId;
  totalResponses: number;
  aggregatedResults: unknown;
}

interface DashboardOverview {
  surveys: number;
  responses: number;
  feedback: number;
  aiInsights: number;
}
```

Các field sau chưa được xem là Requirement chính thức:

- AI confidence.
- AI model name.
- AI processing time.
- Survey owner.
- Question scoring.
- Advanced filtering.
- Export.
- Date range.
- Dashboard KPI formulas.

---

# 9. Screen Specifications

## 9.1 SCR-001 — Đăng nhập

**Traceability:** US-001 / UC-001 / REQ-001

### Mục tiêu

Cho phép `User` đăng nhập bằng tài khoản hợp lệ.

### Layout

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ InsightFlow                              AI Highlight  │
│                                                         │
│ AI CUSTOMER FEEDBACK PLATFORM                           │
│                                                         │
│ Welcome back                                            │
│ Đăng nhập để tiếp tục sử dụng hệ thống.                │
│                                                         │
│ Email                                                   │
│ [....................................................]  │
│                                                         │
│ Password                                                │
│ [....................................................]  │
│                                                         │
│ [                     Đăng nhập                    ]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### States

- Default.
- Loading.
- Invalid credentials.
- Success.
- Server Error.

### UX Copy

**CTA:**

`Đăng nhập`

**Error:**

`Email hoặc mật khẩu không chính xác.`

**Loading:**

`Đang đăng nhập...`

---

## 9.2 SCR-002 — Danh sách Survey của Researcher

**Traceability:** US-002 / UC-002 / REQ-002

### Header

**Title:**

`Surveys`

**Description:**

`Tạo và quản lý các Survey thu thập phản hồi khách hàng.`

**Primary CTA:**

`+ Tạo Survey`

### Content

Hiển thị Survey dưới dạng Card.

Mỗi Card có:

- Title.
- Description.
- Status.
- Action.

### States

- Loading.
- Empty.
- Data.
- Error.

### Empty

`Chưa có Survey nào.`

`Hãy tạo Survey đầu tiên để bắt đầu thu thập phản hồi.`

---

## 9.3 SCR-003 — Tạo Survey

**Traceability:** US-002 / UC-002 / REQ-002

### Header

`Tạo Survey`

### Form

```text
Tên Survey *

[................................................]

Mô tả

[................................................]
[................................................]

[Hủy]                         [Tạo Survey]
```

### States

- Default.
- Editing.
- Validation Error.
- Loading.
- Success.
- Server Error.

### UX Copy

Success:

`Tạo Survey thành công.`

---

## 9.4 SCR-004 — Chỉnh sửa Survey

**Traceability:** US-003 / UC-003 / REQ-003

### Header

`Chỉnh sửa Survey`

### Description

`Cập nhật thông tin Survey trước khi Publish.`

### Actions

```text
[Hủy]                      [Lưu thay đổi]
```

### States

- Loading.
- Editing.
- Saving.
- Validation Error.
- Success.
- Error.

### Important

Chức năng chỉnh sửa chỉ được thiết kế cho Survey **trước khi Publish**.

Không thiết kế Edit Survey như một chức năng bắt buộc sau Publish.

---

## 9.5 SCR-005 — Quản lý Question

**Traceability:** US-004 / UC-004 / REQ-004

### Header

`Questions`

### CTA

`+ Thêm Question`

### Layout

```text
Questions

[+ Thêm Question]

┌─────────────────────────────────────────────┐
│ Question 1                       Required   │
│                                             │
│ How satisfied are you with our service?    │
│                                             │
│ Type: Rating                                │
│                                             │
│                              [Edit]         │
└─────────────────────────────────────────────┘
```

### States

- Empty.
- Data.
- Editing.
- Loading.
- Error.

### Empty

`Chưa có Question nào.`

`Thêm Question để bắt đầu xây dựng Survey.`

---

## 9.6 SCR-006 — Publish Survey

**Traceability:** US-005 / UC-005 / REQ-005

### Confirmation

```text
Publish Survey?

Sau khi Publish, Respondent có thể
truy cập và tham gia Survey này.

[Hủy]                    [Publish Survey]
```

### States

- Confirmation.
- Publishing.
- Success.
- Error.

### Success

`Publish Survey thành công.`

---

## 9.7 SCR-007 — Close Survey

**Traceability:** US-006 / UC-006 / REQ-006

### Confirmation

```text
Close Survey?

Sau khi đóng, Survey sẽ không nhận
Response mới.

[Hủy]                       [Close Survey]
```

### States

- Confirmation.
- Closing.
- Success.
- Error.

### Success

`Đóng Survey thành công.`

Không thiết kế Reopen Survey vì đây chưa phải Requirement được xác nhận.

---

## 9.8 SCR-008 — Danh sách Published Survey

**Traceability:** US-007 / UC-007 / REQ-007

### Header

`Available Surveys`

### Description

`Tham gia các Survey đang được Publish và chia sẻ phản hồi của bạn.`

### Card

```text
Customer Feedback Survey

Khảo sát mức độ hài lòng của khách hàng.

[Published]

[Tham gia Survey]
```

### States

- Loading.
- Empty.
- Data.
- Error.

### Empty

`Không có Survey nào.`

`Hiện tại chưa có Survey Published để tham gia.`

---

## 9.9 SCR-009 — Chi tiết và trả lời Survey

**Traceability:** US-008 / UC-008 / REQ-008

### Layout

```text
Customer Feedback Survey

Chúng tôi muốn biết trải nghiệm của bạn.

1. Bạn hài lòng với dịch vụ như thế nào? *

[ Answer control ]

2. Bạn nghĩ chúng tôi nên cải thiện điều gì?

[ Answer control ]

3. Phản hồi thêm

[................................................]
[................................................]

[Submit Response]
```

### States

- Loading.
- Answering.
- Validation Error.
- Disabled.
- Server Error.

### UX Rules

- Required question phải được đánh dấu rõ.
- Không xoá câu trả lời khi Validation Error.
- Submit chỉ thực hiện khi các Required Question hợp lệ.

---

## 9.10 SCR-010 — Submit Response

**Traceability:** US-009 / UC-009 / REQ-009

### Confirmation

```text
Submit Response?

Hãy kiểm tra các câu trả lời trước khi gửi.

[Hủy]                    [Submit Response]
```

### States

- Confirmation.
- Submitting.
- Validation Error.
- Server Error.

### UX Rule

Không cho phép click Submit nhiều lần trong khi request đang xử lý.

---

## 9.11 SCR-011 — Submit Success

**Traceability:** US-009 / UC-009 / REQ-009

```text
Response submitted

Cảm ơn bạn đã gửi phản hồi.

[Quay lại Surveys]
```

### States

- Success.
- Error.

Không thông báo rằng AI đã xử lý xong nếu System chưa xác nhận.

---

## 9.12 SCR-012 — Survey Results

**Traceability:** US-011 / UC-011 / REQ-011

### Header

`Survey Results`

### Description

`Xem kết quả tổng hợp từ các Response đã được gửi.`

### Prototype

```text
Survey Results

[ Chọn Survey ]

┌────────────────┐  ┌────────────────┐
│ Responses      │  │ Overview       │
│ 128            │  │                │
└────────────────┘  └────────────────┘

Response Overview

[ Chart ]

[ Results Table ]
```

### States

- Loading.
- Empty.
- Data.
- Error.

### Empty

`Chưa có Response.`

`Kết quả sẽ xuất hiện khi Respondent gửi Response.`

Loại biểu đồ và công thức thống kê cụ thể vẫn là Open Question.

---

## 9.13 SCR-013 — Feedback

**Traceability:** US-012 / UC-012 / REQ-012

### Header

`Feedback`

### Description

`Xem các Feedback được gửi bởi Respondent.`

### Layout

```text
Feedback

[ Survey Filter ]

┌─────────────────────────────────────────────┐
│ Respondent Feedback                         │
│                                             │
│ "Dịch vụ tốt nhưng thời gian phản hồi       │
│ có thể được cải thiện."                     │
│                                             │
│ Related Survey                              │
└─────────────────────────────────────────────┘
```

### States

- Loading.
- Empty.
- Data.
- Error.

### Empty

`Chưa có Feedback.`

`Feedback sẽ xuất hiện khi Respondent gửi phản hồi.`

---

## 9.14 SCR-014 — AI Analysis

**Traceability:** US-014 / UC-014 / REQ-016

Màn hình này hiển thị kết quả được tạo bởi:

- REQ-013 — Sentiment Analysis.
- REQ-014 — Topic Analysis.
- REQ-015 — AI Summary.

### Header

`AI Analysis`

### Description

`Phân tích bằng AI giúp Manager hiểu nhanh phản hồi của khách hàng.`

### Layout

```text
AI Analysis

┌──────────────────────────────┐
│ ✨ Sentiment                 │
│                              │
│ Positive                     │
│                              │
│ Positive: 65%                │
│ Neutral: 25%                 │
│ Negative: 10%                │
└──────────────────────────────┘


┌────────────────────────────────────────────┐
│ ✨ Main Topics                             │
│                                            │
│ Service quality                            │
│ Support                                    │
│ Product                                    │
└────────────────────────────────────────────┘


┌────────────────────────────────────────────┐
│ ✨ AI Summary                              │
│                                            │
│ Khách hàng nhìn chung đánh giá tích cực   │
│ về chất lượng dịch vụ...                   │
└────────────────────────────────────────────┘
```

Các tỷ lệ trên chỉ là dữ liệu Prototype minh họa, không phải dữ liệu thật.

### AI Loading

```text
Đang phân tích Feedback...

Vui lòng chờ trong khi AI xử lý dữ liệu.
```

### AI Error

```text
Không thể tạo AI Analysis.

Vui lòng thử lại.
```

### AI Empty

```text
Chưa có AI Analysis.

Kết quả phân tích sẽ xuất hiện khi
có Feedback phù hợp để xử lý.
```

### Không hiển thị mặc định

- AI model.
- Prompt.
- Token.
- Confidence score.
- Technical AI metadata.

trừ khi Product Owner xác nhận.

---

## 9.15 SCR-015 — Survey Dashboard

**Traceability:** US-015 / UC-015 / REQ-017

### Header

`Survey Dashboard`

### Description

`Tổng quan về Survey, Response, Feedback và các phân tích AI.`

### Layout

```text
Survey Dashboard

┌───────────────┐ ┌───────────────┐
│ Surveys       │ │ Responses     │
│               │ │               │
└───────────────┘ └───────────────┘

┌───────────────┐ ┌───────────────┐
│ Feedback      │ │ AI Insights   │
│               │ │               │
└───────────────┘ └───────────────┘


Survey Results

[ Overview Chart ]


AI Insights

[ Sentiment ]

[ Main Topics ]

[ AI Summary ]
```

### States

- Loading.
- Empty.
- Data.
- Error.

Không thêm KPI nếu chưa có dữ liệu hoặc Requirement xác nhận.

---

# 10. State và Error Matrix

| Context | State | Hiển thị | Hành động |
|---|---|---|---|
| Data loading | Loading | Skeleton | Chờ |
| Không có dữ liệu | Empty | Empty state | Tạo dữ liệu / thay đổi điều kiện |
| API lỗi | Error | Error state | Thử lại |
| Form | Validation Error | Inline error | Sửa dữ liệu |
| Mutation | Loading | Button loading | Chờ |
| Publish | Confirmation | Modal | Hủy / Publish |
| Close | Confirmation | Modal | Hủy / Close |
| Submit | Confirmation | Modal | Hủy / Submit |
| AI | Analyzing | AI loading | Chờ |
| AI | Error | AI error | Thử lại |
| Mutation | Success | Toast + cập nhật UI | Tiếp tục |

---

# 11. Responsive Behavior

## 11.1 Mobile

- 1 column.
- Page padding 16px.
- Survey Card xếp dọc.
- Question Card xếp dọc.
- Dashboard Card xếp dọc.
- Form xếp dọc.
- Button chính có thể full width.
- Navigation dùng drawer.
- Modal gần full width.
- Không để button chính nằm ngoài viewport.
- Không sử dụng horizontal scroll cho nội dung chính.

## 11.2 Tablet

- Survey Card: 2 column.
- Dashboard: 2 column.
- Form có thể chia cột khi đủ không gian.
- Table vẫn được sử dụng nếu dữ liệu phù hợp.

## 11.3 Desktop

- Sidebar khoảng 240px.
- Survey Card tối đa 3 column.
- Dashboard KPI tối đa 4 column.
- Form giới hạn chiều rộng để dễ đọc.
- Main content sử dụng 12-column grid.

---

# 12. Accessibility

## 12.1 Heading

- Mỗi màn hình có một H1.
- Không bỏ qua cấp heading.
- H2/H3 dùng theo cấu trúc nội dung.

## 12.2 Keyboard

Toàn bộ chức năng chính phải có thể sử dụng bằng Keyboard.

Tab order phải logic.

Focus phải luôn nhìn thấy.

## 12.3 Focus

```css
:focus-visible {
  outline: 2px solid #276746;
  outline-offset: 2px;
}
```

## 12.4 Form

Mỗi Input phải có:

- Label.
- Required state khi cần.
- Help text nếu cần.
- Error message nếu có lỗi.

Placeholder không được thay thế Label.

## 12.5 Error

Error message phải:

- Nêu rõ vấn đề.
- Cho biết cách sửa nếu có thể.
- Không chỉ dùng màu đỏ.

Ví dụ:

Không dùng:

```text
Invalid
```

Nên dùng:

```text
Vui lòng nhập tên Survey.
```

## 12.6 Status

Không dùng màu làm tín hiệu duy nhất.

Ví dụ:

```text
[Published]
[Closed]
[Positive]
[Neutral]
[Negative]
```

## 12.7 Modal

Modal phải:

- Có title.
- Có `aria-modal`.
- Trap focus.
- Hỗ trợ Escape.
- Trả focus về trigger.

## 12.8 Touch target

Touch target tối thiểu:

```text
44 × 44px
```

## 12.9 Zoom

Giao diện phải hoạt động khi người dùng zoom lên 200%.

## 12.10 Reduced Motion

Hỗ trợ:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 13. React Implementation Blueprint

Cấu trúc Frontend đề xuất:

```text
src/
│
├── app/
│   ├── AppShell.tsx
│   └── routes.tsx
│
├── design-system/
│   ├── tokens.css
│   ├── Button.tsx
│   ├── Dialog.tsx
│   ├── FormField.tsx
│   ├── StatusBadge.tsx
│   ├── ToastRegion.tsx
│   ├── Card.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   └── LoadingState.tsx
│
├── features/
│   │
│   ├── auth/
│   │   └── LoginPage.tsx
│   │
│   ├── researcher/
│   │   └── surveys/
│   │       ├── SurveyListPage.tsx
│   │       ├── CreateSurveyPage.tsx
│   │       ├── EditSurveyPage.tsx
│   │       ├── SurveyCard.tsx
│   │       ├── QuestionManagementPage.tsx
│   │       ├── QuestionCard.tsx
│   │       ├── PublishSurveyDialog.tsx
│   │       └── CloseSurveyDialog.tsx
│   │
│   ├── respondent/
│   │   └── surveys/
│   │       ├── PublishedSurveyListPage.tsx
│   │       ├── SurveyDetailPage.tsx
│   │       ├── SubmitResponseDialog.tsx
│   │       └── SubmitSuccessPage.tsx
│   │
│   └── manager/
│       ├── dashboard/
│       │   └── SurveyDashboardPage.tsx
│       │
│       ├── results/
│       │   └── SurveyResultsPage.tsx
│       │
│       ├── feedback/
│       │   └── FeedbackPage.tsx
│       │
│       └── ai/
│           ├── AIAnalysisPage.tsx
│           └── AIInsightCard.tsx
│
└── shared/
    ├── types.ts
    ├── validation.ts
    └── formatters.ts
```

### Implementation Rules

1. Server state và Form state phải được tách biệt.

2. Không đánh dấu Survey là Published/Closed trước khi Backend xác nhận thành công.

3. Không đánh dấu Response đã Submit trước khi Backend trả về thành công.

4. Không hiển thị AI Analysis là hoàn tất khi AI processing chưa hoàn thành.

5. Sử dụng Design Tokens thay vì hardcode màu.

6. Frontend permission check không thay thế Backend authorization.

7. Backend Django vẫn phải kiểm tra quyền truy cập.

8. Validation Frontend chỉ hỗ trợ UX.

9. Backend vẫn là nguồn xác thực cuối cùng.

10. Form không được mất dữ liệu khi xảy ra lỗi có thể khôi phục.

---

# 14. Prototype Flow Map

```text
                         LOGIN
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     RESEARCHER       RESPONDENT        MANAGER
          │                │                │
          ▼                ▼                ▼
   Survey List      Published Survey    Dashboard
          │                │                │
     ┌────┼────┐           ▼          ┌─────┼─────┐
     │    │    │      Survey Detail   │     │     │
     │    │    │           │          │     │     │
     ▼    ▼    ▼           ▼          ▼     ▼     ▼
 Create  Edit  Manage    Answer      Results Feedback AI
 Survey Survey Questions   │                  │      Analysis
     │    │      │         ▼                  │        │
     │    │      │       Submit               │        │
     │    │      │         │                  │        │
     │    │      ▼         ▼                  │        │
     │    │   Publish   Success               │        │
     │    │      │                            │        │
     │    ▼      ▼                            │        │
     │   Edit  Published                      │        │
     │                                        │        │
     └───────────────┐                        │        │
                     ▼                        ▼        ▼
                   Close                 Survey Results
                     │
                     ▼
                   Closed
```

### System Processing

```text
Submit Response
       │
       ▼
Save Response + Feedback
       │
       ▼
AI Processing
       │
       ├── Sentiment Analysis
       │
       ├── Topic Analysis
       │
       └── AI Summary
                │
                ▼
         Manager AI Analysis
                │
                ▼
         Survey Dashboard
```

---

# 15. Open Questions

## 15.1 Authentication

- Authentication sử dụng JWT, Session hay cơ chế khác?
- Password requirement cụ thể là gì?
- Session timeout bao lâu?
- Sau Login mỗi Role đi đến màn hình nào?
- Có cần Remember Me không?
- Có cần Forgot Password không?

## 15.2 Survey

- Survey gồm chính xác những field nào?
- Description có bắt buộc không?
- `Draft` có phải trạng thái chính thức không?
- Survey có thể Edit sau Publish không?
- Closed Survey có thể Reopen không?
- Có cần Search Survey không?
- Có cần Filter Survey không?
- Có cần Pagination không?

## 15.3 Question

- Những Question Type nào được hỗ trợ?
- Có bao nhiêu loại Answer control?
- Question có thể Reorder không?
- Question có thể Delete không?
- Required Question được xử lý như thế nào?
- Question có thể Edit sau Publish không?

## 15.4 Respondent

- Một Respondent có thể Submit cùng một Survey nhiều lần không?
- Feedback là một field riêng hay một Question?
- Response có gắn với User cụ thể không?
- Điều gì xảy ra nếu Survey bị Close trong lúc Respondent đang trả lời?

## 15.5 Survey Results

- Cần những KPI nào?
- Cần những loại Chart nào?
- Có cần Filter theo Survey không?
- Có cần Filter theo thời gian không?
- Có cần Export không?
- Aggregation được tính như thế nào?

## 15.6 AI

- Sử dụng AI Provider nào?
- Sử dụng Model nào?
- AI Processing xảy ra khi nào?
- AI Processing là synchronous hay asynchronous?
- AI Analysis có được lưu Database không?
- Có cần chạy lại AI Analysis không?
- Sentiment gồm những category nào?
- Topic được hiển thị như thế nào?
- Có cần Confidence Score không?
- Có cần hiển thị AI Model không?
- AI Summary có giới hạn độ dài không?

## 15.7 Dashboard

- Dashboard cần những KPI chính nào?
- Có cần Date Filter không?
- Có cần Survey Filter không?
- Có cần biểu đồ Sentiment không?
- Có cần Top Topics không?
- Có cần AI Summary không?
- Dashboard hiển thị thế nào khi chưa có Response?

## 15.8 Cross-cutting

- API response format chính thức là gì?
- Error code chính thức là gì?
- Các thao tác nào cần Confirmation Modal?
- Loading behavior chính thức là gì?
- Retry behavior như thế nào?
- Role nào được xem dữ liệu nào?
- Feedback có thông tin nhận diện Respondent hay không?

---

# 16. Figma Frame / Component Naming

## 16.1 Foundations

```text
00 Foundations / Colors
00 Foundations / Typography
00 Foundations / Spacing
00 Foundations / Radius
00 Foundations / Shadow
00 Foundations / Grid
```

## 16.2 Components

```text
01 Components / Button / Primary
01 Components / Button / Secondary
01 Components / Button / Tertiary
01 Components / Button / AI
01 Components / Button / Danger

01 Components / Form / TextField
01 Components / Form / PasswordField
01 Components / Form / TextArea
01 Components / Form / Select
01 Components / Form / QuestionField

01 Components / Feedback / Alert
01 Components / Feedback / Toast
01 Components / Feedback / EmptyState
01 Components / Feedback / ErrorState
01 Components / Feedback / LoadingState

01 Components / Status / SurveyBadge
01 Components / Status / SentimentBadge

01 Components / Survey / SurveyCard
01 Components / Survey / QuestionCard

01 Components / AI / AIInsightCard

01 Components / Overlay / Dialog
```

## 16.3 Patterns

```text
02 Patterns / AppShell / Desktop
02 Patterns / AppShell / Mobile

02 Patterns / Researcher / SurveyList
02 Patterns / Researcher / SurveyForm
02 Patterns / Researcher / QuestionManagement

02 Patterns / Respondent / SurveyList
02 Patterns / Respondent / SurveyAnswer

02 Patterns / Manager / Dashboard
02 Patterns / Manager / Results
02 Patterns / Manager / Feedback
02 Patterns / Manager / AIAnalysis
```

## 16.4 Screens

```text
03 Screens / SCR-001 Login / Desktop
03 Screens / SCR-001 Login / Mobile

03 Screens / SCR-002 Researcher Survey List / Desktop
03 Screens / SCR-002 Researcher Survey List / Mobile

03 Screens / SCR-003 Create Survey / Desktop
03 Screens / SCR-003 Create Survey / Mobile

03 Screens / SCR-004 Edit Survey / Desktop
03 Screens / SCR-004 Edit Survey / Mobile

03 Screens / SCR-005 Question Management / Desktop
03 Screens / SCR-005 Question Management / Mobile

03 Screens / SCR-006 Publish Survey / Desktop
03 Screens / SCR-006 Publish Survey / Mobile

03 Screens / SCR-007 Close Survey / Desktop
03 Screens / SCR-007 Close Survey / Mobile

03 Screens / SCR-008 Published Survey List / Desktop
03 Screens / SCR-008 Published Survey List / Mobile

03 Screens / SCR-009 Survey Answer / Desktop
03 Screens / SCR-009 Survey Answer / Mobile

03 Screens / SCR-010 Submit Response / Desktop
03 Screens / SCR-010 Submit Response / Mobile

03 Screens / SCR-011 Submit Success / Desktop
03 Screens / SCR-011 Submit Success / Mobile

03 Screens / SCR-012 Survey Results / Desktop
03 Screens / SCR-012 Survey Results / Mobile

03 Screens / SCR-013 Feedback / Desktop
03 Screens / SCR-013 Feedback / Mobile

03 Screens / SCR-014 AI Analysis / Desktop
03 Screens / SCR-014 AI Analysis / Mobile

03 Screens / SCR-015 Survey Dashboard / Desktop
03 Screens / SCR-015 Survey Dashboard / Mobile
```

---

# 17. Handoff Checklist

Trước khi chuyển một Screen từ Prototype sang Implementation:

## Requirement

- [ ] Screen đã liên kết với User Story.
- [ ] Screen đã liên kết với Use Case.
- [ ] Screen đã liên kết với Requirement.
- [ ] Acceptance Criteria liên quan đã được kiểm tra.
- [ ] Không có behavior chưa xác nhận bị biến thành Requirement.

## Figma

- [ ] Có Desktop frame.
- [ ] Có Mobile frame.
- [ ] Frame được đặt tên đúng convention.
- [ ] Component sử dụng đúng Design System.
- [ ] Component có variants phù hợp.
- [ ] Auto Layout đã được sử dụng.
- [ ] Spacing sử dụng token.
- [ ] Color sử dụng token.

## States

- [ ] Default.
- [ ] Loading.
- [ ] Empty.
- [ ] Error.
- [ ] Validation Error khi cần.
- [ ] Success khi cần.
- [ ] Disabled khi cần.
- [ ] Confirmation khi cần.

## Accessibility

- [ ] Heading hierarchy đúng.
- [ ] Label đầy đủ.
- [ ] Keyboard navigation hoạt động.
- [ ] Focus state rõ ràng.
- [ ] Contrast đạt yêu cầu.
- [ ] Touch target tối thiểu 44 × 44px.
- [ ] Không dùng màu làm tín hiệu duy nhất.
- [ ] Error message rõ ràng.
- [ ] Modal có focus management.

## Role

- [ ] User chỉ thấy chức năng phù hợp.
- [ ] Researcher chỉ thấy chức năng phù hợp.
- [ ] Respondent chỉ thấy chức năng phù hợp.
- [ ] Manager chỉ thấy chức năng phù hợp.
- [ ] Không thêm Admin nếu chưa có Requirement.

## Survey

- [ ] Published Survey hiển thị đúng cho Respondent.
- [ ] Closed Survey không nhận Response mới.
- [ ] Edit Survey chỉ được thể hiện trước Publish.
- [ ] Question Management không có Delete nếu chưa được xác nhận.

## AI

- [ ] AI Analysis có trạng thái Loading.
- [ ] AI Analysis có trạng thái Empty.
- [ ] AI Analysis có trạng thái Error.
- [ ] AI Analysis được nhận diện rõ bằng AI visual language.
- [ ] Sentiment được hiển thị bằng text.
- [ ] Topic được hiển thị rõ.
- [ ] AI Summary được hiển thị rõ.
- [ ] Không hiển thị AI technical metadata nếu chưa được xác nhận.

## Responsive

- [ ] Mobile đã kiểm tra.
- [ ] Tablet đã kiểm tra nếu cần.
- [ ] Desktop đã kiểm tra.
- [ ] Không có horizontal scroll không cần thiết.
- [ ] CTA chính luôn dễ truy cập.

## Engineering

- [ ] Component name khớp với Figma.
- [ ] Variant name khớp với implementation.
- [ ] Design Token đã được định nghĩa.
- [ ] Frontend View Model đã được xác định.
- [ ] Backend vẫn là nguồn xác thực dữ liệu và quyền.
- [ ] Không hardcode API behavior trong UI.

## QA

- [ ] QA có thể truy cập đúng Figma Frame.
- [ ] QA có thể truy vết từ Screen → US → UC → REQ.
- [ ] QA có thể kiểm tra từng State.
- [ ] QA có thể kiểm tra Acceptance Criteria.
- [ ] Evidence / Screenshot được lưu khi cần.

---

# 18. Definition of Done cho Design Prototype

Một Screen được xem là hoàn thành khi:

1. Đã có Desktop và Mobile hoặc Responsive Rule rõ ràng.
2. Đã có trạng thái chính cần thiết.
3. Đã sử dụng đúng Design Token.
4. Đã sử dụng đúng Component.
5. Đã kiểm tra Accessibility cơ bản.
6. Đã kiểm tra UX Copy.
7. Đã liên kết Screen với US / UC / REQ.
8. Không chứa behavior chưa xác nhận dưới dạng Requirement.
9. Developer hiểu được cấu trúc để triển khai.
10. QA có thể dựa vào Screen và State để kiểm thử.

---

# 19. Output của Giai đoạn 6

Sau khi hoàn thành Giai đoạn 6, Project phải có:

```text
Design/
│
├── Figma
│   ├── Foundations
│   ├── Components
│   ├── Patterns
│   ├── Flows
│   └── Handoff
│
├── DESIGN.md
├── screen-inventory.md
├── state-matrix.md
└── ux-copy.md
```

## Figma

Phải có tối thiểu:

```text
Foundations
Components
Flows
Handoff
```

## DESIGN.md

Chứa:

- Design tokens.
- Typography.
- Color.
- Spacing.
- Radius.
- Shadow.
- Responsive.
- Accessibility.
- Component rules.

## screen-inventory.md

Chứa:

- Screen ID.
- Screen Name.
- Actor.
- User Story.
- Use Case.
- Requirement.
- Figma Frame.
- States.

## state-matrix.md

Chứa:

- Screen.
- State.
- Trigger.
- UI behavior.
- Recovery action.

## ux-copy.md

Chứa:

- CTA.
- Success message.
- Error message.
- Empty state.
- Confirmation.
- Loading message.

---

# 20. Traceability tổng thể

```text
REQ
 │
 ▼
User Story
 │
 ▼
Use Case
 │
 ▼
Screen
 │
 ▼
Figma Frame
 │
 ▼
Component
 │
 ▼
Frontend Implementation
 │
 ▼
QA
```

Ví dụ:

```text
REQ-005
  │
  ▼
US-005
  │
  ▼
UC-005
  │
  ▼
SCR-006 Publish Survey
  │
  ▼
Figma:
03 Screens / SCR-006 Publish Survey / Desktop
03 Screens / SCR-006 Publish Survey / Mobile
  │
  ▼
PublishSurveyDialog
  │
  ▼
React implementation
  │
  ▼
QA kiểm tra:
- Researcher có thể Publish
- Survey chuyển sang Published
- Respondent có thể truy cập Survey
```

---

# 21. Nguyên tắc cuối cùng cho Developer và QA

Design Prototype là nguồn hướng dẫn về **giao diện và trải nghiệm**.

Requirement là nguồn xác định **hệ thống phải làm gì**.

Use Case mô tả **luồng nghiệp vụ**.

User Story mô tả **giá trị người dùng**.

Acceptance Criteria xác định **khi nào Story được xem là đúng**.

Figma xác định **giao diện cần triển khai**.

Không được sử dụng một Prototype decision chưa được xác nhận để tự tạo thêm Product Requirement.

Khi gặp behavior chưa rõ:

```text
Không tự đoán
      ↓
Đánh dấu Open Question
      ↓
Trao đổi với Product Owner
      ↓
Cập nhật Requirement / Design
      ↓
Sau đó mới triển khai
```

**Mục tiêu của Giai đoạn 6 là tạo ra một Figma Prototype nhất quán, có thể truy vết từ Requirement đến giao diện, đủ rõ để Developer triển khai và QA kiểm thử.**