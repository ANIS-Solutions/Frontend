"use client";

import { authService } from "@/app/services/auth.service";
import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

function VerifyOtpForm() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async () => {
    if (!user || !token) return;
    setError("");
    setIsResending(true);

    try {
      await authService.generateOtp(
        { email: user.email, reason: "REGISTER" },
        token,
      );
      setSuccess("OTP sent to your email successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) return;

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    setIsLoading(true);

    try {
      await authService.verifyOtp({
        email: user.email,
        otp,
        reason: "REGISTER",
      });

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !token) {
    router.push("/register");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter the 6-digit code sent to {user.email}
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
            label="OTP Code"
            name="otp"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error=""
          />
          <Button type="submit" isLoading={isLoading}>
            Verify
          </Button>
        </form>

        <button
          type="button"
          onClick={handleSendOtp}
          disabled={isResending}
          className="mt-4 w-full text-center text-sm text-[#1E71BB] hover:underline disabled:text-gray-400"
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default VerifyOtpForm;
