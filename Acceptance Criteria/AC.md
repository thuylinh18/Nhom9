# Acceptance Criteria

## US-001 — Đăng nhập hệ thống

Các tiêu chí dưới đây chỉ bao phủ hành vi đã được xác nhận trong REQ-001 và UC-001. Các chi tiết như phương thức xác thực, session/token, thời gian hết hạn, password recovery và audit log chưa được xác định.

### AC-US001-01 — Đăng nhập với tài khoản hợp lệ

**Given** một User có tài khoản hợp lệ và hệ thống đang hoạt động

**When** User nhập thông tin đăng nhập hợp lệ và gửi yêu cầu đăng nhập

**Then** hệ thống xác thực tài khoản và cho phép User đăng nhập vào hệ thống.

- **REQ:** REQ-001
- **UC:** UC-001
- **US:** US-001

### AC-US001-02 — Từ chối thông tin đăng nhập không hợp lệ

**Given** một User đang ở màn hình đăng nhập

**When** User cung cấp thông tin đăng nhập không hợp lệ

**Then** hệ thống không cho phép User đăng nhập.

- **REQ:** REQ-001
- **UC:** UC-001
- **US:** US-001

### AC-US001-03 — Xác định Role sau khi đăng nhập

**Given** User có tài khoản hợp lệ và tài khoản được gán một Role trong hệ thống

**When** User đăng nhập thành công

**Then** hệ thống xác định Role của User để áp dụng các chức năng tương ứng.

- **REQ:** REQ-001
- **UC:** UC-001
- **US:** US-001

### AC-US001-04 — User có thể truy cập chức năng theo Role

**Given** User đã đăng nhập thành công và hệ thống đã xác định Role

**When** User truy cập hệ thống

**Then** hệ thống cho phép User sử dụng các chức năng được phép theo Role của User.

- **REQ:** REQ-001
- **UC:** UC-001
- **US:** US-001


## US-002 — Tạo survey

Các tiêu chí dưới đây bao phủ việc Researcher tạo một survey mới và nhập các thông tin cần thiết cho survey. Các trường dữ liệu cụ thể và quy tắc validation chi tiết chưa được xác định.

### AC-US002-01 — Researcher tạo survey mới

**Given** một Researcher đã đăng nhập và có quyền tạo survey

**When** Researcher chọn chức năng tạo survey mới

**Then** hệ thống tạo một survey mới để Researcher nhập thông tin survey.

- **REQ:** REQ-002
- **UC:** UC-002
- **US:** US-002

### AC-US002-02 — Nhập thông tin survey

**Given** Researcher đang tạo một survey mới

**When** Researcher nhập các thông tin cần thiết của survey

**Then** hệ thống tiếp nhận và lưu các thông tin survey được cung cấp.

- **REQ:** REQ-002
- **UC:** UC-002
- **US:** US-002

### AC-US002-03 — Survey mới ở trạng thái chưa publish

**Given** Researcher đã tạo survey mới thành công

**When** survey được tạo

**Then** survey chưa được cung cấp cho Respondent tham gia cho đến khi Researcher publish survey.

- **REQ:** REQ-002
- **REQ:** REQ-005
- **UC:** UC-002
- **US:** US-002


## US-003 — Chỉnh sửa survey

Các tiêu chí dưới đây chỉ bao phủ việc Researcher chỉnh sửa survey trước khi publish. Việc chỉnh sửa survey sau khi publish chưa được xác nhận.

### AC-US003-01 — Chỉnh sửa survey trước khi publish

**Given** một Researcher đã đăng nhập và có một survey chưa được publish

**When** Researcher chọn survey và chỉnh sửa thông tin survey

**Then** hệ thống cho phép Researcher cập nhật thông tin của survey.

- **REQ:** REQ-003
- **UC:** UC-003
- **US:** US-003

### AC-US003-02 — Lưu thông tin survey sau khi chỉnh sửa

**Given** Researcher đang chỉnh sửa một survey chưa được publish

**When** Researcher hoàn tất thay đổi và lưu survey

**Then** hệ thống lưu các thay đổi vào survey tương ứng.

