import { type Domain } from "@/types";

export const DOMAINS: Domain[] = [
  {
    id: "computing-systems",
    name: "أنظمة الحوسبة",
    nameEn: "Computing Systems",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    description: "مكونات الحاسوب وأنظمة التشغيل والبرمجيات",
  },
  {
    id: "computing-impact",
    name: "أثر الحوسبة",
    nameEn: "Impacts of Computing",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    description: "التأثير الاجتماعي والأخلاقي للتكنولوجيا",
  },
  {
    id: "networks-internet",
    name: "الشبكات والإنترنت",
    nameEn: "Networks and the Internet",
    icon: "🔗",
    color: "from-green-500 to-emerald-500",
    description: "بنية الشبكات وبروتوكولات الإنترنت",
  },
  {
    id: "data-analysis",
    name: "تحليل البيانات",
    nameEn: "Data Analysis",
    icon: "📊",
    color: "from-orange-500 to-amber-500",
    description: "جمع البيانات وتحليلها وعرضها",
  },
  {
    id: "algorithms-programming",
    name: "الخوارزميات والبرمجة",
    nameEn: "Algorithms and Programming",
    icon: "⚙️",
    color: "from-red-500 to-rose-500",
    description: "التفكير الحاسوبي ولغة Python",
  },
  {
    id: "iot",
    name: "إنترنت الأشياء",
    nameEn: "Internet of Things",
    icon: "📡",
    color: "from-teal-500 to-cyan-500",
    description: "أجهزة الاستشعار والمنزل الذكي",
  },
  {
    id: "ai",
    name: "الذكاء الاصطناعي",
    nameEn: "Artificial Intelligence",
    icon: "🤖",
    color: "from-violet-500 to-purple-500",
    description: "التعلم الآلي والتطبيقات الذكية",
  },
  {
    id: "cybersecurity",
    name: "أمن المعلومات",
    nameEn: "Cybersecurity",
    icon: "🔒",
    color: "from-indigo-500 to-blue-500",
    description: "الخصوصية والتشفير والحماية من التهديدات",
  },
];

export const GRADES = [
  { id: "grade-7", number: 7, name: "الصف السابع الأساسي" },
  { id: "grade-8", number: 8, name: "الصف الثامن الأساسي" },
  { id: "grade-9", number: 9, name: "الصف التاسع الأساسي" },
  { id: "grade-10", number: 10, name: "الصف العاشر الأساسي" },
];

export const DOMAIN_UNITS: Record<
  string,
  Record<number, { title: string; description: string }[]>
