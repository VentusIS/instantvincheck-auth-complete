import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account",
};

export default function Page({ params }: { params: { locale: string } }) {
  return <RegisterClient params={params} />;
}
