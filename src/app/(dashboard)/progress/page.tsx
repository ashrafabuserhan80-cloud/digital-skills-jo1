"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const userData = {
  name: "أحمد",
  grade: "الصف السابع",
  points: 450,
  level: 5,
  streak: 7,
  completedLessons: 12,
  totalLessons: 32,
  completedQuizzes: 4,
  totalQuizzes: 8,
  averageScore: 78,
  rank: 15,
  totalStudents: 120,
  badges: [
    { icon: "🌱", name: "المبتدئ", color: "bg-green-100 text-green-700" },
    { icon: "🔥", name: "متوالي 7 أيام", color: "bg-orange-100 text-orange-700" },
    { icon: "⭐", name: "متفوق", color: "bg-yellow-100 text-yellow-700" },
  ],
};

const subjectProgress = [
  { name: "أنظمة الحوسبة", icon: "💻", done: 6, total: 12, color: "#3b82f6" },
  { name: "الشبكات والإنترنت", icon: "🔗", done: 4, total: 8, color: "#22c55e" },
  { name: "تحليل البيانات", icon: "📊", done: 2, total: 6, color: "#f97316" },
  { name: "أثر الحوسبة", icon: "🌐", done: 0, total: 6, color: "#a855f7" },
];

const weeklyActivity = [
  { day: "السبت", mins: 45 },
  { day: "الأحد", mins: 30 },
  { day: "الاثنين", mins: 60 },
  { day: "الثلاثاء", mins: 25 },
  { day: "الأربعاء", mins: 50 },
  { day: "الخميس", mins: 15 },
  { day: "الجمعة", mins: 40 },
];
const maxMins = Math.max(...weeklyActivity.map(d => d.mins));

const recentActivity = [
  { type: "lesson", title: "مكونات الحاسوب: العتاد", grade: "الصف 7", time: "اليوم 30 دقيقة", icon: "📖" },
  { type: "quiz", title: "اختبار الوحدة الأولى", grade: "الصف 7", time: "أمس", score: "85%", icon: "📝" },
  { type: "lesson", title: "أنواع الحواسيب", grade: "الصف 7", time: "أمس 15 دقيقة", icon: "📖" },
  { type: "badge", title: "شارة متوالي 7 أيام", grade: "", time: "منذ 3 أيام", icon: "🔥" },
  { type: "lesson", title: "تاريخ الحاسوب", grade: "الصف 7", time: "منذ 4 أيام 20 دقيقة", icon: "📖" },
];

const upcomingQuizzes = [
  { title: "اختبار أنظمة التشغيل", grade: "الصف 7", due: "غداً", questions: 10 },
  { title: "اختبار الشبكات", grade: "الصف 7", due: "بعد 3 أيام", questions: 8 },
];

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">{userData.grade}</p>
              <h1 className="text-2xl font-extrabold">مرحباً {userData.name} 👋</h1>
              <p className="text-white/70 text-sm mt-1">أنت في المستوى {userData.level} - {userData.points} نقطة</p>
            </div>
            <div className="flex gap-3">
              {userData.badges.map((b, i) => (
                <div key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${b.color} flex items-center gap-1.5`}>
                  <span>{b.icon}</span> {b.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-blue-600">{userData.points}</p>
              <p className="text-xs text-gray-500 mt-1">النقاط الكلية</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-green-600">{userData.completedLessons}</p>
              <p className="text-xs text-gray-500 mt-1">درس مكتمل</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-purple-600">{userData.averageScore}%</p>
              <p className="text-xs text-gray-500 mt-1">متوسط الدرجات</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-orange-600">🔥 {userData.streak}</p>
              <p className="text-xs text-gray-500 mt-1">أيام متتالية</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Subject Progress */}
          <Card className="md:col-span-2">
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">التقدم حسب المادة</h3>
              <div className="space-y-4">
                {subjectProgress.map((s, i) => {
                  const pct = Math.round((s.done / s.total) * 100);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span>{s.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{s.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{s.done}/{s.total} درس ({pct}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full transition-all" style={{ width: `${pct}%`, background: s.color }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">نشاط هذا الأسبوع</h3>
              <div className="space-y-2">
                {weeklyActivity.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-12 text-gray-500">{d.day}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                        style={{ width: `${(d.mins / maxMins) * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-left text-gray-600">{d.mins} دقيقة</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t text-center">
                <p className="text-xs text-gray-500">المجموع: <strong>{weeklyActivity.reduce((a, b) => a + b.mins, 0)}</strong> دقيقة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-3">آخر النشاطات</h3>
              <div className="space-y-2">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-2xl">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                      <p className="text-xs text-gray-400">{a.time}</p>
                    </div>
                    {a.score && <Badge variant="secondary" className="text-xs">{a.score}</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-3">اختبارات قادمة</h3>
              <div className="space-y-3">
                {upcomingQuizzes.map((q, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{q.title}</p>
                      <p className="text-xs text-gray-400">{q.questions} سؤال</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{q.due}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">الترتيب في الفصل</h3>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-2xl font-extrabold text-blue-600">#{userData.rank}</p>
                  <p className="text-xs text-gray-500">من {userData.totalStudents} طالب</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/grade/7">
            <Button variant="gradient" size="lg">تابع التعلم ←</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
