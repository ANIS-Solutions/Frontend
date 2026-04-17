import { z } from "zod";
import {
  checkConfirmPassword,
  validatePassword,
  validatePhone,
} from "./schema.utils";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().trim().superRefine(validatePassword),
    confirmPassword: z.string(),
    phone: z.string().transform(validatePhone),
    firstName: z
      .string()
      .trim()
      .min(2, "First name is required")
      .max(14, "No name more than 14 char")
      .regex(
        /^[\p{L}\s'-]+$/u,
        "First name contains non-alphabetic characters",
      ),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name is required")
      .max(14, "No name more than 14 char")
      .regex(
        /^[\p{L}\s'-]+$/u,
        "LastFirst name contains non-alphabetic characters",
      ),
    birthDate: z.coerce.date().refine(
      (date) => {
        const today = new Date();
        return today.getFullYear() - date.getFullYear() >= 18;
      },
      { message: "The parent must older than 18 years old." },
    ),
  })
  .superRefine(checkConfirmPassword);