- **REQ:** REQ-003
- **UC:** UC-003
- **US:** US-003

### AC-US003-03 — Không cho chỉnh sửa survey đã publish

**Given** một survey đã được publish

**When** Researcher cố gắng chỉnh sửa survey

**Then** hệ thống không cho phép chỉnh sửa survey theo hành vi được xác nhận trong requirement.

- **REQ:** REQ-003
- **UC:** UC-003
- **US:** US-003


## US-004 — Quản lý question

Các tiêu chí dưới đây bao phủ việc Researcher thêm, chỉnh sửa và quản lý question thuộc một survey. Các loại question cụ thể và quy tắc required/optional chưa được xác định.

### AC-US004-01 — Thêm question vào survey

**Given** một Researcher đang quản lý một survey

**When** Researcher thêm một question mới

**Then** hệ thống tạo question và gán question đó vào survey tương ứng.

- **REQ:** REQ-004
- **UC:** UC-004
- **US:** US-004

### AC-US004-02 — Chỉnh sửa question

**Given** một survey có một question đã tồn tại

**When** Researcher chỉnh sửa question đó và lưu thay đổi

**Then** hệ thống cập nhật thông tin của question trong survey.

- **REQ:** REQ-004
- **UC:** UC-004
- **US:** US-004

### AC-US004-03 — Question thuộc đúng survey

**Given** Researcher đang quản lý một survey cụ thể

**When** Researcher thêm hoặc chỉnh sửa question

**Then** question được quản lý trong phạm vi survey tương ứng.

- **REQ:** REQ-004
- **UC:** UC-004
- **US:** US-004


## US-005 — Publish survey

Các tiêu chí dưới đây bao phủ việc Researcher publish survey để Respondent có thể truy cập và tham gia.

### AC-US005-01 — Publish survey thành công

**Given** một Researcher đã đăng nhập và có một survey có thể publish

**When** Researcher chọn chức năng publish survey

**Then** hệ thống chuyển survey sang trạng thái Published.

- **REQ:** REQ-005
- **UC:** UC-005
- **US:** US-005

### AC-US005-02 — Published survey có thể được Respondent truy cập

**Given** một survey đang ở trạng thái Published

**When** Respondent truy cập danh sách survey

**Then** Respondent có thể nhìn thấy và truy cập survey đó.

- **REQ:** REQ-005
- **REQ:** REQ-007
- **UC:** UC-005
- **US:** US-005

### AC-US005-03 — Survey chưa publish không được cung cấp cho Respondent

**Given** một survey chưa ở trạng thái Published

**When** Respondent xem danh sách survey

**Then** survey đó không được cung cấp như một survey có thể tham gia.

- **REQ:** REQ-005
- **REQ:** REQ-007
- **UC:** UC-005
- **US:** US-005


## US-006 — Close survey

Các tiêu chí dưới đây bao phủ việc Researcher đóng một survey đang hoạt động để ngừng nhận response mới.

### AC-US006-01 — Close survey đang hoạt động

**Given** một Researcher có một survey đang hoạt động

**When** Researcher chọn chức năng close survey

**Then** hệ thống chuyển survey sang trạng thái Closed.

- **REQ:** REQ-006
- **UC:** UC-006
- **US:** US-006

### AC-US006-02 — Survey Closed không nhận response mới

**Given** một survey đang ở trạng thái Closed

**When** Respondent cố gắng tham gia hoặc gửi response mới cho survey

**Then** hệ thống không tiếp nhận response mới cho survey đó.

- **REQ:** REQ-006
- **UC:** UC-006
- **US:** US-006


## US-007 — Xem survey

Các tiêu chí dưới đây bao phủ việc Respondent xem các survey đang ở trạng thái Published.

### AC-US007-01 — Respondent xem danh sách Published survey

**Given** một Respondent đã đăng nhập và hệ thống có các survey ở trạng thái Published

**When** Respondent truy cập danh sách survey

**Then** hệ thống hiển thị các survey đang ở trạng thái Published.

- **REQ:** REQ-007
- **UC:** UC-007
- **US:** US-007

### AC-US007-02 — Respondent truy cập nội dung Published survey

