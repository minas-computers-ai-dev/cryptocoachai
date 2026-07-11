import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { knowledgeBase, systemPrompt } from "@/lib/knowledge-base";
import OpenAI from "openai";

// Lazy initialization of OpenAI client
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get recent chat history for context
    const recentMessages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, session.userId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(10);

    // Reverse to get chronological order
    const history = recentMessages.reverse();

    // Save user message
    await db.insert(chatMessages).values({
      userId: session.userId,
      role: "user",
      content: message,
    });

    // Build context from knowledge base
    const knowledgeContext = Object.values(knowledgeBase).join("\n\n---\n\n");

    // Build messages for OpenAI
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `${systemPrompt}\n\n## Knowledge Base\nUse the following information to answer questions:\n\n${knowledgeContext}`,
      },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    // Check if OpenAI API key is configured
    const openai = getOpenAIClient();
    if (!openai) {
      // Provide a fallback response based on the knowledge base
      const response = generateFallbackResponse(message);
      
      await db.insert(chatMessages).values({
        userId: session.userId,
        role: "assistant",
        content: response,
      });

      return NextResponse.json({ response });
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const assistantMessage = completion.choices[0]?.message?.content || 
      "I apologize, but I couldn't generate a response. Please try again.";

    // Save assistant message
    await db.insert(chatMessages).values({
      userId: session.userId,
      role: "assistant",
      content: assistantMessage,
    });

    return NextResponse.json({ response: assistantMessage });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}

