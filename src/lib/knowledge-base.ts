// CryptoCoach AI Knowledge Base
// This serves as the training data for our crypto education AI

export const knowledgeBase = {
  cryptoBasics: `
TITLE: What Is Cryptocurrency

SUMMARY:
Cryptocurrency is digital money that works without banks or governments. It uses special technology called blockchain to keep track of who owns what, making it secure and transparent.

THE BASICS:
Cryptocurrency is a form of digital or virtual currency that uses cryptography (complex math) for security. Unlike traditional money issued by governments (like dollars or euros), cryptocurrencies operate on decentralized networks based on blockchain technology.

Think of it this way: when you use your bank card, the bank keeps a record of your transactions. With cryptocurrency, thousands of computers around the world keep that record together - this is called a blockchain. No single person or company controls it.

The first and most famous cryptocurrency is Bitcoin, created in 2009 by an anonymous person or group using the name Satoshi Nakamoto. Since then, thousands of other cryptocurrencies have been created, including Ethereum, which introduced "smart contracts" - programs that run automatically on the blockchain.

ANALOGY:
Imagine a giant shared spreadsheet that everyone in the world can see. Every time someone sends cryptocurrency to someone else, it gets written in this spreadsheet. Everyone can verify the transaction, but no one can erase or change past entries. That's essentially what a blockchain does.

KEY RULES:
1. You control your own money - no bank can freeze your crypto account
2. Transactions are permanent - once sent, they cannot be reversed
3. You need to keep your "private key" safe - it's like a password that proves you own your crypto
4. Cryptocurrency values can change dramatically - sometimes by 10-20% in a single day
5. Different cryptocurrencies serve different purposes - Bitcoin is digital gold, Ethereum powers applications

COMMON MISTAKES TO AVOID:
- Thinking cryptocurrency is "anonymous" (most are actually pseudonymous and traceable)
- Investing more than you can afford to lose
- Not understanding that transactions cannot be reversed
- Sharing your private keys or seed phrase with anyone

FREQUENTLY ASKED QUESTIONS:
Q: Is cryptocurrency real money?
A: Yes and no. Cryptocurrency has value because people agree it does, just like traditional money. You can buy things with it or convert it to regular money. However, it's not backed by any government, and its value can be very volatile.

Q: Is cryptocurrency safe?
A: The technology itself is very secure. The risks come from how you store and manage your crypto, and from scammers trying to trick you. Following security best practices makes it much safer.

Q: Do I need to buy a whole Bitcoin?
A: No! You can buy tiny fractions of Bitcoin or any cryptocurrency. A Bitcoin can be divided into 100 million smaller units called "satoshis." You can start with just $10 or $20.
`,

  security: `
TITLE: Crypto Security Essentials

SUMMARY:
Your crypto is only as safe as your security practices. Following these rules can protect you from losing your money to hackers or scammers. Security is not optional - it's essential.

THE BASICS:
Unlike bank accounts, there's no customer service to help you recover stolen cryptocurrency. If someone gets access to your crypto, it's gone forever. This makes security absolutely critical.

The good news is that protecting yourself doesn't require technical expertise - just consistent habits and awareness of common threats.

KEY RULES (The 10 Commandments of Crypto Security):
1. NEVER share your seed phrase or private keys with anyone, ever, for any reason
2. Use a unique, strong password for every crypto-related account
3. Enable two-factor authentication (2FA) on every exchange and wallet
4. Use an authenticator app (like Google Authenticator) instead of SMS for 2FA
5. Verify website URLs carefully before entering any information
6. Never click links in emails or DMs claiming to be from exchanges
7. Use a hardware wallet for any significant amount of crypto
8. Keep your recovery seed phrase written on paper, stored in a safe place
9. Never enter your seed phrase into a website or app unless you initiated a wallet recovery
10. Be extremely skeptical of anyone offering to "help" with your crypto

ANALOGY:
Think of your seed phrase as the master key to a safety deposit box. Anyone with that key can take everything inside. You wouldn't give your safety deposit box key to a stranger, right? The same applies to your seed phrase.

COMMON MISTAKES TO AVOID:
- Storing seed phrases digitally (photos, notes apps, email drafts) - hackers can access these
- Using the same password across multiple sites
- Trusting "customer support" that contacts you first (real support never reaches out first)
- Rushing security decisions under pressure or fear
- Keeping large amounts of crypto on exchanges long-term

FREQUENTLY ASKED QUESTIONS:
Q: What is two-factor authentication (2FA)?
A: 2FA is a second layer of security beyond your password. After entering your password, you also enter a code from an app on your phone. This means even if someone steals your password, they can't access your account without your phone.

Q: What's a hardware wallet?
A: A hardware wallet is a physical device (like a USB drive) that stores your cryptocurrency offline. Since it's not connected to the internet, hackers can't access it remotely. Popular options include Ledger and Trezor.

Q: How do I know if a website is legitimate?
A: Always type the URL directly or use a bookmark you created yourself. Check that the URL is exactly right (scammers use similar-looking addresses). Look for the lock icon in your browser. When in doubt, don't proceed.
`,

  scams: `
TITLE: Common Crypto Scams

SUMMARY:
Crypto scams have stolen billions of dollars from victims. Learning to recognize them is your best defense. If something seems too good to be true, it definitely is.

THE BASICS:
Scammers target crypto users because transactions are irreversible. Once you send crypto to a scammer, it's gone. The most dangerous scams combine technical tricks with psychological manipulation.

TYPES OF SCAMS:

**Romance Scams (Pig Butchering)**
Someone builds a relationship with you online (dating apps, social media). After weeks or months of trust-building, they introduce you to an "investment opportunity" in crypto. They show you fake profits. When you try to withdraw, there are "fees" or "taxes." The money is gone, and so is your new "friend."
Red flags: Online relationship, quick intimacy, investment advice

**Fake Customer Support**
You post a question about crypto on Twitter or Discord. Someone pretending to be "support" DMs you offering to help. They ask you to "verify your wallet" or "sync your account" by entering your seed phrase on a website. Now they have your crypto.
Red flags: Anyone messaging you first, requests for seed phrases, unofficial communication channels

**Phishing**
Emails or messages that look like they're from legitimate exchanges or wallets. They claim there's a problem with your account and you need to click a link to fix it. The link goes to a fake website that steals your login credentials.
Red flags: Urgency, fear, links in messages, slightly wrong URLs

**Pump and Dump**
Groups promote a small cryptocurrency aggressively, causing the price to rise. Once enough people buy in, the promoters sell their holdings, and the price crashes. Everyone who bought loses money.
Red flags: "This coin will 100x!", pressure to buy now, secret "insider" information

**Rug Pulls**
Developers create a new cryptocurrency or project, attract investors, then suddenly withdraw all the money and disappear. The project's tokens become worthless.
Red flags: Anonymous team, too-good-to-be-true promises, no real product

**Giveaway Scams**
"Send 0.1 BTC to this address and receive 0.5 BTC back!" These are always scams, 100% of the time. No one is giving away free crypto.
Red flags: Anything requiring you to send crypto first

COMMON MISTAKES TO AVOID:
- Trusting people you've only met online
- Believing anyone who guarantees profits
- Clicking links instead of typing URLs directly
- Acting out of fear or urgency
- Thinking you're too smart to be scammed (everyone is vulnerable)

FREQUENTLY ASKED QUESTIONS:
Q: Someone messaged me about a crypto investment. Is it a scam?
A: Almost certainly yes. Legitimate investments don't come through DMs. Block them and don't engage.

Q: I think I might have been scammed. What do I do?
A: If you've shared your seed phrase, immediately transfer any remaining crypto to a new wallet. Document everything. Report to local authorities and the FTC (in the US). Unfortunately, recovery is rarely possible.

Q: A celebrity is promoting a crypto giveaway. Is it real?
A: No. Celebrity giveaway videos and posts are fake or their accounts have been hacked. Real celebrities don't give away crypto to strangers.
`,

  wallets: `
TITLE: Understanding Crypto Wallets

SUMMARY:
A crypto wallet doesn't actually store your cryptocurrency - it stores the keys that prove you own it. Understanding wallets is essential for safely managing your crypto.

THE BASICS:
Your cryptocurrency exists on the blockchain - a public record. Your wallet holds the "private keys" that prove you own specific crypto. Think of it like your email: the emails exist on servers, but your password lets you access them.

There are two main types of wallets: hot wallets (connected to the internet) and cold wallets (offline).

**Hot Wallets**
- Apps on your phone or computer
- Convenient for everyday use
- Higher risk because they're connected to the internet
- Examples: MetaMask, Coinbase Wallet, Trust Wallet
- Best for: Small amounts you use regularly

**Cold Wallets (Hardware Wallets)**
- Physical devices that store your keys offline
- Most secure option for long-term storage
- Less convenient for frequent transactions
- Examples: Ledger, Trezor
- Best for: Larger amounts you're holding long-term

**Custodial vs. Non-Custodial**
- Custodial: Someone else (like an exchange) holds your keys for you. Easier to use, but you're trusting them with your crypto.
- Non-custodial: You hold your own keys. More responsibility, but more control.

ANALOGY:
Think of hot wallets like a physical wallet you carry around - convenient for daily spending but you wouldn't carry your life savings. Cold wallets are like a safe at home - less convenient but much more secure for large amounts.

KEY RULES:
1. Never put all your crypto in one wallet
2. Use hot wallets only for amounts you're actively using
3. Use cold wallets for long-term holdings
4. Always back up your seed phrase when creating a wallet
5. Test with small amounts before transferring large sums

COMMON MISTAKES TO AVOID:
- Keeping large amounts on exchange wallets (not your keys, not your crypto)
- Not backing up your seed phrase
- Storing seed phrases digitally
- Using a single wallet for everything

FREQUENTLY ASKED QUESTIONS:
Q: What's a seed phrase?
A: A seed phrase (also called recovery phrase) is a series of 12-24 words that can restore your entire wallet. Anyone with these words can access your crypto. Write it down on paper and store it safely. Never share it.

Q: Which wallet should I use as a beginner?
A: Start with a reputable hot wallet like Coinbase Wallet or MetaMask for small amounts while learning. Once you have more than you'd be upset to lose, get a hardware wallet like Ledger or Trezor.

Q: Do I need multiple wallets?
A: It's good practice. Many people use an exchange account for buying/selling, a hot wallet for everyday use, and a cold wallet for long-term savings.
`,

  exchanges: `
TITLE: Crypto Exchanges Explained

SUMMARY:
Exchanges are platforms where you can buy, sell, and trade cryptocurrency. Choosing a reputable exchange and understanding how they work is crucial for your crypto journey.

THE BASICS:
Crypto exchanges are like stock brokerages, but for cryptocurrency. They provide a marketplace where buyers and sellers can trade. When you buy crypto on an exchange, the exchange facilitates the transaction.

**Types of Exchanges:**
- Centralized Exchanges (CEX): Companies that operate trading platforms. Examples: Coinbase, Kraken, Binance. Easier to use, but you're trusting the company.
- Decentralized Exchanges (DEX): Run on blockchain without a central company. Examples: Uniswap, SushiSwap. More privacy, but more complex.

**How to Evaluate an Exchange:**
1. Reputation: How long have they operated? Any history of hacks or problems?
2. Security: Do they offer 2FA? How do they store funds?
3. Fees: What do they charge for trading and withdrawals?
4. Supported currencies: Do they have what you want to buy?
5. Location: Are they available in your country? Are they regulated?
6. Customer support: Can you actually reach them if there's a problem?

**The Signup Process:**
Most regulated exchanges require identity verification (KYC - Know Your Customer):
1. Create account with email/password
2. Verify your email
3. Submit ID documents (passport, driver's license)
4. Submit a selfie or video
5. Wait for approval (minutes to days)
6. Add payment method (bank account, card)
7. Enable 2FA (essential!)

KEY RULES:
1. Only use well-established, regulated exchanges
2. Enable all available security features
3. Don't keep more crypto on exchanges than necessary
4. Understand the fee structure before trading
5. Keep records of all transactions for taxes

COMMON MISTAKES TO AVOID:
- Using obscure exchanges to avoid verification
- Ignoring security features
- Not understanding fees before trading
- Keeping life savings on an exchange
- Falling for fake exchange websites

FREQUENTLY ASKED QUESTIONS:
Q: Is Coinbase safe?
A: Coinbase is one of the most established exchanges, publicly traded, and regulated in the US. They have strong security practices. That said, no exchange is 100% safe - always enable 2FA and don't store more than necessary on any exchange.

Q: What are the fees?
A: Fees vary by exchange and transaction type. Common fees include: trading fees (0.1%-1.5% per trade), deposit fees (often free for bank transfers), withdrawal fees (varies by cryptocurrency). Always check the fee schedule before trading.

Q: Can exchanges freeze my account?
A: Yes, for legal compliance or suspicious activity. This is why many people follow the rule: "not your keys, not your crypto." Consider moving larger holdings to your own wallet.
`,

  buyingCrypto: `
TITLE: Buying Your First Cryptocurrency

SUMMARY:
Buying crypto for the first time can feel intimidating, but the process is actually straightforward. Here's exactly what to expect, step by step.

THE BASICS:
You don't need to understand everything about blockchain to buy cryptocurrency. Think of it like using email - you don't need to understand internet protocols to send a message.

**Step-by-Step: Your First Purchase**

1. **Choose an Exchange**
   Start with a beginner-friendly, regulated exchange like Coinbase or Kraken. They have simple interfaces and good customer support.

2. **Create an Account**
   - Go to the official website (type the URL directly, don't click links)
   - Sign up with your email
   - Create a strong, unique password
   - Verify your email

3. **Verify Your Identity**
   - Submit a photo of your ID (passport or driver's license)
   - Take a selfie
   - Provide basic personal information
   - Wait for approval (usually quick, sometimes up to 48 hours)

4. **Secure Your Account**
   - Enable two-factor authentication (2FA) immediately
   - Use an authenticator app, not SMS
   - Save backup codes somewhere safe

5. **Add a Payment Method**
   - Bank account (lower fees, slower)
   - Debit card (higher fees, instant)
   - Credit cards often not allowed or have high fees

6. **Make Your First Purchase**
   - Navigate to "Buy" or "Trade"
   - Select the cryptocurrency (Bitcoin is a good start)
   - Enter the amount you want to buy
   - Review the fees shown
   - Confirm the purchase

7. **Consider Your Next Steps**
   - Small amount? Leave it on the exchange while you learn
   - Larger amount? Consider moving to your own wallet

**What to Expect:**
- The price you see isn't exactly what you pay (there's a small spread)
- Fees will be deducted (usually 0.5-1.5% for beginners)
- Your crypto appears in your exchange wallet immediately
- Prices will go up and down - this is normal

ANALOGY:
Buying crypto is like buying a foreign currency before a trip. You go to an exchange, show your ID, pay your dollars, and receive the other currency. The exchange rate fluctuates, and there's a small fee.

KEY RULES:
1. Only invest what you can afford to lose completely
2. Start small - $25-100 is fine for learning
3. Don't try to time the market as a beginner
4. Understand what you're buying before buying it
5. Never buy based on social media hype

COMMON MISTAKES TO AVOID:
- Putting in more money than you can afford
- Buying something because "it's going up"
- Using credit cards (high fees, potentially dangerous)
- Panicking when prices drop
- Buying obscure cryptocurrencies without research

FREQUENTLY ASKED QUESTIONS:
Q: How much should I start with?
A: Start with an amount you'd be okay losing entirely - $25-100 is perfect for learning. You can always add more once you're comfortable.

Q: When should I buy?
A: Time in the market usually beats timing the market. Rather than trying to find the perfect moment, consider buying small amounts regularly (called dollar-cost averaging).

Q: What cryptocurrency should I buy first?
A: Most beginners start with Bitcoin (BTC) or Ethereum (ETH). These are the largest and most established. Avoid small, unknown cryptocurrencies until you have more experience.
`,

  sellingTransferring: `
TITLE: Selling and Transferring Cryptocurrency

SUMMARY:
Eventually, you'll want to sell your crypto or move it between wallets. Understanding how to do this safely prevents costly mistakes.

THE BASICS:

**Selling Cryptocurrency:**
Selling is essentially the reverse of buying:
1. Go to your exchange
2. Navigate to "Sell" or "Trade"
3. Select the crypto you want to sell
4. Enter the amount
5. Review the price and fees
6. Confirm the sale
7. Withdraw the money to your bank account

Bank withdrawals typically take 1-5 business days, depending on your exchange and country.

**Transferring Between Wallets:**
Moving crypto requires extreme attention to detail:

1. Get the receiving address from your destination wallet
2. Make absolutely sure it's the correct address
3. Make sure you're sending to the correct network (e.g., Ethereum, not Binance Smart Chain)
4. Start with a small test transaction
5. Once confirmed, send the rest

**Understanding Gas Fees:**
Most blockchain transactions require "gas fees" - payments to the network for processing your transaction.

- Ethereum: Can be high during busy periods ($5-100+)
- Bitcoin: Usually moderate ($1-20)
- Other networks: Often much cheaper (under $1)

Gas fees are paid in the network's native currency (ETH for Ethereum, BTC for Bitcoin).

**Network Confirmation Times:**
- Bitcoin: ~10 minutes (but often 3-6 confirmations recommended = 30-60 min)
- Ethereum: ~15 seconds to minutes
- Other networks: Varies

ANALOGY:
Transferring crypto is like a wire transfer, but with more finality. Like wire transfers, there's a fee, it takes some time, and once it's done, it's done. Unlike wire transfers, there's no bank to call if you send to the wrong address.

KEY RULES:
1. ALWAYS double-check the receiving address
2. Send a small test transaction first
3. Make sure you're using the correct network
4. Have enough funds for gas fees
5. Never rush a transfer

COMMON MISTAKES TO AVOID:
- Sending to the wrong address (unrecoverable)
- Using the wrong network (e.g., sending ETH on BSC)
- Not having enough for gas fees
- Skipping test transactions for large amounts
- Transferring during high-gas periods unnecessarily

FREQUENTLY ASKED QUESTIONS:
Q: What if I send to the wrong address?
A: Unfortunately, there's no way to recover it. The transaction is irreversible. This is why test transactions are so important.

Q: Why are gas fees so high sometimes?
A: Gas fees reflect network demand. When many people are using the network, fees increase. Try transacting during off-peak hours (nights and weekends in US time zones for Ethereum).

Q: How long should a transfer take?
A: Depends on the network and how much you paid in fees. Most transfers complete within an hour. If it's been longer, check a blockchain explorer to see the status.
`,

  taxes: `
TITLE: Crypto and Taxes — What to Know

SUMMARY:
Cryptocurrency is taxable in most countries. Understanding the basics can prevent problems, but you should always consult a tax professional for your specific situation.

THE BASICS:
**This is general awareness information, not tax advice. Always consult a qualified CPA or tax professional.**

In the US and many other countries, cryptocurrency is treated as property for tax purposes. This means:

**Taxable Events (things that may trigger taxes):**
- Selling crypto for regular money (USD, EUR, etc.)
- Trading one cryptocurrency for another
- Using crypto to buy goods or services
- Receiving crypto as payment for work
- Earning crypto through staking, mining, or interest

**Non-Taxable Events (generally):**
- Buying crypto with regular money
- Holding crypto without selling
- Transferring crypto between your own wallets
- Gifting crypto (though there may be gift tax considerations)

**Capital Gains:**
When you sell crypto for more than you paid, you have a capital gain. When you sell for less, you have a capital loss.

- Short-term gains (held less than 1 year): Taxed as ordinary income
- Long-term gains (held more than 1 year): Often taxed at lower rates

**Record Keeping:**
Keep records of:
- Date of each purchase
- Amount paid (including fees)
- Date of each sale
- Amount received
- The purpose of the transaction

KEY RULES:
1. Keep detailed records of all transactions
2. Don't ignore crypto on your taxes
3. Consult a tax professional who understands crypto
4. Consider using crypto tax software to track transactions
5. Save money for potential tax bills

COMMON MISTAKES TO AVOID:
- Thinking crypto isn't taxable
- Not keeping transaction records
- Forgetting about small transactions
- Not reporting crypto-to-crypto trades
- Waiting until tax season to organize records

FREQUENTLY ASKED QUESTIONS:
Q: Do I need to report crypto if I didn't sell?
A: Generally, just holding crypto isn't a taxable event. But receiving it as payment or rewards may be. Consult a professional.

Q: How do I find a crypto-savvy tax professional?
A: Look for CPAs who specifically mention cryptocurrency experience. Ask about their experience with crypto taxes during initial consultations.

Q: What if I don't know my cost basis?
A: Try to reconstruct records from exchange history. If you truly can't, a tax professional can help determine reasonable approaches.
`,

  glossary: `
TITLE: Crypto Glossary for Beginners

**Address**: A string of letters and numbers that identifies where cryptocurrency can be sent. Like an email address for crypto.

**Altcoin**: Any cryptocurrency other than Bitcoin.

**Bear Market**: A market where prices are falling. "Bearish" means expecting prices to fall.

**Bitcoin (BTC)**: The first and largest cryptocurrency, created in 2009.

**Blockchain**: A digital ledger that records transactions across many computers. The foundation of cryptocurrency.

**Bull Market**: A market where prices are rising. "Bullish" means expecting prices to rise.

**Cold Wallet**: A wallet that stores cryptocurrency offline, not connected to the internet.

**Custodial**: A service that holds your crypto for you (like an exchange). You don't control the private keys directly.

**DeFi (Decentralized Finance)**: Financial services built on blockchain without traditional intermediaries like banks.

**DEX (Decentralized Exchange)**: An exchange that operates without a central authority, running on blockchain.

**DYOR (Do Your Own Research)**: Crypto community reminder to research before investing.

**Ethereum (ETH)**: The second-largest cryptocurrency. Known for smart contracts and DeFi applications.

**Fiat**: Government-issued currency like USD, EUR, or GBP.

**Gas**: The fee required to perform transactions on networks like Ethereum.

**HODL**: Slang for "hold" - keeping crypto instead of selling. Originally a typo that became a meme.

**Hot Wallet**: A wallet connected to the internet. More convenient but less secure than cold storage.

**KYC (Know Your Customer)**: Identity verification required by regulated exchanges.

**Market Cap**: The total value of a cryptocurrency (price × total supply).

**Mining**: The process of using computers to validate transactions and create new cryptocurrency.

**NFT (Non-Fungible Token)**: Unique digital assets verified on blockchain, often digital art or collectibles.

**Non-Custodial**: A wallet where you control your own private keys.

**Private Key**: A secret code that proves ownership of your crypto. Never share this.

**Public Key**: A code derived from your private key that others can see. Used to generate your address.

**Seed Phrase**: A series of words (usually 12-24) that can recover your entire wallet. Keep this extremely safe.

**Smart Contract**: Self-executing code on a blockchain that automatically runs when conditions are met.

**Stablecoin**: A cryptocurrency designed to maintain a stable value, usually pegged to USD (like USDC or USDT).

**Staking**: Locking up crypto to help operate a blockchain network, usually earning rewards.

**Token**: A cryptocurrency built on another blockchain (like tokens on Ethereum).

**Transaction Hash (TxHash)**: A unique ID for a specific transaction. Used to track transaction status.

**Wallet**: Software or hardware that stores your private keys and lets you manage cryptocurrency.

**Whale**: Someone who owns a large amount of cryptocurrency.
`
};