**Given** một Published survey tồn tại

**When** Respondent chọn survey đó

**Then** hệ thống hiển thị thông tin và các question của survey để Respondent có thể tham gia.

- **REQ:** REQ-007
- **UC:** UC-007
- **US:** US-007

### AC-US007-03 — Không hiển thị survey chưa Published như survey có thể tham gia

**Given** một survey không ở trạng thái Published

**When** Respondent xem danh sách survey

**Then** survey đó không được hiển thị như một survey có thể tham gia.

- **REQ:** REQ-007
- **UC:** UC-007
- **US:** US-007


## US-008 — Trả lời survey

Các tiêu chí dưới đây bao phủ việc Respondent trả lời các question trong một Published survey. Các loại question cụ thể và quy tắc required/optional chưa được xác định chi tiết.

### AC-US008-01 — Respondent có thể trả lời question

**Given** Respondent đang truy cập một Published survey

**When** Respondent cung cấp câu trả lời cho một question

**Then** hệ thống ghi nhận câu trả lời được cung cấp.

- **REQ:** REQ-008
- **UC:** UC-008
- **US:** US-008

### AC-US008-02 — Respondent có thể trả lời nhiều question

**Given** một Published survey có nhiều question

**When** Respondent lần lượt cung cấp câu trả lời cho các question

**Then** hệ thống ghi nhận các câu trả lời tương ứng với các question trong survey.

- **REQ:** REQ-008
- **UC:** UC-008
- **US:** US-008

### AC-US008-03 — Câu trả lời thuộc đúng survey

**Given** Respondent đang trả lời một survey cụ thể

**When** Respondent cung cấp câu trả lời

**Then** hệ thống liên kết câu trả lời với question và survey tương ứng.

- **REQ:** REQ-008
- **UC:** UC-008
- **US:** US-008


## US-009 — Submit response

Các tiêu chí dưới đây bao phủ việc Respondent submit response sau khi hoàn thành các required question.

### AC-US009-01 — Submit response khi hoàn thành required question

**Given** Respondent đang trả lời một Published survey và đã hoàn thành tất cả required question

**When** Respondent chọn submit response

**Then** hệ thống chấp nhận response và thực hiện việc lưu response.

- **REQ:** REQ-009
- **REQ:** REQ-010
- **UC:** UC-009
- **US:** US-009

### AC-US009-02 — Không submit khi thiếu required question

**Given** Respondent đang trả lời survey và còn required question chưa được hoàn thành

**When** Respondent chọn submit response

**Then** hệ thống không chấp nhận response chưa hoàn chỉnh.

- **REQ:** REQ-009
- **UC:** UC-009
- **US:** US-009

### AC-US009-03 — Submit response cho survey đang nhận response

**Given** Respondent đang trả lời một survey đang cho phép nhận response

**When** Respondent hoàn thành required question và submit

**Then** hệ thống tiếp nhận response để lưu trữ.

- **REQ:** REQ-009
- **REQ:** REQ-010
- **UC:** UC-009
- **US:** US-009


## US-010 — Lưu response và feedback

Các tiêu chí dưới đây bao phủ việc System lưu response và feedback sau khi Respondent submit. Schema chi tiết và thời gian lưu trữ chưa được xác định.

### AC-US010-01 — Lưu response sau khi submit

**Given** Respondent đã submit một response hợp lệ

**When** hệ thống xử lý response đã submit

**Then** hệ thống lưu response vào hệ thống.

- **REQ:** REQ-010
- **UC:** UC-010
- **US:** US-010

### AC-US010-02 — Lưu feedback của Respondent

**Given** Respondent submit response có feedback

**When** hệ thống xử lý response

**Then** hệ thống lưu feedback được Respondent cung cấp.

- **REQ:** REQ-010
- **UC:** UC-010
- **US:** US-010

### AC-US010-03 — Response và feedback được lưu để phục vụ phân tích

**Given** response và feedback đã được Respondent submit thành công

**When** hệ thống hoàn tất việc lưu dữ liệu

**Then** dữ liệu được lưu để phục vụ việc tổng hợp kết quả và phân tích feedback.

