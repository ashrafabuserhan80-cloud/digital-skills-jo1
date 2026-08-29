import { NextResponse } from "next/server";
import { answerQuestion, greetingsReply } from "@/lib/curriculum";

async function getBody(req: Request): Promise<{ message?: string } | null> {
  try {
    const json = await req.json();
    return json as { message?: string };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = await getBody(req);
  const message = (body?.message || "").trim();

  if (!message) {
    return NextResponse.json({ error: "الرجاء كتابة سؤال أولاً" }, { status: 400 });
  }

  const greeting = greetingsReply(message);
  if (greeting) {
    return NextResponse.json({
      reply: greeting,
      lessonId: null,
      grade: 0,
      domain: "",
      lessonTitle: "",
      isGreeting: true,
    });
  }

  const result = answerQuestion(message);
  return NextResponse.json({
    reply: result.answer,
    lessonId: result.lessonId,
    grade: result.grade,
    domain: result.domain,
    lessonTitle: result.lessonTitle,
    isGreeting: false,
  });
}
