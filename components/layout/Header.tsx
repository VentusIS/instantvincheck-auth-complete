"use client";
import Link from "next/link";
import { useUser } from "@/lib/hooks/redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { userData } = useUser();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); },[]);
  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl h-12 flex items-center px-4">
        <Link href="/" className="font-semibold">InstantVINCheck</Link>
        <nav className="mx-auto flex gap-6 text-sm">
          <Link href="/en/carfax-history">VIN Report</Link>
        </nav>
        <div className="ml-auto">
          {!mounted ? null : userData ? (
            <span className="text-sm">Signed in as {userData.email}</span>
          ) : (
            <div className="flex gap-3">
              <Link href="/en/login" className="text-sm underline">Log in</Link>
              <Link href="/en/register" className="text-sm underline">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
