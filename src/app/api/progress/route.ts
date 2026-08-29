import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/progress?userId=... - returns a student's profile, points, and quiz results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "المعرف مطلوب" }, { status: 400 });

    const users = await sql`
      SELECT id, name, email, grade, points FROM users WHERE id = ${userId}
    `;
    if (users.length === 0) return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    const user = users[0];

    const results = await sql`
      SELECT quiz_id, score, total, created_at
      FROM quiz_results WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    const scores = results.map((r) => Number(r.score));
    const quizzesTaken = scores.length;
    const avgScore = quizzesTaken
      ? Math.round(scores.reduce((s, x) => s + x, 0) / quizzesTaken)
      : 0;
    const bestScore = quizzesTaken ? Math.max(...scores) : 0;
    const level = Math.floor(Number(user.points) / 100) + 1;

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        grade: user.grade,
        points: Number(user.points),
        level,
      },
      stats: {
        quizzesTaken,
        avgScore,
        bestScore,
      },
      recentResults: results,
    });
  } catch (e) {
    console.error("Progress error:", e);
    return NextResponse.json({ error: "فشل جلب التقدم" }, { status: 500 });
  }
}
