// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AutoProof
 * @dev Minimal and secure contract for logging deployment information
 *
 * REMIX DEPLOYMENT INSTRUCTIONS:
 * 1. Open https://remix.ethereum.org
 * 2. Create new file: AutoProof.sol
 * 3. Paste this entire file
 * 4. Compile with Solidity 0.8.20
 * 5. Deploy to BSC Testnet:
 *    - Environment: "Injected Provider - MetaMask"
 *    - Network: BSC Testnet (Chain ID: 97)
 *    - Get testnet BNB: https://testnet.bnbchain.org/faucet-smart
 * 6. Click "Deploy"
 * 7. Copy deployed contract address
 */
contract AutoProof {
    /**
     * @dev Emitted when a deployment is logged
     * @param user Address of the user logging the deployment
     * @param repoUrl URL of the repository being deployed
     * @param timestamp Block timestamp when deployment was logged
     */
    event DeploymentLogged(
        address indexed user,
        string repoUrl,
        uint256 timestamp
    );

    /**
     * @dev Log a deployment with repository URL
     * @param repoUrl The URL of the repository being deployed
     */
    function logDeployment(string memory repoUrl) external {
        require(bytes(repoUrl).length > 0, "Repository URL cannot be empty");

        emit DeploymentLogged(msg.sender, repoUrl, block.timestamp);
    }
}
