const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AutoProof Contract", function () {
    let autoProof;
    let owner;
    let user1;
    let user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        const AutoProof = await ethers.getContractFactory("AutoProof");
        autoProof = await AutoProof.deploy();
        await autoProof.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should deploy successfully", async function () {
            expect(await autoProof.getAddress()).to.be.properAddress;
        });
    });

    describe("Log Deployment", function () {
        it("Should log deployment successfully", async function () {
            const repoUrl = "https://github.com/user/repo";

            const tx = await autoProof.connect(user1).logDeployment(repoUrl);
            const receipt = await tx.wait();

            // Check event emission
            const event = receipt.logs.find(log => {
                try {
                    const parsedLog = autoProof.interface.parseLog(log);
                    return parsedLog.name === "DeploymentLogged";
                } catch {
                    return false;
                }
            });

            expect(event).to.not.be.undefined;

            // Parse the event data
            const parsedEvent = autoProof.interface.parseLog(event);
            expect(parsedEvent.args.user).to.equal(user1.address);
            expect(parsedEvent.args.repoUrl).to.equal(repoUrl);
            expect(parsedEvent.args.timestamp).to.be.a('bigint');
        });

        it("Should reject empty repository URL", async function () {
            await expect(
                autoProof.connect(user1).logDeployment("")
            ).to.be.revertedWith("Repository URL cannot be empty");
        });

        it("Should allow multiple deployments from same user", async function () {
            const repoUrl1 = "https://github.com/user/repo1";
            const repoUrl2 = "https://github.com/user/repo2";

            await autoProof.connect(user1).logDeployment(repoUrl1);
            await autoProof.connect(user1).logDeployment(repoUrl2);

            // Both should succeed without error
        });

        it("Should emit event with correct timestamp", async function () {
            const repoUrl = "https://github.com/user/repo";

            const tx = await autoProof.connect(user1).logDeployment(repoUrl);
            const receipt = await tx.wait();
            const block = await ethers.provider.getBlock(receipt.blockNumber);

            const event = receipt.logs.find(log => {
                try {
                    return autoProof.interface.parseLog(log).name === "DeploymentLogged";
                } catch {
                    return false;
                }
            });

            const parsedEvent = autoProof.interface.parseLog(event);
            expect(parsedEvent.args.timestamp).to.equal(block.timestamp);
        });

        it("Should allow different users to log deployments", async function () {
            const repoUrl1 = "https://github.com/user1/repo";
            const repoUrl2 = "https://github.com/user2/repo";

            const tx1 = await autoProof.connect(user1).logDeployment(repoUrl1);
            const tx2 = await autoProof.connect(user2).logDeployment(repoUrl2);

            const receipt1 = await tx1.wait();
            const receipt2 = await tx2.wait();

            const event1 = receipt1.logs.find(log => {
                try {
                    return autoProof.interface.parseLog(log).name === "DeploymentLogged";
                } catch {
                    return false;
                }
            });

            const event2 = receipt2.logs.find(log => {
                try {
                    return autoProof.interface.parseLog(log).name === "DeploymentLogged";
                } catch {
                    return false;
                }
            });

            const parsedEvent1 = autoProof.interface.parseLog(event1);
            const parsedEvent2 = autoProof.interface.parseLog(event2);

            expect(parsedEvent1.args.user).to.equal(user1.address);
            expect(parsedEvent2.args.user).to.equal(user2.address);
        });
    });
});
