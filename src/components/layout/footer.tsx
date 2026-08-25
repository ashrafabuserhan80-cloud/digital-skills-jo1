import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                مهاراتنا الرقمية
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              منصة تعليمية شاملة لمادة المهارات الرقمية في المنهاج الأردني الجديد للصفوف من السابع إلى العاشر.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">الصفوف الدراسية</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/grade/7" className="hover:text-primary transition-colors">الصف السابع</a></li>
              <li><a href="/grade/8" className="hover:text-primary transition-colors">الصف الثامن</a></li>
              <li><a href="/grade/9" className="hover:text-primary transition-colors">الصف التاسع</a></li>
              <li><a href="/grade/10" className="hover:text-primary transition-colors">الصف العاشر</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">المجالات</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>أنظمة الحوسبة</li>
              <li>الشبكات والإنترنت</li>
              <li>تحليل البيانات</li>
              <li>الخوارزميات والبرمجة</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">تواصل معنا</h3>
            <p className="text-sm text-gray-600 mb-4">
              للاستفسارات والدعم الفني
            </p>
            <a href="mailto:aabuserhan80@gmail.com" className="text-sm text-primary hover:underline" dir="ltr">
              aabuserhan80@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 منصة مهاراتنا الرقمية - وفقاً لمنهاج المهارات الرقمية الأردني الجديد</p>
          <Link href="/admin/login" className="text-gray-300 hover:text-gray-500 text-xs mt-2 inline-block">⚙️</Link>
        </div>
      </div>
    </footer>
  );
}
