"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Grade {
  id: string;
  name: string;
  nameEn: string;
  number: number;
  stage: string;
  emoji: string;
  color: string;
  description: string;
  unitsCount: number;
  lessonsCount: number;
  quizzesCount: number;
  completion: number;
}

const defaultGrades: Grade[] = [
  { id: "g7", name: "الصف السابع الأساسي", nameEn: "Grade 7", number: 7, stage: "إعدادية", emoji: "🌱", color: "from-emerald-500 to-teal-500", description: "أساسيات الحاسوب والشبكات والبيانات", unitsCount: 4, lessonsCount: 32, quizzesCount: 8, completion: 75 },
  { id: "g8", name: "الصف الثامن الأساسي", nameEn: "Grade 8", number: 8, stage: "إعدادية", emoji: "🌿", color: "from-blue-500 to-indigo-500", description: "البرمجة الأساسية وإنترنت الأشياء والذكاء الاصطناعي", unitsCount: 4, lessonsCount: 28, quizzesCount: 8, completion: 60 },
  { id: "g9", name: "الصف التاسع الأساسي", nameEn: "Grade 9", number: 9, stage: "إعدادية", emoji: "🌳", color: "from-purple-500 to-violet-500", description: "Python وتحليل البيانات وأمن المعلومات", unitsCount: 4, lessonsCount: 30, quizzesCount: 8, completion: 45 },
  { id: "g10", name: "الصف العاشر الأساسي", nameEn: "Grade 10", number: 10, stage: "إعدادية", emoji: "🎓", color: "from-orange-500 to-red-500", description: "مشاريع تطبيقية وتطوير ويب متقدم", unitsCount: 4, lessonsCount: 30, quizzesCount: 8, completion: 30 },
];

export default function AdminGradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editGrade, setEditGrade] = useState<Grade | null>(null);
  const [form, setForm] = useState({ name: "", nameEn: "", number: 7, stage: "إعدادية", emoji: "📚", color: "from-blue-500 to-blue-600", description: "" });

  useEffect(() => {
    const stored = localStorage.getItem("admin_grades");
    if (stored) { setGrades(JSON.parse(stored)); }
    else { setGrades(defaultGrades); localStorage.setItem("admin_grades", JSON.stringify(defaultGrades)); }
  }, []);

  const save = (u: Grade[]) => { setGrades(u); localStorage.setItem("admin_grades", JSON.stringify(u)); };

  const handleAdd = () => { setEditGrade(null); setForm({ name: "", nameEn: "", number: 7, stage: "إعدادية", emoji: "📚", color: "from-blue-500 to-blue-600", description: "" }); setShowModal(true); };
  const handleEdit = (g: Grade) => { setEditGrade(g); setForm({ name: g.name, nameEn: g.nameEn, number: g.number, stage: g.stage, emoji: g.emoji, color: g.color, description: g.description }); setShowModal(true); };
  const handleSave = () => {
    if (!form.name) return;
    if (editGrade) { save(grades.map((g) => g.id === editGrade.id ? { ...g, ...form } : g)); }
    else { save([...grades, { id: "g" + Date.now(), ...form, unitsCount: 0, lessonsCount: 0, quizzesCount: 0, completion: 0 }]); }
    setShowModal(false);
  };
  const handleDelete = (id: string) => { save(grades.filter((g) => g.id !== id)); };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/admin" className="text-white/60 hover:text-white text-sm">لوحة الإدارة</Link>
                <span className="text-white/40">←</span>
                <h1 className="text-2xl font-extrabold">📚 إدارة الصفوف</h1>
              </div>
              <p className="text-white/70 text-sm">إضافة وتعديل وحذف الصفوف الدراسية</p>
            </div>
            <Button onClick={handleAdd} className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold text-sm">+ إضافة صف</Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {grades.map((g) => (
            <Card key={g.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-2 bg-gradient-to-r ${g.color}`}></div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{g.emoji}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{g.name}</h3>
                      <p className="text-xs text-gray-400">{g.nameEn} | مرحلة {g.stage}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(g)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600">✏️</button>
                    <button onClick={() => handleDelete(g.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600">🗑️</button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{g.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${g.completion}%` }}></div>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>📦 {g.unitsCount} وحدة</span>
                  <span>📖 {g.lessonsCount} درس</span>
                  <span>📝 {g.quizzesCount} اختبار</span>
                  <span className="font-bold text-blue-600">{g.completion}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{editGrade ? "✏️ تعديل الصف" : "➕ إضافة صف جديد"}</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اسم الصف بالعربي *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="الصف السابع الأساسي" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الاسم بالإنجليزي</label>
                      <input type="text" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Grade 7" dir="ltr" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رقم الصف</label>
                      <select value={form.number} onChange={(e) => setForm({ ...form, number: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value={7}>7</option><option value={8}>8</option><option value={9}>9</option><option value={10}>10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">المرحلة</label>
                      <input type="text" value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الإيموجي</label>
                      <input type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm text-center text-2xl" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اللون</label>
                    <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="from-emerald-500 to-teal-500">أخضر</option>
                      <option value="from-blue-500 to-indigo-500">أزرق</option>
                      <option value="from-purple-500 to-violet-500">بنفسجي</option>
                      <option value="from-orange-500 to-red-500">برتقالي</option>
                      <option value="from-pink-500 to-rose-500">وردي</option>
                      <option value="from-cyan-500 to-blue-500">سماوي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} placeholder="وصف مختصر للصف..." />
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{editGrade ? "حفظ التعديلات" : "إضافة الصف"}</Button>
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
