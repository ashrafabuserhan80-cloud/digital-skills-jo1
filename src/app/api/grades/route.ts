import { NextResponse } from "next/server";

const grades = [
  { id: "grade-7", name: "الصف السابع الأساسي", number: 7, description: "مرحلة الإعدادية" },
  { id: "grade-8", name: "الصف الثامن الأساسي", number: 8, description: "مرحلة الإعدادية" },
  { id: "grade-9", name: "الصف التاسع الأساسي", number: 9, description: "مرحلة الإعدادية" },
  { id: "grade-10", name: "الصف العاشر الأساسي", number: 10, description: "basic education" },
];

export async function GET() {
  return NextResponse.json(grades);
}
