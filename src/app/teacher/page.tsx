"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StudentRow {
  id: string;
  name: string;
  email: string;
  grade: number | null;
  points: number;
  status: string;
  created_at: string;
  quizzes_taken: number;
  avg_score: number;
  best_score: number;
  last_active: string | null;
}

const gradeLabels: Record<number, string> = {
  7: "السابع",
  8: "الثامن",
  9: "التاسع",
  10: "العاشر",
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

export default function TeacherDashboard() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/teacher/students")
      .then((r) => r.json())
      .then((data) => {
        const rows: StudentRow[] = (data.students || []).map((s: Record<string, unknown>) => ({
          ...s,
          points: Number(s.points) || 0,
          quizzes_taken: Number(s.quizzes_taken) || 0,
          avg_score: Number(s.avg_score) || 0,
          best_score: Number(s.best_score) || 0,
        }));
        setStudents(rows);
        setLoading(false);
      })
      .catch(() => {
        setError("تعذر تحميل بيانات الطلاب");
        setLoading(false);
      });
  }, []);

  const totalStudents = students.length;
  const avgProgress = students.length
    ? Math.round(students.reduce((s, x) => s + (x.avg_score || 0), 0) / students.length)
    : 0;
  const totalQuizzes = students.reduce((s, x) => s + (x.quizzes_taken || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم المعلم</h1>
            <p className="text-gray-500 mt-1">مرحباً بك في لوحة التحكم</p>
          </div>
          <Button variant="gradient">+ إنشاء اختبار جديد</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">👨‍🎓</div>
              <p className="text-3xl font-bold">{totalStudents}</p>
              <p className="text-sm text-gray-500">طالب مسجل</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-3xl font-bold">{avgProgress}%</p>
              <p className="text-sm text-gray-500">متوسط الدرجات</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-3xl font-bold">{totalQuizzes}</p>
              <p className="text-sm text-gray-500">اختبار مُنجز</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-3xl font-bold">{students.reduce((s, x) => s + x.points, 0)}</p>
              <p className="text-sm text-gray-500">إجمالي النقاط</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قائمة الطلاب</CardTitle>
              <Button variant="outline" size="sm">تصدير التقرير</Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="py-8 text-center text-gray-500">جارٍ التحميل...</p>
            ) : error ? (
              <p className="py-8 text-center text-red-500">{error}</p>
            ) : totalStudents === 0 ? (
              <p className="py-8 text-center text-gray-500">لا يوجد طلاب مسجلون بعد.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-right p-3 font-medium">الطالب</th>
                      <th className="text-right p-3 font-medium">الصف</th>
                      <th className="text-right p-3 font-medium">النقاط</th>
                      <th className="text-right p-3 font-medium">الاختبارات</th>
                      <th className="text-right p-3 font-medium">متوسط الدرجات</th>
                      <th className="text-right p-3 font-medium">أفضل نتيجة</th>
                      <th className="text-right p-3 font-medium">آخر نشاط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3">
                          <Badge variant="secondary">{gradeLabels[student.grade ?? 0] ?? `الصف ${student.grade}`}</Badge>
                        </td>
                        <td className="p-3">⭐ {student.points}</td>
                        <td className="p-3">{student.quizzes_taken}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${student.avg_score}%` }}></div>
                            </div>
                            <span className="text-xs">{student.avg_score}%</span>
                          </div>
                        </td>
                        <td className="p-3">{student.best_score}%</td>
                        <td className="p-3 text-gray-500">{timeAgo(student.last_active)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
