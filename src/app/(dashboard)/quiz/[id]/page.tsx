"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type QuizQuestion = {
  q: string;
  type: "mc" | "tf";
  opts: string[];
  correct: number;
  explanation: string;
  points: number;
};

const QUIZZES: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  questions: QuizQuestion[];
}> = {
  "test": {
    title: "اختبار شامل - علوم الحاسوب",
    subtitle: "يغطي مكونات الحاسوب وأنواعه والعتاد والبرمجيات",
    icon: "📝",
    gradient: "from-blue-600 to-indigo-600",
    questions: [
      { q: "ما هو المكون الذي يُعتبر دماغ الحاسوب؟", type: "mc", opts: ["الذاكرة العشوائية (RAM)", "المعالج (CPU)", "القرص الصلب", "شاشة العرض"], correct: 1, explanation: "المعالج (CPU) هو المكون الذي ينفذ التعليمات ويعالج البيانات، ويُعتبر دماغ الحاسوب.", points: 10 },
      { q: "الحاسوب المحمول يعمل فقط عند التوصيل بالكهرباء.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "الحاسوب المحمول يعمل بالبطارية ولا يحتاج دائماً للتوصيل بالكهرباء.", points: 10 },
      { q: "أي مما يلي يُعتبر من البرمجيات؟", type: "mc", opts: ["لوحة المفاتيح", "المعالج", "نظام التشغيل Windows", "الشاشة"], correct: 2, explanation: "نظام التشغيل Windows هو برنامج (برمجيات) وليس جهازاً مادياً (عتاد).", points: 10 },
      { q: "الذاكرة العشوائية (RAM) تخزين البيانات بشكل دائم.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "الذاكرة العشوائية (RAM) تخزين مؤقت وتفقد البيانات عند إيقاف الحاسوب.", points: 10 },
      { q: "ما هو أصغر حاسوب نستخدمه في حياتنا اليومية؟", type: "mc", opts: ["الحاسوب المكتبي", "الحاسوب المحمول", "الهاتف الذكي", "الخادم"], correct: 2, explanation: "الهاتف الذكي هو أصغر أجهزة الحاسوب التي نستخدمها يومياً.", points: 10 },
      { q: "ما هو الجهاز الذي يُستخدم لتحويل الصور الورقية إلى ملفات رقمية؟", type: "mc", opts: ["الطابعة", "الماسح الضوئي", "الشاشة", "الفأرة"], correct: 1, explanation: "الماسح الضوئي (Scanner) يحوّل الصور والمستندات الورقية إلى صور رقمية.", points: 10 },
      { q: "نظام التشغيل هو من البرمجيات.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "نظام التشغيل هو برنامج رئيسي يدير موارد الحاسوب ويوفر واجهة للمستخدم.", points: 10 },
      { q: "ما هي وظيفة الذاكرة العشوائية RAM؟", type: "mc", opts: ["تخزين الملفات بشكل دائم", "تخزين مؤقت للبيانات أثناء العمل", "عرض الصور على الشاشة", "طباعة المستندات"], correct: 1, explanation: "RAM للتخزين المؤقت السريع وتفقد محتواها عند إيقاف الجهاز.", points: 10 },
    ],
  },
  "grade-7-final": {
    title: "الاختبار النهائي - الصف السابع",
    subtitle: "يغطي أنظمة الحوسبة والشبكات وتحليل البيانات وأثر الحوسبة",
    icon: "🎓",
    gradient: "from-emerald-600 to-teal-600",
    questions: [
      { q: "من هو مخترع آلة التفاضل؟", type: "mc", opts: ["آدا لوفلاس", "تشارلز باباج", "آلان تورينج", "بيل جيتس"], correct: 1, explanation: "تشارلز باباج اخترع آلة التفاضل عام 1822.", points: 15 },
      { q: "ENIAC كان أول حاسوب إلكتروني حقيقي في العالم.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "ENIAC كان أول حاسوب إلكتروني حقيقي أُنتج عام 1946.", points: 10 },
      { q: "أي من التالي يُعتبر من أجهزة الإدخال؟", type: "mc", opts: ["الشاشة", "الطابعة", "الفأرة", "السماعات"], correct: 2, explanation: "الفأرة هي جهاز إدخال نستخدمه للتنقل والنقر.", points: 10 },
      { q: "ما هو البروتوكول الذي يجعل الاتصال آمناً عبر الإنترنت؟", type: "mc", opts: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1, explanation: "HTTPS هو البروتوكول الآمن الذي يشفّر البيانات بين الخادم والمتصفح.", points: 10 },
      { q: "الإنترنت هو شبكة خاصة بشركة واحدة.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "الإنترنت هو شبكة عالمية عامة تربط ملايين الشبكات معاً.", points: 10 },
      { q: "ما هو استخدام الشبكة المحلية (LAN)؟", type: "mc", opts: ["تربط أجهزة في مبنى واحد أو منطقة قريبة", "تربط دول مختلفة", "تتطلب إنترنت عالمي", "تربط حاسوباً واحداً فقط"], correct: 0, explanation: "LAN تربط أجهزة في نطاق جغرافي صغير مثل مبنى أو مدرسة.", points: 10 },
      { q: "جمع البيانات وتنظيمها يُعتبر من مجال تحليل البيانات.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "تحليل البيانات يشمل جمع البيانات وتنظيمها وعرضها في رسوم بيانية.", points: 10 },
      { q: "أي من التالي يُعتبر سلوكاً مسؤولاً على الإنترنت؟", type: "mc", opts: ["نشر أخبار كاذبة", "احترام خصوصية الآخرين", "المشاركة في التنمر الإلكتروني", "مشاركة كلمات المرور"], correct: 1, explanation: "الأخلاقيات الرقمية تتطلب احترام خصوصية الآخرين وعدم مشاركة معلوماتهم الشخصية.", points: 10 },
      { q: "ما هي وظيفة المعالج (CPU) في الحاسوب؟", type: "mc", opts: ["تخزين الملفات", "عرض الصور على الشاشة", "تنفيذ الأوامر ومعالجة البيانات", "طباعة المستندات"], correct: 2, explanation: "المعالج هو دماغ الحاسوب الذي ينفذ جميع التعليمات والعمليات الحسابية.", points: 10 },
      { q: "الذاكرة العشوائية (RAM) تحفظ البيانات بشكل دائم.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "RAM للتخزين المؤقت فقط وتفقد محتواها عند إيقاف الجهاز.", points: 10 },
      { q: "أي من هذه الأجهزة يُستخدم لتحويل الورقي إلى رقمي؟", type: "mc", opts: ["الطابعة", "الماسح الضوئي", "السماعات", "لوحة المفاتيح"], correct: 1, explanation: "الماسح الضوئي (Scanner) يحوّل الصور والمستندات الورقية إلى ملفات رقمية.", points: 10 },
      { q: "نظام التشغيل Windows هو من أنواع البرمجيات.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "نظام التشغيل هو برنامج أساسي يدير موارد الحاسوب ويوفر واجهة للمستخدم.", points: 10 },
    ],
  },
  "grade-8-final": {
    title: "الاختبار النهائي - الصف الثامن",
    subtitle: "يغطي الخوارزميات والبرمجة وإنترنت الأشياء والذكاء الاصطناعي والشبكات",
    icon: "🎓",
    gradient: "from-blue-600 to-indigo-600",
    questions: [
      { q: "ما هي الخوارزمية؟", type: "mc", opts: ["نوع من الحواسيب", "خطوات منطقية لحل مشكلة", "لغة برمجة", "جهاز إدخال"], correct: 1, explanation: "الخوارزمية هي مجموعة خطوات منظمة ومنتظمة لحل مشكلة أو إنجاز مهمة.", points: 10 },
      { q: "في جملة if/else، إذا لم يتحقق الشرط يُنفذ بلوك else.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "في جملة if/else، إذا لم يتحقق الشرط يُنفذ بلوك else.", points: 10 },
      { q: "أي من التالي يُعتبر من أجهزة الاستشعار المستخدمة في IoT؟", type: "mc", opts: ["لوحة المفاتيح", "مستشعر الحرارة", "الطابعة", "الشاشة"], correct: 1, explanation: "أجهزة الاستشعار مثل مستشعرات الحرارة والرطوبة والضوء تُستخدم لجمع بيانات بيئية.", points: 10 },
      { q: "الذكاء الاصطناعي هو البرمجة التقليدية فقط.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "الذكاء الاصطناعي يختلف عن البرمجة التقليدية لأنه يتعلم من البيانات ويتوقع بدلاً من تنفيذ أوامر محددة مسبقاً.", points: 10 },
      { q: "في حلقة for، كم مرة ستُكرر الجملة إذا كان العدد = 3؟", type: "mc", opts: ["2 مرة", "3 مرات", "4 مرات", "لا تُكرر"], correct: 1, explanation: "حلقة for تبدأ من 0 وتصل إلى العدد - 1، لذلك العدد 3 تعني 3 تكرارات (0، 1، 2).", points: 10 },
      { q: "ما هو البروتوكول المستخدم لإرسال البريد الإلكتروني؟", type: "mc", opts: ["HTTP", "FTP", "SMTP", "DNS"], correct: 2, explanation: "SMTP هو البروتوكول المستخدم لإرسال البريد الإلكتروني.", points: 10 },
      { q: "HTML هي لغة ترميز وليست لغة برمجة.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "HTML هي لغة ترميز (Markup Language) تُستخدم لبناء هيكل صفحات الويب.", points: 10 },
      { q: "أي من التالي هو عنوان IP من الإصدار الرابع؟", type: "mc", opts: ["192.168.1.1", "2001:0db8::1", "MAC-Address-00", "HTTP://google.com"], correct: 0, explanation: "عنوان IPv4 يتكوّن من 4 أرقام مفصولة بنقطة، مثل 192.168.1.1.", points: 10 },
      { q: "المساعدات الصوتية مثل Siri و Alexa هي من تطبيقات الذكاء الاصطناعي.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "المساعدات الصوتية تستخدم معالجة اللغة الطبيعية وهي فرع من الذكاء الاصطناعي.", points: 10 },
      { q: "في HTML، ما هو العنصر المستخدم لإنشاء فقرة نصية؟", type: "mc", opts: ["<div>", "<p>", "<span>", "<h1>"], correct: 1, explanation: "العنصر <p> يُستخدم لإنشاء فقرة نصية في صفحات الويب.", points: 10 },
      { q: "ما الفرق بين الشبكة المحلية (LAN) والشبكة الواسعة (WAN)؟", type: "mc", opts: ["LAN أكبر من WAN", "WAN أصغر من LAN", "LAN لمنطقة صغيرة وWAN لمناطق كبيرة", "لا يوجد فرق"], correct: 2, explanation: "LAN تربط أجهزة في منطقة صغيرة (مبنى أو مدرسة)، وWAN تربط مناطق جغرافية واسعة.", points: 10 },
      { q: "في بايثون، لطباعة نص على الشاشة نستخدم:", type: "mc", opts: ["echo()", "print()", "display()", "show()"], correct: 1, explanation: "دالة print() تُستخدم في بايثون لعرض النصوص والقيم على الشاشة.", points: 10 },
    ],
  },
  "grade-9-final": {
    title: "الاختبار النهائي - الصف التاسع",
    subtitle: "يغطي Python وتحليل البيانات وأمن المعلومات والمسؤولية الرقمية",
    icon: "🎓",
    gradient: "from-purple-600 to-violet-600",
    questions: [
      { q: "في Python، أي من الأنواع التالية هو نص (string)؟", type: "mc", opts: ["42", "3.14", "\"مرحباً\"", "True"], correct: 2, explanation: "النصوص في Python تُكتب بين علامتي تنصيص مزدوجتين أو مفردة.", points: 10 },
      { q: "القواميس (Dictionaries) في Python تستخدم أزواج مفتاح-قيمة.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "القواميس تخزن البيانات في أزواج مفتاح-قيمة مثل {\"الاسم\": \"أحمد\"}.", points: 10 },
      { q: "في SQL، أي أمر يُستخدم لاسترجاع البيانات من جدول؟", type: "mc", opts: ["INSERT", "SELECT", "UPDATE", "DELETE"], correct: 1, explanation: "أمر SELECT يُستخدم لاستعلام وجلب البيانات من قاعدة البيانات.", points: 10 },
      { q: "ما هو الاختراق الإلكتروني (Phishing)؟", type: "mc", opts: ["برنامج حماية", "محاولة خداع المستخدم للحصول على بياناته", "نوع فيروس", "أداة برمجة"], correct: 1, explanation: "Phishing هو تقنية خداعية يستخدمها المخترقون للحصول على كلمات المرور والبيانات الحساسة.", points: 10 },
      { q: "في Python، لكتابة شرط نستخدم الكلمة المفتاحية if.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "كلمة if تُستخدم لكتابة الشرط في بايثون.", points: 10 },
      { q: "كلمات المرور الطويلة والمعقدة أكثر أماناً من القصيرة.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "كلمات المرور الطويلة التي تحتوي على أحرف وأرقام ورموز أصعب في الكسر.", points: 10 },
      { q: "في SQL، لأضف سجل جديد في جدول نستخدم:", type: "mc", opts: ["SELECT", "INSERT INTO", "UPDATE", "CREATE"], correct: 1, explanation: "أمر INSERT INTO يُستخدم لإدخال سجلات جديدة في الجداول.", points: 10 },
      { q: "التنمر الإلكتروني يحدث فقط بين الأصدقاء المقربين.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "التنمر الإلكتروني قد يحدث بين أي أشخاص عبر الإنترنت ويشمل التهديد والتشهير.", points: 10 },
      { q: "في Python، ما هي المكتبة المستخدمة لإنشاء رسوم بيانية؟", type: "mc", opts: ["Mathplotlib", "Matplotlib", "GraphLib", "PlotTool"], correct: 1, explanation: "Matplotlib هي المكتبة الأكثر شيوعاً لإنشاء الرسوم البيانية في بايثون.", points: 10 },
      { q: "التشفير (Encryption) يُستخدم لـ:", type: "mc", opts: ["حذف البيانات", "حماية البيانات بتحويلها لشكل غير مقروء", "تسريع الإنترنت", "تحسين أداء الحاسوب"], correct: 1, explanation: "التشفير يحوّل البيانات إلى شكل غير مقروء يمكن فك تشفيره فقط بالمفتاح الصحيح.", points: 10 },
      { q: "المعلومات المضللة يمكن التحقق منها عبر:", type: "mc", opts: ["قبولها كما هي", "البحث عن مصادر موثوقة أخرى", "مشاركتها مباشرة", "عدم الاهتمام"], correct: 1, explanation: "يجب دائماً التحقق من الأخبار عبر مصادر موثوقة قبل مشاركتها.", points: 10 },
      { q: "في Python، القوائم (Lists) تُستخدم لـ:", type: "mc", opts: ["تخزين قيمة واحدة فقط", "تخزين مجموعة من القيم في متغير واحد", "إجراء حسابات رياضية فقط", "عرض النصوص"], correct: 1, explanation: "القوائم والمصفوفات تُستخدم لتخزين مجموعة من القيم في مكان واحد.", points: 10 },
    ],
  },
  "grade-10-final": {
    title: "الاختبار النهائي - الصف العاشر",
    subtitle: "يغطي Python المتقدم وتطوير الويب ومشاريع تطبيقية وأمن المعلومات",
    icon: "🎓",
    gradient: "from-orange-600 to-red-600",
    questions: [
      { q: "في البرمجة الكائنية، ما هي الكلاس (Class)؟", type: "mc", opts: ["نوع من البيانات", "قالب لإنشاء كائنات", "دالة خاصة", "متغير"], correct: 1, explanation: "الكلاس هو قالب (Blueprint) يُستخدم لإنشاء كائنات具有 خصائص ودوال محددة.", points: 10 },
      { q: "في CSS، لخصص لون الخلفية نستخدم الخاصية background-color.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "background-color تُستخدم لتحديد لون خلفية العنصر.", points: 10 },
      { q: "في Python، بلوك try/except يُستخدم لـ:", type: "mc", opts: ["تحسين الأداء", "معالجة الأخطاء والاستثناءات", "إنشاء حلقات", "تعريف المتغيرات"], correct: 1, explanation: "بلوك try/except يالتقط الأخطاء ويمنع توقف البرنامج.", points: 10 },
      { q: "لغة JavaScript تُستخدم في المتصفح والخوادم أيضاً.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "JavaScript تُستخدم في المتصفح (Frontend) وعلى الخوادم (Node.js) أيضاً.", points: 10 },
      { q: "في Python، ما الفرق بين القائمة والمصفوفة الثابتة؟", type: "mc", opts: ["لا يوجد فرق", "القائمة قابلة للتعديل والمصفوفة الثابتة لا", "المصفوفة أكبر حجماً", "القائمة للنصوص فقط"], correct: 1, explanation: "القوائم [] قابلة للتعديل والمصفوفات الثابتة () لا يمكن تغييرها بعد الإنشاء.", points: 10 },
      { q: "في HTML، العنصر المستخدم لإنشاء جدول هو:", type: "mc", opts: ["<table>", "<grid>", "<tab>", "<data>"], correct: 0, explanation: "العنصر <table> يُستخدم لإنشاء الجداول مع <tr> للصفوف و <td> للخلايا.", points: 10 },
      { q: "الأخطاء الاستثنائية في Python تُتخطى تلقائياً إذا لم يتم التقاطها.", type: "tf", opts: ["صحيح", "خطأ"], correct: 1, explanation: "إذا لم يتم التقاط الخطأ في بلوك except، سيتوقف البرنامج مع رسالة خطأ.", points: 10 },
      { q: "في CSS، لإنشاء تأثير انتقالي سلس نستخدم:", type: "mc", opts: ["animation", "transition", "transform", "effect"], correct: 1, explanation: "خاصة transition تُستخدم لإنشاء تأثيرات انتقالية سلسة بين الحالات.", points: 10 },
      { q: "ما هو الغرض من جدار الحماية (Firewall)؟", type: "mc", opts: ["تسريع الاتصال", "حماية الشبكة من الوصول غير المصرح به", "تحسين أداء الحاسوب", "تنزيل البرامج"], correct: 1, explanation: "جدار الحماية يراقب حركة المرور ويمنع الوصول غير المصرح به إلى الشبكة.", points: 10 },
      { q: "في Python، مكتبة turtle تُستخدم لـ:", type: "mc", opts: ["قاعدة بيانات", "رسم رسومات بسيطة", "تحليل بيانات", "إنشاء مواقع"], correct: 1, explanation: "مكتبة turtle تُستخدم لتعليم أساسيات البرمجة من خلال الرسم البياني.", points: 10 },
      { q: "النسخ الاحتياطي يُعد خطوة مهمة في حماية البيانات.", type: "tf", opts: ["صحيح", "خطأ"], correct: 0, explanation: "النسخ الاحتياطي يحمي البيانات من الفقد في حالات الأعطال أو الفيروسات.", points: 10 },
      { q: "في CSS، لإنشاء تصميم متجاوب (Responsive) نستخدم:", type: "mc", opts: ["قيم ثابتة فقط", "Media Queries", "JavaScript فقط", "الnetscape"], correct: 1, explanation: "Media Queries تُستخدم لتطبيق أنماط CSS مختلفة حسب حجم الشاشة.", points: 10 },
    ],
  },
};

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    params.then(p => {
      setQuizId(p.id);
      const quiz = QUIZZES[p.id];
      if (quiz) {
        setTimeLeft(quiz.questions.length * 60);
        setAnswers(new Array(quiz.questions.length).fill(null));
      }
    });
  }, [params]);

  const quiz = quizId !== null ? QUIZZES[quizId] : null;
  const totalPoints = quiz ? quiz.questions.reduce<number>((a, b) => a + b.points, 0) : 0;
  const earnedPoints = quiz ? answers.reduce<number>((acc, ans, i) => acc + (ans === quiz.questions[i].correct ? quiz.questions[i].points : 0), 0) : 0;
  const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const question = quiz ? quiz.questions[currentQ] : null;

  const handleAnswer = (index: number) => {
    if (submitted || !question) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResult(true);
  };

  const handleNext = () => {
    if (quiz && currentQ < quiz.questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  useEffect(() => {
    if (!started || showResult || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, showResult, timeLeft]);

  if (quizId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">جاري تحميل الاختبار...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <span className="text-5xl block mb-4">📝</span>
            <h1 className="text-xl font-bold mb-2">اختبار غير متوفر</h1>
            <p className="text-gray-500 text-sm mb-4">هذا الاختبار غير موجود حالياً.</p>
            <div className="space-y-2">
              <Link href="/quiz/test"><Button className="w-full">اختبار شامل</Button></Link>
              <Link href="/quiz/grade-7-final"><Button variant="secondary" className="w-full">اختبار الصف السابع</Button></Link>
              <Link href="/quiz/grade-8-final"><Button variant="secondary" className="w-full">اختبار الصف الثامن</Button></Link>
              <Link href="/quiz/grade-9-final"><Button variant="secondary" className="w-full">اختبار الصف التاسع</Button></Link>
              <Link href="/quiz/grade-10-final"><Button variant="secondary" className="w-full">اختبار الصف العاشر</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-lg w-full overflow-hidden">
          <div className={`bg-gradient-to-r ${quiz.gradient} text-white p-6 text-center`}>
            <span className="text-5xl block mb-3">{quiz.icon}</span>
            <h1 className="text-2xl font-extrabold">{quiz.title}</h1>
            <p className="text-white/80 text-sm mt-1">{quiz.subtitle}</p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-900">{quiz.questions.length}</p>
                <p className="text-xs text-gray-500">سؤال</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
                <p className="text-xs text-gray-500">نقطة</p>
              </div>
            </div>
            <div className="space-y-2 mb-6 text-sm text-gray-600">
              <p>⏱ الوقت المقدر: {quiz.questions.length} دقيقة</p>
              <p>✅ درجة النجاح: 60%</p>
              <p>📊 يمكنك مراجعة إجاباتك قبل التسليم</p>
            </div>
            <Button onClick={() => setStarted(true)} variant="gradient" className="w-full" size="lg">
              ابدأ الاختبار الآن
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const passed = scorePercent >= 60;
    const grade = scorePercent >= 90 ? "ممتاز" : scorePercent >= 80 ? "جيد جداً" : scorePercent >= 70 ? "جيد" : scorePercent >= 60 ? "مقبول" : "راسب";
    const gradeColor = scorePercent >= 80 ? "text-green-600" : scorePercent >= 60 ? "text-blue-600" : "text-red-600";

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden mb-6">
            <div className={`p-6 text-center ${passed ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-orange-500"} text-white`}>
              <span className="text-5xl block mb-2">{passed ? "🎉" : "😢"}</span>
              <h1 className="text-2xl font-extrabold">{passed ? "أحسنت! لقد نجحت" : "حاول مرة أخرى"}</h1>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className={`text-3xl font-extrabold ${gradeColor}`}>{scorePercent}%</p>
                  <p className="text-xs text-gray-500">النتيجة</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-3xl font-extrabold text-gray-900">{grade}</p>
                  <p className="text-xs text-gray-500">التقدير</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-3xl font-extrabold text-gray-900">{earnedPoints}/{totalPoints}</p>
                  <p className="text-xs text-gray-500">النقاط</p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-3">مراجعة الإجابات:</h3>
              <div className="space-y-3">
                {quiz.questions.map((q, i) => {
                  const userAns = answers[i];
                  const isCorrect = userAns === q.correct;
                  return (
                    <div key={i} className={`p-3 rounded-lg border ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{isCorrect ? "✅" : "❌"}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{q.q}</p>
                          {!isCorrect && (
                            <p className="text-xs text-gray-500 mt-1">
                              إجابتك: {userAns !== null ? q.opts[userAns] : "لم تُجب"} ← الصحيحة: {q.opts[q.correct]}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{q.explanation}</p>
                        </div>
                        <Badge variant={isCorrect ? "default" : "destructive"} className="text-xs">
                          {isCorrect ? `+${q.points}` : "0"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-3">
                <Link href={`/grade/7`} className="flex-1"><Button variant="outline" className="w-full">العودة للصف</Button></Link>
                <Link href="/quiz/test" className="flex-1"><Button className="w-full">اختبار آخر</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-500">السؤال غير موجود</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-gray-900 text-sm">{quiz!.title}</h1>
          <div className="flex items-center gap-4">
            <div className={`text-sm font-mono font-bold ${timeLeft < 60 ? "text-red-600" : "text-gray-700"}`}>
              ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <Badge variant="secondary">{currentQ + 1} / {quiz.questions.length}</Badge>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-5 border-b">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={question.type === "tf" ? "secondary" : "default"} className="text-xs">
                {question.type === "tf" ? "صحيح / خطأ" : "اختيار متعدد"}
              </Badge>
              <Badge variant="outline" className="text-xs">{question.points} نقطة</Badge>
            </div>
            <h2 className="text-lg font-bold text-gray-900">{currentQ + 1}. {question.q}</h2>
          </div>
          <CardContent className="p-5">
            <div className="space-y-3">
              {question.opts.map((opt, oi) => {
                const isSelected = answers[currentQ] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(oi)}
                    className={`w-full text-right p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-800"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs ${isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"}`}>
                        {isSelected ? "✓" : String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" onClick={handlePrev} disabled={currentQ === 0}>→ السابق</Button>

          <div className="flex gap-2">
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentQ ? "bg-blue-500 scale-125" :
                  answers[i] !== null ? "bg-green-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {currentQ < quiz.questions.length - 1 ? (
            <Button onClick={handleNext}>التالي ←</Button>
          ) : (
            <Button variant="gradient" onClick={handleSubmit} disabled={answers.some(a => a === null)}>
              تسليم الاختبار
            </Button>
          )}
        </div>

        {answers.some(a => a === null) && currentQ === quiz.questions.length - 1 && (
          <p className="text-center text-sm text-amber-600 mt-3">⚠️ لديك أسئلة لم تُجب عليها بعد</p>
        )}
      </div>
    </div>
  );
}
