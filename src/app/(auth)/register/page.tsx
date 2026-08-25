"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">طلب الانضمام للمنصة</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            للتسجيل في المنصة يرجى التواصل مع مدير المنصة عبر البريد الإلكتروني.
            سيتم مراجعة طلبك وإنشاء حسابك من قبل الإدارة.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800 font-medium mb-2">📧 تواصل معنا عبر البريد:</p>
            <a href="mailto:aabuserhan80@gmail.com?subject=طلب تسجيل في منصة مهاراتنا الرقمية&body=الاسم:%0Aالصف الدراسي:%0Aرقم الهاتف:%0Aاسم ولي الأمر:%0Aهاتف ولي الأمر:" className="text-blue-600 font-bold hover:underline text-lg" dir="ltr">
              aabuserhan80@gmail.com
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
            <p className="text-sm font-medium text-gray-700 mb-2">📋 ما الذي تحتاجه عند التسجيل:</p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• الاسم الكامل للطالب</li>
              <li>• البريد الإلكتروني</li>
              <li>• الصف الدراسي (7-10)</li>
              <li>• رقم هاتف الطالب</li>
              <li>• اسم ولي الأمر ورقم هاتفه</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/login">
              <Button className="w-full" variant="gradient" size="lg">تسجيل الدخول</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">العودة للصفحة الرئيسية</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
