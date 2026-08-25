import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOMAINS } from "@/lib/constants";
import { getGradeName, getDomainIcon } from "@/lib/utils";

export default async function UnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parts = id.split("-");
  const gradeNumber = parseInt(parts[0]);
  const domain = parts.slice(1, -1).join("-");
  const unitIndex = parseInt(parts[parts.length - 1]) - 1;

  const domainInfo = DOMAINS.find((d) => d.name === domain || d.id === domain);
  const domainName = domainInfo?.name || decodeURIComponent(domain);

  const sampleLessons = [
    { id: `${id}-1`, title: `مقدمة في الوحدة`, type: "TEXT", duration: 10 },
    { id: `${id}-2`, title: `المفاهيم الأساسية`, type: "TEXT", duration: 15 },
    { id: `${id}-3`, title: `شرح تفاعلي`, type: "INTERACTIVE", duration: 20 },
    { id: `${id}-4`, title: `تطبيق عملي`, type: "PRACTICAL", duration: 25 },
    { id: `${id}-5`, title: `مراجعة واختبار`, type: "TEXT", duration: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">الرئيسية</Link>
            <span className="text-white/40">/</span>
            <Link href={`/grade/${gradeNumber}`} className="text-white/70 hover:text-white">
              {getGradeName(gradeNumber)}
            </Link>
            <span className="text-white/40">/</span>
            <span>الوحدة {unitIndex + 1}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{getDomainIcon(domainName)}</div>
            <div>
              <Badge className="mb-2">{domainName}</Badge>
              <h1 className="text-3xl font-bold">الوحدة {unitIndex + 1}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-bold mb-6">📚 الدروس</h2>
          {sampleLessons.map((lesson, index) => (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer mb-3">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>{lesson.type === "TEXT" ? "📖" : lesson.type === "VIDEO" ? "🎬" : lesson.type === "INTERACTIVE" ? "🖱" : "🛠"} {lesson.type}</span>
                      <span>⏱ {lesson.duration} دقيقة</span>
                    </div>
                  </div>
                  <span className="text-gray-400">←</span>
                </CardContent>
              </Card>
            </Link>
          ))}

          <div className="mt-8 pt-6 border-t">
            <Link href={`/quiz/${id}-quiz`}>
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-bold text-lg">اختبار الوحدة</h3>
                  <p className="text-sm text-gray-500">اختبر معلوماتك بعد إكمال الدروس</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
