"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  grade: number;
  type: "lesson" | "unit" | "final";
  lessonId: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
  attempts: number;
  status: "active" | "inactive";
}

const gradeLabels: Record<number, string> = { 7: "الصف السابع", 8: "الصف الثامن", 9: "الصف التاسع", 10: "الصف العاشر" };
const typeLabels: Record<string, string> = { lesson: "اختبار درس", unit: "اختبار وحدة", final: "اختبار نهائي" };

const defaultQuizzes: Quiz[] = [
  { id: "q1", title: "اختبار تاريخ الحاسوب", grade: 7, type: "lesson", lessonId: "7-0-0-0", questions: [
    { question: "في أي عام تم اختراع أول حاسوب إلكتروني؟", options: ["1940", "1946", "1950", "1960"], correct: 1, explanation: "تم اختراع ENIAC عام 1946" },
    { question: "من يُعتبر أبا الحاسوب؟", options: ["ألان تورنغ", "تشارلز باباج", "جون فون نيومان", "بيل غيتس"], correct: 1, explanation: "تشارلز باباج يُعتبر أبا الحاسوب" },
    { question: "ما هي أول لغة برمجة في التاريخ؟", options: ["Python", "C", "Fortran", "Assembly"], correct: 2, explanation: "Fortran كانت أول لغة برمجة عالية المستوى" },
  ], timeLimit: 10, passingScore: 60, attempts: 450, status: "active" },
  { id: "q2", title: "اختبار أنواع الحواسيب", grade: 7, type: "lesson", lessonId: "7-0-0-1", questions: [
    { question: "أي من التالي ليس من أنواع الحواسيب؟", options: ["الحاسوب المكتبي", "الحاسوب المحمول", "الحاسوب الأوتوموتيقي", "الحاسوب اللوحي"], correct: 2, explanation: "الحاسوب الأوتوموتيقي ليس نوعاً معروفاً" },
    { question: "ما هو الحاسوب الذي يُستخدم في مراكز البيانات؟", options: ["PC", "Workstation", "Supercomputer", "Tablet"], correct: 2, explanation: "Supercomputer تُستخدم في مراكز البيانات الكبرى" },
  ], timeLimit: 10, passingScore: 60, attempts: 380, status: "active" },
  { id: "q3", title: "اختبار مكونات الحاسوب", grade: 7, type: "lesson", lessonId: "7-0-1-0", questions: [
    { question: "أي من التالي من مكونات العتاد؟", options: ["نظام التشغيل", "المعالج", "برنامج Word", "الإنترنت"], correct: 1, explanation: "المعالج مكون مادي (عتاد)" },
    { question: "ما هي وظيفة الذاكرة العشوائية RAM؟", options: ["تخزين البيانات permanently", "تخزين البيانات مؤقتاً أثناء التشغيل", "معالجة البيانات", "عرض البيانات"], correct: 1, explanation: "RAM تخزين البيانات مؤقتاً أثناء التشغيل" },
    { question: "أي من التالي من البرمجيات؟", options: ["لوحة المفاتيح", "الشاشة", "نظام التشغيل", "ال🎑 القرص الصلب"], correct: 2, explanation: "نظام التشغيل من البرمجيات" },
  ], timeLimit: 15, passingScore: 60, attempts: 520, status: "active" },
  { id: "q4", title: "الاختبار النهائي - الصف السابع", grade: 7, type: "final", lessonId: "grade-7-final", questions: [
    { question: "أي من التالي ليس من مكونات العتاد؟", options: ["المعالج", "الذاكرة", "نظام التشغيل", "القرص الصلب"], correct: 2, explanation: "نظام التشغيل من البرمجيات وليس العتاد" },
    { question: "في أي عصر عاش تشارلز باباج؟", options: ["العصر الحديث", "العصر القديم", "العصر الصناعي", "عصر النهضة"], correct: 2, explanation: "عاش تشارلز باباج في العصر الصناعي" },
    { question: "ما هوargest حاسوب فائق السرعة؟", options: ["Desktop", "Laptop", "Supercomputer", "Tablet"], correct: 2, explanation: "Supercomputer هو الأكبر والأسرع" },
    { question: "أي لغة برمجة هي الأكثر استخداماً في التعليم؟", options: ["C++", "Java", "Python", "PHP"], correct: 2, explanation: "Python الأكثر شيوعاً في التعليم" },
    { question: "ما هو интернет الأشياء؟", options: ["شبكة اجتماعية", "نظام تشغيل", "شبكة أجهزة متصلة", "برنامج"], correct: 2, explanation: "IoT هو نظام أجهزة متصلة بالإنترنت" },
  ], timeLimit: 20, passingScore: 70, attempts: 320, status: "active" },
  { id: "q5", title: "اختبار مقدمة البرمجة", grade: 8, type: "lesson", lessonId: "8-0-0-0", questions: [
    { question: "ما هي البرمجة؟", options: ["كتابة نصوص", "كتابة تعليمات للحاسوب", "رسم صور", "تشغيل الألعاب"], correct: 1, explanation: "البرمجة هي كتابة تعليمات للحاسوب" },
    { question: "أي من التالي لغة برمجة؟", options: ["HTML", "Photoshop", "Word", "Excel"], correct: 0, explanation: "HTML لغة برمجة وصفية" },
  ], timeLimit: 10, passingScore: 60, attempts: 210, status: "active" },
];

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filterGrade, setFilterGrade] = useState<number | "all">("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [showQuestions, setShowQuestions] = useState<Quiz | null>(null);
  const [form, setForm] = useState<{ title: string; grade: number; type: string; lessonId: string; timeLimit: number; passingScore: number }>({ title: "", grade: 7, type: "lesson", lessonId: "", timeLimit: 10, passingScore: 60 });
  const [qForm, setQForm] = useState({ question: "", options: ["", "", "", ""], correct: 0, explanation: "" });
  const [addingQuestion, setAddingQuestion] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_quizzes");
    if (stored) { setQuizzes(JSON.parse(stored)); }
    else { setQuizzes(defaultQuizzes); localStorage.setItem("admin_quizzes", JSON.stringify(defaultQuizzes)); }
  }, []);

  const save = (u: Quiz[]) => { setQuizzes(u); localStorage.setItem("admin_quizzes", JSON.stringify(u)); };
  const filtered = quizzes.filter((q) => (filterGrade === "all" || q.grade === filterGrade) && (filterType === "all" || q.type === filterType));

  const handleAdd = () => { setEditQuiz(null); setForm({ title: "", grade: 7, type: "lesson", lessonId: "", timeLimit: 10, passingScore: 60 }); setShowModal(true); };
  const handleEdit = (q: Quiz) => { setEditQuiz(q); setForm({ title: q.title, grade: q.grade, type: q.type, lessonId: q.lessonId, timeLimit: q.timeLimit, passingScore: q.passingScore }); setShowModal(true); };
  const handleSave = () => {
    if (!form.title) return;
    const data = { ...form, type: form.type as Quiz["type"] };
    if (editQuiz) { save(quizzes.map((q) => q.id === editQuiz.id ? { ...q, ...data } : q)); }
    else { save([...quizzes, { id: "q" + Date.now(), ...data, questions: [], attempts: 0, status: "active" as const }]); }
    setShowModal(false);
  };
  const handleDelete = (id: string) => { save(quizzes.filter((q) => q.id !== id)); };

  const addQuestion = () => {
    if (!showQuestions || !qForm.question) return;
    const newQ = { ...qForm, options: qForm.options.filter(Boolean) };
    const updated = quizzes.map((q) => q.id === showQuestions.id ? { ...q, questions: [...q.questions, newQ] } : q);
    save(updated);
    setShowQuestions(updated.find((q) => q.id === showQuestions.id) || null);
    setQForm({ question: "", options: ["", "", "", ""], correct: 0, explanation: "" });
    setAddingQuestion(false);
  };

  const removeQuestion = (qId: string, qIndex: number) => {
    const quiz = quizzes.find((q) => q.id === qId);
    if (!quiz) return;
    const updated = quizzes.map((q) => q.id === qId ? { ...q, questions: q.questions.filter((_, i) => i !== qIndex) } : q);
    save(updated);
    setShowQuestions(updated.find((q) => q.id === qId) || null);
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
                <h1 className="text-2xl font-extrabold">📝 إدارة الاختبارات</h1>
              </div>
              <p className="text-white/70 text-sm">إنشاء وإدارة اختبارات الصفوف والمجالات</p>
            </div>
            <Button onClick={handleAdd} className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold text-sm">+ إضافة اختبار</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "إجمالي الاختبارات", value: quizzes.length, icon: "📝", color: "from-blue-500 to-blue-600" },
            { label: "إجمالي الأسئلة", value: quizzes.reduce((a, b) => a + b.questions.length, 0), icon: "❓", color: "from-purple-500 to-purple-600" },
            { label: "إجمالي المحاولات", value: quizzes.reduce((a, b) => a + b.attempts, 0).toLocaleString(), icon: "🎯", color: "from-green-500 to-green-600" },
            { label: "الاختبارات النشطة", value: quizzes.filter((q) => q.status === "active").length, icon: "✅", color: "from-amber-500 to-amber-600" },
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

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setFilterGrade("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterGrade === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border"}`}>الكل</button>
          {[7, 8, 9, 10].map((g) => (
            <button key={g} onClick={() => setFilterGrade(g)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterGrade === g ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border"}`}>{gradeLabels[g]}</button>
          ))}
          <span className="border-l mx-2"></span>
          {["all", "lesson", "unit", "final"].map((t) => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === t ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border"}`}>
              {t === "all" ? "كل الأنواع" : typeLabels[t]}
            </button>
          ))}
        </div>

        {/* Quizzes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((q) => (
            <Card key={q.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-2 ${q.type === "final" ? "bg-gradient-to-r from-red-500 to-orange-500" : q.type === "unit" ? "bg-gradient-to-r from-purple-500 to-violet-500" : "bg-gradient-to-r from-blue-500 to-cyan-500"}`}></div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`text-xs ${q.type === "final" ? "bg-red-100 text-red-700" : q.type === "unit" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                    {typeLabels[q.type]}
                  </Badge>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(q)} className="p-1 rounded hover:bg-blue-50 text-blue-600 text-sm">✏️</button>
                    <button onClick={() => handleDelete(q.id)} className="p-1 rounded hover:bg-red-50 text-red-600 text-sm">🗑️</button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{q.title}</h3>
                <div className="space-y-1.5 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between"><span>📚 الصف:</span><span className="font-medium">{gradeLabels[q.grade]}</span></div>
                  <div className="flex justify-between"><span>❓ عدد الأسئلة:</span><span className="font-bold text-blue-600">{q.questions.length}</span></div>
                  <div className="flex justify-between"><span>⏱️ المدة:</span><span>{q.timeLimit} دقيقة</span></div>
                  <div className="flex justify-between"><span>🎯 النجاح:</span><span>{q.passingScore}%</span></div>
                  <div className="flex justify-between"><span>🔄 المحاولات:</span><span className="font-medium">{q.attempts}</span></div>
                </div>
                <Button onClick={() => setShowQuestions(q)} variant="outline" size="sm" className="w-full text-sm">
                  📋 عرض الأسئلة ({q.questions.length})
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Quiz Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{editQuiz ? "✏️ تعديل الاختبار" : "➕ إضافة اختبار جديد"}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الاختبار *</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الصف</label>
                      <select value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value={7}>7</option><option value={8}>8</option><option value={9}>9</option><option value={10}>10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "lesson" | "unit" | "final" })} className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="lesson">اختبار درس</option><option value="unit">اختبار وحدة</option><option value="final">اختبار نهائي</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">المدة (دقيقة)</label>
                      <input type="number" value={form.timeLimit} onChange={(e) => setForm({ ...form, timeLimit: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">نسبة النجاح %</label>
                      <input type="number" value={form.passingScore} onChange={(e) => setForm({ ...form, passingScore: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">معرف الدرس</label>
                      <input type="text" value={form.lessonId} onChange={(e) => setForm({ ...form, lessonId: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" dir="ltr" placeholder="7-0-0-0" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{editQuiz ? "حفظ" : "إضافة"}</Button>
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">إلغاء</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Questions Modal */}
        {showQuestions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">📋 أسئلة: {showQuestions.title}</h3>
                  <button onClick={() => setShowQuestions(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

                {showQuestions.questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">📭</div>
                    لا توجد أسئلة بعد
                  </div>
                ) : (
                  <div className="space-y-3 mb-4">
                    {showQuestions.questions.map((q, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-blue-600">س{i + 1}</span>
                          <button onClick={() => removeQuestion(showQuestions.id, i)} className="text-red-400 hover:text-red-600 text-sm">🗑️</button>
                        </div>
                        <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                        <div className="grid grid-cols-2 gap-1.5 mb-2">
                          {q.options.map((opt, j) => (
                            <div key={j} className={`text-sm px-2 py-1 rounded ${j === q.correct ? "bg-green-100 text-green-700 font-medium" : "bg-white text-gray-600"}`}>
                              {j === q.correct ? "✅" : "•"} {opt}
                            </div>
                          ))}
                        </div>
                        {q.explanation && <p className="text-xs text-gray-500 bg-blue-50 rounded p-2">💡 {q.explanation}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {addingQuestion ? (
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 space-y-3">
                    <h4 className="font-bold text-sm text-blue-800">➕ إضافة سؤال جديد</h4>
                    <input type="text" value={qForm.question} onChange={(e) => setQForm({ ...qForm, question: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="نص السؤال" />
                    {qForm.options.map((opt, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input type="radio" name="correct" checked={qForm.correct === i} onChange={() => setQForm({ ...qForm, correct: i })} className="w-4 h-4" />
                        <input type="text" value={opt} onChange={(e) => { const opts = [...qForm.options]; opts[i] = e.target.value; setQForm({ ...qForm, options: opts }); }} className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder={`الخيار ${i + 1}`} />
                      </div>
                    ))}
                    <input type="text" value={qForm.explanation} onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="التفسير (اختياري)" />
                    <div className="flex gap-2">
                      <Button onClick={addQuestion} size="sm" className="bg-green-600 hover:bg-green-700 text-white">حفظ السؤال</Button>
                      <Button onClick={() => setAddingQuestion(false)} size="sm" variant="outline">إلغاء</Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => setAddingQuestion(true)} variant="outline" className="w-full">+ إضافة سؤال</Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
