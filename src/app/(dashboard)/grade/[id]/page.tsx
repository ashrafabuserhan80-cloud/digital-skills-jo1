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
    description: "في هذا الصف وفق المنهاج الأردني للمهارات الرقمية ستتعلم كيف تُصلح الأعطال، وتتعرف إلى كيفية صيانة أعطال الحاسوب المادية والبرمجية، فتتمكن من تشخيص المشكلات الشائعة وعلاجها بأسلوب منهجي سليم.",
    highlights: ["إصلاح الأعطال", "صيانة الأعطال المادية", "صيانة الأعطال البرمجية"],
    domains: [
      {
        name: "أنظمة الحوسبة", nameEn: "الوحدة الأولى: أنظمة الحوسبة", icon: "💻", color: "blue",
        units: [
          { title: "إصلاح الأعطال", lessons: ["إصلاح الأعطال"] },
          { title: "صيانة الأعطال المادية", lessons: ["صيانة الأعطال المادية"] },
          { title: "صيانة الأعطال البرمجية", lessons: ["صيانة الأعطال البرمجية"] },
        ]
      },
    ],
  },
  9: {
    title: "الصف التاسع الأساسي",
    subtitle: "المرحلة الإعدادية",
    heroEmoji: "🌳",
    heroGradient: "from-purple-600 to-violet-600",
    description: "في هذا الصف وفق المنهاج الأردني للمهارات الرقمية ستتعرف إلى وسائل التكنولوجيا الحديثة وأثرها، والتعلم الإلكتروني، والجريمة والتنمر الإلكتروني والإعلام الرقمي، ثم خطوتك الأولى في البرمجة باستخدام برمجية سكراتش.",
    highlights: ["أثر الحوسبة", "التعلم الإلكتروني", "الجرائم الإلكترونية", "برمجة سكراتش"],
    domains: [
      {
        name: "أثر الحوسبة", nameEn: "الوحدة الأولى: أثر الحوسبة", icon: "🌐", color: "purple",
        units: [
          { title: "وسائل التكنولوجيا الحديثة", lessons: ["وسائل التكنولوجيا الحديثة"] },
          { title: "التعلم الإلكتروني: الأدوات والمنصات", lessons: ["التعلم الإلكتروني: الأدوات والمنصات"] },
          { title: "الجريمة الإلكترونية", lessons: ["الجريمة الإلكترونية"] },
          { title: "التنمر الإلكتروني", lessons: ["التنمر الإلكتروني"] },
          { title: "الإعلام الرقمي", lessons: ["الإعلام الرقمي"] },
        ]
      },
      {
        name: "الخوارزميات والبرمجة", nameEn: "الوحدة الثانية: الخوارزميات والبرمجة", icon: "⚙️", color: "red",
        units: [
          { title: "المتغيرات البرمجية في برمجية سكراتش", lessons: ["المتغيرات البرمجية في برمجية سكراتش"] },
          { title: "الجمل الشرطية المركبة", lessons: ["الجمل الشرطية المركبة"] },
        ]
      },
    ],
  },
  10: {
    title: "الصف العاشر الأساسي",
    subtitle: "المرحلة الإعدادية",
    heroEmoji: "🎓",
    heroGradient: "from-orange-600 to-red-600",
    description: "في هذا الصف وفق المنهاج الأردني للمهارات الرقمية ستتعرف إلى أنواع البيانات وطرائق تنظيمها والتمثيل المرئي للبيانات وتحليلها، ثم تنطلق في بناء صفحات الويب باستخدام لغة HTML من البداية حتى الجداول والوسائط المتعددة.",
    highlights: ["أنواع البيانات وتنظيمها", "التمثيل المرئي للبيانات", "إنشاء المواقع الالكترونية", "لغة HTML"],
    domains: [
      {
        name: "تحليل البيانات", nameEn: "الوحدة الأولى: تحليل البيانات", icon: "📊", color: "orange",
        units: [
          { title: "أنواع البيانات وطرائق تنظيمها", lessons: ["أنواع البيانات وطرائق تنظيمها"] },
          { title: "التمثيل المرئي للبيانات", lessons: ["التمثيل المرئي للبيانات"] },
          { title: "تحليل البيانات", lessons: ["تحليل البيانات"] },
        ]
      },
      {
        name: "الخوارزميات والبرمجة", nameEn: "الوحدة الثانية: الخوارزميات والبرمجة", icon: "⚙️", color: "red",
        units: [
          { title: "مقدمة إلى المواقع الالكترونية", lessons: ["مقدمة إلى المواقع الالكترونية"] },
          { title: "إنشاء الصفحات الالكترونية", lessons: ["إنشاء الصفحات الالكترونية"] },
          { title: "تنسيق النصوص", lessons: ["تنسيق النصوص"] },
          { title: "التعليقات والقوائم في HTML", lessons: ["التعليقات والقوائم في HTML"] },
          { title: "الصور في HTML", lessons: ["الصور في HTML"] },
          { title: "الوسائط المتعددة والارتباطات التشعبية في HTML", lessons: ["الوسائط المتعددة والارتباطات التشعبية في HTML"] },
          { title: "الجداول في HTML", lessons: ["الجداول في HTML"] },
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
