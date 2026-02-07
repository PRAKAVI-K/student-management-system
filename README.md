# Lumina Learners (Student Management System)

A premium, React-based Student Management System for schools. Built with React 18, TypeScript, Material UI, and Vite.

## Features

-   **Dashboard**: Overview of student statistics and school data.
-   **Student Directory**: Enroll, View, Update, and Remove students.
-   **Premium UI**: "Dark Mode 2.0" design with glassmorphism, neon accents, and smooth animations.
-   **Extensible Architecture**: Configuration-driven form builder. Add new fields (e.g., DOB, Parent Name) without touching UI code.
-   **Responsive**: Fully responsive design for all devices.
-   **Mock API**: LocalStorage-based mock API for persistence without a backend.

## Tech Stack

-   **Frontend**: React 18, TypeScript, Vite
-   **Styling**: Material UI (MUI) v6, Emotion
-   **State/Data**: React Hook Custom Hooks
-   **Forms**: React Hook Form + Zod Validation
-   **Routing**: React Router DOM
-   **Icons**: Lucide React

## Setup Instructions

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture & Extensibility

The application is designed to be easily extensible.

### How to Add a New Field (e.g., "Date of Birth")

1.  Open `src/config/schema.ts`.
2.  Add the field to the Zod Schema `UserSchema`:
    ```typescript
    export const UserSchema = z.object({
      // ... existing fields
      dob: z.string().optional(), // Add your new field
    });
    ```
3.  Add the field configuration to `userFormConfig`:
    ```typescript
    export const userFormConfig: FieldConfig[] = [
      // ... existing fields
      { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: 'YYYY-MM-DD' },
    ];
    ```
4.  **That's it!** The form will automatically render the new input with validation, and the table/API will handle it (TypeScript types are inferred automatically).

## Deployment

This application is ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages).

### Netlify / Vercel
1.  Connect your GitHub repository.
2.  Set the **Build Command** to `npm run build`.
3.  Set the **Publish Directory** to `dist`.
4.  Deploy!
