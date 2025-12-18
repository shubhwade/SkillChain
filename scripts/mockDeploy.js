/**
 * Mock Deploy Script
 * 
 * Creates a fake deployed.json file for demo mode.
 * No blockchain connection required.
 * 
 * Usage:
 *   node scripts/mockDeploy.js
 */

const fs = require("fs");
const path = require("path");

function main() {
    console.log("🎭 Creating mock deployment for demo mode...\n");

    const deploymentInfo = {
        contractAddress: "0xDEMO_SKILLCHAIN_CREDENTIAL_CONTRACT",
        deployer: "0xDEMO000000000000000000000000000000000001",
        network: "demo",
        chainId: "0",
        deployedAt: new Date().toISOString(),
        txHash: "0xDEMO_DEPLOYMENT_TX_HASH",
        demoMode: true
    };

    const deployedPath = path.join(__dirname, "..", "data", "deployed.json");

    // Ensure data directory exists
    const dataDir = path.dirname(deployedPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(deployedPath, JSON.stringify(deploymentInfo, null, 2));

    console.log("✅ Mock deployment created at data/deployed.json");
    console.log("\n📋 Deployment details:");
    console.log(`   Contract: ${deploymentInfo.contractAddress}`);
    console.log(`   Network: ${deploymentInfo.network}`);
    console.log(`   Mode: Demo (no blockchain required)`);
    console.log("\n🚀 You can now run: npm run demo");
}

main();
