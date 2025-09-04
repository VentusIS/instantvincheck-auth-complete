import "../globals.css";
import I18nProvider from "@/app/i18n-provider";
import { Toaster } from "sonner";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <I18nProvider locale={locale}>
      {children}
      <Toaster />
    </I18nProvider>
  );
}

