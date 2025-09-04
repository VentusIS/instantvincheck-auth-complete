import "../globals.css";
import I18nProvider from "@/app/i18n-provider";
import { Toaster } from "sonner";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <I18nProvider locale={params.locale}>
      {children}
      <Toaster />
    </I18nProvider>
  );
}
