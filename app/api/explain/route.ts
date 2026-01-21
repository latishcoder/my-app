import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/app/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, subject } = await req.json();

    // ✅ Validate topic
    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    if (topic.length > 200) {
      return NextResponse.json(
        { error: "Topic too long (max 200 characters)" },
        { status: 400 }
      );
    }

    // ✅ Validate difficulty (safe default)
    const level: "basic" | "advanced" =
      difficulty === "advanced" ? "advanced" : "basic";

    // ✅ Validate subject (safe default)
    const finalSubject: "Physics" | "Chemistry" | "Biology" =
      subject === "Chemistry" || subject === "Biology"
        ? subject
        : "Physics";

    // 🔥 Generate explanation using topic + difficulty + subject
    const data = await generateExplanation(
      topic.trim(),
      level,
      finalSubject
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to generate explanation",
      },
      { status: 500 }
    );
  }
}
