import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/teacher/students - list students with aggregated progress and quiz data
export async function GET() {
  try {
    const students = await sql`
      SELECT
        u.id,
        u.name,
        u.email,
        u.grade,
        u.points,
        u.status,
        u.created_at,
        COUNT(qr.id) AS quizzes_taken,
        COALESCE(AVG(qr.score), 0)::int AS avg_score,
        COALESCE(MAX(qr.score), 0)::int AS best_score,
        MAX(qr.created_at) AS last_active
      FROM users u
      LEFT JOIN quiz_results qr ON qr.user_id = u.id
      WHERE u.role = 'STUDENT'
      GROUP BY u.id, u.name, u.email, u.grade, u.points, u.status, u.created_at
      ORDER BY u.created_at DESC
    `;
    return NextResponse.json({ students });
  } catch (e) {
    console.error("Teacher students error:", e);
    return NextResponse.json({ error: "فشل جلب بيانات الطلاب" }, { status: 500 });
  }
}
