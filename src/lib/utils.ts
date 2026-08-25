import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${hours} ساعة`;
}

export function getGradeName(number: number): string {
  const names: Record<number, string> = {
    7: "السابع الأساسي",
    8: "الثامن الأساسي",
    9: "التاسع الأساسي",
    10: "العاشر الأساسي",
  };
  return names[number] || `الصف ${number}`;
}

export function getDomainColor(domain: string): string {
  const colors: Record<string, string> = {
    "أنظمة الحوسبة": "from-blue-500 to-cyan-500",
    "أثر الحوسبة": "from-purple-500 to-pink-500",
    "الشبكات والإنترنت": "from-green-500 to-emerald-500",
    "تحليل البيانات": "from-orange-500 to-amber-500",
    "الخوارزميات والبرمجة": "from-red-500 to-rose-500",
    "إنترنت الأشياء": "from-teal-500 to-cyan-500",
    "الذكاء الاصطناعي": "from-violet-500 to-purple-500",
    "أمن المعلومات": "from-indigo-500 to-blue-500",
  };
  return colors[domain] || "from-gray-500 to-gray-600";
}

export function getDomainIcon(domain: string): string {
  const icons: Record<string, string> = {
    "أنظمة الحوسبة": "💻",
    "أثر الحوسبة": "🌐",
    "الشبكات والإنترنت": "🔗",
    "تحليل البيانات": "📊",
    "الخوارزميات والبرمجة": "⚙️",
    "إنترنت الأشياء": "📡",
    "الذكاء الاصطناعي": "🤖",
    "أمن المعلومات": "🔒",
  };
  return icons[domain] || "📚";
}

export function getLevelTitle(level: number): string {
  if (level <= 3) return "مبتدئ";
  if (level <= 7) return "متوسط";
  if (level <= 12) return "متقدم";
  if (level <= 18) return "خبير";
  return "محترف";
}

export function calculateLevel(points: number): number {
  return Math.floor(points / 100) + 1;
}

export function pointsToNextLevel(points: number): number {
  return 100 - (points % 100);
}
