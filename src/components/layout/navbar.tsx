"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            مهاراتنا الرقمية
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/#grades" className="text-sm font-medium hover:text-primary transition-colors">الصفوف</Link>
          <Link href="/#domains" className="text-sm font-medium hover:text-primary transition-colors">المجالات</Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">عن المنصة</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">تسجيل الدخول</Button>
          </Link>
          <Link href="/register">
            <Button variant="gradient" size="sm">ابدأ التعلم</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-3">
          <Link href="/#grades" className="block py-2 text-sm font-medium hover:text-primary">الصفوف</Link>
          <Link href="/#domains" className="block py-2 text-sm font-medium hover:text-primary">المجالات</Link>
          <Link href="/#about" className="block py-2 text-sm font-medium hover:text-primary">عن المنصة</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">تسجيل الدخول</Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button variant="gradient" size="sm" className="w-full">ابدأ التعلم</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
