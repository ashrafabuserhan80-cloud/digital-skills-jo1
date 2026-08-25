"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "التعلم والدروس",
    icon: "📚",
    achievements: [
      { id: "1", title: "المبتدئ", description: "أكمل أول درس", icon: "🌱", earned: true, date: "15 يناير 2026", points: 50 },
      { id: "2", title: "المتعلم", description: "أكمل 5 دروس", icon: "📚", earned: true, date: "20 يناير 2026", points: 100 },
      { id: "3", title: "المجتهد", description: "أكمل 15 درس", icon: "💪", earned: false, required: "أكمل 3 دروس أخرى", points: 200 },
      { id: "4", title: "الخبير", description: "أكمل 30 درس", icon: "🎓", earned: false, required: "أكمل 18 درساً أخرى", points: 500 },
    ]
  },
  {
    name: "الاختبارات والدرجات",
    icon: "📝",
    achievements: [
      { id: "5", title: "الناجح", description: "اجتز اختبار بنجاح", icon: "✅", earned: true, date: "22 يناير 2026", points: 50 },
      { id: "6", title: "المتفوق", description: "احصل على 90% في اختبار", icon: "⭐", earned: false, required: "احصل على درجة أعلى في اختبار واحد", points: 150 },
      { id: "7", title: "المتحمس", description: "اجتز 3 اختبارات", icon: "🎯", earned: false, required: "اجتز اختبارين آخرين", points: 200 },
      { id: "8", title: "无敌", description: "100% في اختبار", icon: "💯", earned: false, required: "احصل على الدرجة الكاملة", points: 300 },
    ]
  },
  {
    name: "المثابرة والاستمرارية",
    icon: "🔥",
    achievements: [
      { id: "9", title: "المثابر", description: "تعلم 3 أيام متتالية", icon: "🔥", earned: true, date: "23 يناير 2026", points: 75 },
      { id: "10", title: "المنضبط", description: "تعلم 7 أيام متتالية", icon: "📅", earned: false, required: "استمر 3 أيام أخرى", points: 150 },
      { id: "11", title: "ال𣠗", description: "تعلم 30 يوم", icon: "🏆", earned: false, required: "استمر 23 يوماً أخرى", points: 500 },
    ]
  },
  {
    name: "المجالات والتخصص",
    icon: "🎯",
    achievements: [
      { id: "12", title: "خبير البيانات", description: "أكمل مجال تحليل البيانات", icon: "📊", earned: false, required: "أكمل 4 دروس في تحليل البيانات", points: 200 },
      { id: "13", title: "مبرمج", description: "أكمل 10 دروس في البرمجة", icon: "💻", earned: false, required: "أكمل 7 دروس في البرمجة", points: 250 },
      { id: "14", title: "خبير الشبكات", description: "أكمل مجال الشبكات", icon: "🔗", earned: false, required: "أكمل 4 دروس في الشبكات", points: 200 },
      { id: "15", title: "خبير الأمن", description: "أكمل مجال أمن المعلومات", icon: "🔒", earned: false, required: "أكمل 5 دروس في الأمن السيبراني", points: 200 },
    ]
  },
];

export default function AchievementsPage() {
  const allAchievements = categories.flatMap(c => c.achievements);
  const earnedCount = allAchievements.filter(a => a.earned).length;
  const totalPoints = allAchievements.filter(a => a.earned).reduce((a, b) => a + b.points, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-extrabold">🏆 الإنجازات والشارات</h1>
              <p className="text-white/80 text-sm mt-1">اجمع الشارات وأثبت مهاراتك</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                <p className="text-2xl font-extrabold">{earnedCount}/{allAchievements.length}</p>
                <p className="text-xs text-white/80">إنجاز</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                <p className="text-2xl font-extrabold">{totalPoints}</p>
                <p className="text-xs text-white/80">نقطة مكتسبة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">التقدم الكلي</h3>
              <span className="text-sm text-gray-500">{Math.round((earnedCount / allAchievements.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{ width: `${(earnedCount / allAchievements.length) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((cat, ci) => {
            const catEarned = cat.achievements.filter(a => a.earned).length;
            return (
              <div key={ci}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-lg font-extrabold text-gray-900">{cat.name}</h2>
                  <Badge variant="secondary" className="text-xs">{catEarned}/{cat.achievements.length}</Badge>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cat.achievements.map((a) => (
                    <Card key={a.id} className={`overflow-hidden transition-all ${a.earned ? "ring-2 ring-yellow-300 shadow-md" : "opacity-75"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${a.earned ? "bg-yellow-50 border-2 border-yellow-200" : "bg-gray-50 border-2 border-gray-200 grayscale"}`}>
                            {a.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 text-sm">{a.title}</h3>
                              {a.earned && <span className="text-yellow-500 text-xs">✓ محقق</span>}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                            {a.earned && a.date && (
                              <p className="text-xs text-green-600 mt-1">📅 {a.date}</p>
                            )}
                            {!a.earned && a.required && (
                              <p className="text-xs text-gray-400 mt-1">⬅️ {a.required}</p>
                            )}
                          </div>
                          <Badge variant={a.earned ? "default" : "outline"} className="text-xs flex-shrink-0">
                            +{a.points}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/progress">
            <Button variant="outline">← العودة للتقدم</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
