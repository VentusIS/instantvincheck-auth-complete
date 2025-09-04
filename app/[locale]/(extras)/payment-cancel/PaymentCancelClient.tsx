"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

interface PaymentCancelClientProps {
  locale: string;
  serverTranslations: any;
}

export default function PaymentCancelClient({
  locale,
}: PaymentCancelClientProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const handleGoHome = useCallback(() => {
    router.push(`/${locale}`);
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
      handleGoHome();
    }
  }, [countdown, handleGoHome]);

  const buttonText =
    locale === "bg" ? "Отиди в началната страница" : "Go to Homepage";

  const redirectText =
    locale === "bg"
      ? `Ще бъдете пренасочени автоматично след ${countdown} секунди`
      : `You will be redirected automatically in ${countdown} seconds`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">{redirectText}</p>

      <Button
        onClick={handleGoHome}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm md:text-base shadow-md transition-colors"
      >
        {buttonText}
      </Button>
    </div>
  );
}
