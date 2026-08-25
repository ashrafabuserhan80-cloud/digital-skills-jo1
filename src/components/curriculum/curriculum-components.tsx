"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGradeName, getDomainIcon, getDomainColor } from "@/lib/utils";
import { DOMAIN_UNITS, DOMAINS } from "@/lib/constants";

interface UnitCardProps {
  gradeNumber: number;
  domain: string;
  unitIndex: number;
  unitTitle: string;
  unitDescription: string;
  completedLessons?: number;
  totalLessons?: number;
}

export function UnitCard({
  gradeNumber,
  domain,
  unitIndex,
  unitTitle,
  unitDescription,
  completedLessons = 0,
  totalLessons = 5,
}: UnitCardProps) {
  const domainInfo = DOMAINS.find((d) => d.name === domain);
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Link href={`/unit/${gradeNumber}-${domain}-${unitIndex + 1}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full">
        <div className={`h-1.5 bg-gradient-to-r ${domainInfo?.color || "from-gray-500 to-gray-600"}`}></div>
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">{getDomainIcon(domain)}</div>
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2 text-xs">الوحدة {unitIndex + 1}</Badge>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{unitTitle}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">{unitDescription}</p>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{completedLessons} من {totalLessons} دروس مكتملة</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${domainInfo?.color || "from-gray-500 to-gray-600"} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function LessonListItem({
  id,
  title,
  type,
  duration,
  completed,
  index,
}: {
  id: string;
  title: string;
  type: string;
  duration: number;
  completed: boolean;
  index: number;
}) {
  const typeIcons: Record<string, string> = {
    TEXT: "📖",
    VIDEO: "🎬",
    INTERACTIVE: "🖱",
    PRACTICAL: "🛠",
    PROJECT: "📋",
  };

  return (
    <Link href={`/lesson/${id}`}>
      <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
        completed ? "bg-green-50 border-green-200" : "hover:border-primary/30"
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
          completed ? "bg-green-500 text-white" : "bg-primary/10 text-primary"
        }`}>
          {completed ? "✓" : index + 1}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>{typeIcons[type] || "📖"} {type}</span>
            <span>⏱ {duration} دقيقة</span>
          </div>
        </div>
        <div className="text-gray-400">←</div>
      </div>
    </Link>
  );
}
