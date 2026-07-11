import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { feedbackSubmissions } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { question, wasHelpful, confusion, suggestions, rating } = body;

    if (!question || !wasHelpful) {
      return NextResponse.json(
        { error: "Question and helpfulness rating are required" },
        { status: 400 }
      );
    }

    await db.insert(feedbackSubmissions).values({
      userId: session.userId,
      question,
      wasHelpful,
      confusion: confusion || null,
      suggestions: suggestions || null,
      rating: rating || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
