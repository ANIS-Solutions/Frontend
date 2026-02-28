// import { z } from "zod";
// export const registerSchema = z.object({
//   body: z.object({
//     firstName: z
//       .string()
//       .trim()
//       .min(2, "FirstName is required")
//       .max(14, "No more than 14 char")
//       .regex(
//         /^[\p{L}\s'-]+$/u, //! /^[a-zA-Z\s\-']+$/
//         "First name contains non-alphabetic characters",
//       ),
//     lastName: z
//       .string()
//       .trim()
//       .min(2, "LastName is required")
//       .max(14, "No more than 14 char")
//       .regex(
//         /^[\p{L}\s'-]+$/u, //! /^[a-zA-Z\s\-']+$/
//         "Last name contains non-alphabetic characters",
//       ),
//     email: z.email("Invalid email address").trim().toLowerCase(),
//     birthDate: z.coerce.date().refine(
//       (date) => {
//         const today = new Date();
//         return today.getFullYear() - date.getFullYear() >= 18;
//       },
//       { message: "The parent must older than 18 years old." },
//     ),
//   }),
// });
