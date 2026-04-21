"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { LoginData } from "@/app/types/api/auth.types";
import { loginSchema } from "@/app/lib/validators/auth.schema";
import { getZodErrors } from "@/app/lib/validators/getZodErrors";
import { useLogin } from "../../hooks/auth/useLogin";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  const { mutate, isLoading, error: serverError } = useLogin();

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    await mutate(result.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="text-right mb-4">
            <Link
              href="/forget-password"
              className="text-sm text-[#1E71BB] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#1E71BB] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}