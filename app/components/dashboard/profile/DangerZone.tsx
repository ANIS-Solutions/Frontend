"use client";
import { useState } from "react";
import { useDeactivate } from "@/app/hooks/profile/useDeactivate";
import { AlertTriangle } from "lucide-react";

type Step = "idle" | "confirm" | "otp";

export default function DangerZone() {
  const { sendOtp, mutate, isLoading, otpLoading, error } = useDeactivate();
  const [step, setStep] = useState<Step>("idle");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    const ok = await sendOtp();
    if (ok) setStep("otp");
  };

  const handleDeactivate = async () => {
    await mutate(otp);
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--color-background-primary)",
        // border: "0.5px solid #F7C1C1",
        border: "0.5px solid var(--color-border-tertiary)",
        // background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary);
      }}
    >
      <p className="text-sm font-semibold mb-1">Danger Zone</p>
      <p
        className="text-xs mb-5"
        style={{ color: "var(--color-text-secondary)" }}
      >
        These actions are irreversible. Please be careful.
      </p>

      {error && (
        <div
          className="mb-4 p-3 rounded-xl text-xs"
          style={{ background: "#FCEBEB", color: "#F72B35" }}
        >
          {error}
        </div>
      )}
      {/* idle */}
      {step === "idle" && (
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: "#FCEBEB", border: "0.5px solid #F7C1C1" }}
        >
          <div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#791F1F" }}
            >
              Deactivate Account
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Your account will be deactivated. You can reactivate it anytime
              via email.
            </p>
          </div>
          <button
            onClick={() => setStep("confirm")}
            className="px-4 py-2 rounded-[5px] text-xs font-medium text-white ml-4 shrink-0"
            style={{ background: "#F72B35", border: "none", cursor: "pointer" }}
          >
            Deactivate
          </button>
        </div>
      )}

      {/* confirm */}
      {step === "confirm" && (
        <div className="max-w-sm mx-auto text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: "#FCEBEB" }}
          >
            <AlertTriangle size={22} style={{ color: "#F72B35" }} />
          </div>
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: "#791F1F" }}
          >
            Are you sure?
          </p>
          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            We&apos;ll send an OTP to your email to confirm this action.
          </p>

         
          <div className="flex gap-3">
            <button
              onClick={() => setStep("idle")}
              className="flex-1 py-2.5 rounded-xl text-sm"
              style={{
                border: "0.5px solid var(--color-border-secondary)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSendOtp}
              disabled={otpLoading}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{
                background: "#F72B35",
                border: "none",
                cursor: otpLoading ? "not-allowed" : "pointer",
                opacity: otpLoading ? 0.5 : 1,
              }}
            >
              {otpLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </div>
      )}

      {/* otp */}
      {step === "otp" && (
        <div className="max-w-sm mx-auto text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: "#FFF3CD" }}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#854F0B"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            Enter Verification Code
          </p>
          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            We sent a 6-digit code to your email
          </p>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="w-full rounded-xl px-3 py-2.5 text-sm text-center mb-2"
            style={{
              border: "0.5px solid var(--color-border-secondary)",
              background: "var(--color-background-secondary)",
              letterSpacing: "0.3em",
              fontSize: "16px",
              fontWeight: "600",
            }}
          />

          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Didn&apos;t receive it?{" "}
            <button
              onClick={handleSendOtp}
              style={{
                color: "#1E73BE",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Resend Code
            </button>
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("idle")}
              className="flex-1 py-2.5 rounded-xl text-sm"
              style={{
                border: "0.5px solid var(--color-border-secondary)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDeactivate}
              disabled={isLoading || otp.length !== 6}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{
                background: otp.length === 6 ? "#F72B35" : "#F7C1C1",
                border: "none",
                cursor:
                  isLoading || otp.length !== 6 ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Confirming..." : "Confirm Deactivation"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
