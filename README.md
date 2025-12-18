# SkillChain — AI + Blockchain Skill Passport 🎓⛓️

> **AI-evaluated, blockchain-verified skill credentials (Proof-of-Learning) for students & recruiters.**

[![Demo Mode](https://img.shields.io/badge/Demo-Available-cyan)](http://localhost:3000?demo=true)
[![License](https://img.shields.io/badge/License-MIT-purple)]()
[![Testnet](https://img.shields.io/badge/Network-Mumbai-blue)]()

## 🚀 Quick Start (30 seconds)

```bash
# Clone and install
git clone https://github.com/your-username/skillchain.git
cd skillchain
npm install

# Run in demo mode (no blockchain required!)
npm run demo
```

Open [http://localhost:3000](http://localhost:3000) — Demo mode auto-activates with mock wallet and simulated minting.

---

## 🎯 One-Line Pitch

**Certificates can be fake. SkillChain uses GenAI to evaluate real answers and mints tamper-proof NFT credentials on-chain, giving students portable proof of what they actually know.**

---

## 🔥 Features

| Feature | Description |
|---------|-------------|
| **AI Evaluation** | Deterministic rubric-based scoring — zero external APIs, works offline |
| **NFT Credentials** | ERC-721 tokens on Polygon Mumbai testnet |
| **Demo Mode** | One-click demo for judges — no wallet setup required |
| **Glassmorphism UI** | Premium dark theme with neon gradients and animations |
| **Verification Portal** | Anyone can verify credentials by wallet address |

---

## 📸 Screenshots

### Landing Page
Ultra-premium dark theme with animated background and neon gradients.

### Skill Attempt
Answer questions, get real-time AI evaluation with terminal-style feedback.

### NFT Minting
Mint verified credentials as NFTs with beautiful success animations.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Smart Contracts**: Solidity (OpenZeppelin ERC721), Hardhat
- **Blockchain**: Polygon Mumbai Testnet (or any EVM)
- **AI**: Deterministic rubric-based evaluation (no paid APIs)

---

## 📁 Project Structure

```
skillchain/
├── components/          # React components (AiTerminal, MintButton, etc.)
├── contracts/           # Solidity smart contracts
├── data/                # Skills rubrics and demo data
├── lib/                 # Utilities (evaluate.js, contract.js)
├── pages/               # Next.js pages and API routes
│   ├── api/             # evaluate, mint, verify endpoints
│   ├── skill/[id].js    # Skill attempt flow
│   ├── dashboard.js     # Skills grid
│   ├── verify.js        # Credential verification
│   └── index.js         # Landing page
├── scripts/             # Hardhat deploy scripts
└── styles/              # Global CSS with design system
```

---

## 🎮 Demo Mode

Demo mode enables full functionality without external dependencies:

- **Auto Wallet**: Pre-connected demo wallet
- **Instant Pass**: AI evaluation always returns 95/100
- **Mock Minting**: Simulated transactions with fake tx hashes
- **Persisted Data**: Credentials saved to `data/issued.json`

**Enable demo mode:**
```bash
# Option 1: Run with npm script
npm run demo

# Option 2: Add query parameter
http://localhost:3000?demo=true

# Option 3: Set environment variable
NEXT_PUBLIC_DEMO_MODE=true npm run dev
```

---

## ⚙️ Configuration

Copy `.env.example` to `.env.local` and configure:

```env
# Demo Mode (set to 'true' for hackathon demo)
NEXT_PUBLIC_DEMO_MODE=true

# Optional: Blockchain (only needed for real minting)
RPC_URL=https://rpc-mumbai.maticvigil.com
PRIVATE_KEY=your_deployer_private_key
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Optional: IPFS (for production metadata storage)
NFT_STORAGE_KEY=your_nft_storage_api_key
```

---

## 🔮 Smart Contract Deployment

### Option A: Demo Mode (Recommended for Hackathons)
```bash
# Creates mock deployed.json, no blockchain needed
node scripts/mockDeploy.js
```

### Option B: Deploy to Testnet
```bash
# 1. Configure .env.local with RPC_URL and PRIVATE_KEY
# 2. Get testnet tokens from faucet
# 3. Deploy
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

---

## 🧪 How It Works

1. **User selects a skill** → Blockchain Basics, Smart Contracts, or DeFi
2. **Answers challenge question** → Free-form text response
3. **AI evaluates the answer** → Deterministic rubric scores keyphrases, coherence, length
4. **If passed (≥60 points)** → User can mint an NFT credential
5. **Credential is minted** → ERC-721 token with skill metadata
6. **Anyone can verify** → Enter wallet address to see credentials

---

## 📊 AI Evaluation Algorithm

The deterministic rubric ensures fair, consistent scoring:

```javascript
// Scoring breakdown
- Keyphrase matching:  up to 90 points
  - Each concept = weighted score
  - Synonyms expand matching
- Coherence bonus:     up to 10 points
  - 100+ words = 10 pts
  - 50-99 words = 5 pts
- Length penalty:      -10 points if < 30 words

// Pass threshold: 60 points (configurable per skill)
```

---

## 🌐 Deployment to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_DEMO_MODE=true`
4. Deploy!

---

## 📜 Demo Script (2 minutes)

See [demo-script.md](./demo-script.md) for the full hackathon demo walkthrough.

**Quick version:**
1. Show landing page "Proof that you actually learned"
2. Click "Start Learning" → Dashboard
3. Select "Blockchain Basics" → Paste demo answer
4. Submit → Watch AI terminal → Score: 95
5. Click "Mint Credential" → Success animation
6. Go to Verify → Enter demo wallet → Show NFT metadata

---

## 🏆 Why This Wins

- ✅ **Real Problem**: Fake certificates plague hiring
- ✅ **Blockchain Done Right**: Immutability for credentials, not buzz
- ✅ **AI Innovation**: Objective evaluation, no vendor lock-in
- ✅ **Zero Cost**: Runs 100% free (demo) or testnet only
- ✅ **Beautiful UX**: Judges remember premium designs

---

## 📝 License

MIT — Build on this!

---

<p align="center">
  Built with ❤️ for ETH Global Hackathon<br>
  <strong>SkillChain</strong> — Proof that you actually learned.
</p>
