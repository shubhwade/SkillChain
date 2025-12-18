# SkillChain Demo Script (120-180 seconds)

> Use this script for hackathon presentations. All times are approximate.

---

## Setup Before Demo

1. Run `npm run demo` to start in demo mode
2. Open [http://localhost:3000](http://localhost:3000)
3. Have this demo answer ready to copy:

```
A blockchain is a distributed ledger technology that stores data across multiple nodes in a decentralized network. Each block contains a list of transactions that are cryptographically linked to the previous block, creating an immutable chain. The security comes from cryptographic hashing - any attempt to modify data would change the hash and break the chain. Consensus mechanisms like Proof of Work or Proof of Stake ensure all nodes agree on the valid state of the ledger.
```

---

## Demo Flow

### 🕐 0:00-0:15 — Landing Page Hook

**Action**: Show the landing page

**Say**: 
> "Certificates can be fake. How do you prove you actually learned something?
> 
> Meet SkillChain — AI evaluates your knowledge, then mints a tamper-proof NFT credential on the blockchain. Let me show you."

**Point out**:
- The headline: "Proof that you actually learned."
- The premium glassmorphism design

---

### 🕐 0:15-0:30 — Demo Login

**Action**: 
1. Point to the "Demo Mode" banner at top
2. Click "Start Learning"

**Say**:
> "We're in demo mode — no wallet setup needed. The demo wallet auto-connects."

---

### 🕐 0:30-1:00 — Skill Selection & Answer

**Action**:
1. Show the Dashboard with skill cards
2. Click on "Blockchain Basics" card
3. Read the challenge question briefly
4. Paste the prepared demo answer
5. Click "Submit for Evaluation"

**Say**:
> "Here's our dashboard with available skill challenges. I'll attempt 'Blockchain Basics.'
>
> The challenge asks me explain what a blockchain is. Let me paste my answer...
>
> Now watch the AI evaluate my response in real-time."

---

### 🕐 1:00-1:30 — AI Evaluation

**Action**:
1. Watch the terminal animation run
2. Point out the score breakdown when it appears
3. Highlight the "PASSED" badge

**Say**:
> "The AI is analyzing my response... checking key concepts... calculating my score...
>
> Score: 95 out of 100. Passed!
>
> Notice the breakdown — it identified concepts like 'distributed ledger', 'immutable', 'consensus', 'cryptographic'. These are weighted based on the rubric.
>
> The feedback tells me what I did well. Now I can mint this as an NFT credential."

---

### 🕐 1:30-1:50 — Mint Credential

**Action**:
1. Click "Mint Credential NFT"
2. Wait for success animation
3. Point out the token ID and transaction hash

**Say**:
> "Minting... and done! 
>
> Token ID #101, transaction hash recorded. In demo mode this is simulated, but on testnet it's a real on-chain transaction.
>
> Let's verify this credential."

---

### 🕐 1:50-2:10 — Verification

**Action**:
1. Click "Verify Skills" in navigation (or go to /verify)
2. Click "Use demo wallet address" link
3. Click Verify button
4. Show the credential card that appears

**Say**:
> "Anyone can verify credentials. I enter a wallet address...
>
> And see all their verified skills. Score, timestamp, transaction hash — all publicly verifiable.
>
> Recruiters can trust these credentials because they're on-chain and immutable."

---

### 🕐 2:10-2:30 — Close

**Action**: Return to landing page or show README

**Say**:
> "That's SkillChain. AI-powered evaluation. Blockchain-verified credentials. Zero cost to run.
>
> The AI uses a deterministic rubric — no paid APIs, no vendor lock-in. Works completely offline.
>
> Built with Next.js, Solidity, and a lot of purple gradients. Open source. MIT licensed.
>
> Thank you!"

---

## Backup: If Something Breaks

- **AI evaluation stuck**: Refresh and re-submit. Demo mode is fast.
- **Mint fails**: The credential still shows in issued.json, navigate to /verify
- **Page errors**: `npm run demo` again, it auto-seeds data

---

## Key Talking Points (If Judges Ask)

| Question | Answer |
|----------|--------|
| "Is the AI really evaluating?" | "Yes! It's a deterministic rubric matching keyphrases with synonyms. Demo mode just returns a high score for convenience." |
| "How is this different from certificates?" | "Certificates are images. Our credentials are on-chain NFTs — immutable, verifiable, portable across platforms." |
| "What about cheating?" | "Future versions can add time limits, randomized questions, and proctoring. The blockchain part ensures credentials can't be later forged." |
| "Why Polygon?" | "Fast, cheap, EVM-compatible. Easy for demo. Could deploy on any EVM chain." |
| "What's the business model?" | "Enterprise licensing for credential issuance, verification APIs for recruiters, certification partnerships." |

---

*Good luck! 🚀*
