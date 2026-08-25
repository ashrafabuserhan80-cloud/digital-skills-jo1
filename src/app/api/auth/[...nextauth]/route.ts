import { NextResponse } from "next/server";

// Demo auth route - simplified without NextAuth
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const users: Record<string, { id: string; name: string; role: string; email: string }> = {
    "student@test.com": { id: "1", name: "طالب تجريبي", role: "STUDENT", email: "student@test.com" },
    "teacher@test.com": { id: "2", name: "معلم تجريبي", role: "TEACHER", email: "teacher@test.com" },
    "admin@test.com": { id: "3", name: "مدير تجريبي", role: "ADMIN", email: "admin@test.com" },
  };

  const user = users[email];
  if (user && password === "123456") {
    return NextResponse.json({ user, token: "demo-token-" + user.id });
  }

  return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
}

export async function GET() {
  return NextResponse.json({ message: "Auth API" });
}
