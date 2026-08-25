"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Unit {
  id: string;
  name: string;
  nameEn: string;
  grade: number;
  domain: string;
  description: string;
  lessonsCount: number;
  order: number;
}

const gradeLabels: Record<number, string> = { 7: "الصف السابع", 8: "الصف الثامن", 9: "الصف التاسع", 10: "الصف العاشر" };

const defaultUnits: Unit[] = [
  { id: "u1", name: "أنظمة الحوسبة", nameEn: "Computing Systems", grade: 7, domain: "أنظمة الحوسبة", description: "تعلم مكونات الحاسوب وأنواعه و cách عمله", lessonsCount: 8, order: 1 },
  { id: "u2", name: "التأثير الاجتماعي للحوسبة", nameEn: "Computing Impact", grade: 7, domain: "تأثير الحوسبة", description: "تأثير الحاسوب والإنترنت على المجتمع والحياة اليومية", lessonsCount: 8, order: 2 },
  { id: "u3", name: "الشبكات والإنترنت", nameEn: "Networks", grade: 7, domain: "الشبكات", description: "مقدمة في الشبكات وأنواعها وكيفية اتصال الأجهزة", lessonsCount: 8, order: 3 },
  { id: "u4", name: "تحليل البيانات", nameEn: "Data Analysis", grade: 7, domain: "تحليل البيانات", description: "أساسيات تحليل البيانات واستخدام الجداول والرسوم البيانية", lessonsCount: 8, order: 4 },
  { id: "u5", name: "الخوارزميات والبرمجة", nameEn: "Algorithms", grade: 8, domain: "الخوارزميات", description: "مقدمة في الخوارزميات والبرمجة والتفكير الحسابي", lessonsCount: 7, order: 1 },
  { id: "u6", name: "إنترنت الأشياء IoT", nameEn: "IoT", grade: 8, domain: "إنترنت الأشياء", description: "مقدمة في إنترنت الأشياء وكيفية عمل الأجهزة الذكية", lessonsCount: 7, order: 2 },
  { id: "u7", name: "الذكاء الاصطناعي", nameEn: "AI", grade: 8, domain: "الذكاء الاصطناعي", description: "مقدمة في الذكاء الاصطناعي وتطبيقاته في الحياة اليومية", lessonsCount: 7, order: 3 },
  { id: "u8", name: "أمن المعلومات", nameEn: "Cybersecurity", grade: 8, domain: "أمن المعلومات", description: "أساسيات حماية البيانات والمعلومات على الإنترنت", lessonsCount: 7, order: 4 },
];

export default function AdminUnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [filterGrade, setFilterGrade] = useState<number | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [editUnit, setEditUnit] = useState<Unit | null>(null);
  const [form, setForm] = useState({ name: "", nameEn: "", grade: 7, domain: "", description: "" });

  useEffect(() => {
    const stored = localStorage.getItem("admin_units");
    if (stored) { setUnits(JSON.parse(stored)); }
    else { setUnits(defaultUnits); localStorage.setItem("admin_units", JSON.stringify(defaultUnits)); }
  }, []);

  const save = (u: Unit[]) => { setUnits(u); localStorage.setItem("admin_units", JSON.stringify(u)); };
  const filtered = units.filter((u) => filterGrade === "all" || u.grade === filterGrade);

  const handleAdd = () => { setEditUnit(null); setForm({ name: "", nameEn: "", grade: 7, domain: "", description: "" }); setShowModal(true); };
  const handleEdit = (u: Unit) => { setEditUnit(u); setForm({ name: u.name, nameEn: u.nameEn, grade: u.grade, domain: u.domain, description: u.description }); setShowModal(true); };
  const handleSave = () => {
    if (!form.name) return;
    if (editUnit) { save(units.map((u) => u.id === editUnit.id ? { ...u, ...form } : u)); }
    else { save([...units, { id: "u" + Date.now(), ...form, lessonsCount: 0, order: units.filter((u) => u.grade === form.grade).length + 1 }]); }
    setShowModal(false);
  };
  const handleDelete = (id: string) => { save(units.filter((u) => u.id !== id)); };

  const gradeColors: Record<number, string> = { 7: "bg-emerald-100 text-emerald-700", 8: "bg-blue-100 text-blue-700", 9: "bg-purple-100 text-purple-700", 10: "bg-orange-100 text-orange-700" };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/admin" className="text-white/60 hover:text-white text-sm">لوحة الإدارة</Link>
                <span className="text-white/40">←</span>
                <h1 className="text-2xl font-extrabold">📦 إدارة الوحدات</h1>
              </div>
              <p className="text-white/70 text-sm">إضافة وتعديل وحذف الوحدات التعليمية</p>
            </div>
            <Button onClick={handleAdd} className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold text-sm">+ إضافة وحدة</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setFilterGrade("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterGrade === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border"}`}>الكل</button>
          {[7, 8, 9, 10].map((g) => (
            <button key={g} onClick={() => setFilterGrade(g)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterGrade === g ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border"}`}>
              {gradeLabels[g]}
            </button>
          ))}
        </div>

        {/* Units Table */}
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs">
                    <th className="text-right py-3 font-medium">#</th>
                    <th className="text-right py-3 font-medium">اسم الوحدة</th>
                    <th className="text-right py-3 font-medium">الصف</th>
                    <th className="text-right py-3 font-medium">المجال</th>
                    <th className="text-right py-3 font-medium">الدروس</th>
                    <th className="text-right py-3 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-gray-400">{i + 1}</td>
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400" dir="ltr">{u.nameEn}</p>
                        </div>
                      </td>
                      <td className="py-3"><Badge className={`text-xs ${gradeColors[u.grade]}`}>{gradeLabels[u.grade]}</Badge></td>
                      <td className="py-3 text-gray-600">{u.domain}</td>
                      <td className="py-3"><span className="font-bold text-blue-600">{u.lessonsCount}</span> درس</td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(u)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600">✏️</button>
                          <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{editUnit ? "✏️ تعديل الوحدة" : "➕ إضافة وحدة جديدة"}</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اسم الوحدة بالعربي *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الاسم بالإنجليزي</label>
                      <input type="text" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" dir="ltr" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الصف الدراسي</label>
                      <select value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value={7}>الصف السابع</option><option value={8}>الصف الثامن</option><option value={9}>الصف التاسع</option><option value={10}>الصف العاشر</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">المجال</label>
                      <input type="text" value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="أنظمة الحوسبة" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} />
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{editUnit ? "حفظ" : "إضافة"}</Button>
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">إلغاء</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
