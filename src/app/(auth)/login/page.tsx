"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual auth
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/grade/7";
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">🎯</div>
          <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          <p className="text-sm text-gray-500">ادخل إلى حسابك للمتابعة</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="text-left"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            <Button type="submit" className="w-full" variant="gradient" size="lg" disabled={loading}>
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              سجل الآن
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
