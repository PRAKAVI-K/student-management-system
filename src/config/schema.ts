import { z } from 'zod';

// 1. Define the Zod Schema (Validation Logic)
export const UserSchema = z.object({
    id: z.string().optional(), // ID is handled by backend/mock
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(1, "Last name must be at least 1 character"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    // Extensibility Example: validDate: z.string().optional()
});

// 2. Infer the TypeScript Type
export type User = z.infer<typeof UserSchema>;

// 3. Define Form Configuration (UI Logic)
// This drives the Form Component. To add a field, add to Schema above AND here.
export interface FieldConfig {
    name: keyof User;
    label: string;
    type: 'text' | 'email' | 'tel' | 'date' | 'number';
    placeholder?: string;
}

export const userFormConfig: FieldConfig[] = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '1234567890' },
];