- **REQ:** REQ-010
- **UC:** UC-010
- **US:** US-010


## US-011 — Xem kết quả survey

Các tiêu chí dưới đây bao phủ việc Manager xem kết quả survey đã được tổng hợp từ response.

### AC-US011-01 — Manager xem kết quả survey

**Given** một survey đã có response được lưu trong hệ thống

**When** Manager truy cập kết quả survey

**Then** hệ thống hiển thị kết quả survey đã được tổng hợp.

- **REQ:** REQ-011
- **UC:** UC-011
- **US:** US-011

### AC-US011-02 — Kết quả được tổng hợp từ response

**Given** một survey có nhiều response đã được lưu

**When** Manager xem kết quả survey

**Then** hệ thống cung cấp kết quả dựa trên các response đã được lưu của survey đó.

- **REQ:** REQ-011
- **UC:** UC-011
- **US:** US-011

### AC-US011-03 — Không có response thì không có dữ liệu kết quả để tổng hợp

**Given** một survey chưa có response được lưu

**When** Manager truy cập kết quả survey

**Then** hệ thống không có dữ liệu response để tổng hợp cho survey đó.

- **REQ:** REQ-011
- **UC:** UC-011
- **US:** US-011


## US-012 — Xem feedback

Các tiêu chí dưới đây bao phủ việc Manager xem feedback được Respondent gửi trong response.

### AC-US012-01 — Manager xem feedback

**Given** một survey có feedback đã được Respondent gửi và lưu

**When** Manager truy cập feedback của survey

**Then** hệ thống hiển thị các feedback đã được lưu.

- **REQ:** REQ-012
- **UC:** UC-012
- **US:** US-012

### AC-US012-02 — Feedback thuộc đúng survey

**Given** một survey có feedback từ nhiều response

**When** Manager xem feedback của survey

**Then** hệ thống chỉ hiển thị feedback thuộc survey được chọn.

- **REQ:** REQ-012
- **UC:** UC-012
- **US:** US-012

### AC-US012-03 — Feedback được sử dụng cho evaluation và analysis

**Given** feedback đã được lưu trong hệ thống

**When** Manager truy cập feedback

**Then** Manager có thể xem nội dung feedback để phục vụ evaluation và analysis.

- **REQ:** REQ-012
- **REQ:** REQ-013
- **UC:** UC-012
- **US:** US-012


## US-013 — Phân tích AI feedback

Các tiêu chí dưới đây bao phủ ba kết quả AI đã được xác nhận: sentiment, topic và summary. Việc sử dụng model AI cụ thể, prompt, confidence score và cơ chế retry chưa được xác định.

### AC-US013-01 — Phân tích sentiment của feedback

**Given** hệ thống có feedback đã được lưu

**When** System thực hiện AI analysis trên feedback

**Then** hệ thống phân tích sentiment của feedback và xác định emotional trend.

- **REQ:** REQ-013
- **UC:** UC-013
- **US:** US-013

### AC-US013-02 — Phân tích topic của feedback

**Given** hệ thống có feedback đã được lưu

**When** System thực hiện AI analysis trên feedback

**Then** hệ thống xác định các topic chính xuất hiện trong feedback.

- **REQ:** REQ-014
- **UC:** UC-013
- **US:** US-013

### AC-US013-03 — Tạo AI summary từ feedback

**Given** hệ thống có feedback đã được lưu

**When** System thực hiện AI analysis trên feedback

**Then** hệ thống tạo summary phản ánh các vấn đề và ý kiến chính trong feedback.

- **REQ:** REQ-015
- **UC:** UC-013
- **US:** US-013

### AC-US013-04 — Lưu kết quả AI analysis

**Given** System đã hoàn thành AI analysis cho feedback

**When** các kết quả sentiment, topic và summary được tạo thành công

**Then** hệ thống lưu các kết quả phân tích để Manager có thể xem.

- **REQ:** REQ-013
- **REQ:** REQ-014
- **REQ:** REQ-015
- **REQ:** REQ-016
- **UC:** UC-013
- **US:** US-013

### AC-US013-05 — AI analysis sử dụng feedback đã được lưu

