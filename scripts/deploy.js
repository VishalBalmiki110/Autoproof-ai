const hre = require("hardhat");

async function main() {
    console.log("Deploying AutoProof contract to BSC Testnet...");

    const AutoProof = await hre.ethers.getContractFactory("AutoProof");
    const autoProof = await AutoProof.deploy();

    await autoProof.waitForDeployment();

    const address = await autoProof.getAddress();

    console.log("AutoProof deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
