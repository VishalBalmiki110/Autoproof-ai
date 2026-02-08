export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' // Replace with deployed address

export const CONTRACT_ABI = [
    {
        "type": "function",
        "name": "logDeployment",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "repoUrl",
                "type": "string"
            }
        ],
        "outputs": []
    },
    {
        "type": "event",
        "name": "DeploymentLogged",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true
            },
            {
                "name": "repoUrl",
                "type": "string",
                "indexed": false
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false
            }
        ]
    }
] as const
