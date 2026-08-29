import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/admin/users - list all users
export async function GET() {
  try {
    const users = await sql`
      SELECT id, email, name, role, grade, parent_name, parent_phone, phone, status, points, created_at
      FROM users ORDER BY created_at DESC
    `;
    return NextResponse.json({ users });
  } catch (e) {
    console.error("List users error:", e);
    return NextResponse.json({ error: "فشل جلب المستخدمين" }, { status: 500 });
  }
}

// POST /api/admin/users - create a new user (student registration by admin)
export async function POST(request: Request) {
  try {
    const { name, email, password, grade, parentName, parentPhone, phone, role = "STUDENT" } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "الاسم والبريد وكلمة المرور مطلوبة" }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "هذا البريد مسجل مسبقاً" }, { status: 409 });
    }

    const created = await sql`
      INSERT INTO users (email, name, role, password, grade, parent_name, parent_phone, phone, status)
      VALUES (${email}, ${name}, ${role}, ${password}, ${grade || null}, ${parentName || null}, ${parentPhone || null}, ${phone || null}, 'active')
      RETURNING id, email, name, role, grade, status, created_at
    `;

    return NextResponse.json({ user: created[0] }, { status: 201 });
  } catch (e) {
    console.error("Create user error:", e);
    return NextResponse.json({ error: "فشل إنشاء المستخدم" }, { status: 500 });
  }
}

// PATCH /api/admin/users - update a user
export async function PATCH(request: Request) {
  try {
    const { id, name, email, grade, parentName, parentPhone, phone, status } = await request.json();
    if (!id) return NextResponse.json({ error: "المعرف مطلوب" }, { status: 400 });

    const updated = await sql`
      UPDATE users SET
        name = COALESCE(${name}, name),
        email = COALESCE(${email}, email),
        grade = COALESCE(${grade}, grade),
        parent_name = COALESCE(${parentName}, parent_name),
        parent_phone = COALESCE(${parentPhone}, parent_phone),
        phone = COALESCE(${phone}, phone),
        status = COALESCE(${status}, status)
      WHERE id = ${id}
      RETURNING id, email, name, role, grade, status
    `;

    if (updated.length === 0) return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    return NextResponse.json({ user: updated[0] });
  } catch (e) {
    console.error("Update user error:", e);
    return NextResponse.json({ error: "فشل تحديث المستخدم" }, { status: 500 });
  }
}

// DELETE /api/admin/users?id=...
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "المعرف مطلوب" }, { status: 400 });

    await sql`DELETE FROM users WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete user error:", e);
    return NextResponse.json({ error: "فشل حذف المستخدم" }, { status: 500 });
  }
}
