import { SYSTEM_PROMPT } from "@/lib/systemPrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 30;
const MAX_CHARS_PER_MESSAGE = 4000;

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The AI service is not configured yet. Add your free Gemini API key in Netlify environment variables (GEMINI_API_KEY)." },
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
  const sanitized = rawMessages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== "user") {
    return Response.json({ error: "No user message provided." }, { status: 400 });
  }

  // Convert to Gemini's content format: { role, parts: [{ text }] }
  const contents = sanitized.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Gemini API error:", res.status, detail);

      if (res.status === 429) {
        return Response.json(
          { error: "The assistant is getting a lot of questions right now. Please wait a minute and try again." },
          { status: 429 }
        );
      }

      return Response.json(
        { error: "The assistant had trouble answering. Please try again in a moment." },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Extract text from Gemini's response structure
    const reply = (data.candidates || [])
      .map((c) =>
        (c.content?.parts || [])
          .filter((p) => p.text)
          .map((p) => p.text)
          .join("")
      )
      .join("\n")
      .trim();

    if (!reply) {
      // Check if blocked by safety filters
      const blockReason = data.candidates?.[0]?.finishReason;
      if (blockReason === "SAFETY") {
        return Response.json({
          reply: "I wasn't able to answer that particular question. Could you try rephrasing it? I'm here to help with any crypto education topic.",
        });
      }
      return Response.json({
        reply: "I'm sorry — I couldn't produce an answer. Please try rephrasing your question.",
      });
    }

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}
