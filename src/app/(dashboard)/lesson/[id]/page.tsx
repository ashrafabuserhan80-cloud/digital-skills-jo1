"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LESSONS_DB: Record<string, {
  title: string;
  grade: number;
  domain: string;
  unit: string;
  objectives: string[];
  content: { type: string; title?: string; text?: string; items?: string[]; question?: string; answer?: string; fun?: string; tip?: string }[];
  quiz: { q: string; opts: string[]; correct: number }[];
}> = {
  "7-0-0-0": {
    title: "تاريخ الحاسوب", grade: 7, domain: "أنظمة الحوسبة", unit: "مقدمة في الحاسوب",
    objectives: ["أن تعرف مراحل تطور الحاسوب", "أن تذكر أهم المخترعين في مجال الحاسوب", "أن تفهم الفرق بين الأجيال المختلفة للحواسيب"],
    content: [
      { type: "text", title: "الجيل الأول: الأجهزة الميكانيكية (1822 - 1945)", text: "بدأ تاريخ الحاسوب مع العالم تشارلز باباج الذي اخترع آلة التفاضل عام 1822. كانت هذه الآلة تُستخدم لحساب الجداول الرياضية. ثم جاءت آدا لوفلاس التي تعتبر أول مبرمجة في التاريخ، حيث كتبت خوارزميات لآلة بابージ التحليلية." },
      { type: "list", title: "أهم اختراعات هذا الجيل", items: ["آلة التفاضل - Charles Babbage (1822)", "الآلة التحليلية - مشروع باباج", "أول خوارزمية - آدا لوفلاس (1843)"] },
      { type: "text", title: "الجيل الثاني: الحواسيب الإلكترونية (1945 - 1960)", text: "ظهر أول حاسوب إلكتروني真正 tênه ENIAC عام 1946 في جامعة بنسلفانيا الأمريكية. كان حجمه بحجم غرفة كاملة ويستهلك طاقة كهربائية هائلة. استُخدم في حسابات المدفعية للجيش الأمريكي." },
      { type: "fun", title: "💡 هل تعلم؟", fun: "كان حاسوب ENIAC يزن 27 طن ويحتوي على 18,000 أنبوب مفرغ! اليوم معالج هاتفك أقوى منه بملايين المرات." },
      { type: "text", title: "الجيل الثالث: الدوائر المتكاملة (1960 - 1990)", text: "اكتشف العلماء إمكانية دمج آلاف الترانزستورات على رقاقة إلكترونية واحدة. هذا تسبب في تقليل حجم الحواسيب وزيادة سرعتها بشكل كبير." },
      { type: "text", title: "الجيل الرابع: الحواسيب الشخصية (1990 - حتى الآن)", text: "ظهرت الحواسيب الشخصية (PC) وأصبحت متاحة للجميع. شركات مثل Apple و IBM و Microsoft ساهمت في ربط الحاسوب بالإنترنت وجعله أداة يومية." },
      { type: "tip", title: "🎯 ملخص المراجعة", tip: "الأجيال الأربعة: 1- ميكانيكية 2- إلكترونية أنابيب 3- دوائر متكاملة 4- شخصية وإنترنت. المخترعون: باباج، لوفلاس، تورينج." },
    ],
    quiz: [
      { q: "من يعتبر أول مبرمجة في التاريخ؟", opts: ["تشارلز باباج", "آدا لوفلاس", "آلان تورينج", "بيل جيتس"], correct: 1 },
      { q: "متى أُنتج أول حاسوب إلكتروني؟", opts: ["1920", "1935", "1946", "1960"], correct: 2 },
      { q: "كم كان وزن حاسوب ENIAC؟", opts: ["5 طن", "15 طن", "27 طن", "50 طن"], correct: 2 },
      { q: "ما هو الجيل الذي ظهرت فيه الحواسيب الشخصية؟", opts: ["الجيل الأول", "الجيل الثاني", "الجيل الثالث", "الجيل الرابع"], correct: 3 },
    ],
  },
  "7-0-0-1": {
    title: "أنواع الحواسيب", grade: 7, domain: "أنظمة الحوسبة", unit: "مقدمة في الحاسوب",
    objectives: ["أن تصنف الحواسيب حسب الحجم والغرض", "أن تميز بين الحواسيب الكبرى والمتوسطة والشخصية", "أن تفهم الفرق بين الحواسيب المحمولة والمكتبية"],
    content: [
      { type: "text", title: "تصنيف الحواسيب حسب الحجم", text: "تُصنّف الحواسيب إلى عدة أنواع حسب حجمها وقدرتها الحسابية:" },
      { type: "list", title: "أنواع الحواسيب", items: ["الحاسوب الخارجي (Supercomputer) - أقوى حاسوب في العالم، يُستخدم في الأبحاث العلمية والطقس", "الحاسوب الرئيسي (Mainframe) - يُستخدم في البنوك والشركات الكبيرة", "الحاسوب الشخصي (PC) - الحاسوب الذي نستخدمه يومياً في البيت والمدرسة", "الحاسوب المحمول (Laptop) - حاسوب خفيف يمكن حمله وفتحه ككتاب", "الحاسوب اللوحي (Tablet) - أصغر من الحاسوب المحمول، باللمس فقط", "الهاتف الذكي (Smartphone) - أصغر أنواع الحواسيب وأكثرها استخداماً"] },
      { type: "text", title: "الحاسوب المكتبي مقابل المحمول", text: "الحاسوب المكتبي: سهل الترقي، أرخص سعراً، يحتاج مساحة ثابتة. الحاسوب المحمول: محمول وخفيف، يعمل بالبطارية، أغلى سعراً، صعب الترقي." },
      { type: "fun", title: "💡 هل تعلم؟", fun: "أقوى حاسوب في العالم حالياً هو Frontier في أمريكا، يمكنه performs 1.1 كوادريليون حساب في الثانية الواحدة!" },
      { type: "tip", title: "🎯 ملخص", tip: "الحواسيب: خارجي > رئيسي > شخصي > محمول > لوحي > هاتف. كل نوع有不同的 الاستخدامات والخصائص." },
    ],
    quiz: [
      { q: "أي الأجهزة التالية تعتبر حاسوباً؟", opts: ["الآلة الحاسبة", "الهاتف الذكي", "الطباعة", "الشاشة"], correct: 1 },
      { q: "أي نوع من الحواسيب هو الأقوى؟", opts: ["الحاسوب الشخصي", "الحاسوب الخارجي", "الحاسوب المحمول", "الحاسوب اللوحي"], correct: 1 },
      { q: "ما هو أحد عيوب الحاسوب المحمول مقارنة بالمكتبي؟", opts: ["أبطأ سرعة", "صعب الترقي", "أثقل وزناً", "لا يعمل بالبطارية"], correct: 1 },
    ],
  },
  "7-0-1-0": {
    title: "مكونات الحاسوب: العتاد (Hardware)", grade: 7, domain: "أنظمة الحوسبة", unit: "مكونات الحاسوب",
    objectives: ["أن تذكر المكونات المادية للحاسوب", "أن تفهم وظيفة كل مكون", "أن تميز بين أجهزة الإدخال والإخراج"],
    content: [
      { type: "text", title: "ما هو العتاد (Hardware)؟", text: "العتاد هو المكونات المادية الملموسة للحاسوب - أي شيء يمكنك رؤيته ولمسه. العتاد هو الجسم المادي الذي تعمل البرمجيات عليه." },
      { type: "list", title: "أجهزة الإدخال (Input Devices)", items: ["لوحة المفاتيح (Keyboard) - للكتابة والأمر", "الفأرة (Mouse) - للتنقل والنقر", "المايكروفون - للصوت", "الكاميرا - للصورة", "الماسح الضوئي (Scanner) - لจ صور ورقي رقماً"] },
      { type: "list", title: "أجهزة الإخراج (Output Devices)", items: ["الشاشة (Monitor) - لعرض الصور والنصوص", "الطابعة (Printer) - للطباعة على ورق", "السماعات (Speakers) - للصوت"] },
      { type: "list", title: "أجهزة المعالجة والتخزين", items: ["المعالج (CPU) - الدماغ الذي ينفذ الأوامر", "الذاكرة العشوائية (RAM) - تخزين مؤقت سريع للعمل الحالي", "القرص الصلب (HDD/SSD) - تخزين دائم للملفات", "كرت الشاشة (GPU) - لعرض الصور بسرعة"] },
      { type: "text", title: "كيف يعمل المعالج؟", text: "المعالج يُسمى 'دماغ الحاسوب'. يقوم بتنفيذ ملايين الأوامر في الثانية الواحدة من خلال ثلاث مراحل: 1- جلب Instruction 2- فك التشفير 3- التنفيذ والتنقيذ." },
      { type: "fun", title: "💡 هل تعلم؟", fun: "سرعة معالج Intel الحديثة تصل إلى 5GHz، أي أنها تنفذ 5 مليار عملية في الثانية الواحدة!" },
      { type: "tip", title: "🎯 ملخص", tip: "أجهزة الإدخال: للإدخال. أجهزة الإخراج: للإخراج. المعالج والذاكرة والقرص: للمعالجة والتخزين." },
    ],
    quiz: [
      { q: "أي من الأجهزة التالية هو جهاز إدخال؟", opts: ["الطابعة", "الشاشة", "الفأرة", "السماعات"], correct: 2 },
      { q: "ما هي وظيفة المعالج (CPU)؟", opts: ["تخزين الملفات", "عرض الصور", "تنفيذ الأوامر", "طباعة المستندات"], correct: 2 },
      { q: "أي من التالي هو جهاز تخزين مؤقت؟", opts: ["القرص الصلب", "الذاكرة العشوائية RAM", "الطابعة", "لوحة المفاتيح"], correct: 1 },
      { q: "الكمبيوتر الشخصي PC ينتمي إلى أي جيل من الحواسيب؟", opts: ["الجيل الأول", "الجيل الثاني", "الجيل الثالث", "الجيل الرابع"], correct: 3 },
    ],
  },
};

const GRADE_NAMES: Record<number, string> = { 7: "السابع", 8: "الثامن", 9: "التاسع", 10: "العاشر" };
const DOMAIN_ICONS: Record<string, string> = { "أنظمة الحوسبة": "💻", "الشبكات والإنترنت": "🔗", "تحليل البيانات": "📊", "الخوارzymيات والبرمجة": "⚙️" };

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
