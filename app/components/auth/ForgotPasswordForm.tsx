"use client";

import { authService } from "@/app/services/auth.service";
import { FormEvent, useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import Input from "../ui/Input";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is Required");
      return;
    }
    setIsLoading(true);

    try {
      await authService.forgotPassword({ email });
      setSuccess("Password reset link sent to your email");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset link",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email and we&apos;ll send you a reset link
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error=""
          />

          <Button type="submit" isLoading={isLoading}>
            Send Reset Link
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/login" className="text-[#1E71BB] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default ForgotPasswordForm;
