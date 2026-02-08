# Autoproof AI - Web3 Hackathon Project

## 🚀 Project Structure

```
autoproof-ai/
├── contracts/              # Smart contracts
│   ├── Main.sol           # AutoProof contract
│   ├── interfaces/        # Contract interfaces
│   └── libraries/         # Utility libraries
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── contexts/     # React contexts
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
├── scripts/               # Deployment & interaction scripts
│   └── deploy.js         # BSC testnet deployment
└── test/                  # Smart contract tests
    └── unit/             # Unit tests
```

## 📦 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add:
- `PRIVATE_KEY` - Your wallet private key (without 0x)
- `BSCSCAN_API_KEY` - BSCScan API key for verification (optional)

### 3. Compile Contract
```bash
npx hardhat compile
```

## 🚀 Deploy to BSC Testnet

```bash
npm run deploy
```

This will deploy the AutoProof contract to BSC Testnet and print the contract address.

### Manual Deployment
```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

## 🧪 Testing

```bash
npx hardhat test
```

## 🔧 BSC Testnet Details

- **Network**: BSC Testnet
- **Chain ID**: 97
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545
- **Faucet**: https://testnet.bnbchain.org/faucet-smart

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity ^0.8.20
- **Framework**: Hardhat
- **Network**: BSC Testnet
- **Frontend**: React + Vite

## 📄 Contract

**AutoProof.sol** - Minimal deployment logging contract
- Event: `DeploymentLogged(address user, string repoUrl, uint256 timestamp)`
- Function: `logDeployment(string repoUrl)`

## 📝 License

MIT
# Autoproof-ai
