# InsightFlow

**Nền tảng khảo sát và phân tích phản hồi khách hàng ứng dụng AI**

InsightFlow là ứng dụng web cho phép tạo và phát hành khảo sát, thu thập câu trả lời của khách hàng, tổng hợp kết quả và phân tích phản hồi văn bản. Hệ thống dùng Google Gemini để phân tích cảm xúc, trích xuất chủ đề và tạo tóm tắt; khi Gemini không dùng được, backend chuyển sang bộ phân tích dự phòng theo luật.

## Chức năng

- **Quản trị viên (ADMIN):** xem, tìm kiếm, lọc, cập nhật vai trò và quản lý tài khoản.
- **Nhà nghiên cứu (RESEARCHER):** tạo và chỉnh sửa khảo sát nháp; thêm, sắp xếp và cấu hình câu hỏi; xem trước, xuất bản và đóng khảo sát.
- **Người trả lời (RESPONDENT):** xem khảo sát đang mở và gửi câu trả lời.
- **Quản lý (MANAGER):** xem dashboard, kết quả thống kê và phản hồi; yêu cầu hoặc xem phân tích AI.
- **Các loại câu hỏi:** văn bản, đánh giá 1–5 và trắc nghiệm.
- **Phân tích phản hồi:** phân loại cảm xúc tích cực/trung lập/tiêu cực, nhận diện chủ đề, tóm tắt ý kiến và cung cấp chỉ số tổng hợp.

## Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Backend/API | Python 3.12, Django 5.1, Django REST Framework |
| Xác thực API | JWT (SimpleJWT) |
| Cơ sở dữ liệu | PostgreSQL mặc định; SQLite tùy chọn khi phát triển |
| Phân tích AI | Google Gemini API, có bộ phân tích dự phòng theo luật |
| Kiểm thử | Pytest (backend); Node.js test runner (frontend) |

## Cấu trúc thư mục

```text
.
├── backend/
│   ├── apps/
│   │   ├── accounts/       # Tài khoản, JWT và phân quyền
│   │   ├── surveys/        # Khảo sát và câu hỏi
│   │   ├── responses/      # Câu trả lời và phản hồi văn bản
│   │   └── analytics/      # Kết quả tổng hợp và phân tích Gemini
│   ├── config/             # Cấu hình Django, URL và database
│   ├── tests/              # Kiểm thử backend
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/pages/          # Màn hình theo vai trò người dùng
│   ├── src/services/       # Gọi API và dữ liệu mock cho prototype
│   ├── tests/              # Kiểm thử frontend
│   └── package.json
└── .github/workflows/      # GitHub Actions CI
```

## Chạy dự án trên Windows

### Yêu cầu

- Python 3.12
- Node.js 22 trở lên và npm
- PostgreSQL, hoặc dùng SQLite cho môi trường local

### 1. Cài đặt backend

Mở PowerShell tại thư mục gốc repository:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Mở `backend/.env` và cấu hình database. Mặc định backend dùng PostgreSQL với các biến `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` và `DB_PORT`. Để chạy local bằng SQLite, thêm biến:

```dotenv
USE_SQLITE=True
```

`DATABASE_URL` cũng được hỗ trợ. Để gọi Gemini, cấu hình `GEMINI_API_KEY`; nếu không có API key hoặc dịch vụ AI gặp lỗi, backend sử dụng phân tích dự phòng theo luật. Không dùng `SECRET_KEY` mặc định trong môi trường production.

Trong terminal backend, chạy:

```powershell
python manage.py migrate
python manage.py seed
python manage.py runserver
```

Backend API mặc định tại `http://127.0.0.1:8000`.

### 2. Cài đặt frontend

Mở terminal PowerShell thứ hai tại thư mục gốc repository:

```powershell
cd frontend
npm install
npm run dev
```

