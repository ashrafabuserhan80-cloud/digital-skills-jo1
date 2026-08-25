"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-2xl font-bold mb-3">أنت غير متصل بالإنترنت</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            يبدو أن اتصالك بالإنترنت قد انقطع. لا تقلق، يمكنك المتابعة Offline!
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-lg text-right">
              <p className="text-sm font-medium text-blue-800">📖 الدروس المحفوظة متاحة</p>
              <p className="text-xs text-blue-600">يمكنك مراجعة الدروس التي زرتها سابقاً</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-right">
              <p className="text-sm font-medium text-green-800">📝 اختبارات Offline</p>
              <p className="text-xs text-green-600">يمكنك حل الاختبارات المحفوظة محلياً</p>
            </div>
          </div>

          <Button
            variant="gradient"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            🔄 إعادة المحاولة
          </Button>

          <Link href="/" className="block mt-3">
            <Button variant="ghost" className="w-full">
              العودة للرئيسية
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
