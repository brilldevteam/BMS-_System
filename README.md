# Newoon BMS Rebuild

This repository contains the step-by-step rebuild of the Newoon BMS system.

The rebuild is intentionally incremental. Each module is added in small, stable steps without building the full system too early.

## Current Stack

- Frontend: Vite + React
- Frontend routing: React Router
- Styling: Tailwind CSS
- Font: Poppins
- HTTP client: Axios
- Forms: React Hook Form where needed
- Backend: Node.js + Express
- File uploads: Multer
- Temporary storage: local JSON files and local upload folders

Not added yet:

- Authentication
- JWT / HttpOnly cookies
- MongoDB
- Real permissions enforcement
- Production file storage
- Email sending
- Full KYC / BRA workflows

## Project Structure

```bash
bms-rebuild/
|-- backend/
|   `-- src/
|       |-- app.js
|       |-- server.js
|       `-- routes/
|           |-- reports.js
|           `-- userManagement.js
|-- data/
|   |-- roles.json
|   `-- users.json
|-- docs/
|-- frontend/
|   `-- src/
|       |-- components/
|       |   |-- dashboard/
|       |   |-- layout/
|       |   |-- reports/
|       |   `-- user-management/
|       |-- data/
|       |-- layouts/
|       |-- pages/
|       `-- services/
|-- uploads/
|   `-- reports/
|-- .env.example
|-- package.json
`-- README.md
```

## Install

From the `bms-rebuild` directory:

```bash
npm install
```

## Environment Files

Root:

```bash
cp .env.example .env
```

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

PowerShell equivalents:

```powershell
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Frontend env example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend env example:

```env
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

## Run

Before starting the application, make sure the local PostgreSQL service is running and
`backend/.env` contains a valid `DATABASE_URL`.

Run the frontend and backend together from the project root:

```bash
npm run dev
```

This starts:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Health:   http://localhost:5000/api/health
```

Press `Ctrl+C` once to stop both processes.

To run either server separately, use:

```bash
npm run dev:backend
```

Backend default:

```text
http://localhost:5000
```

```bash
npm run dev:frontend
```

Frontend default:

```text
http://localhost:5173
```

Build frontend:

```bash
npm run build:frontend
```

## Current Frontend Routes

```text
/mode-selection
/dashboard
/dashboard/financial-reports
/dashboard/user-management
/compliance
/resource-center
/document-library
```

## Completed UI Areas

### Mode Selection

Route:

```text
/mode-selection
```

Includes:

- Welcome Back page
- Four workspace cards
- Dashboard
- Compliance
- Resource Center
- Document Library
- Buttons route to workspace placeholders

### Dashboard Layout

Used by dashboard modules.

Includes:

- Left fixed sidebar
- Topbar with search, modes button, notification icon, user profile
- Main content area
- Responsive structure

### Dashboard Overview

Route:

```text
/dashboard
```

Includes:

- Modern dashboard welcome card
- Total Jobs, Total Users, Online Users, Completion Rate cards
- Job Trends placeholder
- Task Completion placeholder
- Service Distribution placeholder
- Recent Activity
- Future Expiring Documents

### Financial Reports

Route:

```text
/dashboard/financial-reports
```

Includes:

- Reports header
- Financial Statements tab
- Other Reports tab placeholder
- Statistics cards
- Filters and search
- Empty state
- Upload Financial Statements modal
- Drag and drop file upload zone
- Uploaded reports table

Backend APIs:

```text
GET    /api/reports
POST   /api/reports/upload
DELETE /api/reports/:id
```

Upload rules:

- Maximum 3 files
- Allowed: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
- Max 50MB per file

Storage:

```text
uploads/reports/
data/reports.json
```

`data/reports.json` is ignored by git because it is runtime data.

### User Management

Route:

```text
/dashboard/user-management
```

Tabs:

- Create Role
- Add User
- Signatures

Create Role includes:

- Role name input
- Permission groups
- Client Management permissions with Editor / Viewer
- KYC Management permissions
- BRA Management permissions
- Compliance Resources permission
- Additional permissions
- Role creation
- Role cards
- Delete role
- Users permission matrix

Add User includes:

- Full name
- Email address
- Password
- Role dropdown
- Adds user to local JSON storage
- Updates user table in UI
- Updates matching role user count in UI

Signatures includes:

- Digital signature cards
- User signing badges
- Signature preview state
- Local Create Signature file picker
- Local Preview / Delete controls
- No backend signature upload yet

Backend APIs:

```text
GET    /api/roles
POST   /api/roles
PUT    /api/roles/:id
DELETE /api/roles/:id
GET    /api/users
POST   /api/users
```

Storage:

```text
data/roles.json
data/users.json
```

Seed roles:

- admin
- External Parties
- Business Development
- Compliance Management
- Accounting
- Operation Management
- SSS
- MLRO
- CEO
- DMLRO
- customer
- AML Supervisor
- Senior Executive Function

Users table currently includes a wide horizontal permission matrix with sticky User and Role columns.

## Placeholder Workspace Routes

These routes exist as layout placeholders only:

```text
/compliance
/resource-center
/document-library
```

They do not yet include real business logic.

## Backend Health Check

```text
GET http://localhost:5000/api/health
```

Expected:

```json
{
  "status": "ok",
  "service": "bms-backend"
}
```

## Verification Commands Used

Frontend build:

```bash
npm run build:frontend
```

Backend syntax checks:

```bash
node --check backend/src/app.js
node --check backend/src/routes/reports.js
node --check backend/src/routes/userManagement.js
```

## Notes For Future Work

- Keep building in small steps.
- Do not add authentication until explicitly requested.
- Do not replace JSON storage with MongoDB until requested.
- Do not add real permission enforcement yet.
- Keep UI consistent with the current Poppins, purple-accented, clean SaaS style.
- Current local JSON data is temporary and meant only for development.
