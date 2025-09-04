"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

interface PaymentSuccessClientProps {
  locale: string;
  serverTranslations: any;
}

export default function PaymentSuccessClient({
  locale,
}: PaymentSuccessClientProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const handleViewReport = useCallback(() => {
    // Set active tab for the dashboard
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", "carsHistory");
    }
    router.push(`/${locale}/myaccount`);
  }, [router, locale]);

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Separate effect for navigation when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      handleViewReport();
    }
  }, [countdown, handleViewReport]);

  const buttonText =
    locale === "bg" ? "Виж доклада за автомобила" : "View Car Report";

  const redirectText =
    locale === "bg"
      ? `Ще бъдете пренасочени автоматично след ${countdown} секунди`
      : `You will be redirected automatically in ${countdown} seconds`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">{redirectText}</p>

      <Button
        onClick={handleViewReport}
        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm md:text-base shadow-md transition-colors"
      >
        {buttonText}
      </Button>
    </div>
  );
}
