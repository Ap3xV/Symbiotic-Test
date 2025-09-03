// Symbiotic Test of Knowledge — Questions
// Replace/extend safely. Each question: { question, options: [..4], answer: index, level }

const QUESTION_BANK = [
  // Beginner
  { level: "beginner", question: "What is Symbiotic primarily focused on?", options: ["NFT marketplaces", "Decentralized collateral & restaking network", "Centralized exchange", "Layer-1 wallet"], answer: 1 },
  { level: "beginner", question: "Symbiotic aims to make security and collateral ______.", options: ["Monolithic", "Modular and composable", "Off-chain only", "Permissioned"], answer: 1 },
  { level: "beginner", question: "Which best describes 'restaking' in broad terms?", options: ["Reusing staked assets/security for additional services", "Minting new tokens from thin air", "Burning tokens to secure the network", "Only staking on Bitcoin"], answer: 0 },
  { level: "beginner", question: "The visual brand accent for this app uses which color family?", options: ["Blue", "Green", "Red", "Purple"], answer: 1 },
  { level: "beginner", question: "What do users primarily contribute in restaking systems?", options: ["Compute power only", "Collateral / stake", "Social media likes", "KYC documents"], answer: 1 },

  // Intermediate
  { level: "intermediate", question: "A key Symbiotic design goal is to separate collateral from ______.", options: ["User interfaces", "Validation/security roles", "Bridges", "Oracles"], answer: 1 },
  { level: "intermediate", question: "What’s a benefit of a modular risk framework?", options: ["Uniform risk for all apps", "Customizable policies per application", "Eliminates all risk", "Only supports native ETH"], answer: 1 },
  { level: "intermediate", question: "Composability across protocols mainly improves ______.", options: ["Gas price volatility", "Capital efficiency & reuse", "Off-chain custody", "Proof-of-work mining"], answer: 1 },
  { level: "intermediate", question: "In a pooled security model, multiple applications can ______.", options: ["Share validator sets / security sources", "Only operate in isolation", "Avoid slashing conditions entirely", "Use paper certificates"], answer: 0 },
  { level: "intermediate", question: "Which type of tokens are commonly supported as collateral in restaking ecosystems?", options: ["Bech32 only", "ERC-20s (project dependent)", "Meme tickers only", "NFTs only"], answer: 1 },

  // Advanced
  { level: "advanced", question: "A robust restaking design strives to avoid what systemic risk?", options: ["Monetary inflation", "Security contagion from over-correlated collateral", "Front-end downtime", "NFT rarity dilution"], answer: 1 },
  { level: "advanced", question: "Why separate collateral configuration from application security parameters?", options: ["To lock users in", "To enable tailored risk and upgrades per app", "To avoid audits", "To remove governance entirely"], answer: 1 },
  { level: "advanced", question: "Which outcome is desirable for cross-protocol collateral reuse?", options: ["Higher capital efficiency with bounded risk", "Uncapped leverage with no guardrails", "Single-asset dependency only", "Manual operator whitelists only"], answer: 0 },
  { level: "advanced", question: "What is a general role of an operator in restaking ecosystems?", options: ["Provide security/services to applications", "Mint NFTs", "Operate centralized order books", "Act as price oracle by hand"], answer: 0 },
  { level: "advanced", question: "A sound slashing policy in restaking typically aims to ______.", options: ["Punish honest behavior", "Deter misbehavior & align incentives", "Eliminate decentralization", "Reward downtime"], answer: 1 }
];

// Utility to fetch questions by level (or all)
function getQuestions(level) {
  if (level === "all") return QUESTION_BANK.slice();
  return QUESTION_BANK.filter(q => q.level === level);
}
