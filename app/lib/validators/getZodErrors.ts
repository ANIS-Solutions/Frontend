import { ZodError } from "zod";

export function getZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.issues.forEach((err) => {
    const field = err.path.join(".");
    if (!errors[field]) {
      errors[field] = err.message;
    }
  });

  return errors;
}