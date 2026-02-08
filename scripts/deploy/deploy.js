const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 Starting deployment...\n");

    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    const balance = await hre.ethers.provider.getBalance(deployer.address);

    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

    // Deploy AutoProof contract
    console.log("📝 Deploying AutoProof contract...");
    const AutoProof = await hre.ethers.getContractFactory("AutoProof");
    const autoProof = await AutoProof.deploy();
    await autoProof.waitForDeployment();

    const contractAddress = await autoProof.getAddress();
    console.log("✅ AutoProof deployed to:", contractAddress);

    // Save contract address to frontend
    const deploymentInfo = {
        contractAddress: contractAddress,
        network: hre.network.name,
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
    };

    const frontendDir = path.join(__dirname, "../../frontend/src/utils");
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }

    const deploymentPath = path.join(frontendDir, "deployment.json");
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("📄 Deployment info saved to:", deploymentPath);

    // Save ABI
    const artifactPath = path.join(__dirname, "../../artifacts/contracts/Main.sol/AutoProof.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const abiPath = path.join(frontendDir, "AutoProof.abi.json");
    fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
    console.log("📄 ABI saved to:", abiPath);

    console.log("\n✨ Deployment completed successfully!");
    console.log("\n🔗 Next steps:");
    console.log("1. Update your frontend with the contract address");
    console.log("2. If deploying to a public network, verify the contract:");
    console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
