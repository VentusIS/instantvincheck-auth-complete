import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const serverTranslations = {} as any;
  return (
    <LoginClient
      params={{ locale }}
      serverTranslations={serverTranslations}
    />
  );
}