export const systemPrompt = `You are CryptoCoach AI, a friendly and knowledgeable crypto education assistant. Your role is to help beginners understand cryptocurrency in plain English.

## Your Personality
- Patient and encouraging - crypto can be confusing, and that's okay
- Clear and jargon-free - if you must use a technical term, explain it immediately
- Focused on education, not hype - you're here to teach, not to sell
- Security-conscious - always emphasize safe practices
- Honest about risks - crypto is volatile and people can lose money

## Your Knowledge Base
You have been trained on comprehensive educational materials covering:
- What cryptocurrency is and how it works
- Security best practices and the 10 commandments of crypto security
- Common scams and how to recognize them
- Understanding crypto wallets (hot vs cold, custodial vs non-custodial)
- How exchanges work and how to evaluate them
- Step-by-step guides for buying and selling crypto
- Basic tax awareness
- A comprehensive glossary of terms

## Rules You Must Follow

1. **Never give financial advice**
   - Never tell someone what to buy or sell
   - Never predict prices or promise returns
   - Never recommend specific investment amounts
   - When asked for advice, redirect to education and suggest consulting a financial advisor

2. **Always prioritize security**
   - Emphasize never sharing seed phrases
   - Recommend 2FA on everything
   - Be direct about scam risks
   - When someone describes a potential scam, tell them clearly

3. **Be honest about limitations**
   - If you don't know something, say so
   - Recommend professional help for complex tax situations
   - Acknowledge that crypto regulations vary by location

4. **Keep responses appropriate length**
   - Match response length to question complexity
   - Use bullet points and formatting for clarity
   - Don't overwhelm beginners with too much at once

5. **Watch for scam red flags**
   When users describe situations involving:
   - Guaranteed returns or profits
   - Someone they met online recommending investments
   - Requests to send crypto first to receive more back
   - "Support" asking for seed phrases
   - Urgency or pressure to act quickly
   - Too-good-to-be-true opportunities
   
   Respond clearly that this is likely a scam and explain why.

## Response Format
- Start with a direct answer to their question
- Explain concepts simply
- Use analogies when helpful
- Include relevant warnings if applicable
- End with an invitation for follow-up questions when appropriate

Remember: You're a coach, not an advisor. Educate and empower, never recommend or promise.`;
