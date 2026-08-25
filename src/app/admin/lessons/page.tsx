"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  grade: number;
  unit: string;
  description: string;
  content: string;
  objectives: string[];
  duration: string;
  difficulty: "سهل" | "متوسط" | "صعب";
  status: "draft" | "published";
  hasQuiz: boolean;
  viewCount: number;
}

const gradeLabels: Record<number, string> = { 7: "الصف السابع", 8: "الصف الثامن", 9: "الصف التاسع", 10: "الصف العاشر" };

const defaultLessons: Lesson[] = [
  { id: "7-0-0-0", title: "تاريخ الحاسوب", titleEn: "History of Computing", grade: 7, unit: "أنظمة الحوسبة", description: " جولة في تاريخ الحاسوب من البداية حتى اليوم", content: "مرحباً بكم في درس تاريخ الحاسوب! سنlearn في هذا الدرس عن تطور الحاسوب عبر العصور...", objectives: ["فهم مراحل تطور الحاسوب", "معرفة أهم المخترعين"], duration: "20 دقيقة", difficulty: "سهل", status: "published", hasQuiz: true, viewCount: 1250 },
  { id: "7-0-0-1", title: "أنواع الحواسيب", titleEn: "Types of Computers", grade: 7, unit: "أنظمة الحوسبة", description: " تعريف Different أنواع الحواسيب واستخداماتها", content: "في هذا الدرس سنتعلم عن الأنواع المختلفة للحواسيب...", objectives: ["تصنيف الحواسيب حسب الحجم", "معرفة استخدامات كل نوع"], duration: "25 دقيقة", difficulty: "سهل", status: "published", hasQuiz: true, viewCount: 980 },
  { id: "7-0-1-0", title: "مكونات الحاسوب: العتاد", titleEn: "Computer Components: Hardware", grade: 7, unit: "أنظمة الحوسبة", description: "معرفة المكونات المادية للحاسوب", content: "العتاد (Hardware) هو المكونات المادية الملموسة للحاسوب...", objectives: ["تحديد مكونات العتاد", "فهم وظيفة كل مكون"], duration: "30 دقيقة", difficulty: "متوسط", status: "published", hasQuiz: true, viewCount: 1560 },
  { id: "7-0-1-1", title: "مكونات الحاسوب: البرمجيات", titleEn: "Computer Components: Software", grade: 7, unit: "أنظمة الحوسبة", description: "شرح البرمجيات وأنواعها", content: "البرمجيات هي البرامج التي توجه عمل الحاسوب...", objectives: ["تمييز البرمجيات من العتاد", "معرفة أنواع البرمجيات"], duration: "25 دقيقة", difficulty: "متوسط", status: "published", hasQuiz: true, viewCount: 870 },
  { id: "8-0-0-0", title: "مقدمة في البرمجة", titleEn: "Intro to Programming", grade: 8, unit: "الخوارزميات", description: "أول خطوة في عالم البرمجة", content: "البرمجة هي عملية كتابة تعليمات للحاسوب...", objectives: ["فهم مفهوم البرمجة", "كتابة أول برنامج بسيط"], duration: "30 دقيقة", difficulty: "سهل", status: "published", hasQuiz: true, viewCount: 720 },
  { id: "9-0-0-0", title: "مقدمة في Python", titleEn: "Introduction to Python", grade: 9, unit: "Python", description: "الخطوة الأولى في تعلم لغة بايثون", content: "بايثون هي من أكثر لغات البرمجة شيوعاً...", objectives: ["تثبيت بيئة Python", "كتابة أول برنامج"], duration: "35 دقيقة", difficulty: "متوسط", status: "draft", hasQuiz: false, viewCount: 0 },
];

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filterGrade, setFilterGrade] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editLesson, setEditLesson] = useState<Lesson | null>(null);
  const [form, setForm] = useState<{ title: string; titleEn: string; grade: number; unit: string; description: string; content: string; objectives: string; duration: string; difficulty: string; status: string; hasQuiz: boolean }>({ title: "", titleEn: "", grade: 7, unit: "", description: "", content: "", objectives: "", duration: "20 دقيقة", difficulty: "سهل", status: "draft", hasQuiz: false });

  useEffect(() => {
    const stored = localStorage.getItem("admin_lessons");
    if (stored) { setLessons(JSON.parse(stored)); }
    else { setLessons(defaultLessons); localStorage.setItem("admin_lessons", JSON.stringify(defaultLessons)); }
  }, []);

  const save = (u: Lesson[]) => { setLessons(u); localStorage.setItem("admin_lessons", JSON.stringify(u)); };
  const filtered = lessons.filter((l) => {
    const matchSearch = l.title.includes(search) || l.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchGrade = filterGrade === "all" || l.grade === filterGrade;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchGrade && matchStatus;
  });

  const handleAdd = () => {
    setEditLesson(null);
    setForm({ title: "", titleEn: "", grade: 7, unit: "", description: "", content: "", objectives: "", duration: "20 دقيقة", difficulty: "سهل", status: "draft", hasQuiz: false });
    setShowModal(true);
  };
  const handleEdit = (l: Lesson) => {
    setEditLesson(l);
    setForm({ title: l.title, titleEn: l.titleEn, grade: l.grade, unit: l.unit, description: l.description, content: l.content, objectives: l.objectives.join("\n"), duration: l.duration, difficulty: l.difficulty, status: l.status, hasQuiz: l.hasQuiz });
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.title) return;
    const data = { ...form, objectives: form.objectives.split("\n").filter(Boolean), difficulty: form.difficulty as Lesson["difficulty"], status: form.status as Lesson["status"] };
    if (editLesson) { save(lessons.map((l) => l.id === editLesson.id ? { ...l, ...data } : l)); }
    else { save([...lessons, { id: `lesson-${Date.now()}`, ...data, viewCount: 0 }]); }
    setShowModal(false);
  };
  const handleDelete = (id: string) => { save(lessons.filter((l) => l.id !== id)); };
  const toggleStatus = (id: string) => {
    save(lessons.map((l) => l.id === id ? { ...l, status: l.status === "published" ? "draft" : "published" } : l));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/admin" className="text-white/60 hover:text-white text-sm">لوحة الإدارة</Link>
                <span className="text-white/40">←</span>
                <h1 className="text-2xl font-extrabold">📖 إدارة الدروس</h1>
              </div>
              <p className="text-white/70 text-sm">إضافة وتعديل وحذف الدروس التعليمية</p>
            </div>
            <Button onClick={handleAdd} className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold text-sm">+ إضافة درس</Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <input type="text" placeholder="🔍 بحث في عنوان الدرس..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value === "all" ? "all" : Number(e.target.value))} className="px-4 py-2 border rounded-lg text-sm">
                <option value="all">كل الصفوف</option>
                <option value={7}>الصف السابع</option><option value={8}>الصف الثامن</option><option value={9}>الصف التاسع</option><option value={10}>الصف العاشر</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg text-sm">
                <option value="all">كل الحالات</option>
                <option value="published">منشور</option>
                <option value="draft">مسودة</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "إجمالي الدروس", value: lessons.length, icon: "📖", color: "from-blue-500 to-blue-600" },
            { label: "منشور", value: lessons.filter((l) => l.status === "published").length, icon: "✅", color: "from-green-500 to-green-600" },
            { label: "مسودات", value: lessons.filter((l) => l.status === "draft").length, icon: "📝", color: "from-amber-500 to-amber-600" },
            { label: "إجمالي المشاهدات", value: lessons.reduce((a, b) => a + b.viewCount, 0).toLocaleString(), icon: "👁️", color: "from-purple-500 to-purple-600" },
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

        {/* Lessons Table */}
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs">
                    <th className="text-right py-3 font-medium">عنوان الدرس</th>
                    <th className="text-right py-3 font-medium">الصف</th>
                    <th className="text-right py-3 font-medium">الوحدة</th>
                    <th className="text-right py-3 font-medium">المدة</th>
                    <th className="text-right py-3 font-medium">الصعوبة</th>
                    <th className="text-right py-3 font-medium">الحالة</th>
                    <th className="text-right py-3 font-medium">المشاهدات</th>
                    <th className="text-right py-3 font-medium">اختبار</th>
                    <th className="text-right py-3 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} className="py-12 text-center text-gray-400"><div className="text-4xl mb-2">📖</div>لا توجد دروس</td></tr>
                  ) : (
                    filtered.map((l) => (
                      <tr key={l.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3">
                          <div>
                            <p className="font-medium text-gray-900">{l.title}</p>
                            <p className="text-xs text-gray-400" dir="ltr">{l.titleEn}</p>
                          </div>
                        </td>
                        <td className="py-3"><Badge className={`text-xs ${l.grade === 7 ? "bg-emerald-100 text-emerald-700" : l.grade === 8 ? "bg-blue-100 text-blue-700" : l.grade === 9 ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>{gradeLabels[l.grade]}</Badge></td>
                        <td className="py-3 text-gray-600 text-xs">{l.unit}</td>
                        <td className="py-3 text-gray-600 text-xs">{l.duration}</td>
                        <td className="py-3">
                          <Badge variant="secondary" className={`text-xs ${l.difficulty === "سهل" ? "bg-green-100 text-green-700" : l.difficulty === "متوسط" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{l.difficulty}</Badge>
                        </td>
                        <td className="py-3">
                          <button onClick={() => toggleStatus(l.id)}>
                            <Badge className={`text-xs cursor-pointer ${l.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {l.status === "published" ? "منشور" : "مسودة"}
                            </Badge>
                          </button>
                        </td>
                        <td className="py-3 text-gray-500 text-xs">{l.viewCount.toLocaleString()}</td>
                        <td className="py-3">{l.hasQuiz ? "✅" : "—"}</td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <button onClick={() => handleEdit(l)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600">✏️</button>
                            <button onClick={() => handleDelete(l.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{editLesson ? "✏️ تعديل الدرس" : "➕ إضافة درس جديد"}</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الدرس بالعربي *</label>
                      <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">العنوان بالإنجليزي</label>
                      <input type="text" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" dir="ltr" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الصف</label>
                      <select value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value={7}>7</option><option value={8}>8</option><option value={9}>9</option><option value={10}>10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الوحدة</label>
                      <input type="text" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="أنظمة الحوسبة" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">المدة</label>
                      <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الصعوبة</label>
                      <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as "سهل" | "متوسط" | "صعب" })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="سهل">سهل</option><option value="متوسط">متوسط</option><option value="صعب">صعب</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="draft">مسودة</option><option value="published">منشور</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                    <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">محتوى الدرس</label>
                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">أهداف الدرس (كل سطر هدف)</label>
                    <textarea value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="فهم مراحل تطور الحاسوب&#10;معرفة أهم المخترعين" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="hasQuiz" checked={form.hasQuiz} onChange={(e) => setForm({ ...form, hasQuiz: e.target.checked })} className="w-4 h-4" />
                    <label htmlFor="hasQuiz" className="text-sm text-gray-700">يحتوي على اختبار تفاعلي</label>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{editLesson ? "حفظ التعديلات" : "إضافة الدرس"}</Button>
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
