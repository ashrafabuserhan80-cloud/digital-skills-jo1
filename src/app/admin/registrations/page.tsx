"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Registration {
  id: string;
  name: string;
  email: string;
  grade: number;
  phone: string;
  parentName: string;
  parentPhone: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  message: string;
}

const defaultRegistrations: Registration[] = [
  { id: "r1", name: "عمر محمد الخطيب", email: "omar.line@test.com", grade: 7, phone: "0791234500", parentName: "محمد الخطيب", parentPhone: "0799876500", requestDate: "2026-08-24", status: "pending", message: "أريد التسجيل في المنصة لتعلم المهارات الرقمية" },
  { id: "r2", name: "ريم عبدالرحمن", email: "reem.test@test.com", grade: 9, phone: "0781234500", parentName: "عبدالرحمن سعيد", parentPhone: "0789876500", requestDate: "2026-08-23", status: "pending", message: "طلبة التسجيل لأطفالي في الصف التاسع" },
  { id: "r3", name: "خالد سمير", email: "khaled.test@test.com", grade: 8, phone: "0771234500", parentName: "سمير خالد", parentPhone: "0779876500", requestDate: "2026-08-22", status: "approved", message: "" },
  { id: "r4", name: "هدى محمود", email: "huda.test@test.com", grade: 10, phone: "0791112200", parentName: "محمود هدى", parentPhone: "0792223300", requestDate: "2026-08-20", status: "rejected", message: "أريد الانضمام للمنصة" },
  { id: "r5", name: "ياسمين أحمد", email: "yasmin.test@test.com", grade: 7, phone: "0781112200", parentName: "أحمد ياسمين", parentPhone: "0782223300", requestDate: "2026-08-25", status: "pending", message: "التسجيل لابنتي في الصف السابع" },
];

