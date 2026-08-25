import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DOMAINS, GRADES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8e] to-[#1a4a7a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px'}}></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20">
                المنهاج الأردني الجديد 2025/2026
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
                تعلّم المهارات الرقمية
                <span className="block text-[#f0c040] mt-1">بطرق حديثة وممتعة</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-6 max-w-lg">
                منصة تعليمية تفاعلية مبنية وفق منهاج المهارات الرقمية الأردني الجديد.
                تغطي 8 مجالات رئيسية من الصف السابع إلى العاشر الأساسي.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-1.5 text-sm text-blue-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> دروس تفاعلية
                </div>
                <div className="flex items-center gap-1.5 text-sm text-blue-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> اختبارات فورية
                </div>
                <div className="flex items-center gap-1.5 text-sm text-blue-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> يعمل بدون إنترنت
                </div>
                <div className="flex items-center gap-1.5 text-sm text-blue-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> مساعد ذكي
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold text-base px-8">
                    ابدأ التعلم مجاناً
                  </Button>
                </Link>
                <Link href="/grade/7">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    استعرض الصفوف ←
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0c040]/20 to-[#40a0f0]/20 rounded-3xl rotate-6"></div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-3">💻</div>
                    <p className="text-lg font-bold">8 مجالات</p>
                    <p className="text-sm text-blue-200">تعليمية شاملة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-[#2d5a8e]">4</p>
              <p className="text-sm text-gray-500">صفوف دراسية</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#2d5a8e]">8</p>
              <p className="text-sm text-gray-500">مجالات رئيسية</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#2d5a8e]">120+</p>
              <p className="text-sm text-gray-500">درس تفاعلي</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#2d5a8e]">50+</p>
              <p className="text-sm text-gray-500">اختبار تقييمي</p>
            </div>
          </div>
        </div>
      </section>

      {/* GRADES */}
      <section id="grades" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">اختر صفك الدراسي</h2>
            <p className="text-gray-500 mt-2">محتوى مخصص لكل صف وفقاً للمنهاج الأردني الجديد</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { num: 7, emoji: "🌱", color: "from-emerald-500 to-teal-500", desc: "أساسيات الحاسوب والشبكات والبيانات", stage: "إعدادية" },
              { num: 8, emoji: "🌿", color: "from-blue-500 to-indigo-500", desc: "البرمجة الأساسية وإنترنت الأشياء والذكاء الاصطناعي", stage: "إعدادية" },
              { num: 9, emoji: "🌳", color: "from-purple-500 to-violet-500", desc: "Python وتحليل البيانات وأمن المعلومات", stage: "إعدادية" },
              { num: 10, emoji: "🎓", color: "from-orange-500 to-red-500", desc: "مشاريع تطبيقية وتطوير ويب متقدم", stage: "إعدادية" },
            ].map((g) => (
              <Link key={g.num} href={`/grade/${g.num}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${g.color}`}></div>
                  <CardContent className="p-5">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{g.emoji}</div>
                    <h3 className="font-extrabold text-lg text-gray-900 mb-1">الصف {g.num} الأساسي</h3>
                    <p className="text-xs text-gray-400 mb-2">مرحلة {g.stage}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{g.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8 DOMAINS */}
      <section id="domains" className="py-16 px-4 bg-[#f8fafc]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">الثمانية مجالات التعليمية</h2>
            <p className="text-gray-500 mt-2">مجالات متكاملة لبناء مهاراتك الرقمية</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOMAINS.map((domain) => (
              <Card key={domain.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${domain.color}`}></div>
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">{domain.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{domain.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{domain.nameEn}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{domain.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">كيف تعمل المنصة؟</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "اختر صفك", desc: "سجّل حسابك واختر الصف الدراسي المناسب لك", color: "bg-blue-100 text-blue-600" },
              { step: "2", title: "تعلم الدروس", desc: "اقرأ الدروس التفاعلية وشاهد الفيديوهات وحل التمارين", color: "bg-purple-100 text-purple-600" },
              { step: "3", title: "اجتز الاختبارات", desc: "اختبر معلوماتك واحصل على شارات ونقاط", color: "bg-green-100 text-green-600" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl font-extrabold mx-auto mb-4`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE CONTENT PREVIEW */}
      <section className="py-16 px-4 bg-[#f8fafc]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">نصية من المحتوى</h2>
            <p className="text-gray-500 mt-2">جرّب الآن - درس مجاني من مجال أنظمة الحوسبة</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs">الصف السابع</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs">أنظمة الحوسبة</span>
                </div>
                <h3 className="text-xl font-bold">مكونات الحاسوب الأساسية</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border-r-4 border-blue-500">
                    <h4 className="font-bold text-blue-800 mb-1">العتاد (Hardware)</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      المكونات المادية الملموسة التي يمكن رؤيتها ولمسها: المعالج (CPU)، الذاكرة العشوائية (RAM)، القرص الصلب، الشاشة، لوحة المفاتيح والفأرة.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border-r-4 border-purple-500">
                    <h4 className="font-bold text-purple-800 mb-1">البرمجيات (Software)</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      البرامج التي توجه عمل الحاسوب: نظام التشغيل (Windows)، البرامج التطبيقية (Word، Chrome).
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 هل تعلم؟</strong> أول حاسوب إلكتروني كان بحجم غرفة كاملة وسُمي ENIAC عام 1946!
                    </p>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <Link href="/lesson/demo-1">
                    <Button variant="gradient">جرّب الدرس الكامل مجاناً</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">عن المنصة</h2>
            <p className="text-gray-500 mt-2">معرفة أكثر عن مهاراتنا الرقمية</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">ما هي مهاراتنا الرقمية؟</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  منصة تعليمية عربية مجانية مبنية وفقاً لمنهاج المهارات الرقمية الأردني الجديد для المرحلة الإعدادية (الصفوف 7-10).
                  تهدف لتعليم الطلاب المهارات الرقمية الأساسية من خلال محتوى تفاعلي وممتع.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">لماذا هذه المنصة؟</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  لأن التعليم الرقمي حق للجميع. نقدم محتوى تعليمي عالي الجودة مجاناً بالكامل، يعمل بدون إنترنت،
                  ويتبع المنهج الأردني الرسمي مع إضافة مساعد ذكي يساعد الطلاب على التعلم.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">👨‍🏫</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">للمعلمون والمعلمات</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  لوحة تحكم مخصصة للمعلمين لمتابعة تقدم الطلاب، عرض الدرجات، وإدارة المحتوى التعليمي.
                  يمكنك إنشاء اختبارات مخصصة ومتابعة أداء كل طالب بشكل فردي.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">يعمل على كل الأجهزة</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  تصميم متجاوب يعمل بشكل مثالي على الحاسوب والهاتف واللوحي. مع دعم كامل للغة العربية
                  واتجاه الكتابة من اليمين لليسار (RTL).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">تواصل معنا</h2>
          <p className="text-gray-500 mb-8">لديك سؤال أو اقتراح؟ نحن سعداء بالتواصل معك</p>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <div className="text-4xl mb-2">✉️</div>
              <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
              <a href="mailto:aabuserhan80@gmail.com" className="text-white/90 hover:text-white text-lg underline underline-offset-4" dir="ltr">
                aabuserhan80@gmail.com
              </a>
            </div>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  <div className="text-2xl mb-1">💡</div>
                  <p className="text-sm font-medium text-gray-900">اقتراحات</p>
                  <p className="text-xs text-gray-500">شاركنا أفكارك لتحسين المنصة</p>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-1">🐛</div>
                  <p className="text-sm font-medium text-gray-900">الإبلاغ عن خلل</p>
                  <p className="text-xs text-gray-500">أبلغنا عن أي مشكلة تقنية</p>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-1">🤝</div>
                  <p className="text-sm font-medium text-gray-900">الشراكات</p>
                  <p className="text-xs text-gray-500">نرحب بالتعاون مع المدارس</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">جاهز تبدأ رحلتك التعليمية؟</h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            تواصل معنا عبر البريد الإلكتروني للتسجيل في المنصة
          </p>
          <a href="mailto:aabuserhan80@gmail.com?subject=طلب تسجيل في منصة مهاراتنا الرقمية" className="text-white/90 hover:text-white underline underline-offset-4 text-lg" dir="ltr">
            aabuserhan80@gmail.com
          </a>
          <div className="mt-6">
            <Link href="/register">
              <Button size="lg" className="bg-[#f0c040] text-[#1e3a5f] hover:bg-[#e0b030] font-bold px-10">
                طلب انضمام
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
