"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  phone: string;
  parentName: string;
  parentPhone: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
  score: number;
}

const defaultStudents: Student[] = [
  { id: "1", name: "أحمد خالد العتيبي", email: "ahmed@test.com", grade: 7, phone: "0791234567", parentName: "خالد العتيبي", parentPhone: "0799876543", status: "active", joinDate: "2026-01-15", lastActive: "2026-08-25", score: 92 },
  { id: "2", name: "سارة العلي", email: "sara@test.com", grade: 8, phone: "0781234567", parentName: "علي العلي", parentPhone: "0789876543", status: "active", joinDate: "2026-02-10", lastActive: "2026-08-25", score: 88 },
  { id: "3", name: "محمد حسن الخطيب", email: "mohammad@test.com", grade: 7, phone: "0771234567", parentName: "حسن الخطيب", parentPhone: "0779876543", status: "active", joinDate: "2026-03-05", lastActive: "2026-08-24", score: 75 },
  { id: "4", name: "ليلى أحمد", email: "layla@test.com", grade: 9, phone: "0791112233", parentName: "أحمد خالد", parentPhone: "0792223344", status: "inactive", joinDate: "2026-01-20", lastActive: "2026-08-23", score: 95 },
  { id: "5", name: "عمر يوسف", email: "omar@test.com", grade: 8, phone: "0781112233", parentName: "يوسف عمر", parentPhone: "0782223344", status: "active", joinDate: "2026-04-12", lastActive: "2026-08-25", score: 68 },
  { id: "6", name: "نورة سعيد", email: "noura@test.com", grade: 10, phone: "0771112233", parentName: "سعيد نورة", parentPhone: "0772223344", status: "active", joinDate: "2026-02-28", lastActive: "2026-08-25", score: 82 },
  { id: "7", name: "يوسف إبراهيم", email: "yousef@test.com", grade: 9, phone: "0791234000", parentName: "إبراهيم يوسف", parentPhone: "0799876000", status: "active", joinDate: "2026-05-01", lastActive: "2026-08-24", score: 71 },
  { id: "8", name: "فاطمة الزهراء", email: "fatma@test.com", grade: 10, phone: "0781234000", parentName: "عبدالله الزهراء", parentPhone: "0789876000", status: "pending", joinDate: "2026-08-20", lastActive: "2026-08-20", score: 0 },
];

