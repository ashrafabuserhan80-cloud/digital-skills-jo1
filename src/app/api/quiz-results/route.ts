import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// POST /api/quiz-results - save a quiz result
export async function POST(request: Request) {
  try {
    const { userId, quizId, score, total } = await request.json();
    if (!userId || !quizId) return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });

    const result = await sql`
      INSERT INTO quiz_results (user_id, quiz_id, score, total)
      VALUES (${userId}, ${quizId}, ${score ?? 0}, ${total ?? 0})
      RETURNING id, user_id, quiz_id, score, total, created_at
    `;

    // Optionally award points
    if (score) {
      await sql`UPDATE users SET points = points + ${score} WHERE id = ${userId}`;
    }

    return NextResponse.json({ result: result[0] }, { status: 201 });
  } catch (e) {
    console.error("Save result error:", e);
    return NextResponse.json({ error: "فشل حفظ النتيجة" }, { status: 500 });
  }
}

// GET /api/quiz-results?userId=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const results = await sql`
        SELECT * FROM quiz_results WHERE user_id = ${userId} ORDER BY created_at DESC
      `;
      return NextResponse.json({ results });
    }

    const results = await sql`SELECT * FROM quiz_results ORDER BY created_at DESC LIMIT 100`;
    return NextResponse.json({ results });
  } catch (e) {
    console.error("Get results error:", e);
    return NextResponse.json({ error: "فشل جلب النتائج" }, { status: 500 });
  }
}
