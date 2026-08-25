"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "7",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
    setLoading(true);
    // TODO: Implement actual registration
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
          <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
          <p className="text-sm text-sm text-gray-500">انضم إلينا وابدأ رحلة التعلم</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
              <Input
                placeholder="محمد أحمد"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                dir="ltr"
                className="text-left"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الصف الدراسي</label>
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              >
                <option value="7">الصف السابع</option>
                <option value="8">الصف الثامن</option>
                <option value="9">الصف التاسع</option>
                <option value="10">الصف العاشر</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                dir="ltr"
              />
            </div>
            <Button type="submit" className="w-full" variant="gradient" size="lg" disabled={loading}>
              {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              سجّل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
