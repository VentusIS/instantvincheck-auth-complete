import type { Metadata } from "next";
import { useTranslation } from "@/i18n/server";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentSuccessClient from "./PaymentSuccessClient";
import { getOpenGraphLocale, getSiteName } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const siteName = getSiteName();
  const title = "Payment Successful";
  const description = `Your payment has been processed successfully. Thank you for your purchase with ${siteName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bidatlanticcars.com/${locale}/payment-success`,
      languages: {
        "x-default": "https://bidatlanticcars.com/en/payment-success",
        en: "https://bidatlanticcars.com/en/payment-success",
        bg: "https://bidatlanticcars.com/bg/payment-success",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteName,
      locale: getOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PaymentSuccessPage({ params }: Props) {
  const { locale } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t, i18n } = await useTranslation(locale, "common");
  const serverTranslations = i18n.getResourceBundle(locale, "common");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md p-8 text-center shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-800">
            {t(
              "payment.success.title",
              locale === "bg" ? "Плащането е успешно" : "Payment Successful"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-base">
            {t(
              "payment.success.message",
              locale === "bg"
                ? "Благодарим ви! Транзакцията ви беше успешно завършена."
                : "Thank you! Your transaction was completed successfully."
            )}
          </p>

          <PaymentSuccessClient
            locale={locale}
            serverTranslations={serverTranslations}
          />
        </CardContent>
      </Card>
    </div>
  );
}
