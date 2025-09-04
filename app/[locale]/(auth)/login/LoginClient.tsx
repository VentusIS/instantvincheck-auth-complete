"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { login } from "@/lib/features/userSlice";
import { useTranslationApi } from "@/lib/useTranslationApi";
import { loginSchema } from "@/lib/validations/auth";
import { ServerTranslations } from "@/types/i18n";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function LoginClient({
  params,
  serverTranslations,
}: {
  params: { locale: string };
  serverTranslations: ServerTranslations;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t, ready } = useTranslationApi();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const getText = (key: string, fallback: string) => {
    if (ready) return t(key);
    const value = key
      .split(".")
      .reduce(
        (obj: ServerTranslations | string | undefined, k: string) =>
          obj && typeof obj !== "string" ? obj[k] : undefined,
        serverTranslations
      );
    return typeof value === "string" ? value : fallback;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
        if (issue.path[0] === "password") fieldErrors.password = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(API_ROUTES.AUTH.LOGIN, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.access_token);
        dispatch(login(data.user));
        localStorage.setItem("email", email);

        const redirectRoute = localStorage.getItem("redirect");
        if (redirectRoute) {
          router.push(`/${redirectRoute}`);
        } else {
          router.push(`/${params.locale}`);
        }

        toast.success(getText("login.success", "Login successful"));
      } else {
        setErrors({
          form: data.message || getText("login.failed", "Login failed"),
        });
        toast.error(data.message || getText("login.failed", "Login failed"));
      }
    } catch {
      setErrors({
        form: getText("login.error", "An error occurred. Please try again."),
      });
      toast.error(
        getText("login.error", "An error occurred. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-0 md:px-4 md:py-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Right Side - Form only (removed image section) */}
          <div className="w-full p-6 lg:p-8 flex items-center justify-center">
            <Card className="w-full max-w-md border-0 shadow-none">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-[#47638e]">
                  {getText("header.signInAccount", "Sign in to your account")}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {getText(
                    "registerForm.loginWelcome",
                    "Welcome back! Please enter your details."
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {getText("registerForm.email", "Email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={getText("registerForm.email", "Email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {getText("registerForm.password", "Password")}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={getText("registerForm.password", "Password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <Link
                      href={`/${params.locale}/verify`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {getText("header.forgot", "Forgot password?")}
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#47638e]"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? getText("login.signingIn", "Signing in...")
                      : getText("header.signIn", "Sign In")}
                  </Button>
                </form>

                {errors.form && (
                  <p className="text-xs text-red-500 text-center mb-2">
                    {errors.form}
                  </p>
                )}

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {getText("header.account", "Don't have an account?")}{" "}
                    <Link
                      href={`/${params.locale}/register`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {getText("registerForm.register", "Register")}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
