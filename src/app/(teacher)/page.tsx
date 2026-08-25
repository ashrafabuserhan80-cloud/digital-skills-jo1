"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sampleStudents = [
  { id: "1", name: "أحمد محمد", grade: "السابع", points: 650, level: 7, progress: 75, lastActive: "اليوم" },
  { id: "2", name: "سارة علي", grade: "السابع", points: 520, level: 6, progress: 60, lastActive: "أمس" },
  { id: "3", name: "خالد حسن", grade: "التاسع", points: 890, level: 9, progress: 85, lastActive: "اليوم" },
  { id: "4", name: "نور إبراهيم", grade: "العاشر", points: 1200, level: 12, progress: 92, lastActive: "اليوم" },
  { id: "5", name: "عمر سعيد", grade: "السابع", points: 310, level: 4, progress: 35, lastActive: "منذ 3 أيام" },
];

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">👩‍🏫 لوحة تحكم المعلم</h1>
            <p className="text-gray-500 mt-1">مرحباً بك في لوحة التحكم</p>
          </div>
          <Button variant="gradient">+ إنشاء اختبار جديد</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">👨‍🎓</div>
              <p className="text-3xl font-bold">{sampleStudents.length}</p>
              <p className="text-sm text-gray-500">طالب مسجل</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-3xl font-bold">72%</p>
              <p className="text-sm text-gray-500">متوسط التقدم</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm text-gray-500">متوسط الدرجات</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-gray-500">اختبار منشأ</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>📋 قائمة الطلاب</CardTitle>
              <Button variant="outline" size="sm">تصدير التقرير</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-right p-3 font-medium">الطالب</th>
                    <th className="text-right p-3 font-medium">الصف</th>
                    <th className="text-right p-3 font-medium">النقاط</th>
                    <th className="text-right p-3 font-medium">المستوى</th>
                    <th className="text-right p-3 font-medium">التقدم</th>
                    <th className="text-right p-3 font-medium">آخر نشاط</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{student.name}</td>
                      <td className="p-3"><Badge variant="secondary">{student.grade}</Badge></td>
                      <td className="p-3">⭐ {student.points}</td>
                      <td className="p-3">Lv.{student.level}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span className="text-xs">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-500">{student.lastActive}</td>
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
