"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { RegisterData } from "@/app/types/api/auth.types";
import { registerSchema } from "@/app/lib/validators/auth.schema";
import { getZodErrors } from "@/app/lib/validators/getZodErrors";
import { useRegister } from "../../hooks/auth/useRegister";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const { mutate, isLoading, error: serverError, fieldErrors } = useRegister();

  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const allErrors = { ...errors, ...fieldErrors };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    await mutate(result.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Ziko"
              value={formData.firstName}
              onChange={handleChange}
              error={allErrors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Mofied"
              value={formData.lastName}
              onChange={handleChange}
              error={allErrors.lastName}
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={allErrors.email}
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+201234567890"
            value={formData.phone}
            onChange={handleChange}
            error={allErrors.phone}
          />

          <Input
            label="Birth Date"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            error={allErrors.birthDate}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={allErrors.password}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={allErrors.confirmPassword}
          />

          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1E71BB] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}