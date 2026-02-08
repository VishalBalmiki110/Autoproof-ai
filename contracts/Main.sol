// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AutoProof
 * @dev Minimal and secure contract for logging deployment information
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
