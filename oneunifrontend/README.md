# 🎓 OneUni Frontend

```
        ┌──────────────────────────────┐
        │          🖥️  UI Layer         │
        │   (Next.js Pages & Components)│
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ ⚙️ Application Layer          │
        │ (Usecases connect UI↔Domain) │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ 🧠 Domain Layer               │
        │ (Entities, Repositories,     │
        │  Services, Business Rules)   │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ 🌐 Backend (.NET API)         │
        │ (Database, Merit Formulas,   │
        │  Authentication, etc.)       │
        └──────────────────────────────┘
```

---

## 🚀 How to Run the Project

### 1️⃣ Prerequisites
Ensure you have installed:
- **Node.js** (v18+)
- **npm** or **yarn**
- A running **.NET backend API** for OneUni

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/oneunifrontend.git
cd oneunifrontend
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Setup Environment Variables
Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_ENV=development
```

### 5️⃣ Run the Project
```bash
npm run dev
```

### 6️⃣ Open in Browser
Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧠 Architecture Overview

The **OneUni Frontend** follows a **Simplified Clean Architecture** pattern that separates the system into three main layers:
- **UI Layer (Next.js pages/components)** — handles display and interaction.
- **Application Layer (Usecases)** — defines actions users can perform.
- **Domain Layer (Core logic)** — holds entities, services, repositories, and business rules.

This ensures:
✅ Scalability  
✅ Security  
✅ Maintainability  
✅ Easy testing and feature expansion

---

## 🏗️ Folder Structure

oneunifrontend/
├─ .next/
│  └─ types/
│     ├─ routes.d.ts
│     └─ validator.ts
│
├─ app/
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  └─ signup/page.tsx
│  ├─ (protected)/
│  │  ├─ (mentor)/
│  │  └─ (student)/
│  ├─ (public)/page.tsx
│  ├─ api/
│  │  ├─ auth/
│  │  └─ profile/
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ application/
│  └─ usecases/
│     └─ checkEligibility.ts
│
├─ components/
│  ├─ forms/
│  ├─ layout/
│  └─ ui/
│
├─ domain/
│  ├─ auth/
│  │  ├─ auth.entity.ts
│  │  ├─ auth.repository.ts
│  │  ├─ auth.service.ts
│  │  └─ auth.type.ts
│  └─ student/
│     ├─ student.entity.ts
│     ├─ student.repository.ts
│     ├─ student.service.ts
│     └─ student.types.ts
│
├─ hooks/
│
├─ lib/
│  ├─ api/
│  │  ├─ axiosClient.ts
│  │  ├─ endpoint.ts
│  │  └─ HandleError.ts
│  └─ utils.ts
│
├─ public/
│
├─ store/
│  └─ auth.store.ts
│
├─ types/
│  └─ user.ts
│
├─ .env.local
├─ .gitignore
├─ eslint.config.mjs
├─ middleware.ts
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json

---

## 📁 Folder Explanations

🧩 app/ — User Interface Layer

Houses all pages and routes.

Organized by sections:

- `(auth)` → login & signup
- `(protected)` → dashboards
- `(public)` → public landing

Interacts with: `application/usecases`

⚙️ application/ — Usecase Layer

Defines what the user can do.

Each file = one user action (login, register, check eligibility, etc.)

Interacts with: domain services.

📘 Example:

```ts
// application/usecases/checkEligibility.ts
import { StudentService } from "@/domain/student/student.service";

export const checkEligibility = async (studentId: string, universityId: string) => {
        return await StudentService.calculateEligibility(studentId, universityId);
};
```

🧠 domain/ — Business Logic Layer

Contains modules like `auth/` and `student/`.
Each module has:

- `entity.ts` → business model and rules
- `repository.ts` → API calls to backend
- `service.ts` → combines logic & data
- `types.ts` → TypeScript models

📘 Example (student.entity.ts)

```ts
export class Student {
        constructor(public fsc: number, public test: number) {}

        calculateMerit(formula: any) {
                return this.fsc * formula.fscWeight + this.test * formula.testWeight;
        }
}
```

🌐 lib/

Utility and API setup layer.

- `axiosClient.ts` → Base axios config
- `endpoint.ts` → All backend routes
- `HandleError.ts` → Centralized error management
- `utils.ts` → Helper functions

🧱 store/

Handles global app state using Zustand (auth state, user info, and token).

🧩 components/

Reusable UI components:

- `forms/` → Input forms
- `layout/` → Navbar, sidebar, footer
- `ui/` → Buttons, modals, dropdowns

⚙️ hooks/

Custom React hooks (e.g., `useAuth()`, `useFetch()`).

🧾 types/

Global TypeScript definitions — keeps type consistency across layers.


---

## 🔄 Example Feature Flow — Eligibility Check

```
1️⃣ UI Layer: (student)/eligibility/page.tsx
    ⮕ User clicks "Check Eligibility"

2️⃣ Application Layer: checkEligibility.ts
    ⮕ Calls StudentService from domain

3️⃣ Domain Layer:
    ⮕ student.repository.ts → Fetch merit formula from backend
    ⮕ student.entity.ts → Applies merit formula
    ⮕ student.service.ts → Combines both and returns result

4️⃣ Backend (.NET):
    ⮕ Returns university-specific formula and data

5️⃣ UI displays result to user ✅
```

---

## ⚙️ File Responsibilities Summary

| File | Role | Contains | Interacts With |
|------|------|-----------|----------------|
| `page.tsx` | UI | Form & Display | `application/usecases` |
| `checkEligibility.ts` | Usecase | Logic to connect layers | `domain/student.service.ts` |
| `student.service.ts` | Service | Combines data + rules | `repository`, `entity` |
| `student.repository.ts` | Repository | Fetch data from backend | `.NET API` |
| `student.entity.ts` | Entity | Core calculations | Self-contained |
| `axiosClient.ts` | API Setup | Axios instance | All repositories |
| `auth.store.ts` | Store | Global user state | UI + domain/auth |

---

## 🔐 Data Flow Diagram

```
[UI Layer] app/(student)/eligibility/page.tsx
        ↓
[Application Layer] application/usecases/checkEligibility.ts
        ↓
[Domain Layer] student.service.ts → student.repository.ts → student.entity.ts
        ↓
[Backend (.NET API)] → Returns response
        ↓
[UI Layer] Displays eligibility result
```

---

## 🧠 Summary

> The OneUni Frontend uses a **simplified clean architecture** to keep logic separated, maintainable, and secure.  
> UI handles presentation, Application defines usecases, Domain handles rules and backend data.  
> This makes OneUni scalable and ready for new modules like mentors or universities in the future.

---

## 👥 Developed By

**OneUni Team**  
University of Engineering & Technology – CS-22  
Supervised by: *Dr. Atif Hussain*  

---

✨ **Clean. Scalable. Secure. — That’s OneUni Frontend.**