**Given** một hoặc nhiều feedback đã được lưu trong hệ thống

**When** System thực hiện AI analysis

**Then** hệ thống sử dụng các feedback đã lưu làm dữ liệu đầu vào cho việc phân tích.

- **REQ:** REQ-010
- **REQ:** REQ-013
- **REQ:** REQ-014
- **REQ:** REQ-015
- **UC:** UC-013
- **US:** US-013


## US-014 — Xem kết quả phân tích AI

Các tiêu chí dưới đây bao phủ việc Manager xem kết quả AI analysis gồm sentiment, topic và summary.

### AC-US014-01 — Manager xem sentiment analysis

**Given** hệ thống đã có kết quả sentiment analysis của feedback

**When** Manager truy cập kết quả AI analysis

**Then** hệ thống hiển thị kết quả sentiment cho Manager.

- **REQ:** REQ-016
- **UC:** UC-014
- **US:** US-014

### AC-US014-02 — Manager xem topic analysis

**Given** hệ thống đã có kết quả topic analysis của feedback

**When** Manager truy cập kết quả AI analysis

**Then** hệ thống hiển thị các topic chính được AI xác định.

- **REQ:** REQ-016
- **UC:** UC-014
- **US:** US-014

### AC-US014-03 — Manager xem AI summary

**Given** hệ thống đã có AI summary được tạo từ feedback

**When** Manager truy cập kết quả AI analysis

**Then** hệ thống hiển thị summary để Manager hiểu các vấn đề và ý kiến chính.

- **REQ:** REQ-015
- **REQ:** REQ-016
- **UC:** UC-014
- **US:** US-014

### AC-US014-04 — Hiển thị đầy đủ các kết quả AI đã có

**Given** hệ thống đã hoàn thành AI analysis cho một survey

**When** Manager xem kết quả AI analysis

**Then** hệ thống hiển thị các kết quả AI khả dụng gồm sentiment, topic và summary.

- **REQ:** REQ-013
- **REQ:** REQ-014
- **REQ:** REQ-015
- **REQ:** REQ-016
- **UC:** UC-014
- **US:** US-014


## US-015 — Xem Survey Dashboard

Các tiêu chí dưới đây bao phủ Dashboard tổng quan dành cho Manager, sử dụng dữ liệu survey, response, feedback và AI analysis đã có. Các KPI, biểu đồ và cách hiển thị cụ thể chưa được xác định.

### AC-US015-01 — Manager truy cập Survey Dashboard

**Given** một Manager đã đăng nhập

**When** Manager truy cập Survey Dashboard

**Then** hệ thống hiển thị Dashboard tổng quan của survey.

- **REQ:** REQ-017
- **UC:** UC-015
- **US:** US-015

### AC-US015-02 — Dashboard hiển thị tổng quan kết quả survey

**Given** một survey có response đã được lưu

**When** Manager xem Survey Dashboard

**Then** Dashboard cung cấp thông tin tổng quan dựa trên kết quả survey.

- **REQ:** REQ-011
- **REQ:** REQ-017
- **UC:** UC-015
- **US:** US-015

### AC-US015-03 — Dashboard hiển thị tổng quan feedback analysis

**Given** một survey có feedback và kết quả AI analysis đã được lưu

**When** Manager xem Survey Dashboard

**Then** Dashboard cung cấp thông tin tổng quan về feedback analysis.

- **REQ:** REQ-012
- **REQ:** REQ-013
- **REQ:** REQ-014
- **REQ:** REQ-015
- **REQ:** REQ-017
- **UC:** UC-015
- **US:** US-015

### AC-US015-04 — Dashboard hỗ trợ Manager hiểu tình hình survey

**Given** survey có dữ liệu response, feedback hoặc AI analysis

**When** Manager xem Survey Dashboard

**Then** hệ thống cung cấp một cái nhìn tổng quan về kết quả survey và feedback analysis để hỗ trợ Manager đánh giá survey.

- **REQ:** REQ-011
- **REQ:** REQ-012
- **REQ:** REQ-016
- **REQ:** REQ-017
- **UC:** UC-015
- **US:** US-015