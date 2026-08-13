# MediFlow Clinic Management System

<p align="left">
  <a href="https://laravel.com" target="_blank">
    <img src="https://img.shields.io/badge/Laravel-v13.17-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src="https://img.shields.io/badge/React-v19.2-2563EB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://www.php.net" target="_blank">
    <img src="https://img.shields.io/badge/PHP-^8.4-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  </a>
  <a href="https://inertiajs.com" target="_blank">
    <img src="https://img.shields.io/badge/Inertia.js-v3.0-7C3AED?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" />
  </a>
  <a href="https://tailwindcss.com" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://github.com/laravel/wayfinder" target="_blank">
    <img src="https://img.shields.io/badge/Wayfinder-Typed_Routes-E11D48?style=for-the-badge" alt="Laravel Wayfinder" />
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-059669?style=for-the-badge" alt="MIT License" />
  </a>
</p>

**🟢 Live Production Demo:** [https://mediflow-app.me/](https://mediflow-app.me/)

> A web-based Clinic Appointment & Prescription Management System that allows patients to discover active doctors, view doctor schedules, book appointments online for physical clinic visits, receive consultations during clinic visits, access digital & printable PDF prescriptions, submit doctor reviews and ratings, and maintain centralized medical history records while enabling doctors and administrators to manage the complete clinic workflow efficiently.

---

## 📍 Quick Navigation

[🌐 Live Demo](https://mediflow-app.me/) • [🎯 Scope](#-project-scope) • [📸 Screenshots Gallery](#-application-preview--screenshot-gallery) • [🏗 Architecture](#-architecture-overview) • [✨ Features](#-implemented-features) • [🚦 State Machine](#-state-machine--business-rules) • [💾 Database Schema](#-domain-model-database-schema) • [🛠 Tech Stack](#-technology-stack) • [🚀 Setup Guide](#-local-development-setup) • [🔄 Upgrading Guide](#-upgrading--maintenance-guide)

---

## 🎯 Project Scope

MediFlow is focused on streamlining the workflow of a **single clinic**. The application intentionally delivers a clean, maintainable Minimum Viable Product (MVP) for core clinic operations rather than attempting to cover every module of a massive hospital management system.

### 🟢 Included Features
- 🏢 **Single Clinic Administration:** Core workflow management tailored specifically for a single clinic ecosystem.
- 📅 **Physical Clinic Appointment Scheduling:** Real-time conflict-free slot booking for physical patient visits.
- 🩺 **Doctor Schedule Management:** Custom weekly day, start/end time, and slot duration configuration.
- ⚕️ **Patient Consultations & Notes:** Dedicated clinical consultation workspace with private doctor notes.
- 📑 **Structured Digital & PDF Prescriptions:** Multi-item prescriptions with one-click printable PDF downloads (`barryvdh/laravel-dompdf`).
- 🎟️ **Printable Appointment Entry Pass Tokens:** Official clinic entry pass PDF downloads (`TK-XXXX` Token format).
- 📜 **Centralized Medical History Tracking:** Permanent patient consultation and prescription timeline archive.
- ⭐ **Patient-Doctor Review & Rating System:** 1-5 star ratings, optional written feedback, anonymous toggle, and admin moderation.
- 🛡️ **Transparent Cancellation Tracking:** Attribution tracking (`cancelled_by: patient | doctor`), cancellation reasons, and status badges.
- ⚡ **Paginated Queues & URL State Sync:** Server-side `paginate(10)` with query param sync across browser tabs.
- 📊 **Interactive Analytics & Financial Charts:** Visual performance and revenue metrics powered by `Recharts`.
- 🗺️ **End-to-End Typed Route Actions:** Typed PHP-to-TypeScript route bindings powered by `Laravel Wayfinder`.
- 💳 **Manual Consultation Billing:** Integrated consultation fee ledger with paid/unpaid tracking.
- 🔒 **Strict Role-Based Access Control:** Role-compartmentalized security for Admins, Doctors, and Patients.

### 🔴 Out of Scope
- ❌ **Multi-Clinic Support:** Multi-branch or multi-tenant SaaS architecture.
- ❌ **Telemedicine Services:** Video consultations, live chat, or online audio calls.
- ❌ **Online Payment Gateways:** Automated Stripe/PayPal checkout processing.
- ❌ **Pharmacy Stock Management:** Drug inventory tracking or pharmacy point-of-sale.
- ❌ **Lab Diagnostics:** Laboratory test orders and diagnostic image processing.
- ❌ **AI Diagnosis:** Automated AI symptom analysis or machine-learning triage.
- ❌ **Insurance Claims:** Health insurance claim filing or third-party billing integrations.

---

## 📸 Application Preview & Screenshot Gallery

A complete visual walkthrough of the MediFlow platform across all user roles and workflows.

### 🌐 Public & Auth Experience

| Welcome Landing Page | Login Page |
|:---:|:---:|
| ![Welcome Landing Page](docs/welcome.png) | ![Login Page](docs/loginpage.png) |

| Registration Page | Forgot Password Page |
|:---:|:---:|
| ![Registration Page](docs/register.png) | ![Forgot Password Page](docs/forget-password.png) |

#### Custom 404 Error Page
![404 Error Page](docs/404page.png)

---

### 👑 Administrator Portal Workflow

| 1. Admin Dashboard Overview | 1. Dashboard Analytics Charts |
|:---:|:---:|
| ![Admin Dashboard 1](docs/admin-dashboard-pages/dashboard-part1-1.png) | ![Admin Dashboard 2](docs/admin-dashboard-pages/dashboard-part2-1.png) |

| 2. User & Patient Moderation | 3. Doctor Directory & Onboarding |
|:---:|:---:|
| ![Patient Moderation](docs/admin-dashboard-pages/patient-2.png) | ![Doctor Management](docs/admin-dashboard-pages/doctor-3.png) |

| 4. Appointment Clinical Oversight | 5. Financial & Performance Reports |
|:---:|:---:|
| ![Admin Appointments](docs/admin-dashboard-pages/appointment-4.png) | ![Admin Reports](docs/admin-dashboard-pages/report-part1-5.png) |

---

### 🩺 Doctor Workspace Workflow

| 1. Doctor Dashboard Overview | 2. Clinical Profile Settings |
|:---:|:---:|
| ![Doctor Dashboard](docs/doctor-dashboard-pages/dashboard-1.png) | ![Doctor Profile](docs/doctor-dashboard-pages/profile-2.png) |

| 3. Weekly Schedule Controller | 4. Appointment Queue & Approvals |
|:---:|:---:|
| ![Doctor Schedule](docs/doctor-dashboard-pages/schedule-3.png) | ![Doctor Queue Part 1](docs/doctor-dashboard-pages/appoitment-part1-4.png) |

| 4. Cancellation & Rejection Logs | 5. Billing & Consultation Ledger |
|:---:|:---:|
| ![Doctor Queue Part 2](docs/doctor-dashboard-pages/appointment-part2-4.png) | ![Doctor Bills](docs/doctor-dashboard-pages/bill-log-5.png) |

#### 6. Doctor Rating & Review Analytics
![Doctor Reviews](docs/doctor-dashboard-pages/review-6.png)

---

### 🧑‍⚕️ Patient Portal Workflow

| 1. Patient Dashboard | 2. Personal & Health Profile |
|:---:|:---:|
| ![Patient Dashboard](docs/patient-dashboard-pages/dashborad-1.png) | ![Patient Profile](docs/patient-dashboard-pages/profile-2.png) |

| 3. Doctor Discovery Directory | 4. My Appointments Lifecycle |
|:---:|:---:|
| ![Browse Doctors](docs/patient-dashboard-pages/browse-doctor-3.png) | ![Patient Appointments](docs/patient-dashboard-pages/my-appointment-4.png) |

| 5. Financial Bills Ledger | 6. Medical Records & PDF Prescriptions |
|:---:|:---:|
| ![Patient Bills](docs/patient-dashboard-pages/my-bill-5.png) | ![Medical History](docs/patient-dashboard-pages/medical-history-6.png) |

#### 7. Doctor Review & Rating Form
![Patient Review Form](docs/patient-dashboard-pages/my-review-7.png)

---

## 🏗 Architecture Overview

MediFlow employs a modern monolithic architecture powered by the **Inertia.js** protocol. Inertia bridges the gap between a server-side Laravel 13 backend and a client-side React 19 SPA frontend without the overhead of building a separate REST or GraphQL API.

### 💡 The Power of Inertia.js & Laravel Wayfinder
* ⚡ **No API Glue Code:** Eliminates the need for complex client-side state management (Redux, React Query) or API controllers. Server controllers return props directly to React page components via `Inertia::render('PageName', $props)`.
* 🗺️ **End-to-End Typed Routing:** Application routes are defined centrally in `routes/web.php` and automatically compiled into TypeScript functions via **Laravel Wayfinder**.
* 🚀 **Seamless SPA Performance:** The initial page load serves a full HTML document with a hydration payload. Subsequent navigations are intercepted by Inertia to perform instant XHR component swaps without browser reloads.
* 🔒 **Unified Security & RBAC:** Sessions, cookies, CSRF tokens, and Role-Based Access Control remain 100% server-side and secure via Laravel Fortify and Middleware.

```mermaid
flowchart TB
    subgraph ClientLayer [" 💻 Client-Side SPA Layer (Browser) "]
        direction LR
        UI["React 19 User Interface<br/>(Components, Tailwind CSS 4, shadcn/ui)"]
        ClientAdapter["⚡ @inertiajs/react Adapter<br/>(Client Router, Page State, Link Interceptor)"]
        UI <--> ClientAdapter
    end

    subgraph ProtocolLayer [" 🌉 Inertia.js Protocol Abstraction (No REST/GraphQL API Needed) "]
        direction TB
        Protocol["• Initial Request: Full HTML + Hydration Payload<br/>• Subsequent Navigations: XHR Requests with X-Inertia Headers<br/>• Response: JSON Page Objects (Component Name + Server Props + Flash Data)<br/>• Route Sync: Wayfinder Typed Route Actions"]
    end

    subgraph ServerLayer [" 🕹️ Server-Side Monolith Layer (Laravel 13 Core) "]
        direction LR
        Controllers["Laravel Controllers & Services<br/>(ClinicWorkflowService, RBAC Middleware)"]
        InertiaResponse["📦 Inertia::render('page', $props)<br/>(Direct Prop Injection)"]
        ORM["🗄️ Eloquent ORM Models<br/>(User, Appointment, DoctorProfile, etc.)"]
        Controllers --> InertiaResponse
        Controllers --> ORM
    end

    subgraph InfraLayer [" ⚙️ Infrastructure & Background Workers "]
        direction LR
        DB[("💾 Database Engine<br/>(SQLite / MySQL)")]
        Queue["⚙️ Database Job Queue<br/>(Async Notification Dispatcher)"]
        Brevo["📧 Brevo Email Service<br/>(Transactional Mail API)"]
        PDF["📄 DomPDF Engine<br/>(Prescription & Entry Token PDF Generator)"]
        ORM <--> DB
        Controllers -.-> Queue
        Controllers -.-> PDF
        Queue -.-> Brevo
    end

    ClientLayer <===> ProtocolLayer
    ProtocolLayer <===> ServerLayer
```

---

## ✨ Implemented Features

The system operates on a strictly compartmentalized architecture governed by Laravel Middleware and Fortify, serving three distinct operational roles. Every feature listed below is 100% functional and verified in the current codebase.

### 🔒 Core Infrastructure
| Category | Technical Implementation |
|----------|--------------------------|
| **🔐 Authentication** | Secure session-based auth, user registration, and email verification (`Laravel Fortify`). |
| **🛡️ Authorization** | Strict Role-Based Access Control (RBAC) preventing cross-role access (Admin, Doctor, Patient). |
| **📄 PDF Generation** | Server-side PDF generation engine (`barryvdh/laravel-dompdf`) for medical prescriptions & entry passes. |
| **⚡ Async Processing**| Database-driven job queues for non-blocking operations like dispatching transactional emails. |
| **🐛 Developer Tooling**| Built-in `Laravel Telescope` integration for deep query, request, and background job debugging. |

### 👑 Administrator Capabilities
| Feature | Operational Scope |
|---------|-------------------|
| **📊 Clinic Dashboard** | High-level metrics tracking active users, total doctors, daily appointments, and Recharts analytics. |
| **👥 User Management** | View comprehensive user tables and instantly toggle account access (`active`/`suspended`). |
| **🩺 Doctor Onboarding**| Register new doctors, assign exact medical specialties, set consultation fees, and toggle employment status. |
| **👁️ Clinical Oversight**| Unrestricted read-access to clinic-wide data (Appointments, Consultations, Prescriptions, Bills, and Reviews). |
| **⭐ Review Moderation** | Inspect and moderate patient reviews and ratings submitted for clinic doctors (`/admin/doctor-reviews`). |
| **📈 Reporting** | Interactive financial & performance report charts generated via Recharts. |

### 🩺 Doctor Workspace
| Feature | Operational Scope |
|---------|-------------------|
| **📅 Schedule Control** | Dynamically define weekly availability (Day of week, Start/End time, and precise slot duration in minutes). |
| **📥 Appointment Queue**| Real-time paginated queue of patient requests. Approve, Reject (with reason), Cancel, or mark as No-Show. |
| **🛡️ Cancellation Tracking**| Clear distinction between appointments cancelled by doctor (`Cancelled by Me`) vs patient (`Cancelled by Patient`). |
| **⚕️ Clinical Consultations**| Dedicated workflow to record patient symptoms, formal diagnosis, and private doctor-only notes. |
| **💊 Digital Prescriptions**| Issue structured medical prescriptions supporting multiple line items (Medicine Name, Dosage, Frequency, Duration). |
| **📂 Patient History** | Instant access to the historical timeline of an assigned patient's past appointments and prescriptions. |
| **⭐ Rating Analytics** | View average star rating, rating distribution (1 to 5 stars), and patient feedback (`/doctor/reviews`). |
| **💳 Billing Oversight** | View auto-generated consultation bills and manually mark them as `Paid` upon collection. |

### 🧑‍⚕️ Patient Portal
| Feature | Operational Scope |
|---------|-------------------|
| **🔍 Doctor Discovery** | Browse the active clinic directory filtered by doctor specialization, star ratings, and consultation fees. |
| **⏱️ Live Booking** | View real-time, conflict-free time slots derived from the doctor's predefined schedule and current bookings. |
| **📆 Appointment Lifecycle**| Submit booking requests, view paginated appointments (`paginate(10)`), and cancel with origin tracking. |
| **🏥 Medical Records** | Access a permanent personal timeline archive of past consultations, diagnoses, and prescriptions. |
| **📄 PDF Downloads** | Direct one-click download of official **Medical Prescription PDFs** and **Appointment Entry Pass Tokens** (`TK-XXXX`). |
| **⭐ Review Submission** | Rate doctors after completed visits with a 1-5 star score, optional review text, and anonymous toggle (`/patient/reviews`). |
| **🧾 Financial Ledger** | Transparent view of all pending and cleared consultation bills. |

---

## 🚦 State Machine & Business Rules

### Appointment Lifecycle

```mermaid
flowchart TD
    Start(["🏁 Patient Booking Request"]) -->|Books Available Slot| Pending["⏳ PENDING"]
    
    Pending -->|Patient Cancels| Cancelled["❌ CANCELLED"]
    Pending -->|Doctor Declines| Rejected["⛔ REJECTED"]
    Pending -->|Doctor Approves| Confirmed["✅ CONFIRMED"]
    
    Confirmed -->|Patient/Doctor Cancels| Cancelled
    Confirmed -->|Patient Misses Visit| NoShow["⚠️ NO-SHOW"]
    Confirmed -->|Doctor Starts Visit| Consult["🩺 CONSULTATION"]
    
    Consult -->|Issue Diagnosis| Presc["💊 PRESCRIPTION & BILL"]
    Presc --> Completed["🎉 COMPLETED"]
    Completed --> Review["⭐ DOCTOR REVIEW & RATING"]

    classDef default fill:#F8FAFC,stroke:#334155,stroke-width:1.5px,color:#0F172A;
    classDef startNode fill:#F1F5F9,stroke:#475569,stroke-width:2px,color:#0F172A;
    classDef primaryState fill:#EFF6FF,stroke:#2563EB,stroke-width:2px,color:#1E40AF;
    classDef successState fill:#F0FDF4,stroke:#16A34A,stroke-width:2px,color:#166534;
    classDef dangerState fill:#FEF2F2,stroke:#DC2626,stroke-width:1.5px,color:#991B1B;
    
    class Start startNode;
    class Pending,Consult,Presc primaryState;
    class Confirmed,Completed successState;
    class Cancelled,Rejected,NoShow dangerState;
```

<details>
<summary><b>Click to view detailed ASCII State Flow</b></summary>

```text
                          PATIENT
                             │
                             ▼
                          PENDING
                         /       \
                        ▼         ▼
                 CANCELLED    DOCTOR REVIEW
                (by patient)        │
                        ┌───────────┼────────────┐
                        │           │            │
                        ▼           ▼            ▼
                   REJECTED    CONFIRMED    CANCELLED
                  (with reason)            (by doctor)
                                       │
                          ┌────────────┼────────────┐
                          │            │            │
                          ▼            ▼            ▼
                    CANCELLED      NO_SHOW    CONSULTATION
                   (by patient)                  │
                                                 ▼
                                            PRESCRIPTION
                                                 │
                                                 ▼
                                                BILL
                                                 │
                                                 ▼
                                             COMPLETED
                                                 │
                                                 ▼
                                           DOCTOR REVIEW
                                          (Star Rating & Text)
```
</details>

### Core Business Rules

| Rule ID | Domain Focus | Enforcement Logic |
|---|---|---|
| **BR-1** | **Doctor Availability** | Patients can only book appointments with doctors whose account status is `active`. |
| **BR-2** | **Patient Collision** | A patient cannot have more than one `pending` or `confirmed` appointment for the exact same date and time. |
| **BR-3** | **Slot Exclusivity** | A doctor's time slot cannot be booked if it already has a `pending`, `confirmed`, or `completed` appointment. |
| **BR-4** | **Cancellation Window** | Appointments can only be cancelled if their current status is `pending` or `confirmed`. |
| **BR-5** | **Strict Approvals** | Only `pending` appointments can be approved or rejected by the assigned doctor. |
| **BR-6** | **No-Show & Consultations**| Only `confirmed` appointments can transition into `no_show` or proceed to `completed` via consultation. |
| **BR-7** | **Consultation Artifacts** | Completing a consultation automatically generates a Consultation record, a Digital Prescription, and an `unpaid` Bill. |
| **BR-8** | **Doctor Reviews & Ratings** | Patients can rate doctors after completed appointments (1-5 stars, optional review, `is_anonymous`). |
| **BR-9** | **Cancellation Attribution** | Origins are recorded (`cancelled_by: patient | doctor`) along with optional cancellation explanations. |
| **BR-10** | **Asynchronous Notifications** | System dispatches queued email notifications on cancellations, rejections, no-shows, and onboarding. |

### Automated Transactional Notifications

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Admin / Doctor
    participant System as MediFlow Core API
    participant Queue as Asynchronous Queue
    participant Brevo as Brevo Mail Engine
    participant Inbox as Target Recipient Inbox

    User->>System: Action Triggered (e.g. Cancel / Reject)
    System->>System: Update DB Record Status
    System->>Queue: Push Notification Job
    System-->>User: Immediate UI Response (Fast)
    Queue->>Brevo: Send Payload via Brevo Transport
    Brevo->>Inbox: Email Delivered to Recipient
```

---

## 💾 Domain Model (Database Schema)

```mermaid
flowchart TD
    subgraph CoreUsers [" 👥 User Accounts "]
        User["👤 User (Base Account)"]
    end

    subgraph Profiles [" 📋 Profiles (1:1 Relationships) "]
        DocProfile["🩺 Doctor Profile"]
        PatProfile["🧑‍⚕️ Patient Profile"]
    end

    subgraph Scheduling [" 📅 Schedules & Bookings "]
        DocSchedule["📆 Doctor Schedule (1:N)"]
        Appt["⏱️ Appointment (1:N)"]
    end

    subgraph Clinical [" ⚕️ Consultations & Artifacts "]
        Consult["🩺 Consultation (1:1)"]
        Presc["💊 Prescription (1:1)"]
        PrescItems["💊 Prescription Items (1:N)"]
        Bill["🧾 Bill (1:1)"]
        Review["⭐ Doctor Review (0:1)"]
    end

    User -->|1:1 Has| DocProfile
    User -->|1:1 Has| PatProfile
    DocProfile -->|1:N Defines| DocSchedule
    DocProfile -->|1:N Assigned To| Appt
    PatProfile -->|1:N Books| Appt
    Appt -->|1:1 Results In| Consult
    Appt -->|1:1 Generates| Bill
    Appt -->|0:1 Reviewed In| Review
    Consult -->|1:1 Receives| Presc
    Presc -->|1:N Contains| PrescItems

    classDef default fill:#F8FAFC,stroke:#475569,stroke-width:1.5px,color:#0F172A;
    classDef mainEntity fill:#EEF2FF,stroke:#4F46E5,stroke-width:2px,color:#312E81;
    classDef clinicalEntity fill:#F0F9FF,stroke:#0284C7,stroke-width:1.5px,color:#075985;
    
    class User mainEntity;
    class DocProfile,PatProfile,Appt,Consult clinicalEntity;
```

### 🗄 Data Dictionary

#### `users`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `name` | string | | |
| `email` | string | Unique | |
| `password` | string | | Hashed |
| `role` | enum | | `admin`, `doctor`, `patient` |
| `status` | enum | Default: `active` | `active`, `suspended` |

#### `patient_profiles`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `user_id` | bigint | FK (`users.id`) | Unique (1:1), Cascade Delete |
| `phone` | string | | |
| `gender` | enum | | `male`, `female`, `other` |
| `dob` | date | Nullable | |
| `address` | text | Nullable | |
| `allergies` | text | Nullable | |
| `major_diseases` | text | Nullable | |

#### `doctor_profiles`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `user_id` | bigint | FK (`users.id`) | Unique (1:1), Cascade Delete |
| `specialization` | string | | |
| `qualification` | string | | |
| `experience` | integer | | Years of experience |
| `consultation_fee` | decimal(8,2)| | |

#### `doctor_schedules`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `doctor_id` | bigint | FK (`doctor_profiles.id`) | Cascade Delete |
| `day` | enum | | `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday` |
| `start_time` | time | | |
| `end_time` | time | | |
| `duration` | integer | | Slot duration in minutes |

#### `appointments`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `patient_id` | bigint | FK (`patient_profiles.id`) | Cascade Delete |
| `doctor_id` | bigint | FK (`doctor_profiles.id`) | Cascade Delete |
| `appointment_date` | date | | |
| `appointment_time` | time | | |
| `reason` | text | Nullable | |
| `status` | enum | Default: `pending` | `pending`, `confirmed`, `rejected`, `cancelled`, `no_show`, `completed` |
| `cancelled_by` | enum | Nullable | `patient`, `doctor` |
| `cancel_reason` | text | Nullable | |
| `reject_reason` | text | Nullable | |

#### `consultations`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `appointment_id` | bigint | FK (`appointments.id`) | Unique (1:1), Cascade Delete |
| `symptoms` | text | | |
| `diagnosis` | text | | |
| `notes` | text | Nullable | Private doctor notes |

#### `prescriptions`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `consultation_id`| bigint | FK (`consultations.id`) | Unique (1:1), Cascade Delete |
| `instructions` | text | Nullable | General usage instructions |

#### `prescription_items`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `prescription_id`| bigint | FK (`prescriptions.id`) | Cascade Delete |
| `medicine_name` | string | | |
| `dosage` | string | | e.g., "500mg" |
| `frequency` | string | | e.g., "1-0-1" or "Twice daily" |
| `duration` | string | | e.g., "5 Days" |

#### `bills`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `appointment_id` | bigint | FK (`appointments.id`) | Unique (1:1), Cascade Delete |
| `amount` | decimal(8,2)| | Auto-populated from doctor profile |
| `status` | enum | Default: `unpaid` | `unpaid`, `paid` |

#### `doctor_reviews`
| Attribute | Type | Key/Constraint | Domain / Notes |
|---|---|---|---|
| `id` | bigint | PK | Auto-incrementing |
| `patient_id` | bigint | FK (`patient_profiles.id`) | Cascade Delete |
| `doctor_id` | bigint | FK (`doctor_profiles.id`) | Cascade Delete |
| `appointment_id` | bigint | FK (`appointments.id`) | Nullable, Cascade Delete |
| `rating` | integer | | Score between 1 and 5 stars |
| `review_text` | text | Nullable | Patient written feedback |
| `is_anonymous` | boolean | Default: `false` | Author identity toggle |

---

## 🛠 Technology Stack

### Backend
- **Framework**: Laravel `v13.17`
- **Language**: PHP `^8.4`
- **Database**: SQLite (Default) or MySQL
- **PDF Engine**: Barryvdh Laravel DomPDF `^3.1`
- **Authentication**: Laravel Fortify `^1.37`
- **Developer Tools**: Laravel Telescope, Pint, Larastan, PestPHP

### Frontend
- **Library**: React `^19.2`
- **Language**: TypeScript `^5.7`
- **Bridge**: Inertia.js `^3.0`
- **Route Actions**: Laravel Wayfinder `^0.1`
- **Data Analytics**: Recharts `^3.8`
- **Styling**: Tailwind CSS `^4.0`
- **UI Architecture**: shadcn/ui
- **Animation & Effects**: Framer Motion, Aceternity UI, Magic UI
- **Icons & Primitives**: Lucide React, Radix UI, Tabler Icons
- **Bundler**: Vite `^8.0`

### Recommended Local Tools
- **Laravel Herd**: Provides an effortless, zero-configuration environment with PHP, Node.js, and Composer bundled out-of-the-box.
- **DBngin** & **DBeaver**: For database service management and inspection.

---

## 📂 Project Directory Structure

```text
MediFlow/
├── app/                        # Backend Engine (Laravel)
│   ├── Http/
│   │   ├── Controllers/        # Controllers (Admin, Doctor, Patient, Review, Pdf)
│   │   │   └── Pdf/            # PdfController (Prescription & Token PDF Generators)
│   │   ├── Requests/           # Form Request Validation
│   │   └── Resources/          # Eloquent API Resources
│   ├── Models/                 # Eloquent Database Models
│   ├── Policies/               # RBAC Policies
│   └── Services/               # Core Business Logic (ClinicWorkflowService)
├── config/                     # Centralized configuration (Database, Mail, Fortify)
├── database/                   # Data Layer
│   ├── migrations/             # Database Schema Definitions
│   └── seeders/                # Test Data Generation
├── docs/                       # Screenshot & Visual Documentation Gallery
│   ├── admin-dashboard-pages/  # Admin Screenshots (1 to 5)
│   ├── doctor-dashboard-pages/ # Doctor Screenshots (1 to 6)
│   └── patient-dashboard-pages/# Patient Screenshots (1 to 7)
├── public/                     # Publicly accessible assets & entry point
├── resources/                  
│   └── js/                     # Frontend Workspace (React + TypeScript)
│       ├── components/         # Reusable UI (Charts, Pagination, StatusBadge, StarRating)
│       ├── layouts/            # Shared Page Layouts
│       └── pages/              # Inertia Page Components
├── routes/                     # HTTP Routing
│   └── web.php                 # Web, Inertia & PDF Routes
├── composer.json               # PHP Dependencies
├── package.json                # Node/NPM Dependencies
└── vite.config.ts              # Vite Bundler Configuration
```

---

## 🚀 Local Development Setup

Follow these steps to quickly scaffold the application in a local environment. 

> [!NOTE]
> **Recommended Environment**: If you want to avoid manually installing PHP, Node.js, and Composer, we highly recommend using [Laravel Herd](https://herd.laravel.com/).

### 1. Prerequisites
- **PHP** `^8.4`
- **Composer** (Latest)
- **Node.js** `^22.0+`
- **Git**

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd MediFlow

# Install backend & frontend dependencies
composer install
npm install

# Setup environment configuration
cp .env.example .env
php artisan key:generate
```

### 3. Database Initialization
By default, the application uses **SQLite**, meaning no database server configuration is required out of the box.
```bash
# Run migrations and seed initial test data (Admin, Doctors, Patients, Reviews)
php artisan migrate --seed
```

### 4. Running the Application
We utilize a custom Composer script to concurrently start the PHP server, the Vite HMR server, and the database queue listener.

```bash
# Starts PHP server, Vite HMR, and Queue listener concurrently
composer run dev
```

---

## 🔄 Upgrading & Maintenance Guide

Follow this guide to update your existing local or production deployment whenever new changes are pulled from the repository.

### 1. Pull Latest Code & Update Dependencies
```bash
git pull origin main
composer install --no-interaction --prefer-dist --optimize-autoloader
npm ci
```

### 2. Run Database Migrations
Apply any new database schema changes or alter statements:
```bash
php artisan migrate --force
```

### 3. Recompile Frontend Assets
Compile production bundle or launch Vite dev server:
```bash
# Production asset compilation
npm run build

# Local development HMR server
composer run dev
```

### 4. Clear & Optimize Application Caches
Whenever updating routes, configuration, or views, clear existing application caches:
```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan view:clear
```

### 5. Automated System Verification
Run automated tests and linter to confirm project health:
```bash
# Run unit & feature test suite
php artisan test --compact

# Run PHP code style linter
composer run lint
```

---

## ⚙️ Environment Configuration

| Variable | Description |
|----------|-------------|
| `APP_NAME` | Name of the app (`MediFlow`). Used in UI and email templates. |
| `APP_ENV` | `local` for development, `production` for live deployments. |
| `DB_CONNECTION` | Database driver. Defaults to `sqlite`. |
| `QUEUE_CONNECTION` | Set to `database` to process background jobs. |
| `MAIL_MAILER` | Mail driver. Configured for `brevo`. |
| `BREVO_API_KEY` | Your Brevo API key for transactional emails. |
| `MAIL_FROM_ADDRESS` | Outbound system sender email. |

---

## 🧑‍💻 Command Reference

| Category | Command | Description |
|----------|---------|-------------|
| **Servers** | `composer run dev` | Runs PHP server, Vite, and Queue concurrently. |
| **Build** | `npm run build` | Compiles frontend assets for production. |
| **Database**| `php artisan migrate:fresh --seed` | Re-builds database and seeds test data. |
| **Testing** | `php artisan test --compact` | Executes PestPHP / PHPUnit test suite. |
| **Linting** | `composer run lint` | Formats PHP code using Laravel Pint. |
| **Linting** | `npm run lint` | Formats frontend React/TS code via ESLint. |
| **Routing** | `php artisan route:list` | Displays all registered application routes. |

---

## 🔧 Troubleshooting

| Issue | Common Cause & Solution |
|-------|-------------------------|
| **500 Server Error** | Missing `APP_KEY`. Run `php artisan key:generate`. |
| **Vite Manifest Not Found** | Assets missing. Run `npm run dev` or `npm run build`. |
| **Emails Not Sending** | Queue worker not running. Ensure you run `php artisan queue:listen`. |
| **PDF Download Fails** | Ensure `barryvdh/laravel-dompdf` is installed (`composer install`). |
| **Database Refused** | Ensure `database/database.sqlite` exists and is writable. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
