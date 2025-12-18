# SkillChain — Devfolio Submission

---

## Short Tagline (1 sentence)

**SkillChain — AI-evaluated, blockchain-verified skill credentials (Proof-of-Learning) for students & recruiters.**

---

## Long Description

### The Problem

Traditional certificates and credentials are easily faked. Hiring managers can't trust that a candidate actually knows what their certificate claims. Meanwhile, students have no portable way to prove genuine skills across platforms.

### Our Solution

SkillChain combines **AI-powered evaluation** with **blockchain-verified credentials** to create tamper-proof proof of knowledge.

Here's how it works:
1. **Students answer skill challenges** — open-ended questions on blockchain, DeFi, Web3 topics
2. **AI evaluates their understanding** — using a deterministic rubric that scores key concepts, clarity, and depth
3. **Passing scores mint an NFT credential** — an ERC-721 token on Polygon Mumbai storing the skill and score
4. **Recruiters verify instantly** — enter any wallet address to see verified credentials

### Technical Implementation

- **Frontend**: Next.js 14 + Tailwind CSS + Framer Motion for a stunning, production-grade UI
- **AI Evaluation**: Custom deterministic rubric algorithm — zero external APIs, works 100% offline
- **Smart Contracts**: Solidity ERC-721 with OpenZeppelin, deployed via Hardhat
- **Blockchain**: Polygon Mumbai testnet (free, fast, EVM-compatible)
- **Demo Mode**: One-click demo for judges with mock wallet and simulated minting

### Why Blockchain?

We use blockchain for what it's best at: **immutability**. Once a credential is minted, it cannot be modified or faked. The on-chain record provides verifiable proof that someone demonstrated knowledge at a specific time. This isn't blockchain for buzz — it's blockchain for trust.

### Try It Now

```bash
git clone https://github.com/your-username/skillchain
cd skillchain && npm install && npm run demo
```

Open [http://localhost:3000](http://localhost:3000) — Demo mode works instantly, no wallet needed!

---

## 30-Second Pitch

> "Certificates can be fake. SkillChain uses GenAI to evaluate real answers and mints tamper-proof NFT credentials on-chain, giving students portable proof of what they actually know. 
> 
> Answer a question. Get scored by AI. Mint an NFT. Verify forever.
> 
> Demo in 90 seconds — no wallet required."

---

## 2-Minute Pitch Script

**[0:00-0:15] Hook**
> "Raise your hand if you've ever wondered whether a candidate's certifications are real. 
> 
> Certificates can be bought, forged, or simply outdated. There's no way to verify actual knowledge — until now."

**[0:15-0:30] Solution**
> "SkillChain creates AI-evaluated, blockchain-verified skill credentials. 
> 
> Students answer open-ended challenges. Our AI evaluates their actual understanding — not just memorization. If they pass, we mint an NFT credential on Polygon. Immutable. Verifiable. Forever."

**[0:30-1:30] Demo**
> *Show landing page*
> "Here's SkillChain. Let me prove a blockchain skill."
> 
> *Navigate to dashboard, select Blockchain Basics*
> "I'll answer this challenge about what a blockchain is."
> 
> *Paste demo answer, submit*
> "Watch the AI evaluation in real-time... Score: 95/100. Passed!"
> 
> *Click Mint Credential*
> "Now I mint this as an NFT credential. Done."
> 
> *Go to Verify page*
> "Any recruiter can verify my credentials by pasting my wallet address. They see every skill I've proven, with scores and timestamps. All on-chain."

**[1:30-2:00] Close**
> "SkillChain is 100% open-source and runs entirely free — no paid APIs, just testnets. 
> 
> The AI evaluation uses a deterministic rubric, so there's no vendor lock-in. And our glassmorphic UI? Built to impress both technical reviewers and judges.
> 
> Proof that you actually learned. That's SkillChain."

---

## Key Features for Judging

| Category | What We Built |
|----------|---------------|
| **Innovation** | AI + blockchain credential verification system |
| **Technical Depth** | Custom evaluation algorithm, ERC-721 contracts, full-stack app |
| **Design** | Premium glassmorphism UI with animations |
| **Practicality** | Demo mode works instantly, zero cost to run |
| **Open Source** | MIT licensed, fully documented |

---

## Team

Built by a solo developer in 48 hours for ETH Global Hackathon.

---

## Links

- **Demo**: [Live on Vercel] or `npm run demo`
- **GitHub**: [Repository URL]
- **Video**: [2-minute demo walkthrough]

---

*SkillChain — Proof that you actually learned.*
