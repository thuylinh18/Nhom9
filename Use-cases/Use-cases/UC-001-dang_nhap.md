# UC-001 Đăng nhập

## Related Requirements

- `REQ-001` — Đăng nhập hệ thống.

## Related Business Rules

- Chưa có Business Rule được xác nhận riêng cho Use Case này.

## Primary Actor

User.

## Supporting Actor

System.

## Preconditions

1. User đã có tài khoản trong hệ thống.
2. Tài khoản của User được phép sử dụng hệ thống.
3. System đang hoạt động và có thể xử lý yêu cầu đăng nhập.

## Trigger

User thực hiện hành động đăng nhập vào hệ thống.

## Main Flow

1. User truy cập chức năng đăng nhập.
2. System hiển thị giao diện đăng nhập.
3. User nhập thông tin tài khoản cần thiết.
4. User gửi yêu cầu đăng nhập.
5. System kiểm tra thông tin đăng nhập.
6. System xác thực tài khoản của User.
7. System xác định role của User.
8. System tạo trạng thái đăng nhập cho User.
9. System cho phép User truy cập các chức năng phù hợp với role.

Chi tiết về phương thức authentication, session/token và trang hiển thị sau đăng nhập chưa được xác định trong requirement hiện tại.

## Alternative Flows

### AF-01 — User đăng nhập với role khác nhau

1. User đăng nhập bằng tài khoản hợp lệ.
2. System xác định role của User.
3. System cấp quyền truy cập tương ứng với role.
4. User sử dụng các chức năng được phép.

Các role hiện tại gồm:

- Researcher
- Respondent
- Manager

## Exception Flows

### EF-01 — Thông tin đăng nhập không hợp lệ

1. System xác định thông tin đăng nhập không hợp lệ.
2. System không cho phép User truy cập.
3. System hiển thị thông báo lỗi phù hợp.

### EF-02 — Tài khoản không được phép sử dụng

1. System xác định tài khoản không thể sử dụng hệ thống.
2. System không cấp quyền truy cập.
3. System thông báo trạng thái phù hợp cho User.

### EF-03 — Authentication thất bại

1. System không hoàn tất quá trình xác thực.
2. User không được cấp quyền truy cập.
3. Chi tiết xử lý lỗi chưa được xác định.

## Data Requirements

### Confirmed data and controls

- Thông tin tài khoản của User.
- Thông tin xác thực cần thiết.
- Role của User.
- Trạng thái tài khoản.
- Thông tin cần thiết để duy trì trạng thái đăng nhập.

### Undefined data

- Các trường dữ liệu cụ thể của User.
- Phương thức authentication.
- Session hoặc token.
- Thời gian hết hạn session/token.
- Login audit log.

## Postconditions

### Success

1. User được xác thực thành công.
2. User được cấp quyền truy cập hệ thống.
3. User có thể sử dụng chức năng tương ứng với role.

### Failure

1. User không được cấp quyền truy cập.
2. User không thể sử dụng các chức năng yêu cầu authentication.

## Open Questions

1. User đăng nhập bằng username, email hay thông tin nào?
2. Phương thức authentication cụ thể là gì?
3. System sử dụng session hay token?
4. Session/token có thời gian hết hạn bao lâu?
5. Có cần password recovery/reset password không?
6. Thông báo khi đăng nhập thất bại cụ thể là gì?
7. Có cần login audit log không?