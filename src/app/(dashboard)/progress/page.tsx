"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const gradeLabels: Record<number, string> = {
  7: "الصف السابع",
  8: "الصف الثامن",
  9: "الصف التاسع",
  10: "الصف العاشر",
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

interface ResultRow {
  quiz_id: string;
  score: number;
  created_at: string;
}

export default function ProgressPage() {
  const [data, setData] = useState<{
    user: { id: string; name: string; grade: number; points: number; level: number };
    stats: { quizzesTaken: number; avgScore: number; bestScore: number };
    recentResults: ResultRow[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setLoading(false);
        return;
      }
      const user = JSON.parse(stored);
      if (!user.id) {
        setLoading(false);
        return;
      }
      fetch(`/api/progress?userId=${encodeURIComponent(user.id)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          if (j) setData(j);
        })
        .finally(() => setLoading(false));
    } catch {
      setLoading(false);
    }
  }, []);

  const userData = data
    ? {
        name: data.user.name,
        grade: gradeLabels[data.user.grade] ?? `الصف ${data.user.grade}`,
        points: data.user.points,
        level: data.user.level,
      }
    : { name: "طالب", grade: "الصف", points: 0, level: 1 };

  const stats = data?.stats ?? { quizzesTaken: 0, avgScore: 0, bestScore: 0 };
  const recentActivity = data
    ? data.recentResults.slice(0, 5).map((r) => ({
        type: "quiz",
        title: `اختبار ${r.quiz_id}`,
        grade: "",
        time: new Date(r.created_at).toLocaleDateString("ar", { day: "numeric", month: "long" }),
        score: `${r.score}%`,
        icon: "📝",
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">{userData.grade}</p>
              <h1 className="text-2xl font-extrabold">مرحباً {userData.name} 👋</h1>
              <p className="text-white/70 text-sm mt-1">
                {loading ? "جارٍ التحميل..." : `أنت في المستوى ${userData.level} - ${userData.points} نقطة`}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-blue-600">{userData.points}</p>
              <p className="text-xs text-gray-500 mt-1">النقاط الكلية</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-green-600">{stats.quizzesTaken}</p>
              <p className="text-xs text-gray-500 mt-1">اختبار مكتمل</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-purple-600">{stats.avgScore}%</p>
              <p className="text-xs text-gray-500 mt-1">متوسط الدرجات</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-orange-600">{userData.level}</p>
              <p className="text-xs text-gray-500 mt-1">المستوى</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-3">آخر الاختبارات</h3>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  لم تُكمل أي اختبار بعد. ابدأ اختباراً لتظهر نتيجتك هنا.
                </p>
              ) : (
                <div className="space-y-2">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-2xl">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                        <p className="text-xs text-gray-400">{a.time}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{a.score}</Badge>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                أفضل نتيجة: <strong className="text-emerald-600">{stats.bestScore}%</strong>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-3">نصائح</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>💡 أكمل اختباراتك لرفع نقاطك ومستواك.</p>
                <p>🎯 راجع إجاباتك الخاطئة لتحسن نتيجتك في المرة القادمة.</p>
                <p>📊 كل 100 نقطة ترفع مستواك درجة.</p>
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