// Fallback response generator when OpenAI is not configured
function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Scam detection
  if (
    lowerMessage.includes("guaranteed") ||
    lowerMessage.includes("double your") ||
    lowerMessage.includes("send first") ||
    lowerMessage.includes("instagram") ||
    lowerMessage.includes("connect my wallet") ||
    lowerMessage.includes("free tokens")
  ) {
    return `⚠️ **This sounds like a potential scam!**

Red flags I'm seeing:
- Promises of guaranteed returns
- Requests to send crypto first
- Unsolicited investment advice from strangers

**Important rules:**
1. No legitimate investment guarantees profits
2. Never send crypto to receive more back - this is always a scam
3. Never share your seed phrase or connect your wallet to unknown sites
4. Be extremely cautious of anyone you've met online offering investment opportunities

If someone is pressuring you to act quickly, that's another major red flag. Take your time and trust your instincts.

Would you like to learn more about common crypto scams?`;
  }

  // What to buy questions
  if (
    lowerMessage.includes("should i buy") ||
    lowerMessage.includes("what should i invest") ||
    lowerMessage.includes("which crypto")
  ) {
    return `I appreciate you asking, but I'm here to educate, not to give financial advice! 

What I can tell you:
- **Start with learning** before investing anything
- Most beginners start with Bitcoin (BTC) or Ethereum (ETH) because they're the most established
- Only invest what you can afford to lose completely
- **DYOR** (Do Your Own Research) - understand what you're buying

For investment decisions, consider consulting a qualified financial advisor who understands cryptocurrency.

Would you like me to explain how Bitcoin or Ethereum works instead?`;
  }

  // Basic crypto questions
  if (
    lowerMessage.includes("what is crypto") ||
    lowerMessage.includes("what is bitcoin") ||
    lowerMessage.includes("what is blockchain")
  ) {
    return `Great question! Let me explain in simple terms.

**Cryptocurrency** is digital money that works without banks or governments. Think of it like digital cash that you can send to anyone, anywhere in the world, directly.

**Bitcoin** was the first cryptocurrency, created in 2009. It's like digital gold - there's a limited supply and people use it as a store of value.

**Blockchain** is the technology that makes it all work. Imagine a giant shared spreadsheet that everyone can see but no one can cheat. Every transaction is recorded permanently.

The key points:
- No middleman (like a bank) needed
- Transactions are permanent and can't be reversed
- You control your own money
- Prices can be very volatile

Would you like me to dive deeper into any of these topics?`;
  }

  // Wallet questions
  if (
    lowerMessage.includes("wallet") ||
    lowerMessage.includes("seed phrase") ||
    lowerMessage.includes("private key")
  ) {
    return `**Crypto Wallets 101**

A crypto wallet doesn't actually store your crypto - it stores the **keys** that prove you own it. Think of it like your email password: the emails exist on servers, but your password lets you access them.

**Two main types:**
1. **Hot Wallets** (connected to internet) - convenient for daily use, like MetaMask or Coinbase Wallet
2. **Cold Wallets** (offline) - most secure for large amounts, like Ledger or Trezor

**Your Seed Phrase** is the most important thing to protect. It's 12-24 words that can recover your entire wallet.

🚨 **Critical rules:**
- NEVER share your seed phrase with anyone
- Write it on paper and store it safely (not digitally)
- Anyone with your seed phrase can take all your crypto

Would you like specific recommendations for which wallet to start with?`;
  }

  // Security questions
  if (
    lowerMessage.includes("security") ||
    lowerMessage.includes("safe") ||
    lowerMessage.includes("protect") ||
    lowerMessage.includes("2fa")
  ) {
    return `**The 10 Commandments of Crypto Security:**

1. ❌ NEVER share your seed phrase or private keys
2. 🔐 Use unique, strong passwords for every account
3. 📱 Enable 2FA on every exchange and wallet
4. ✅ Use an authenticator app, not SMS for 2FA
5. 🔍 Verify website URLs carefully before entering info
6. 🚫 Never click links in emails claiming to be from exchanges
7. 💾 Use a hardware wallet for significant amounts
8. 📝 Keep seed phrases on paper, in a safe place
9. ⚠️ Never enter seed phrases unless YOU initiated recovery
10. 🤔 Be skeptical of anyone offering to "help" with your crypto

**Remember:** Unlike banks, there's no customer service to recover stolen crypto. Prevention is everything.

Do you want me to explain any of these in more detail?`;
  }

  // How to buy
  if (
    lowerMessage.includes("how to buy") ||
    lowerMessage.includes("buy bitcoin") ||
    lowerMessage.includes("buy crypto") ||
    lowerMessage.includes("first purchase")
  ) {
    return `**How to Buy Your First Cryptocurrency:**

**Step 1: Choose an Exchange**
Start with a beginner-friendly, regulated exchange like Coinbase or Kraken.

**Step 2: Create & Verify Account**
- Sign up with email
- Submit ID for verification (required by law)
- Enable 2FA immediately!

**Step 3: Add Payment Method**
- Bank account = lower fees
- Debit card = instant but higher fees

**Step 4: Make Your Purchase**
- Navigate to "Buy"
- Select Bitcoin (BTC) or Ethereum (ETH) to start
- Enter amount ($25-100 is fine for learning)
- Review fees and confirm

**Pro tips:**
- Start small - only invest what you can afford to lose
- Don't try to time the market
- Consider "dollar-cost averaging" (buying small amounts regularly)

Would you like me to explain fees or what happens after you buy?`;
  }

  // Default helpful response
  return `Hi! I'm CryptoCoach AI, your friendly guide to understanding cryptocurrency.

I can help you with:
📚 **Learning the basics** - What is crypto, blockchain, Bitcoin, etc.
🔐 **Security** - How to protect yourself and your crypto
⚠️ **Scam detection** - Identifying and avoiding fraud
💼 **Wallets** - Understanding hot vs cold storage
💰 **Exchanges** - How to buy and sell crypto safely
📋 **Glossary** - Crypto terms explained simply

**Try asking me:**
- "What is cryptocurrency?"
- "How do I buy Bitcoin?"
- "Someone messaged me about a crypto investment - is it a scam?"
- "What's a seed phrase?"

What would you like to learn about?`;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get chat history
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, session.userId))
      .orderBy(chatMessages.createdAt);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { error: "Failed to get messages" },
      { status: 500 }
    );
  }
}
