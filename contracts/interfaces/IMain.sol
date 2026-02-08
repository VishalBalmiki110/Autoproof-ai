// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IAutoProof
 * @dev Interface for the AutoProof contract
 */
interface IAutoProof {
    /**
     * @dev Emitted when a deployment is logged
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
    function logDeployment(string memory repoUrl) external;
}
