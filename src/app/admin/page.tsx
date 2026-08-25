"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "الطلاب", value: "450", change: "+12%", icon: "👨‍🎓", color: "from-blue-500 to-blue-600" },
  { label: "المعلمون", value: "15", change: "+2", icon: "👨‍🏫", color: "from-green-500 to-green-600" },
  { label: "الدروس", value: "120", change: "+5", icon: "📖", color: "from-purple-500 to-purple-600" },
  { label: "الاختبارات", value: "32", change: "+3", icon: "📝", color: "from-orange-500 to-orange-600" },
];

const recentStudents = [
  { name: "أحمد خالد", grade: "الصف 7", score: 92, status: "نشط", lastActive: "منذ 10 دقائق" },
  { name: "سارة العلي", grade: "الصف 8", score: 88, status: "نشط", lastActive: "منذ 25 دقيقة" },
  { name: "محمد حسن", grade: "الصف 7", score: 75, status: "نشط", lastActive: "منذ ساعة" },
  { name: "ليلى أحمد", grade: "الصف 9", score: 95, status: "غير نشط", lastActive: "منذ يومين" },
  { name: "عمر يوسف", grade: "الصف 8", score: 68, status: "نشط", lastActive: "منذ 3 ساعات" },
  { name: "نورة سعيد", grade: "الصف 10", score: 82, status: "نشط", lastActive: "منذ 15 دقيقة" },
];

const systemAlerts = [
  { type: "warning", message: "5 طلاب لم يسجلوا دخول منذ أكثر من أسبوع", time: "منذ ساعتين" },
  { type: "info", message: "تم إضافة 3 دروس جديدة في الصف الثامن", time: "منذ 4 ساعات" },
  { type: "success", message: "متوسط درجات الطلاب ارتفع بنسبة 8% هذا الشهر", time: "أمس" },
];

const platformContent = [
  { name: "الصف السابع", grades: 4, units: 12, lessons: 32, quizzes: 8, completion: 75 },
  { name: "الصف الثامن", grades: 4, units: 10, lessons: 28, quizzes: 8, completion: 60 },
  { name: "الصف التاسع", grades: 4, units: 11, lessons: 30, quizzes: 8, completion: 45 },
  { name: "الصف العاشر", grades: 4, units: 10, lessons: 30, quizzes: 8, completion: 30 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-extrabold">⚙️ لوحة إدارة المنصة</h1>
              <p className="text-white/70 text-sm mt-1">مرحباً بك - إدارة المحتوى والمستخدمين | aabuserhan80@gmail.com</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-white text-[#1e3a5f] hover:bg-white/90 text-sm">+ إضافة محتوى</Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-sm">تصدير التقارير</Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-1.5 bg-gradient-to-r ${s.color}`}></div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <Badge variant="secondary" className="text-xs text-green-600 bg-green-50">{s.change}</Badge>
                </div>
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-900 mb-3">🔔 إشعارات النظام</h3>
            <div className="space-y-2">
              {systemAlerts.map((alert, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                  alert.type === "warning" ? "bg-amber-50 border border-amber-200" :
                  alert.type === "success" ? "bg-green-50 border border-green-200" :
                  "bg-blue-50 border border-blue-200"
                }`}>
                  <span className="text-lg">
                    {alert.type === "warning" ? "⚠️" : alert.type === "success" ? "✅" : "ℹ️"}
                  </span>
                  <p className="flex-1 text-sm text-gray-700">{alert.message}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Content Management */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">📦 إدارة المحتوى</h3>
              <div className="space-y-3">
                {[
                  { title: "إدارة الصفوف", icon: "📚", count: "4 صفوف", href: "/admin/grades", color: "bg-blue-50 text-blue-600" },
                  { title: "إدارة الوحدات", icon: "📦", count: "24 وحدة", href: "/admin/units", color: "bg-green-50 text-green-600" },
                  { title: "إدارة الدروس", icon: "📖", count: "120 درس", href: "/admin/lessons", color: "bg-purple-50 text-purple-600" },
                  { title: "إدارة الاختبارات", icon: "📝", count: "32 اختبار", href: "/admin/quizzes", color: "bg-orange-50 text-orange-600" },
                  { title: "إدارة الطلاب", icon: "👥", count: "450 طالب", href: "/admin/students", color: "bg-pink-50 text-pink-600" },
                  { title: "طلبات التسجيل", icon: "📋", count: "جديد", href: "/admin/registrations", color: "bg-amber-50 text-amber-600" },
                ].map((item, i) => (
                  <Link key={i} href={item.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${item.color}`}>{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{item.count}</Badge>
                      <span className="text-gray-400 text-sm">←</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Content */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">📊 حالة المحتوى حسب الصف</h3>
              <div className="space-y-3">
                {platformContent.map((p, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{p.name}</span>
                      <span className="text-xs text-gray-500">{p.completion}% مكتمل</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${p.completion}%` }}></div>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-400">
                      <span>{p.lessons} درس</span>
                      <span>{p.quizzes} اختبار</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">👥 أحدث الطلاب النشطين</h3>
              <Link href="/admin/users"><Button variant="outline" size="sm">عرض الكل</Button></Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs">
                    <th className="text-right py-2 font-medium">الاسم</th>
                    <th className="text-right py-2 font-medium">الصف</th>
                    <th className="text-right py-2 font-medium">متوسط الدرجات</th>
                    <th className="text-right py-2 font-medium">الحالة</th>
                    <th className="text-right py-2 font-medium">آخر نشاط</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((s, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 font-medium text-gray-900">{s.name}</td>
                      <td className="py-2.5 text-gray-600">{s.grade}</td>
                      <td className="py-2.5">
                        <span className={`font-bold ${s.score >= 80 ? "text-green-600" : s.score >= 60 ? "text-blue-600" : "text-red-600"}`}>
                          {s.score}%
                        </span>
                      </td>
                      <td className="py-2.5">
                        <Badge variant={s.status === "نشط" ? "default" : "secondary"} className="text-xs">
                          {s.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 text-gray-400 text-xs">{s.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
