import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Cancelled",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-3">Payment cancelled</h1>
      <p className="text-gray-600">Your payment was cancelled. You can try again anytime.</p>
      <a className="underline mt-6 inline-block" href={`/${locale}/carfax-history`}>Back to VIN check</a>
    </div>
  );
}
