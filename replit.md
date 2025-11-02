# Saathi Admin Dashboard

## Overview

Saathi Admin Dashboard is a React-based administrative panel for managing luggage storage bookings. The application provides Saathi admins with the ability to view booking details, update booking statuses, manage amounts, and access user information. It integrates with external APIs for authentication and booking management, following a Material Design approach with Shadcn UI components for a clean, data-dense administrative interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Build Tool:** Vite for fast development and optimized production builds
- **Framework:** React 18+ with TypeScript for type-safe component development
- **UI Library:** Shadcn UI (New York variant) with Radix UI primitives for accessible components
- **Styling:** Tailwind CSS with custom design tokens and a neutral color scheme
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack React Query for server state and caching
- **Form Handling:** React Hook Form with Zod validation via @hookform/resolvers

**Design Philosophy:**
The application follows a system-based design approach combining Material Design principles with Shadcn UI, prioritizing clarity, scan-optimized layouts, and action-focused interactions. Typography uses Inter font with a defined hierarchy (text-2xl for titles, text-lg for headers, text-sm for body, text-xs for metadata). Spacing follows Tailwind's systematic units (2, 3, 4, 6, 8, 12, 16) for consistency.

**Component Architecture:**
- **Authentication Flow:** Login page (phone number input) → OTP verification → Dashboard
- **Protected Routes:** ProtectedRoute wrapper component guards authenticated pages
- **Reusable Components:** StatusBadge (editable/read-only status display), AmountEditor (inline editing), BookingsTable (data grid with modal interactions), UserDetailsModal, ImageViewerModal
- **Layout:** Sticky header with search, user profile dropdown, and logout; main content area with max-width container

**State Management Strategy:**
- **Authentication State:** Stored in localStorage (saathi_id, saathi_data) with auth utility functions
- **Server State:** TanStack React Query for API data fetching and caching
- **UI State:** Local component state with React hooks

### Backend Architecture

**Current Implementation:**
The application currently has a minimal Express server setup primarily for serving the Vite development environment. The backend includes:
- **Framework:** Express.js with TypeScript
- **Session Storage:** connect-pg-simple (PostgreSQL session store)
- **Database ORM:** Drizzle ORM configured for PostgreSQL
- **Schema:** Basic user schema defined but not actively used

**Important Note:**
The application does NOT use its own backend APIs for core functionality. Instead, it directly integrates with external Saathi APIs hosted at `https://api-dev.thestorezee.com/api`.

**API Integration Pattern:**
- Client-side Axios instance configured with base URL pointing to external API
- All authentication, booking management, and user data operations go through external endpoints
- Error handling via toast notifications for user feedback
- Success responses also displayed through toast system

### Data Storage Solutions

**Database Setup:**
- **Database:** PostgreSQL (via Neon serverless driver)
- **ORM:** Drizzle ORM with schema defined in `shared/schema.ts`
- **Migrations:** Drizzle Kit for schema migrations in `migrations/` directory
- **Note:** Database is provisioned but minimally utilized in current implementation. The main data operations occur through external API calls.

**Local Storage:**
- **Authentication Tokens:** `saathi_id` and `saathi_data` stored in browser localStorage
- **Purpose:** Maintain user session across page refreshes
- **Security Consideration:** Sensitive data stored client-side (consider token-based auth improvements)

### External Dependencies

**Third-Party APIs:**
- **Saathi API (Primary):** `https://api-dev.thestorezee.com/api`
  - **Authentication Endpoints:**
    - `POST /saathi/saathi_login` - Send OTP to registered phone
    - `POST /saathi/verify_saathi_otp` - Verify OTP and authenticate user
  - **Booking Endpoints:**
    - `GET /saathi/get_all_bookings?saathi_id={id}&booking_id={optional}` - Fetch bookings
    - `PUT /saathi/update-booking-status` - Update booking status
    - `PUT /saathi/update-booking-amount` - Update booking amount

**Third-Party Services:**
- **Font Hosting:** Google Fonts CDN (Inter font family)
- **Image Hosting:** ImgHippo (for user document uploads)
- **Avatar Service:** avatar.iran.liara.run (placeholder avatars)

**NPM Dependencies:**
- **UI Components:** @radix-ui/* packages for accessible primitives
- **HTTP Client:** Axios for API requests
- **Date Handling:** date-fns for datetime formatting
- **Toast Notifications:** react-hot-toast for user feedback
- **Form Validation:** zod with drizzle-zod for schema validation
- **Utilities:** clsx, tailwind-merge (via cn utility), class-variance-authority

**Development Tools:**
- **Replit Plugins:** vite-plugin-runtime-error-modal, cartographer, dev-banner (development only)
- **Build Tools:** esbuild for server bundling, PostCSS with Autoprefixer