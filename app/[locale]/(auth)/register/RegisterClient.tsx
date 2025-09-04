"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { registerSchema } from "@/lib/validations/auth";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function RegisterClient({ params }: { params: { locale: string } }){
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", confirmPassword:"", phone:"", countryCode:"+1" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      const f: Record<string,string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        f[k] = issue.message;
      }
      setErrors(f); return;
    }
    setIsLoading(true);
    try {
      const res = await api.post(API_ROUTES.AUTH.REGISTER, form);
      if (res.status === 200 || res.status === 201) {
        toast.success("Account created. Please sign in.");
        window.location.href = `/${params.locale}/login`;
      } else {
        toast.error(res.data?.message || "Registration failed");
      }
    } catch (err:any) {
      toast.error(err?.response?.data?.message || "Registration error");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#47638e]">Create your account</CardTitle>
            <CardDescription>It takes less than a minute.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>First name</Label><Input name="firstName" value={form.firstName} onChange={onChange} />{errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}</div>
              <div><Label>Last name</Label><Input name="lastName" value={form.lastName} onChange={onChange} />{errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}</div>
              <div className="md:col-span-2"><Label>Email</Label><Input name="email" type="email" value={form.email} onChange={onChange} />{errors.email && <p className="text-xs text-red-500">{errors.email}</p>}</div>
              <div><Label>Password</Label><Input name="password" type="password" value={form.password} onChange={onChange} />{errors.password && <p className="text-xs text-red-500">{errors.password}</p>}</div>
              <div><Label>Confirm password</Label><Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={onChange} />{errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}</div>
              <div><Label>Phone</Label><Input name="phone" value={form.phone} onChange={onChange} />{errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}</div>
              <div><Label>Country code</Label><Input name="countryCode" value={form.countryCode} onChange={onChange} />{errors.countryCode && <p className="text-xs text-red-500">{errors.countryCode}</p>}</div>
              <div className="md:col-span-2"><button disabled={isLoading} className="w-full rounded bg-[#47638e] text-white py-2">{isLoading ? "Creating..." : "Create account"}</button></div>
            </form>
            <p className="text-center mt-4 text-sm">Already have an account? <Link className="underline" href={`/${params.locale}/login`}>Sign in</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
