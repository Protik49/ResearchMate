# ResearchMate · BRACU Faculty & Academic Portal

[![Node.js](https://img.shields.io/badge/Node.js-v22-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.19-black.svg)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E.svg)](https://supabase.com/)
[![Postman](https://img.shields.io/badge/Postman-Automated%20Tests%20(29%2F29%20Passed)-FF6C37.svg)](https://www.postman.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

> A modern, production-ready academic portal for **BRAC University's Department of Computer Science & Engineering** (School of Data & Computational Sciences). Engineered with an editorial, high-contrast design system inspired by Acctual, verified faculty rosters, interactive exam timetable conflict detectors, role-based dashboards, and a complete Supabase JWT authentication engine.

---

## 🌟 Key Features

### 1. Editorial Homepage & Faculty Directory
- **Verified Faculty Rosters**: 32 computer science & engineering professor profiles, research interests (Health AI, Quantum Computing, Cryptography, Robotics), official room allotments in Building UB-07, and consultation schedules.
- **Acctual-Inspired Minimalist Design**: Open Runde typography, high-contrast zinc palette (`#FAFAFA` / `#09090B`), expansive whitespaces, and clean pastel accent containers.
- **Deep Search & Multi-Field Filtering**: Real-time keyword search, designation filtering (Professors, Associate, Assistant, Senior Lecturers), and research domain filters.

### 2. Interactive Exam Timeline (`/exams`)
- **Live Countdown Ticker**: Dynamic timer counting down to Fall 2026 examination commencement.
- **3 Responsive View Modes**: Chronological Timeline Rail, Card Grid, and Data Table.
- **My Exam Slip Drawer**: Add/remove registered courses into a customized personal exam schedule.
- **Automated Conflict Detector**: Alerts students instantly if two exams overlap in time.
- **Calendar & Print Integration**: One-click `.ics` calendar sync and formatted printable exam slip (`window.print()`).

### 3. Role-Based Dashboards & Admin Control Center (`/admin`)
- **Role-Based Access Control (RBAC)**: Distinct permissions for `student`, `faculty`, and `admin` roles.
- **Dynamic KPI Cards**: Live metrics for Total Faculty, Active Courses, Timetable Slots, and Student Inquiries.
- **3 Interactive Recharts Visualizations**:
  - Faculty Rank Breakdown (Bar Chart)
  - Advising Load & Consultation Trends (Line Chart)
  - Office Hour Distribution by Building (Pie Chart)
- **Faculty CRUD Data Table**: Paginated faculty management table with Search, Filter, Add Faculty modal, In-place Edit, and Delete actions.
- **Advising Inquiry Inbox**: Direct student advising messages stored in Supabase with coordinator reply tracking.

### 4. Robust Authentication System
- **Supabase Cloud JWT Authentication**: Full session management using GoTrue and PostgreSQL Row Level Security (RLS).
- **Auto-Confirm Registration API**: Server-side admin verification (`email_confirm: true`) eliminates email confirmation delays.
- **1-Click Demo Login**: Pre-configured instant sign-in for Demo Administrator (`admin@bracu.ac.bd`) and Demo Student (`student@g.bracu.ac.bd`).

---

## 🛠️ Architecture & Tech Stack

```
ResearchMate/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable UI primitives (Buttons, Cards, Modals, Tables, Dropdown)
│   │   ├── context/            # AuthContext (Supabase JWT), ThemeContext (Dark/Light)
│   │   ├── pages/              # HomePage, ExplorePage, ExamsPage, AdminDashboard, AdminGatewayPage, UserDashboard
│   │   ├── data/               # Verified BRACU CSE faculty mock & seed data
│   │   └── lib/                # Supabase browser client
│   └── tailwind.config.js      # Open Runde font family, custom radius, and animation curves
│
├── server/                     # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── routes/             # REST routes: faculty, auth, contact, exams, updates, analytics
│   │   ├── middlewares/        # requireAuth (Bearer JWT), requireAdmin (RBAC guard)
│   │   └── lib/                # Supabase admin client (Service Role) & public client
│   └── package.json
│
├── supabase/                   # Database Schemas & Migrations
│   ├── schema.sql              # PostgreSQL DDL, tables, triggers, indexes, RLS policies
│   └── seed.sql                # 32 pre-populated BRACU CSE faculty profiles
│
└── postman/                    # Talentry API Testing Suite
    ├── Talentry_API_Testing_ResearchMate.postman_collection.json # 29 Automated Tests
    ├── Talentry_API_Testing_ResearchMate.postman_environment.json# Postman Environment Variables
    └── Talentry_API_Testing_Report.md                            # Comprehensive Testing Report
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (v20 or v22 recommended)
- `npm` or `pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/Protik49/ResearchMate.git
cd ResearchMate
```

### 2. Environment Variables Configuration

#### Backend Environment (`server/.env`)
Create `server/.env` based on `server/.env.example`:
```env
PORT=5000
SUPABASE_URL=https://syiqpnhurhqzrtzbhbnk.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Frontend Environment (`client/.env`)
Create `client/.env` based on `client/.env.example`:
```env
VITE_SUPABASE_URL=https://syiqpnhurhqzrtzbhbnk.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies & Start Services

#### Option A: Run Both in Development Mode (Root)
```bash
# Install server dependencies
cd server && npm install
npm run dev

# In a second terminal, install client dependencies and start Vite
cd ../client && npm install
npm run dev
```

- **Frontend Client**: Runs at [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: Runs at [http://localhost:5000/api](http://localhost:5000/api)

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@bracu.ac.bd` | `password123` *(or `bracuPass2026!`)* | Full access to `/admin` control center, faculty CRUD, and analytics |
| **Student** | `student@g.bracu.ac.bd` | `bracuPass2026!` *(or `password123`)* | Access to `/dashboard`, saved faculty roster, and personal exam slips |

*Tip: You can also use the one-click **"Demo Admin"** or **"Demo Student"** buttons on the sign-in modal.*

---

## 📡 REST API Reference

| Method | Endpoint | Protection | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server health & uptime check | `200` |
| `GET` | `/api/faculty` | Public | List all faculty profiles with search & filter | `200`, `500` |
| `GET` | `/api/faculty/:id` | Public | Get single faculty profile by UUID | `200`, `404` |
| `POST` | `/api/faculty` | **Admin JWT** | Create new faculty profile | `201`, `400`, `401`, `403` |
| `PUT` | `/api/faculty/:id` | **Admin JWT** | Update faculty details | `200`, `400`, `401`, `403`, `404` |
| `DELETE` | `/api/faculty/:id` | **Admin JWT** | Delete faculty profile | `200`, `401`, `403`, `404` |
| `GET` | `/api/exams` | Public | List semester final exam hall schedules | `200` |
| `GET` | `/api/updates` | Public | List academic notices and bulletins | `200` |
| `POST` | `/api/updates` | **Auth JWT** | Publish departmental notice | `201`, `401` |
| `POST` | `/api/contact` | Public | Submit student advising consultation message | `201`, `400` |
| `GET` | `/api/contact` | **Admin JWT** | View received student advising inquiries | `200`, `401`, `403` |
| `GET` | `/api/analytics/overview` | Public | Aggregated department KPIs and chart distributions | `200` |
| `POST` | `/api/auth/register` | Public | Register pre-verified user with assigned role | `201`, `400` |
| `POST` | `/api/auth/login` | Public | Authenticate user and issue JWT token | `200`, `400`, `401` |

---

## 🧪 Postman Automated Test Suite (Talentry Assessment)

The project includes a comprehensive Postman test suite adhering to the **Talentry API Testing Fundamentals** specification:

- **Collection File**: [`postman/Talentry_API_Testing_ResearchMate.postman_collection.json`](postman/Talentry_API_Testing_ResearchMate.postman_collection.json)
- **Environment File**: [`postman/Talentry_API_Testing_ResearchMate.postman_environment.json`](postman/Talentry_API_Testing_ResearchMate.postman_environment.json)
- **Detailed Report**: [`postman/Talentry_API_Testing_Report.md`](postman/Talentry_API_Testing_Report.md)

### Test Execution Metrics
- **Total Test Cases Executed**: 29
- **Passed**: 29 (100% Pass Rate)
- **Failed / Blocked**: 0
- **Average API Response Latency**: 38ms (Well below the 2000ms SLA limit)
- **Covered Scenarios**: CRUD integrity, parameterization, header validation, role-based 403 Forbidden enforcement, token expiration, schema validation, and missing field rejection.

---

## 🗄️ Database Setup (Supabase)

To connect your own Supabase project:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql) (creates tables, RLS policies, and indexes).
4. Run [`supabase/seed.sql`](supabase/seed.sql) to populate the 32 BRACU CSE faculty records.
5. Update your `.env` files with your project credentials.

---

## 🚢 Deployment

### Frontend (Vercel)
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the **Root Directory** to `client`.
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy! Single-page application rewrites are pre-configured in `client/vercel.json`.

### Backend (Render / Railway)
1. Import repository into [Render](https://render.com) or [Railway](https://railway.app).
2. Set Root Directory to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure environment variables (`PORT=5000`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Engineered with precision for the BRAC University Computer Science & Engineering Community.*
