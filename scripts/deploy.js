/**
 * Deploy SkillCredential contract to a testnet
 * 
 * Usage:
 *   npx hardhat run scripts/deploy.js --network mumbai
 *   npx hardhat run scripts/deploy.js --network sepolia
 * 
 * Requirements:
 *   - Set RPC_URL in .env.local
 *   - Set PRIVATE_KEY in .env.local (deployer wallet with testnet funds)
 */

const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 Deploying SkillCredential contract...\n");

    // Get deployer info
    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", deployer.address);

    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Deployer balance:", ethers.formatEther(balance), "ETH\n");

    // Deploy contract
    const SkillCredential = await ethers.getContractFactory("SkillCredential");
    const contract = await SkillCredential.deploy();

    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();

    console.log("✅ SkillCredential deployed to:", contractAddress);
    console.log("   Transaction hash:", contract.deploymentTransaction().hash);

    // Save deployment info
    const deploymentInfo = {
        contractAddress,
        deployer: deployer.address,
        network: (await deployer.provider.getNetwork()).name,
        chainId: (await deployer.provider.getNetwork()).chainId.toString(),
        deployedAt: new Date().toISOString(),
        txHash: contract.deploymentTransaction().hash
    };

    const deployedPath = path.join(__dirname, "..", "data", "deployed.json");
    fs.writeFileSync(deployedPath, JSON.stringify(deploymentInfo, null, 2));

    console.log("\n📄 Deployment info saved to data/deployed.json");
    console.log("\n🎉 Deployment complete!");
    console.log("\nNext steps:");
    console.log("  1. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local");
    console.log("  2. Restart the dev server");
    console.log("  3. Test minting a credential");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment failed:", error);
        process.exit(1);
    });
