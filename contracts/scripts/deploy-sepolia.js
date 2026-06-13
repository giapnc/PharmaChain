const { ethers, network } = require("hardhat");

async function main() {
    console.log("\n==============================");
    console.log("🚀 DEPLOY TO SEPOLIA");
    console.log("==============================\n");

    console.log("Network:", network.name);

    const [deployer] = await ethers.getSigners();

    console.log("Deploying with account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

    // Get contract
    const DrugTraceability = await ethers.getContractFactory("DrugTraceability");

    console.log("⏳ Deploying contract...");

    const contract = await DrugTraceability.deploy();

    await contract.waitForDeployment();

    const address = await contract.getAddress();

    console.log("\n==============================");
    console.log("✅ DEPLOY SUCCESS");
    console.log("==============================");
    console.log("Contract Address:", address);
    console.log("Transaction Hash:", contract.deploymentTransaction().hash);
    console.log("Explorer:", `https://sepolia.etherscan.io/address/${address}`);
    console.log("==============================\n");
}

main().catch((error) => {
    console.error("❌ DEPLOY FAILED:");
    console.error(error);
    process.exitCode = 1;
});
