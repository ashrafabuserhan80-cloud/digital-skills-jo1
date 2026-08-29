import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getGradeName, getDomainIcon } from "@/lib/utils";

const GRADE_DATA: Record<number, {
  title: string;
  subtitle: string;
  heroEmoji: string;
  heroGradient: string;
  description: string;
  highlights: string[];
  domains: {
    name: string;
    nameEn: string;
    icon: string;
    color: string;
    units: { title: string; lessons: string[] }[];
  }[];
}> = {
  7: {
    title: "الصف السابع الأساسي",
    subtitle: "المرحلة الإعدادية",
    heroEmoji: "🌱",
    heroGradient: "from-emerald-600 to-teal-600",
    description: "في هذا الصف ستتعرف على أساسيات عالم الحاسوب وفق المنهاج الأردني للمهارات الرقمية، فتفهم جهاز الحاسوب ومكوناته المادية والبرمجية وأنظمة التشغيل، ثم تنتقل إلى عالم شبكات الحاسوب ومكوناتها وأنواعها.",
    highlights: ["جهاز الحاسوب", "مكونات الحاسوب المادية والبرمجية", "أنظمة التشغيل", "شبكات الحاسوب"],
    domains: [
      {
        name: "أنظمة الحوسبة", nameEn: "الوحدة الأولى: أنظمة الحوسبة", icon: "💻", color: "blue",
        units: [
          { title: "جهاز الحاسوب", lessons: ["جهاز الحاسوب"] },
          { title: "مكونات الحاسوب المادية", lessons: ["مكونات الحاسوب المادية"] },
          { title: "مكونات الحاسوب البرمجية", lessons: ["مكونات الحاسوب البرمجية"] },
          { title: "أنظمة التشغيل", lessons: ["أنظمة التشغيل"] },
          { title: "تفاعل الإنسان مع أجهزة الحاسوب", lessons: ["تفاعل الإنسان مع أجهزة الحاسوب"] },
        ]
      },
      {
        name: "شبكات الحاسوب", nameEn: "الوحدة الثانية: شبكات الحاسوب", icon: "🔗", color: "green",
        units: [
          { title: "مقدمة إلى شبكات الحاسوب", lessons: ["مقدمة إلى شبكات الحاسوب"] },
          { title: "مكونات شبكات الحاسوب", lessons: ["مكونات شبكات الحاسوب"] },
          { title: "نماذج الربط في الشبكات السلكية", lessons: ["نماذج الربط في الشبكات السلكية"] },
          { title: "أنواع شبكات الحاسوب", lessons: ["أنواع شبكات الحاسوب"] },
        ]
      },
    ],
  },
  8: {
    title: "الصف الثامن الأساسي",
    subtitle: "المرحلة الإعدادية",
    heroEmoji: "🌿",
    heroGradient: "from-blue-600 to-indigo-600",
    description: "في هذا الصف ستدخل عالم البرمجة لاول مرة، وستتعلم أساسيات الخوارزميات وستكتشف عالم إنترنت الأشياء والذكاء الاصطناعي.",
    highlights: ["أول خطوة في البرمجة", "خوارزميات بسيطة", "مقدمة في IoT", "أساسيات الذكاء الاصطناعي"],
    domains: [
      {
        name: "الخوارzymيات والبرمجة", nameEn: "Algorithms & Programming", icon: "⚙️", color: "red",
        units: [
          { title: "مقدمة في الخوارزميات", lessons: ["ما هي الخوارزميات؟", "كتابة خوارزميات بسيطة", "المخططات الانسيابية"] },
          { title: "أساسيات البرمجة", lessons: ["المتغيرات", "الشروط If/Else", "الحلقات Loop"] },
          { title: "البرمجة العملية", lessons: ["كتابة أول برنامج", " Bearbeiten حسابات بسيطة", "لعبة بسيطة"] },
        ]
      },
      {
        name: "إنترنت الأشياء", nameEn: "Internet of Things", icon: "📡", color: "teal",
        units: [
          { title: "مقدمة في IoT", lessons: ["ما هو IoT؟", "أجهزة الاستشعار", "كيف يعمل IoT؟"] },
          { title: "تطبيقات IoT", lessons: ["المنزل الذكي", "الأجهزة القابلة للارتداء", "IoT في الزراعة"] },
        ]
      },
      {
        name: "الذكاء الاصطناعي", nameEn: "Artificial Intelligence", icon: "🤖", color: "violet",
        units: [
          { title: "مقدمة في الذكاء الاصطناعي", lessons: ["ما هو الذكاء الاصطناعي؟", "الفرق بين AI والبرمجة العادية", "تاريخ AI"] },
          { title: "تطبيقات AI", lessons: ["المساعدات الصوتية", "السيارات ذاتية القيادة", "AI في الطب"] },
        ]
      },
      {
        name: "الشبكات والإنترنت", nameEn: "Networks & Internet", icon: "🔗", color: "green",
        units: [
          { title: "تطوير الويب", lessons: ["مقدمة في HTML", "العناصر والسمات", "إنشاء صفحة أولى"] },
        ]
      },
    ],
  },
  9: {
    title: "الصف التاسع الأساسي",
    subtitle: "المرحلة الإعدادية",
    heroEmoji: "🌳",
    heroGradient: "from-purple-600 to-violet-600",
    description: "في هذا الصف ستتعلم لغة Python الحقيقية، وستعمّق معرفتك بتحليل البيانات وأمن المعلومات والمسؤولية الرقمية.",
    highlights: ["برمجة Python", "تحليل البيانات المتقدم", "أساسيات أمن المعلومات", "صحافة المعلومات"],
    domains: [
      {
        name: "الخوارzymيات والبرمجة", nameEn: "Algorithms & Programming", icon: "⚙️", color: "red",
        units: [
          { title: "Python للمبتدئين", lessons: ["تثبيت Python", "المتغيرات والأنواع", "الإدخال والإخراج"] },
          { title: "الدوال والمصفوفات", lessons: ["تعريف الدوال", "المصفوفات", "القواميس"] },
          { title: "برمجة متقدمة", lessons: ["الكائنات(OOP)", "معالجة الملفات", "مكتبة Turtle"] },
        ]
      },
      {
        name: "تحليل البيانات", nameEn: "Data Analysis", icon: "📊", color: "orange",
        units: [
          { title: "قواعد البيانات", lessons: ["مقدمة في قواعد البيانات", "SQL الأساسي", "استعلامات SELECT"] },
          { title: "تحليل البيانات المتقدم", lessons: ["المعدلات والنسب", "الاتجاهات", "اتخاذ قرارات بالبيانات"] },
        ]
      },
      {
        name: "أمن المعلومات", nameEn: "Cybersecurity", icon: "🔒", color: "indigo",
        units: [
          { title: "مقدمة في الأمن السيبراني", lessons: ["التهديدات الإلكترونية", "الفيروسات والبرمجيات الخبيثة", "phishing"] },
          { title: "الخصوصية", lessons: ["حماية البيانات الشخصية", "كلمات المرور الآمنة", "إعدادات الخصوصية"] },
        ]
      },
      {
        name: "أثر الحوسبة", nameEn: "Impacts of Computing", icon: "🌐", color: "purple",
        units: [
          { title: "التنمر الإلكتروني", lessons: ["ما هو التنمر الإلكتروني؟", "طرق الوقاية", "التعامل معه"] },
          { title: "صحافة المعلومات", lessons: ["المعلومات المضللة", "التحقق من المصادر", "التفكير النقدي"] },
        ]
      },
    ],
  },
  10: {
    title: "الصف العاشر الأساسي",
    subtitle: "المرحلة الإعدادية",
    heroEmoji: "🎓",
    heroGradient: "from-orange-600 to-red-600",
    description: "في هذا الصف ستكمل مساراتك في البرمجة والبيانات، وستبني مشاريع تطبيقية حقيقية وتتعلم تطوير صفحات الويب.",
    highlights: ["Python المتقدم", "تطوير الويب HTML/CSS", "مشاريع تطبيقية", "تحليل البيانات العملي"],
    domains: [
      {
        name: "الخوارzymيات والبرمجة", nameEn: "Algorithms & Programming", icon: "⚙️", color: "red",
        units: [
          { title: "Python المتقدم", lessons: ["البرمجة الكائنية(OOP)", "الأخطاء والاستثناءات", "المكتبات الخارجية"] },
          { title: "بناء صفحات الويب", lessons: ["HTML المتقدم", "CSS و التنسيق", "JavaScript الأساسي"] },
          { title: "مشاريع تطبيقية", lessons: ["مشروع حاسبة", "لعبة نصية", "موقع شخصي"] },
        ]
      },
      {
        name: "تحليل البيانات", nameEn: "Data Analysis", icon: "📊", color: "orange",
        units: [
          { title: "تصور البيانات", lessons: ["Matplotlib في Python", "الرسوم البيانية المتقدمة", "تحليل بيانات حقيقية"] },
          { title: "مشاريع بيانات", lessons: ["تحليل بيانات طقس", "إحصائيات/renderer", "عرض النتائج"] },
        ]
      },
      {
        name: "إنترنت الأشياء", nameEn: "IoT", icon: "📡", color: "teal",
        units: [
          { title: "مشاريع IoT", lessons: ["Arduino Basics", "مستشعرات بسيطة", "منزل ذكي صغير"] },
        ]
      },
      {
        name: "أمن المعلومات", nameEn: "Cybersecurity", icon: "🔒", color: "indigo",
        units: [
          { title: "التشفير", lessons: ["أساسيات التشفير", "Caesar Cipher", " Trialتشفير وفك التشفير"] },
          { title: "الحماية", lessons: ["حماية الشبكات", " جدار الحماية Firewall", "النسخ الاحتياطي"] },
        ]
      },
    ],
  },
};

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const BORDER_COLOR: Record<string, string> = {
  blue: "border-l-blue-500",
  green: "border-l-green-500",
  purple: "border-l-purple-500",
  orange: "border-l-orange-500",
  red: "border-l-red-500",
  teal: "border-l-teal-500",
  violet: "border-l-violet-500",
  indigo: "border-l-indigo-500",
};

