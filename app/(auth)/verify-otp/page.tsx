import { Suspense } from "react";
import VerifyOtpForm from "@/app/components/auth/OtpForm";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}