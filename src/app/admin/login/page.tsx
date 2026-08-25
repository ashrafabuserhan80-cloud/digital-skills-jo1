"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "aabuserhan80@gmail.com" && password === "admin123") {
        localStorage.setItem("admin_auth", "true");
        localStorage.setItem("admin_email", email);
        router.push("/admin");
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8e] to-[#1a4a7a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">⚙️</span>
          <h1 className="text-3xl font-extrabold text-white mb-2">لوحة إدارة المنصة</h1>
          <p className="text-blue-200"> giriş خاص للمدير فقط</p>
        </div>

        <Card className="overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] p-4 text-center">
            <span className="text-3xl">🔐</span>
          </div>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني للمدير</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="aabuserhan80@gmail.com"
                  dir="ltr"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600 text-center">
                  ⚠️ {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] hover:from-[#162d4a] hover:to-[#234a76] text-white font-bold py-3 text-base rounded-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    جارٍ التحقق...
                  </span>
                ) : (
                  "دخول لوحة الإدارة"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-xs text-gray-400">فقط مدير المنصة يمكنه الوصول لهذه اللوحة</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