export default async function GradePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gradeNumber = parseInt(id);
  const data = GRADE_DATA[gradeNumber];
  if (!data) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${data.heroGradient} text-white py-14 px-4`}>
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">الرئيسية</Link>
            <span className="text-white/40">/</span>
            <span>{data.title}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-6xl">{data.heroEmoji}</span>
            <div>
              <h1 className="text-3xl font-extrabold">{data.title}</h1>
              <p className="text-white/70 mt-1">{data.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Description */}
        <div className="max-w-3xl mb-10">
          <p className="text-gray-700 text-lg leading-relaxed mb-5">{data.description}</p>
          <div className="flex flex-wrap gap-2">
            {data.highlights.map((h, i) => (
              <Badge key={i} variant="secondary" className="text-sm">{h}</Badge>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="space-y-10">
          {data.domains.map((domain, di) => (
            <div key={di}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{domain.icon}</span>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">{domain.name}</h2>
                  <p className="text-xs text-gray-400">{domain.nameEn}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {domain.units.map((unit, ui) => (
                  <Card key={ui} className="hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className={`w-1 h-full min-h-[60px] rounded-full bg-${domain.color}-500 flex-shrink-0`} style={{background: domain.color === 'blue' ? '#3b82f6' : domain.color === 'green' ? '#22c55e' : domain.color === 'purple' ? '#a855f7' : domain.color === 'orange' ? '#f97316' : domain.color === 'red' ? '#ef4444' : domain.color === 'teal' ? '#14b8a6' : domain.color === 'violet' ? '#8b5cf6' : '#6366f1'}}></div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">الوحدة {ui + 1}: {unit.title}</h3>
                          <div className="space-y-1.5">
                            {unit.lessons.map((lesson, li) => (
                              <Link key={li} href={`/lesson/${gradeNumber}-${di}-${ui}-${li}`}>
                                <div className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-sm text-gray-600 hover:text-gray-900">
                                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">{li + 1}</span>
                                  {lesson}
                                  <span className="mr-auto text-gray-300">←</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quiz CTA */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-8 text-center">
              <span className="text-4xl block mb-3">📝</span>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">اختبر معلوماتك</h3>
              <p className="text-gray-500 mb-5"> اختبار شامل يغطي جميع مجالات الصف {gradeNumber}</p>
              <Link href={`/quiz/grade-${gradeNumber}-final`}>
                <Button variant="gradient" size="lg">ابدأ الاختبار النهائي</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
