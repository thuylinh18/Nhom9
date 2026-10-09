# InsightFlow — AI Customer Feedback & Survey Platform

[![CI/CD Pipeline](https://github.com/thuylinh18/Nhom9/actions/workflows/ci.yml/badge.svg)](https://github.com/thuylinh18/Nhom9/actions/workflows/ci.yml)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Django](https://img.shields.io/badge/Django-5.1-green?logo=django)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Gemini AI](https://img.shields.io/badge/Google%20AI-Gemini%203.5%20Flash-orange?logo=google)

Nền tảng khảo sát ý kiến khách hàng thông minh tích hợp trí tuệ nhân tạo (Google Gemini AI), giúp tự động phân tích cảm xúc (Sentiment Analysis), bóc tách chủ đề cốt lõi (Topic Extraction) và tổng hợp báo cáo kinh doanh (Executive Summary) theo thời gian thực.

---

## 🌟 Tính Năng Chính

### 1. Phân Quyền Đa Tác Vụ (Role-based Access Control)
- **ADMIN**: Quản lý tài khoản người dùng, phân quyền (ADMIN, RESEARCHER, MANAGER, RESPONDENT), kích hoạt/khóa tài khoản.
- **RESEARCHER**: Thiết kế khảo sát, tạo câu hỏi (Text, Rating 1-5, Multiple Choice), cấu hình câu hỏi bắt buộc, xuất bản khảo sát.
- **RESPONDENT**: Xem danh sách khảo sát công khai, trả lời câu hỏi khảo sát nhanh chóng.
- **MANAGER**: Dashboard trực quan hóa dữ liệu theo thời gian thực, xem kết quả phản hồi chi tiết, kích hoạt phân tích AI.

### 2. Trí Tuệ Nhân Tạo Thông Minh (Google Gemini 3.5 Flash)
- **Sentiment Analysis**: Phân loại cảm xúc chuẩn xác (POSITIVE, NEUTRAL, NEGATIVE) kèm điểm tin cậy `confidence_score` (0.0 - 1.0).
- **Topic Extraction**: Nhận diện các chủ đề khách hàng quan tâm nhiều nhất (e.g., Giao diện UI/UX, Hiệu năng, Chăm sóc khách hàng).
- **AI Executive Summary**: Tóm tắt tổng quan phản hồi và đề xuất hành động cụ thể cho nhà quản lý.
- **Resilient Fallback**: Tự động chuyển đổi phân tích dự phòng mượt mà khi gặp sự cố mạng hoặc quota API.

### 3. Tự Động Hóa & Kiểm Thử Toàn Diện (CI/CD & Quality Assurance)
- **CI/CD GitHub Actions**: Tự động kiểm tra chất lượng code, type check TypeScript, và build dự án mỗi khi push/PR.
- **Backend Test Suite**: 66 bài kiểm thử tự động với Pytest (100% Passed).
- **Frontend Test Suite**: 14 bài kiểm thử functional & boundary tests (100% Passed).

---

## 🏗️ Kiến Trúc Hệ Thống

```text
├── .github/workflows/ci.yml       # GitHub Actions CI/CD Pipeline
├── backend/                       # Django REST Framework Backend
│   ├── apps/
│   │   ├── accounts/              # Authentication & User Management
│   │   ├── surveys/               # Survey & Question Management
│   │   ├── responses/             # Survey Submissions & Feedback
│   │   └── analytics/             # Gemini AI Service & Aggregated Metrics
│   ├── config/                    # Django Settings & WSGI/ASGI
│   ├── tests/                     # 66 Pytest Test Cases
│   ├── build.sh                   # Deployment script (Render/Koyeb)
│   ├── Procfile                   # Gunicorn WSGI Server Config
│   └── requirements.txt           # Python Dependencies
├── frontend/                      # React 18 + TypeScript + Vite Frontend
│   ├── src/                       # Components, Pages, Layouts, API Services
│   ├── tests/                     # 14 Frontend Unit & Functional Tests
│   ├── vercel.json                # Vercel SPA Client-side Routing Config
│   └── package.json
└── docs/                          # Tài liệu kỹ thuật & API Contract
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Môi Trường Cục Bộ

### 1. Khởi chạy Backend (Django REST Framework)

```bash
cd backend

# 1. Tạo và kích hoạt virtual environment
python -m venv .venv
source .venv/bin/activate       # Trên Linux/macOS
# .venv\Scripts\activate        # Trên Windows

# 2. Cài đặt thư viện
pip install -r requirements.txt

# 3. Cấu hình biến môi trường (.env)
cp .env.example .env            # Điền SECRET_KEY, GEMINI_API_KEY, Database

# 4. Migrate database
python manage.py migrate

# 5. Khởi chạy server
python manage.py runserver
```
Backend API hoạt động tại: `http://localhost:8000`  
Swagger API Docs: `http://localhost:8000/api/docs/`

### 2. Khởi chạy Frontend (React + TypeScript + Vite)

```bash
cd frontend

# 1. Cài đặt dependencies
npm install

# 2. Khởi chạy development server
npm run dev
```
Frontend hoạt động tại: `http://localhost:5173`

---

## 🧪 Chạy Kiểm Thử Tự Động (Automated Testing)

### Backend Tests:
```bash
cd backend
pytest -v
```

### Frontend Tests & Type Checking:
```bash
cd frontend
npm run type-check
npm test
npm run build
```

---

## 🌐 Hướng Dẫn Deploy Production

- **Backend**: Deploy lên [Render](https://render.com) hoặc [Koyeb](https://koyeb.com) sử dụng `build.sh` và `Procfile`. Cơ sở dữ liệu PostgreSQL từ [Neon.tech](https://neon.tech).
- **Frontend**: Deploy lên [Vercel](https://vercel.com) với root directory `frontend` và file cấu hình `vercel.json`.