const gradeLabels: Record<number, string> = { 7: "الصف السابع", 8: "الصف الثامن", 9: "الصف التاسع", 10: "الصف العاشر" };

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_registrations");
    if (stored) {
      setRegistrations(JSON.parse(stored));
    } else {
      setRegistrations(defaultRegistrations);
      localStorage.setItem("admin_registrations", JSON.stringify(defaultRegistrations));
    }
  }, []);

  const save = (updated: Registration[]) => {
    setRegistrations(updated);
    localStorage.setItem("admin_registrations", JSON.stringify(updated));
  };

  const filtered = registrations.filter((r) => filter === "all" || r.status === filter);

  const handleApprove = async (id: string) => {
    const reg = registrations.find((r) => r.id === id);
    if (!reg) return;
    // Create the student in the real database
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reg.name,
          email: reg.email,
          password: "123456",
          grade: reg.grade,
          phone: reg.phone,
          parentName: reg.parentName,
          parentPhone: reg.parentPhone,
          role: "STUDENT",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "تعذر إنشاء حساب الطالب");
        return;
      }
    } catch (e) {
      console.error("Approve registration DB error", e);
      alert("فشل الاتصال بقاعدة البيانات");
      return;
    }
    save(registrations.map((r) => r.id === id ? { ...r, status: "approved" as const } : r));
    setSelectedReg(null);
  };

  const handleReject = (id: string) => {
    save(registrations.map((r) => r.id === id ? { ...r, status: "rejected" as const } : r));
    setSelectedReg(null);
  };

  const stats = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "pending").length,
    approved: registrations.filter((r) => r.status === "approved").length,
    rejected: registrations.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/admin" className="text-white/60 hover:text-white text-sm">لوحة الإدارة</Link>
                <span className="text-white/40">←</span>
                <Link href="/admin/students" className="text-white/60 hover:text-white text-sm">إدارة الطلاب</Link>
                <span className="text-white/40">←</span>
                <h1 className="text-2xl font-extrabold">📋 طلبات التسجيل</h1>
              </div>
              <p className="text-white/70 text-sm">إدارة طلبات تسجيل الطلاب الجدد على المنصة</p>
            </div>
            <div className="text-sm text-white/60">
              البريد: <span className="text-white font-medium" dir="ltr">aabuserhan80@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "إجمالي الطلبات", value: stats.total, icon: "📋", color: "from-blue-500 to-blue-600" },
            { label: "بانتظار المراجعة", value: stats.pending, icon: "⏳", color: "from-amber-500 to-amber-600" },
            { label: "تمت الموافقة", value: stats.approved, icon: "✅", color: "from-green-500 to-green-600" },
            { label: "مرفوض", value: stats.rejected, icon: "❌", color: "from-red-500 to-red-600" },
          ].map((s, i) => (
            <Card key={i} className="overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${s.color}`}></div>
              <CardContent className="p-4">
                <span className="text-2xl">{s.icon}</span>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              {f === "all" ? "الكل" : f === "pending" ? "بانتظار المراجعة" : f === "approved" ? "تمت الموافقة" : "مرفوض"}
            </button>
          ))}
        </div>

        {/* Registration Cards */}
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              لا توجد طلبات حالياً
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((reg) => (
              <Card key={reg.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedReg(reg)}>
                <div className={`h-1.5 ${
                  reg.status === "pending" ? "bg-amber-400" : reg.status === "approved" ? "bg-green-400" : "bg-red-400"
                }`}></div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{reg.name}</h3>
                        <Badge variant="secondary" className={`text-xs ${
                          reg.status === "pending" ? "bg-amber-100 text-amber-700" : reg.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {reg.status === "pending" ? "بانتظار المراجعة" : reg.status === "approved" ? "تمت الموافقة" : "مرفوض"}
                        </Badge>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2 text-sm text-gray-600">
                        <span>📧 <span dir="ltr">{reg.email}</span></span>
                        <span>📚 {gradeLabels[reg.grade]}</span>
                        <span>📞 <span dir="ltr">{reg.phone}</span></span>
                        <span>👨‍👩‍👦 {reg.parentName}</span>
                        <span>📅 {reg.requestDate}</span>
                      </div>
                      {reg.message && (
                        <p className="mt-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-2">💬 {reg.message}</p>
                      )}
                    </div>
                    {reg.status === "pending" && (
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleApprove(reg.id)} className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 text-sm" title="موافقة">✅</button>
                        <button onClick={() => handleReject(reg.id)} className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm" title="رفض">❌</button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedReg && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedReg(null)}>
            <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">تفاصيل طلب التسجيل</h3>
                  <button onClick={() => setSelectedReg(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">الاسم:</span> <span className="font-medium text-gray-900">{selectedReg.name}</span></div>
                    <div><span className="text-gray-500">البريد:</span> <span className="font-medium text-gray-900" dir="ltr">{selectedReg.email}</span></div>
                    <div><span className="text-gray-500">الصف:</span> <span className="font-medium text-gray-900">{gradeLabels[selectedReg.grade]}</span></div>
                    <div><span className="text-gray-500">الهاتف:</span> <span className="font-medium text-gray-900" dir="ltr">{selectedReg.phone}</span></div>
                    <div><span className="text-gray-500">ولي الأمر:</span> <span className="font-medium text-gray-900">{selectedReg.parentName}</span></div>
                    <div><span className="text-gray-500">هاتف ولي الأمر:</span> <span className="font-medium text-gray-900" dir="ltr">{selectedReg.parentPhone}</span></div>
                  </div>
                  {selectedReg.message && (
                    <div className="pt-2 border-t"><span className="text-gray-500 text-sm">الرسالة:</span><p className="text-sm text-gray-700 mt-1">{selectedReg.message}</p></div>
                  )}
                </div>
                {selectedReg.status === "pending" && (
                  <div className="flex gap-2 mt-5">
                    <Button onClick={() => handleApprove(selectedReg.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">✅ موافقة على التسجيل</Button>
                    <Button onClick={() => handleReject(selectedReg.id)} variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">❌ رفض الطلب</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
