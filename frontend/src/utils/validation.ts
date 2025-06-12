import { z } from "zod";

// Password validation schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one letter, one number, and one special character (@$!%*?&)"
  );

// Name validation schema
const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces");

// Email validation schema
const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .min(1, "Email is required");

// Sign In validation schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Sign Up validation schema
export const signUpSchema = z.object({
  name: nameSchema.optional().or(z.literal("")),
  email: emailSchema,
  password: passwordSchema,
});

// Type exports
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
