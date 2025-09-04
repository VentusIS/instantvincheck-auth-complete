import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function Page({ params }: { params: { locale: string } }) {
  const serverTranslations = {} as any;
  return <LoginClient params={params} serverTranslations={serverTranslations} />;
}
