import type { Metadata } from "next";
import { useTranslation } from "@/i18n/server";
import { XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentCancelClient from "./PaymentCancelClient";
import { getOpenGraphLocale, getSiteName } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const siteName = getSiteName();
  const title = "Payment Cancelled";
  const description = `Your payment was cancelled. You can try again or browse our selection of vehicles at ${siteName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bidatlanticcars.com/${locale}/payment-cancel`,
      languages: {
        "x-default": "https://bidatlanticcars.com/en/payment-cancel",
        en: "https://bidatlanticcars.com/en/payment-cancel",
        bg: "https://bidatlanticcars.com/bg/payment-cancel",
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

export default async function PaymentCancelPage({ params }: Props) {
  const { locale } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t, i18n } = await useTranslation(locale, "common");
  const serverTranslations = i18n.getResourceBundle(locale, "common");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md p-8 text-center shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <XCircle className="w-20 h-20 text-red-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-800">
            {t(
              "payment.cancel.title",
              locale === "bg" ? "Плащането е отказано" : "Payment Cancelled"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-base">
            {t(
              "payment.cancel.message",
              locale === "bg"
                ? "Вашето плащане беше отказано. Можете да опитате отново или да разгледате нашата селекция от автомобили."
                : "Your payment was cancelled. You can try again or browse our selection of vehicles."
            )}
          </p>

          <PaymentCancelClient
            locale={locale}
            serverTranslations={serverTranslations}
          />
        </CardContent>
      </Card>
    </div>
  );
}