const gradeLabels: Record<number, string> = { 7: "الصف السابع", 8: "الصف الثامن", 9: "الصف التاسع", 10: "الصف العاشر" };

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [form, setForm] = useState({ name: "", email: "", grade: 7, phone: "", parentName: "", parentPhone: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_students");
    if (stored) {
      setStudents(JSON.parse(stored));
    } else {
      setStudents(defaultStudents);
      localStorage.setItem("admin_students", JSON.stringify(defaultStudents));
    }
  }, []);

  const save = (updated: Student[]) => {
    setStudents(updated);
    localStorage.setItem("admin_students", JSON.stringify(updated));
  };

  const filtered = students.filter((s) => {
    const matchSearch = s.name.includes(search) || s.email.includes(search) || s.phone.includes(search);
    const matchGrade = filterGrade === "all" || s.grade === filterGrade;
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchGrade && matchStatus;
  });

  const handleAdd = () => {
    setEditStudent(null);
    setForm({ name: "", email: "", grade: 7, phone: "", parentName: "", parentPhone: "" });
    setShowModal(true);
  };

  const handleEdit = (s: Student) => {
    setEditStudent(s);
    setForm({ name: s.name, email: s.email, grade: s.grade, phone: s.phone, parentName: s.parentName, parentPhone: s.parentPhone });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editStudent) {
      const updated = students.map((s) => s.id === editStudent.id ? { ...s, ...form } : s);
      save(updated);
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        ...form,
        status: "pending",
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: "لم يسجل دخول بعد",
        score: 0,
      };
      save([...students, newStudent]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    save(students.filter((s) => s.id !== id));
    setShowDeleteConfirm(null);
  };

  const toggleStatus = (id: string) => {
    const updated = students.map((s) => {
      if (s.id === id) {
        return { ...s, status: s.status === "active" ? "inactive" : "active" } as Student;
      }
      return s;
    });
    save(updated);
  };

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    pending: students.filter((s) => s.status === "pending").length,
    avgScore: Math.round(students.filter((s) => s.score > 0).reduce((a, b) => a + b.score, 0) / students.filter((s) => s.score > 0).length) || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/admin" className="text-white/60 hover:text-white text-sm">لوحة الإدارة</Link>
                <span className="text-white/40">←</span>
                <h1 className="text-2xl font-extrabold">👥 إدارة الطلاب</h1>
              </div>
              <p className="text-white/70 text-sm">التحكم بحسابات الطلاب وتسجيلهم على المنصة</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold text-sm">+ إضافة طالب</Button>
              <Link href="/admin/registrations">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-sm">
                  طلبات التسجيل {stats.pending > 0 && <Badge className="mr-2 bg-red-500 text-white text-xs">{stats.pending}</Badge>}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "إجمالي الطلاب", value: stats.total, icon: "👥", color: "from-blue-500 to-blue-600" },
            { label: "الطلاب النشطين", value: stats.active, icon: "✅", color: "from-green-500 to-green-600" },
            { label: "بانتظار التأكيد", value: stats.pending, icon: "⏳", color: "from-amber-500 to-amber-600" },
            { label: "متوسط الدرجات", value: `${stats.avgScore}%`, icon: "📊", color: "from-purple-500 to-purple-600" },
          ].map((s, i) => (
            <Card key={i} className="overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${s.color}`}></div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="🔍 بحث بالاسم أو الإيميل أو رقم الهاتف..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">كل الصفوف</option>
                <option value={7}>الصف السابع</option>
                <option value={8}>الصف الثامن</option>
                <option value={9}>الصف التاسع</option>
                <option value={10}>الصف العاشر</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">كل الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="pending">بانتظار التأكيد</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs">
                    <th className="text-right py-3 font-medium">الاسم</th>
                    <th className="text-right py-3 font-medium">البريد الإلكتروني</th>
                    <th className="text-right py-3 font-medium">الصف</th>
                    <th className="text-right py-3 font-medium">ولي الأمر</th>
                    <th className="text-right py-3 font-medium">رقم الهاتف</th>
                    <th className="text-right py-3 font-medium">الحالة</th>
                    <th className="text-right py-3 font-medium">متوسط الدرجات</th>
                    <th className="text-right py-3 font-medium">تاريخ التسجيل</th>
                    <th className="text-right py-3 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400">
                        <div className="text-4xl mb-2">🔍</div>
                        لا توجد نتائج مطابقة للبحث
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-900">{s.name}</td>
                        <td className="py-3 text-gray-600" dir="ltr">{s.email}</td>
                        <td className="py-3 text-gray-600">{gradeLabels[s.grade]}</td>
                        <td className="py-3 text-gray-600">{s.parentName}</td>
                        <td className="py-3 text-gray-600" dir="ltr">{s.phone}</td>
                        <td className="py-3">
                          <Badge variant={s.status === "active" ? "default" : s.status === "pending" ? "secondary" : "outline"} className={`text-xs ${s.status === "active" ? "bg-green-100 text-green-700" : s.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                            {s.status === "active" ? "نشط" : s.status === "pending" ? "بانتظار التأكيد" : "غير نشط"}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <span className={`font-bold ${s.score >= 80 ? "text-green-600" : s.score >= 60 ? "text-blue-600" : s.score > 0 ? "text-red-600" : "text-gray-400"}`}>
                            {s.score > 0 ? `${s.score}%` : "—"}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 text-xs">{s.joinDate}</td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <button onClick={() => handleEdit(s)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600" title="تعديل">✏️</button>
                            <button onClick={() => toggleStatus(s.id)} className="p-1.5 rounded hover:bg-amber-50 text-amber-600" title={s.status === "active" ? "تعطيل" : "تفعيل"}>
                              {s.status === "active" ? "⏸️" : "▶️"}
                            </button>
                            <button onClick={() => setShowDeleteConfirm(s.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600" title="حذف">🗑️</button>
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

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{editStudent ? "✏️ تعديل بيانات الطالب" : "➕ إضافة طالب جديد"}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اسم الطالب *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="الاسم الكامل" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@email.com" dir="ltr" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الصف الدراسي</label>
                      <select value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value={7}>الصف السابع</option>
                        <option value={8}>الصف الثامن</option>
                        <option value={9}>الصف التاسع</option>
                        <option value={10}>الصف العاشر</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                      <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="07X XXX XXXX" dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اسم ولي الأمر</label>
                    <input type="text" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="اسم ولي الأمر" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">هاتف ولي الأمر</label>
                    <input type="text" value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="07X XXX XXXX" dir="ltr" />
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{editStudent ? "حفظ التعديلات" : "إضافة الطالب"}</Button>
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">إلغاء</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">⚠️</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">هل أنت متأكد من الحذف؟</h3>
                <p className="text-sm text-gray-500 mb-5">سيتم حذف بيانات الطالب نهائياً ولا يمكن التراجع عن هذا الإجراء</p>
                <div className="flex gap-2">
                  <Button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 bg-red-600 hover:bg-red-700 text-white">نعم، حذف</Button>
                  <Button onClick={() => setShowDeleteConfirm(null)} variant="outline" className="flex-1">إلغاء</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
