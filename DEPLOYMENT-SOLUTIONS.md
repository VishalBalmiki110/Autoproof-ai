# Deployment Solutions for AutoProof Contract

## 🎯 Three Ways to Deploy

You have **three options** to work around the Hardhat compiler download issue.

---

## ✅ Option 1: Remix IDE (Fastest & Easiest)

### Step-by-Step:

1. **Open Remix**
   - Go to https://remix.ethereum.org

2. **Create Contract File**
   - Click "Create New File"
   - Name it `AutoProof.sol`
   - Copy contents from [AutoProof-Remix.sol](file:///Users/vishalbalmiki/Work/Autoproof-ai/AutoProof-Remix.sol)

3. **Compile**
   - Go to "Solidity Compiler" tab (left sidebar)
   - Set compiler version: `0.8.20`
   - Click "Compile AutoProof.sol"

4. **Deploy to BSC Testnet**
   - Go to "Deploy & Run Transactions" tab
   - Environment: `Injected Provider - MetaMask`
   - Ensure MetaMask is on BSC Testnet:
     - Network Name: BSC Testnet
     - RPC: https://data-seed-prebsc-1-s1.binance.org:8545
     - Chain ID: 97
     - Symbol: tBNB
   - Get testnet BNB: https://testnet.bnbchain.org/faucet-smart
   - Click **Deploy**

5. **Save Contract Address**
   - Copy the deployed contract address
   - Update your frontend with this address

---

## 🔧 Option 2: Manual Compiler Download

We've created a script to download the Solidity compiler manually.

### Run the Script:

```bash
./download-compiler.sh
```

**What it does:**
- Downloads Solidity 0.8.20 compiler
- Saves to `~/.soljson/`
- Creates symlinks for Hardhat

**After running:**
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network bscTestnet
```

### Manual Download (if script fails):

```bash
# Create directory
mkdir -p ~/.soljson
cd ~/.soljson

# Download with curl
curl -k -o soljson-v0.8.20+commit.a1b79de6.js \
  https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js

# Create symlink
ln -sf soljson-v0.8.20+commit.a1b79de6.js soljson-v0.8.20.js
```

---

## 🌐 Option 3: Fix Network/SSL Settings

The error is caused by SSL certificate validation issues.

### Quick Fixes:

**A. Disable SSL Verification (Temporary)**
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npx hardhat compile
```

**B. Use HTTP Registry**
```bash
npm config set registry http://registry.npmjs.org/
```

**C. Configure NPM SSL**
```bash
npm config set strict-ssl false
npx hardhat compile
npm config set strict-ssl true
```

**D. Check Firewall/Proxy**
- Ensure ports 80/443 are open
- If behind corporate proxy, configure:
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

---

## 📊 Comparison

| Method | Speed | Difficulty | Control |
|--------|-------|------------|---------|
| **Remix** | ⚡ Fast | 🟢 Easy | Limited |
| **Manual Compiler** | ⏱️ Medium | 🟡 Medium | Full |
| **Fix Network** | ⏱️ Varies | 🔴 Hard | Full |

---

## 💡 Recommended Approach

**For Hackathon/Quick Deploy:** Use **Remix** (Option 1)
- Get deployed in 5 minutes
- No local setup needed
- Works immediately

**For Development:** Fix with **Manual Compiler** (Option 2)
- Run the provided script
- Keep using Hardhat locally
- Better long-term solution

---

## 📝 Files Created

1. [AutoProof-Remix.sol](file:///Users/vishalbalmiki/Work/Autoproof-ai/AutoProof-Remix.sol) - Single-file contract for Remix
2. [download-compiler.sh](file:///Users/vishalbalmiki/Work/Autoproof-ai/download-compiler.sh) - Compiler download script

---

## 🚀 Next Steps

**Choose your path:**
- Quick deploy? → Use Remix
- Fix Hardhat? → Run `./download-compiler.sh`
- Network issues? → Try SSL fixes above

All methods deploy the same contract to BSC Testnet!
