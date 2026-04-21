"use client";
import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useVerifyOtp } from "../../hooks/auth/useVerifyOtp";
import { OtpReason } from "@/app/types/api/auth.types";
import { authService } from "@/app/services/auth.service";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { mutate, isLoading, error } = useVerifyOtp();
  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    await mutate(email, otp, OtpReason.REGISTER);
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      await authService.generateOtp({
        email,
        reason: OtpReason.REGISTER,
      });
      setResendMessage("Code sent successfully!");
    } catch {
      setResendMessage("Failed to resend code, please try again");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-gray-700">{email}</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {resendMessage && (
          <div className={`mb-4 p-3 rounded-lg text-sm border ${
            resendMessage.includes("successfully")
              ? "bg-green-50 border-green-200 text-green-600"
              : "bg-red-50 border-red-200 text-red-600"
          }`}>
            {resendMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="OTP Code"
            name="otp"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />

          <Button type="submit" isLoading={isLoading}>
            Verify
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-[#1E71BB] hover:underline disabled:opacity-50"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        </p>
      </div>
    </div>
  );
}