Frontend mặc định chạy tại `http://localhost:5173` và gọi API tại `http://127.0.0.1:8000/api/v1`. Nếu API chạy ở địa chỉ khác, sao chép `frontend/.env.example` thành `frontend/.env.local` rồi sửa `VITE_API_BASE_URL`.

### 3. Tài khoản dữ liệu mẫu

Lệnh `python manage.py seed` tạo các tài khoản sau (mật khẩu dùng cho demo là `password`):

| Vai trò | Email |
|---|---|
| ADMIN | `admin@insightflow.com` |
| MANAGER | `manager@insightflow.com` |
| RESEARCHER | `researcher@insightflow.com` |
| RESPONDENT | `respondent@insightflow.com` |

Seed cũng tạo khảo sát đã xuất bản **Customer Service Feedback Survey**, ba câu hỏi và dữ liệu phản hồi/phân tích minh họa. Chỉ dùng tài khoản và mật khẩu này trên môi trường phát triển; không chạy seed trên production có dữ liệu thật.

## API và tài liệu

Khi backend đang chạy:

- Swagger UI: `http://127.0.0.1:8000/api/schema/swagger-ui/`
- Redoc: `http://127.0.0.1:8000/api/schema/redoc/`
- OpenAPI schema: `http://127.0.0.1:8000/api/schema/`

Các nhóm API được đặt dưới `/api/v1/`:

| Nhóm | Đường dẫn |
|---|---|
| Đăng ký, đăng nhập, thông tin người dùng | `/auth/` |
| Danh sách, chi tiết, câu hỏi và trạng thái khảo sát | `/surveys/` |
| Gửi phản hồi khảo sát | `/responses/` và `/surveys/` |
| Dashboard, kết quả, phản hồi và phân tích AI | `/dashboard/` và `/surveys/{id}/...` |

API dùng JWT; các chức năng được giới hạn theo vai trò. Dự án hiện không định nghĩa endpoint `/health`; dùng trang Swagger để kiểm tra backend có phản hồi.

## Chế độ prototype và lưu ý về dữ liệu

Frontend có dữ liệu mẫu trong `src/services/mockData.ts`. Nếu request API thất bại, một số chức năng frontend chuyển sang dữ liệu mock để phục vụ prototype. Dữ liệu mock chỉ tồn tại trong bộ nhớ của frontend, không được ghi vào database backend. Vì vậy, khi cần kiểm tra chức năng lưu dữ liệu thực, hãy khởi động backend, kết nối database và đăng nhập bằng tài khoản đã tạo từ lệnh seed.

## Kiểm thử

Backend:

```powershell
cd backend
python manage.py check
python manage.py makemigrations --check --dry-run
pytest -v
```

Frontend:

```powershell
cd frontend
npm run type-check
npm test
npm run build
```

CI trên GitHub Actions chạy Django checks, kiểm tra migration, Pytest, TypeScript type-check, frontend tests và build frontend. Frontend hiện chưa khai báo script `lint` hoặc `test:e2e`.

## Triển khai

- Backend có `Procfile` chạy Gunicorn và `build.sh` cài dependencies, thu thập static files, chạy migration và seed dữ liệu.
- Frontend có `vercel.json` cấu hình rewrite cho SPA; có thể triển khai với thư mục gốc Vercel là `frontend`.
- Cấu hình URL API frontend qua `VITE_API_BASE_URL`; cấu hình backend bằng biến môi trường tương ứng với database, `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, CORS và tùy chọn `GEMINI_API_KEY`.

> `backend/build.sh` chạy lệnh seed. Trước khi dùng script này trên production, bỏ hoặc tách bước seed để tránh tạo tài khoản và dữ liệu demo trong database thật.

## Giới hạn đã biết

- Bộ phân tích dự phòng theo luật không có khả năng hiểu ngôn ngữ linh hoạt như Gemini.
- Frontend mock fallback hữu ích cho trình diễn, nhưng không thay thế việc kiểm tra tích hợp với backend và database.
- Chưa có endpoint health check, script lint hoặc bộ kiểm thử end-to-end được cấu hình.
