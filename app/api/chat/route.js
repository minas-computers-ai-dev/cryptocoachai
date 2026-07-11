import { SYSTEM_PROMPT } from "@/lib/systemPrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 30; // keep context (and cost) bounded
const MAX_CHARS_PER_MESSAGE = 4000;

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The AI service is not configured yet. (Missing ANTHROPIC_API_KEY.)" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
  if (rawMessages.length === 0) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  // Sanitize: only keep role/content, clamp lengths, keep the last N turns.
  const messages = rawMessages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "No user message provided." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Anthropic API error:", res.status, detail);
      return Response.json(
        { error: "The assistant had trouble answering. Please try again in a moment." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return Response.json({ reply: reply || "I'm sorry — I couldn't produce an answer. Please try rephrasing your question." });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}
