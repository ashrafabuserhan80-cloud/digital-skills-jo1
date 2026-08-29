import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "يرجى إدخال البريد وكلمة المرور" }, { status: 400 });
    }

    const users = await sql`
      SELECT id, email, name, role, password, grade FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "البريد الإلكتروني غير مسجل" }, { status: 401 });
    }

    const user = users[0];
    if (user.password !== password) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }

    // Don't return password
    const { password: _pw, ...safeUser } = user;
    return NextResponse.json({
      user: safeUser,
      token: "token-" + user.id,
    });
  } catch (e) {
    console.error("Auth error:", e);
    return NextResponse.json({ error: "خطأ في الاتصال بقاعدة البيانات" }, { status: 500 });
  }
}
