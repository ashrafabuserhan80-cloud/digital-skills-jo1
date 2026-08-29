"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LESSONS_DB } from "@/lib/curriculum";

const GRADE_NAMES: Record<number, string> = { 7: "السابع", 8: "الثامن", 9: "التاسع", 10: "العاشر" };
const DOMAIN_ICONS: Record<string, string> = { "أنظمة الحوسبة": "💻", "شبكات الحاسوب": "🔗", "الشبكات والإنترنت": "🔗", "تحليل البيانات": "📊", "الخوارزميات والبرمجة": "⚙️", "الخوارzymيات والبرمجة": "⚙️" };

export default function LessonPage() {
  const params = useParams();
  const id = params.id as string;
  const lesson = LESSONS_DB[id];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <span className="text-5xl block mb-4">📚</span>
            <h1 className="text-xl font-bold mb-2">الدرس غير متوفر حالياً</h1>
            <p className="text-gray-500 text-sm mb-4">هذا الدور في مرحلة الإعداد. جرّب درساً آخر!</p>
            <div className="flex gap-2 justify-center">
              <Link href="/grade/7"><Button>الصف السابع</Button></Link>
              <Link href="/grade/8"><Button variant="secondary">الصف الثامن</Button></Link>
              <Link href="/grade/9"><Button variant="secondary">الصف التاسع</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5a8e] to-[#1e3a5f] text-white py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>/</span>
            <Link href={`/grade/${lesson.grade}`} className="hover:text-white">الصف {GRADE_NAMES[lesson.grade]}</Link>
            <span>/</span>
            <span className="text-white/80">{lesson.domain}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{DOMAIN_ICONS[lesson.domain] || "📖"}</span>
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-1">{lesson.domain} - {lesson.unit}</Badge>
              <h1 className="text-2xl font-extrabold">{lesson.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Objectives */}
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardContent className="p-5">
            <h2 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <span>🎯</span> أهداف الدرس
            </h2>
            <ul className="space-y-1">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span> {obj}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-5">
          {lesson.content.map((section, i) => {
            if (section.type === "text") {
              return (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{section.text}</p>
                  </CardContent>
                </Card>
              );
            }
            if (section.type === "list") {
              return (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items?.map((item, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-2 bg-gray-50 p-2 rounded">
                          <span className="text-gray-400 mt-0.5">📌</span> {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            }
            if (section.type === "fun") {
              return (
                <div key={i} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 font-medium">{section.title}</p>
                  <p className="text-sm text-amber-700 mt-1">{section.fun}</p>
                </div>
              );
            }
            if (section.type === "tip") {
              return (
                <div key={i} className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-800 font-bold">{section.title}</p>
                  <p className="text-sm text-emerald-700 mt-1 leading-relaxed">{section.tip}</p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Quick Quiz */}
        {lesson.quiz.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <span>📝</span> اختبر نفسك بسرعة
            </h2>
            <div className="space-y-4">
              {lesson.quiz.map((q, qi) => (
                <QuizCard key={qi} question={q.q} options={q.opts} correctIndex={q.correct} index={qi} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center">
          <Link href={`/grade/${lesson.grade}`}>
            <Button variant="outline">← العودة للصف</Button>
          </Link>
          <Button variant="gradient">الدرس التالي ←</Button>
        </div>
      </div>
    </div>
  );
}

function QuizCard({ question, options, correctIndex, index }: { question: string; options: string[]; correctIndex: number; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <Card className={`overflow-hidden transition-all ${answered ? (selected === correctIndex ? "ring-2 ring-green-400" : "ring-2 ring-red-400") : ""}`}>
      <CardContent className="p-4">
        <p className="font-bold text-gray-900 mb-3 text-sm">{index + 1}. {question}</p>
        <div className="space-y-2">
          {options.map((opt, oi) => {
            const isCorrect = oi === correctIndex;
            const isSelected = selected === oi;
            return (
              <button
                key={oi}
                onClick={() => !answered && setSelected(oi)}
                className={`w-full text-right p-2.5 rounded-lg border text-sm transition-all ${
                  answered
                    ? isCorrect
                      ? "bg-green-100 border-green-400 text-green-800 font-medium"
                      : isSelected
                        ? "bg-red-100 border-red-400 text-red-800"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                }`}
                disabled={answered}
              >
                {opt}
                {answered && isCorrect && " ✓"}
                {answered && isSelected && !isCorrect && " ✗"}
              </button>
            );
          })}
        </div>
        {answered && (
          <p className={`mt-2 text-xs font-medium ${selected === correctIndex ? "text-green-600" : "text-red-600"}`}>
            {selected === correctIndex ? "🎉 أحسنت! إجابة صحيحة" : `❌ الإجابة الصحيحة: ${options[correctIndex]}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
