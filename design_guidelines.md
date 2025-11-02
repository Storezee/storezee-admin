# Saathi Admin Dashboard - Design Guidelines

## Design Approach
**System-Based Approach**: Material Design + Shadcn UI principles for a functional, data-dense administrative interface. The design prioritizes clarity, efficiency, and quick data scanning over visual decoration.

## Core Design Principles
- **Clarity First**: Every element serves a functional purpose
- **Scan-Optimized**: Information hierarchy enables quick data processing
- **Action-Focused**: CTAs and interactive elements are immediately identifiable
- **Professional Restraint**: Clean, corporate aesthetic without unnecessary embellishment

## Typography System
**Primary Font**: Inter (via Google Fonts CDN)
- Page Titles: text-2xl font-semibold (Dashboard, Booking Management)
- Section Headers: text-lg font-medium (table headers, card titles)
- Body Text: text-sm font-normal (table cells, form labels)
- Small Text: text-xs (timestamps, helper text, metadata)
- Input Text: text-base (form inputs for better readability)

## Layout & Spacing System
**Tailwind Units**: Consistent use of 2, 3, 4, 6, 8, 12, 16 for spacing
- Container padding: px-4 md:px-6 lg:px-8
- Section spacing: space-y-6 (between major sections)
- Card padding: p-6
- Form field spacing: space-y-4
- Table cell padding: px-4 py-3
- Button padding: px-4 py-2

## Component Library

### Authentication Pages (Login & OTP)
- **Layout**: Centered card (max-w-md) on neutral background
- **Card Structure**: White background, rounded-lg, shadow-lg, p-8
- **Logo Area**: Brand name/logo at top (text-center, mb-8)
- **Form Elements**: Full-width inputs with space-y-4
- **Primary Button**: Full-width, rounded-md, font-medium
- **Helper Text**: Small muted text below inputs for guidance

### Dashboard Layout
- **Top Navigation Bar**: Fixed header (sticky top-0, z-50), h-16
  - Left: Brand/Logo
  - Center: Search input (max-w-md) with icon prefix
  - Right: User profile dropdown + Logout button
- **Main Content Area**: Container (max-w-7xl mx-auto, py-6)
  - Page title with action buttons aligned
  - Filter/search controls in compact toolbar
  - Main data table below

### Data Table (Booking List)
- **Table Container**: Rounded border, shadow-sm, overflow-x-auto
- **Header Row**: Slightly elevated background, font-medium, text-sm
- **Data Rows**: Hover state for interactivity, border-b between rows
- **Columns**: 
  - Booking ID: font-mono for scanability
  - Status: Custom dropdown badge (colored based on status)
  - Timestamps: text-xs text-muted with date/time format
  - Amount: Editable inline (pencil icon trigger)
  - User Name: Link styling (underline on hover)
  - Actions: Icon buttons group (view, edit)
- **Responsive**: Horizontal scroll on mobile, sticky first column

### Status Dropdown Component
- **Trigger**: Pill-shaped badge with status name + chevron icon
- **States Color Mapping** (background + text):
  - pending: amber/yellow tones
  - confirmed/active: blue tones
  - luggage_stored: green tones
  - completed: emerald/success tones
  - cancelled: red/error tones
  - in_progress states: purple/indigo tones
- **Dropdown Menu**: White background, shadow-lg, rounded-md, max-h-60 overflow-auto

### Editable Amount Field
- **Display Mode**: Shows value with edit icon on hover
- **Edit Mode**: Inline input with save/cancel buttons
- **Validation**: Number input with currency prefix, min/max constraints

### User Details Modal
- **Overlay**: Semi-transparent backdrop
- **Modal**: max-w-2xl, centered, rounded-lg, shadow-2xl
- **Header**: Profile picture (rounded-full, w-20 h-20) + name (text-xl font-semibold)
- **Content Grid**: 2-column layout for details (label: value pairs)
- **Document Section**: Grid of thumbnail images (grid-cols-3 gap-4)
- **Footer**: Close button aligned right

### Image Viewer Modal
- **Full-Screen Overlay**: Dark background (bg-black/90)
- **Image**: Centered, max-w-4xl, max-h-screen, rounded
- **Controls**: Close button (top-right), download option

### Toast Notifications
- **Position**: top-right, fixed
- **Success**: Green accent, check icon
- **Error**: Red accent, alert icon
- **Duration**: 4 seconds auto-dismiss
- **Style**: Rounded corners, shadow-lg, slide-in animation

### Loading States
- **Full Page**: Centered spinner with "Loading..." text
- **Inline**: Skeleton loaders for table rows (pulse animation)
- **Button**: Disabled state with spinner replacing text

## Interactive States
- **Buttons**: Subtle scale on hover (hover:scale-105), active:scale-95
- **Table Rows**: Background change on hover (hover:bg-gray-50)
- **Inputs**: Focus ring (focus:ring-2 focus:ring-blue-500)
- **Dropdowns**: Smooth slide-down animation (200ms)
- **Links**: Underline decoration on hover

## Accessibility & Form Patterns
- All inputs with visible labels (text-sm font-medium mb-1)
- Phone input with placeholder (e.g., "8050500205")
- OTP input: 6 individual boxes or single input with maxLength
- Error messages: text-sm text-red-600 below field
- Required field indicators: Asterisk in label
- Disabled states: Reduced opacity, not-allowed cursor

## Responsive Behavior
- **Mobile (<768px)**: Single column, stacked cards, hamburger menu for nav
- **Tablet (768px-1024px)**: Compressed table, some columns hidden
- **Desktop (>1024px)**: Full table layout, optimal spacing

## Visual Hierarchy
- Primary actions: Solid buttons with brand emphasis
- Secondary actions: Outline buttons
- Tertiary actions: Ghost/text buttons
- Danger actions: Red accent (delete, cancel)

**Note**: No custom images needed for this admin interface. All visuals are user-generated content (profile pictures, luggage photos, documents) loaded from API responses.