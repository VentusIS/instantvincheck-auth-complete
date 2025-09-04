import { z } from "zod";

// ✅ Validation for login form
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// ✅ Validation for register form
export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name required" }),
    lastName: z.string().min(1, { message: "Last name required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password required" }),
    phone: z.string().min(1, { message: "Phone required" }),
    countryCode: z.string().min(1, { message: "Country code required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
