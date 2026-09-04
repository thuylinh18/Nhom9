# InsightFlow — Frontend (ReactJS + Vite)

Giao diện Web tương tác cho hệ thống **AI Customer Feedback & Survey Platform**, được xây dựng bằng ReactJS, Vite và Vanilla CSS hiện đại, tích hợp đầy đủ 100% các tính năng của REST API Backend.

---

## 🌟 Tính năng chính

1. **Xác thực & Phân quyền đa vai trò (Auth & RBAC)**:
   - Đăng nhập, đăng ký tài khoản với đầy đủ vai trò (`RESEARCHER`, `RESPONDENT`, `MANAGER`).
   - Các nút **1-Click Quick Demo** truy cập tức thì vào tài khoản mẫu có sẵn trong Database.
   - Tự động lưu và làm mới Access Token bằng JWT Refresh.

2. **Dành cho Nhà nghiên cứu (Researcher)**:
   - Quản lý danh sách bài khảo sát (Trạng thái `DRAFT`, `PUBLISHED`, `CLOSED`).
   - Tạo khảo sát mới, chỉnh sửa thông tin khảo sát.
   - Trình dựng câu hỏi động (Hỗ trợ 3 loại: `Rating` thang điểm sao, `Multiple choice` trắc nghiệm tùy biến lựa chọn, `Text` câu hỏi mở).
   - Đánh dấu câu hỏi bắt buộc / tùy chọn.
   - Chế độ xem trước (Preview) tương tác.
   - Xuất bản khảo sát (Publish) và Đóng khảo sát (Close).

3. **Dành cho Người tham gia khảo sát (Respondent)**:
   - Khám phá các bài khảo sát đang mở (`PUBLISHED`).
   - Giao diện làm bài trực quan: đánh giá sao, chọn đáp án trắc nghiệm, nhập ý kiến phản hồi.
   - Khung nhập nhận xét tổng thể để đưa vào phân tích AI.
   - Kiểm tra hợp lệ các câu hỏi bắt buộc trước khi gửi.
   - Màn hình thông báo nộp bài thành công.

4. **Dành cho Quản lý & Phân tích (Manager)**:
   - **Dashboard KPI tổng quan**: Tổng số khảo sát, tổng số lượt nộp, điểm rating trung bình, tỷ lệ cảm xúc tích cực, biểu đồ thanh trực quan.
   - **Chi tiết kết quả khảo sát**: Phân bố tỷ lệ đánh giá sao (1 - 5 sao), danh sách nhận xét gần đây.
   - **Danh sách phản hồi của khách hàng**: Đọc toàn bộ phản hồi văn bản của khách hàng.
   - **Phân tích AI Feedback (AI Insights)**:
     - Nhận diện cảm xúc chủ đạo (`Positive`, `Neutral`, `Negative`).
     - Tự động trích xuất các chủ đề chính (`Topics`).
     - Bản tóm tắt nhận định AI dành cho nhà quản lý.
     - Nút kích hoạt phân tích lại AI theo thời gian thực (`Re-run AI Analysis`).

---

## 🚀 Hướng dẫn cài đặt & khởi chạy

### 1. Yêu cầu môi trường
- Node.js >= 18 (hoặc 20+)
- Backend Django đang chạy tại `http://127.0.0.1:8000`

### 2. Cài đặt Dependencies
Từ thư mục gốc dự án:
```bash
cd frontend
npm install
```

### 3. Cấu hình biến môi trường
File `.env` đã được thiết lập sẵn:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### 4. Khởi chạy Development Server
```bash
npm run dev
```
Truy cập trình duyệt tại địa chỉ: **[http://localhost:5173/](http://localhost:5173/)**

---

## 🔑 Tài khoản Demo sẵn có trong Database

| Vai trò | Email | Mật khẩu | Chức năng chính |
|---|---|---|---|
| **Researcher** | `researcher@insightflow.com` | `password` | Tạo khảo sát, thêm câu hỏi, xuất bản, đóng |
| **Respondent** | `respondent@insightflow.com` | `password` | Xem khảo sát đang mở, nộp câu trả lời |
| **Manager** | `manager@insightflow.com` | `password` | Xem Dashboard, kết quả sao, phản hồi, phân tích AI |
| **Admin** | `admin@insightflow.com` | `password` | Toàn quyền quản trị hệ thống |

*(Trên màn hình Đăng nhập có sẵn các nút bấm 1-click để vào nhanh từng vai trò)*