> = {
  "أنظمة الحوسبة": {
    7: [
      { title: "مقدمة في الحاسوب", description: "تاريخ الحاسوب وأنواعه" },
      { title: "مكونات الحاسوب", description: "العتاد والبرمجيات" },
      { title: "أنظمة التشغيل", description: "أنواع أنظمة التشغيل واستخداماتها" },
      { title: "وحدة المعالجة والذاكرة", description: "CPU والذاكرة ودورها في الحاسوب" },
    ],
    8: [
      { title: "أنظمة التشغيل المتقدمة", description: "إدارة الملفات والبرامج" },
      { title: "البرمجيات والتطبيقات", description: "أنواع البرمجيات واستخداماتها" },
    ],
  },
  "الشبكات والإنترنت": {
    7: [
      { title: "مقدمة في الشبكات", description: "أنواع الشبكات والمفاهيم الأساسية" },
      { title: "شبكة المنطقة المحلية", description: "LAN والشبكات المنزلية" },
      { title: "بروتوكولات الإنترنت", description: "HTTP وDNS وغيرها" },
    ],
    8: [
      { title: "خدمات الإنترنت", description: "البريد والبحث والتوافيق" },
      { title: "مقدمة في تطوير الويب", description: "HTML وCSS الأساسية" },
    ],
    9: [
      { title: "أمن الشبكات", description: "الحماية والخصوصية على الإنترنت" },
      { title: "الشبكات اللاسلكية", description: "WiFi والشبكات المتنقلة" },
    ],
  },
  "تحليل البيانات": {
    7: [
      { title: "مقدمة في البيانات", description: "جمع البيانات وتنظيمها" },
      { title: "الرسوم البيانية", description: "عرض البيانات بصرياً" },
    ],
    8: [
      { title: "المعدلات والنسب", description: "حسابverages والنسب المئوية" },
      { title: "اتخاذ القرارات بالبيانات", description: "تحليل البيانات لاتخاذ قرارات" },
    ],
    9: [
      { title: "قواعد البيانات", description: "مقدمة في قواعد البيانات" },
      { title: "تحليل البيانات المتقدم", description: "استخراج الأنماط والاتجاهات" },
    ],
    10: [
      { title: "تصور البيانات", description: "الرسوم البيانية المتقدمة" },
      { title: "مشاريع تحليل بيانات", description: "تطبيق عملي على بيانات حقيقية" },
    ],
  },
  "الخوارزميات والبرمجة": {
    8: [
      { title: "مقدمة في الخوارزميات", description: "什么是算法 وكتابة الخوارزميات" },
      { title: "المخططات الانسيابية", description: "رسم المخططات لحل المشكلات" },
      { title: "أساسيات البرمجة", description: "المتغيرات والشروط والحلقات" },
    ],
    9: [
      { title: "برمجة Python للمبتدئين", description: "أساسيات لغة Python" },
      { title: "الدوال والمصفوفات", description: "تنظيم الكود وإعادة الاستخدام" },
    ],
    10: [
      { title: "Python المتقدم", description: "الكائنات والبرمجة الكائنية" },
      { title: "بناء صفحات الويب", description: "HTML وCSS وJavaScript" },
      { title: "مشاريع تطبيقية", description: "تطبيق مشاريع حقيقية" },
    ],
  },
  "إنترنت الأشياء": {
    8: [
      { title: "مقدمة في IoT", description: "什么是物联网" },
      { title: "أجهزة الاستشعار", description: "أنواع الاستشعار واستخداماتها" },
    ],
    9: [
      { title: "المنازل الذكية", description: "أتمتة المنزل بالتقنية" },
      { title: "المدن الذكية", description: "تقنية في خدمة المجتمع" },
    ],
    10: [
      { title: "مشاريع IoT", description: "بناء مشاريع IoT بسيطة" },
    ],
  },
  "الذكاء الاصطناعي": {
    8: [
      { title: "مقدمة في الذكاء الاصطناعي", description: "什么是AI" },
      { title: "تطبيقات AI في حياتنا", description: "استخدامات اليومية للذكاء الاصطناعي" },
    ],
    9: [
      { title: "التعلم الآلي", description: "كيف يتعلم الآلة" },
      { title: "معالجة اللغة الطبيعية", description: "تفاعل الآلة مع اللغة البشرية" },
    ],
    10: [
      { title: "مشاريع AI", description: "تطبيق عملي للذكاء الاصطناعي" },
    ],
  },
  "أمن المعلومات": {
    9: [
      { title: "مقدمة في الأمن السيبراني", description: "什么是信息安全" },
      { title: "الخصوصية على الإنترنت", description: "حماية البيانات الشخصية" },
    ],
    10: [
      { title: "التشفير وحماية البيانات", description: "أساليب الحماية" },
      { title: "التهديدات الإلكترونية", description: "الفيروسات والهجمات الإلكترونية" },
    ],
  },
  "أثر الحوسبة": {
    7: [
      { title: "التأثير الاجتماعي للتكنولوجيا", description: "كيف تغير التكنولوجيا حياتنا" },
      { title: "المسؤولية الرقمية", description: "الأخلاقيات على الإنترنت" },
    ],
    9: [
      { title: "التنمر الإلكتروني", description: "طرق الوقاية والمواجهة" },
      { title: "صحافة المعلومات", description: "التحقق من صحة المعلومات" },
    ],
  },
};
