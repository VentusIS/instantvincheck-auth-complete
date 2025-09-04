"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { useUser } from "@/lib/hooks/redux";

interface VinResultType {
  vehicle?: string;
  carfax?: unknown;
  [key: string]: unknown;
}

export default function CarfaxClient({
  placeholder,
  search,
  clear,
  charCount,
  errorLength,
  errorFetch,
  noResult,
  noBalance,
  proceed,
  vehicleFound,
  vehicleFoundBg,
  payToAccess,
  payToAccessBg,
  redirecting,
  loading: loadingText,
  errorPayment,
  locale,
}: {
  placeholder: string;
  search: string;
  clear: string;
  charCount: string;
  errorLength: string;
  errorFetch: string;
  noResult: string;
  noBalance: string;
  proceed: string;
  vehicleFound: string;
  vehicleFoundBg: string;
  payToAccess: string;
  payToAccessBg: string;
  redirecting: string;
  loading: string;
  errorPayment: string;
  locale: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userData } = useUser();

  const [vinInput, setVinInput] = useState("");
  const [vinError, setVinError] = useState("");
  const [loading, setLoading] = useState(false);
  const [vinResult, setVinResult] = useState<VinResultType | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [apiBalance, setApiBalance] = useState<number | undefined>();

  useEffect(() => {
    const vinFromUrl = searchParams.get("vin");
    if (vinFromUrl) {
      setVinInput(vinFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setVinInput(value);
    setApiBalance(undefined);
    setVinError("");
    if (value.length < 17) setVinResult(null);
  };

  const handleVinSearch = async (vinToSearch?: string) => {
    const vin = vinToSearch || vinInput;
    if (vin.length !== 17) {
      setVinError(errorLength.replace("{{n}}", vin.length.toString()));
      return;
    }
    try {
      setLoading(true);
      setVinError("");
      setApiBalance(undefined);

      const response = await api.get(
        API_ROUTES.CARFAX.CHECK_RECORDS.replace(":vin", vin)
      );
      const checkBalance = await api.get(API_ROUTES.CARFAX.BALANCE);
      const data = response.data;
      const { balance } = checkBalance.data;
      setApiBalance(balance);
      setVinResult(data);
    } catch {
      setVinError(errorFetch);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setVinInput("");
    setVinResult(null);
    setVinError("");
  };

  const showNoResult = vinResult && (!vinResult.vehicle || !vinResult.carfax);

  const handlePaymentClick = async () => {
    try {
      setPaymentLoading(true);
      if (!userData) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "redirect",
            `${locale}/carfax-history?vin=${vinInput}`
          );
        }
        router.push(`/${locale}/login`);
        return;
      }
      const user_id = userData.id;
      const response = await api.post(API_ROUTES.PAYMENT, {
        vin: vinInput,
        user_id,
        currency: "USD",
        amount: 6,
        car_name: vinResult?.vehicle || null,
        cancel_url: `${window.location.origin}/en/payment-cancel`,
        success_url: `${window.location.origin}/en/payment-success`,
      });
      const { url } = response.data;
      window.location.href = url;
    } catch {
      toast.error(errorPayment);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <Input
        type="text"
        value={vinInput}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={17}
        className="bg-white/90 border border-gray-300 rounded-md px-4 py-2 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px] max-w-full mb-2"
      />
      {vinInput.length > 0 && vinInput.length < 17 && (
        <p className="text-yellow-200 text-sm mb-2">
          {charCount.replace("{{n}}", vinInput.length.toString())}
        </p>
      )}
      {vinError && <p className="text-red-300 text-sm mb-2">{vinError}</p>}
      {showNoResult && <p className="text-red-200 text-sm mb-4">{noResult}</p>}
      {Number(apiBalance) === 0 && (
        <p className="text-red-200 text-sm mb-4">{noBalance}</p>
      )}
      {vinResult?.vehicle && vinResult?.carfax && Number(apiBalance) > 0 ? (
        <div className="bg-white/80 text-black p-4 rounded shadow mt-4 w-full max-w-md text-center">
          <h3 className="text-xl font-bold mb-2">
            {locale === "en" ? vehicleFound : vehicleFoundBg}
          </h3>
          <p className="text-md mb-4">{vinResult.vehicle}</p>
          <div className="text-lg font-semibold mb-2">
            {locale === "en" ? payToAccess : payToAccessBg}
          </div>
          <Button
            onClick={handlePaymentClick}
            disabled={paymentLoading}
            className={`mt-4 px-4 py-2 rounded shadow text-white transition ${
              paymentLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {paymentLoading ? redirecting : proceed}
          </Button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Button
            onClick={() => handleVinSearch()}
            disabled={vinInput.length !== 17 || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow disabled:opacity-50"
          >
            {loading ? loadingText : search}
          </Button>
          <Button
            onClick={handleClear}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
          >
            {clear}
          </Button>
        </div>
      )}
    </div>
  );
}
