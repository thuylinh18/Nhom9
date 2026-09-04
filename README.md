# AI Customer Feedback & Survey Platform — Backend API

Backend REST API cho nền tảng **AI Customer Feedback & Survey Platform**, được xây dựng bằng **Django 5.1**, **Django REST Framework (DRF)** và **PostgreSQL 17** theo phương pháp **Spec-driven implementation**, **vertical slice** và **test-as-you-build**.

Dự án hỗ trợ xác thực **JWT**, phân quyền theo vai trò **RBAC** (`RESEARCHER`, `RESPONDENT`, `MANAGER`), quản lý vòng đời khảo sát (`DRAFT` → `PUBLISHED` → `CLOSED`), cơ chế submit câu trả lời / phản hồi và công cụ phân tích AI (Sentiment, Topics, Summary).

---

## 📑 Mục lục
1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Hướng dẫn cài đặt từ A đến Z](#2-hướng-dẫn-cài-đặt-từ-a-đến-z)
3. [Tài khoản Demo có sẵn (Seed Data)](#3-tài-khoản-demo-có-sẵn-seed-data)
4. [Tài liệu API tương tác (Swagger UI)](#4-tài-liệu-api-tương-tác-swagger-ui)
5. [Chạy Kiểm thử tự động (Pytest)](#5-chạy-kiểm-thử-tự-động-pytest)
6. [Danh sách API Endpoints](#6-danh-sách-api-endpoints)
7. [Xử lý các lỗi thường gặp (Troubleshooting)](#7-xử-lý-các-lỗi-thường-gặp-troubleshooting)

> 📘 **Tài liệu Đặc tả API Chi tiết**: Xem chi tiết toàn bộ schemas, request/response models và status code tại file [**`API_DOCUMENTATION.md`**](API_DOCUMENTATION.md).

---

## 1. Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- **Python**: Phiên bản `3.11` hoặc `3.12` (khuyên dùng Python 3.12).
- **PostgreSQL**: Phiên bản `15`, `16`, hoặc `17` đang hoạt động trên cổng `5432`.
- **Git**

---

## 2. Hướng dẫn cài đặt từ A đến Z

### Bước 1: Clone Repository và di chuyển vào thư mục backend
Mở Terminal (hoặc PowerShell trên Windows) và chạy:
```bash
git clone https://github.com/thuylinh18/Nhom9.git
cd Nhom9/backend
```

> **Lưu ý**: Đảm bảo đường dẫn hiện tại trên terminal là thư mục `backend/` (nơi có file `manage.py`).

---

### Bước 2: Tạo và kích hoạt Môi trường ảo (Virtual Environment)

- **Trên Windows (PowerShell):**
  ```powershell
  # Tạo môi trường ảo bằng Python 3.12
  py -3.12 -m venv .venv

  # Kích hoạt môi trường ảo
  .\.venv\Scripts\activate
  ```
  *(Nếu gặp lỗi `execution of scripts is disabled`, xem phần [Troubleshooting](#7-xử-lý-các-lỗi-thường-gặp-troubleshooting)).*

- **Trên Windows (Command Prompt - CMD):**
  ```cmd
  py -3.12 -m venv .venv
  .venv\Scripts\activate.bat
  ```

- **Trên macOS / Linux:**
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

Sau khi kích hoạt, đầu dòng lệnh sẽ xuất hiện tiền tố `(.venv)`.

---

### Bước 3: Nâng cấp pip và cài đặt Dependencies
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

### Bước 4: Tạo Database trên PostgreSQL

Mở công cụ dòng lệnh PostgreSQL (`psql`) hoặc giao diện **pgAdmin**:

```sql
CREATE DATABASE insightflow_db;
```

*(Lệnh trên sẽ tạo một cơ sở dữ liệu mới có tên `insightflow_db`)*.

---

### Bước 5: Cấu hình biến môi trường (`.env`)

Trong thư mục `backend/`, copy file `.env.example` thành file `.env`:

- **Trên Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **Trên macOS / Linux:**
  ```bash
  cp .env.example .env
  ```

Mở file `.env` và cập nhật thông tin đăng nhập PostgreSQL của máy bạn (đặc biệt là `DB_PASSWORD`):

```ini
SECRET_KEY=django-insecure-insightflow-dev-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Cấu hình PostgreSQL
DB_ENGINE=django.db.backends.postgresql
DB_NAME=insightflow_db
DB_USER=postgres
DB_PASSWORD=mật_khẩu_postgres_của_bạn
DB_HOST=127.0.0.1
DB_PORT=5432

# CORS (cho phép frontend prototype React/Vite)
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# JWT Token
ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7
```

> 💡 **Mẹo (Tùy chọn SQLite)**: Nếu bạn chưa cài đặt PostgreSQL hoặc muốn chạy thử nghiệm nhanh lập tức, bạn có thể thêm dòng `USE_SQLITE=True` vào file `.env`. Hệ thống sẽ tự động chuyển sang sử dụng SQLite mà không cần cài PostgreSQL.

---

### Bước 6: Chạy Database Migrations

Khởi tạo các bảng trong cơ sở dữ liệu:
```bash
python manage.py migrate
```

---

### Bước 7: Nạp dữ liệu mẫu (Seed Data)

Chạy lệnh seed có sẵn để tạo các tài khoản demo, survey, questions và feedback mẫu:
```bash
python manage.py seed
```

---

### Bước 8: (Tùy chọn) Tạo tài khoản Quản trị viên (Superuser)

Nếu muốn tạo thêm tài khoản Admin để đăng nhập vào Django Admin:
```bash
python manage.py createsuperuser
```
*(Làm theo hướng dẫn trên màn hình để nhập Email và Password)*.

---

### Bước 9: Khởi động Development Server

Chạy lệnh:
```bash
python manage.py runserver
```

Mở trình duyệt truy cập:
👉 **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

Hệ thống sẽ **tự động chuyển hướng** sang giao diện **Swagger UI** với đầy đủ tài liệu tương tác.

---

## 3. Tài khoản Demo có sẵn (Seed Data)

Lệnh `python manage.py seed` đã tự động khởi tạo 4 tài khoản phục vụ kiểm thử theo các Role nghiệp vụ:

| Email | Mật khẩu | Vai trò (Role) | Quyền hạn trong hệ thống |
|---|---|---|---|
| `researcher@insightflow.com` | `password` | **RESEARCHER** | Tạo, chỉnh sửa survey (Draft), thêm câu hỏi, Publish survey, Close survey |
| `respondent@insightflow.com` | `password` | **RESPONDENT** | Xem danh sách survey Published, làm bài và gửi câu trả lời + feedback |
| `manager@insightflow.com` | `password` | **MANAGER** | Xem kết quả tổng hợp, danh sách feedback, xem/chạy AI analysis, xem Dashboard KPI |
| `admin@insightflow.com` | `password` | **ADMIN** | Quản trị toàn quyền hệ thống qua Django Admin |

---

## 4. Tài liệu API tương tác (Swagger UI)

Khi server đang chạy, bạn có thể xem chi tiết và test trực tiếp các API:
- **Swagger UI (Interactive)**: [http://127.0.0.1:8000/api/schema/swagger-ui/](http://127.0.0.1:8000/api/schema/swagger-ui/) (hoặc [http://127.0.0.1:8000/](http://127.0.0.1:8000/))
- **Redoc**: [http://127.0.0.1:8000/api/schema/redoc/](http://127.0.0.1:8000/api/schema/redoc/)
- **Django Admin**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### Cách xác thực (Authorize) trên Swagger UI:
1. Gọi API `POST /api/v1/auth/login/` với email và password demo.
2. Sao chép giá trị chuỗi `access` token nhận được trong kết quả JSON.
3. Bấm nút **Authorize (hình ổ khóa)** ở góc trên bên phải trang Swagger.
4. Nhập vào ô Value theo cú pháp: `Bearer <chuỗi_access_token>`.
5. Bấm **Authorize**. Giờ bạn có thể gọi tất cả các API được phân quyền tương ứng!

---

## 5. Chạy Kiểm thử tự động (Pytest)

Dự án được xây dựng theo phương pháp **Test-as-you-build** với 24 test cases bao phủ toàn bộ User Stories, RBAC, Business Rules và Persistence.

Chạy toàn bộ test suite bằng lệnh:
```bash
pytest
```

Chạy và xem chi tiết từng test case:
```bash
pytest -v
```

---

## 6. Danh sách API Endpoints

### 🔐 Authentication (`/api/v1/auth/`)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/v1/auth/register/` | Public | Đăng ký tài khoản người dùng mới |
| `POST` | `/api/v1/auth/login/` | Public | Đăng nhập lấy access & refresh JWT và role |
| `POST` | `/api/v1/auth/refresh/` | Public | Làm mới JWT access token |
| `GET` | `/api/v1/auth/me/` | Authenticated | Lấy thông tin user và role hiện tại |

### 📋 Survey Management (`/api/v1/surveys/`)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/v1/surveys/` | Researcher | Tạo survey mới (mặc định trạng thái Draft) |
| `GET` | `/api/v1/surveys/` | Researcher | Danh sách survey do Researcher tạo |
| `GET` | `/api/v1/surveys/available/` | Authenticated | Danh sách survey đang `PUBLISHED` cho Respondent |
| `GET` | `/api/v1/surveys/<id>/` | Owner / All (nếu Published) | Chi tiết survey và danh sách câu hỏi |
| `PUT/PATCH` | `/api/v1/surveys/<id>/` | Researcher (Owner) | Chỉnh sửa survey (chỉ cho phép khi đang Draft) |
| `DELETE` | `/api/v1/surveys/<id>/` | Researcher (Owner) | Xóa survey (chỉ cho phép khi đang Draft) |
| `POST` | `/api/v1/surveys/<id>/publish/` | Researcher (Owner) | Publish survey (bắt buộc phải có câu hỏi - BR-003) |
| `POST` | `/api/v1/surveys/<id>/close/` | Researcher (Owner) | Đóng survey (ngừng nhận response mới - BR-002) |
| `GET/POST` | `/api/v1/surveys/<id>/questions/` | Researcher (Owner) | Xem danh sách hoặc thêm câu hỏi (Rating, Choice, Text) |
| `PUT/DELETE`| `/api/v1/surveys/<id>/questions/<qid>/`| Researcher (Owner) | Sửa hoặc xóa câu hỏi trong survey |

### ✍️ Survey Response (`/api/v1/surveys/`)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/v1/surveys/<id>/submit/` | Respondent | Nộp bài khảo sát (bắt buộc hoàn thành câu hỏi required) |

### 📊 Analytics & AI Insights (`/api/v1/`)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/v1/surveys/<id>/results/` | Manager | Xem thống kê tổng hợp (tổng response, điểm trung bình, star distribution) |
| `GET` | `/api/v1/surveys/<id>/feedback/` | Manager | Xem danh sách các phản hồi dạng văn bản |
| `GET` | `/api/v1/surveys/<id>/ai-analysis/` | Manager | Xem kết quả phân tích AI (Sentiment, Topics, Summary) |
| `POST` | `/api/v1/surveys/<id>/ai-analysis/` | Manager | Kích hoạt phân tích AI mới trên feedback hiện có |
| `GET` | `/api/v1/dashboard/` | Manager | Dashboard tổng quan KPI cho Manager |

---

## 7. Xử lý các lỗi thường gặp (Troubleshooting)

### 1. Lỗi: `password authentication failed for user "postgres"`
- **Nguyên nhân**: Mật khẩu trong file `.env` (`DB_PASSWORD`) không khớp với mật khẩu tài khoản PostgreSQL trên máy bạn.
- **Cách khắc phục**: Mở file `.env` và sửa `DB_PASSWORD` thành đúng mật khẩu PostgreSQL của bạn.

### 2. Lỗi PowerShell: `File ... activate.ps1 cannot be loaded because running scripts is disabled`
- **Nguyên nhân**: PowerShell mặc định chặn thực thi script chưa được cấp phép.
- **Cách khắc phục**: Mở PowerShell và chạy lệnh sau một lần để cho phép:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```
  Sau đó chạy lại `.\.venv\Scripts\activate`.

### 3. Lỗi: `Cannot find path '...\backend\backend'`
- **Nguyên nhân**: Bạn đang đứng sẵn trong thư mục `backend/` và gõ thêm `cd backend`.
- **Cách khắc phục**: Dùng lệnh `pwd` hoặc `ls` kiểm tra. Nếu đã thấy file `manage.py`, bạn không cần gõ `cd backend` nữa.

### 4. Lỗi: `That port is already in use`
- **Nguyên nhân**: Port `8000` đang có một tiến trình khác sử dụng.
- **Cách khắc phục**: Chạy server trên một cổng khác, ví dụ:
  ```bash
  python manage.py runserver 8080
  ```
  Sau đó truy cập: `http://127.0.0.1:8080/`.
