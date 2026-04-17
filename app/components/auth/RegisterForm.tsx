"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { RegisterData } from "@/app/types/auth.types";
import { registerSchema } from "@/app/lib/validators/auth.schema";
import { getZodErrors } from "@/app/lib/validators/getZodErrors";
import { authService } from "@/app/services/auth.service";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();

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
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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
    setServerError("");
    setErrors({});

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        email: result.data.email,
        password: result.data.password,
        confirmPassword: result.data.confirmPassword,
        phone: result.data.phone,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        birthDate: result.data.birthDate.toLocaleDateString("en-US"),
      });

      login(response.data.user, response.accessToken);
      router.push("/verify-otp");
      // router.push("/login");

    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setIsLoading(false);
    }
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
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Mofied"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+201234567890"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="Birth Date"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            error={errors.birthDate}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
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