#!/bin/bash

# Script to manually download Solidity compiler for Hardhat
# This resolves the HH502 error when Hardhat can't download the compiler

echo "🔧 Downloading Solidity Compiler 0.8.20..."

# Create solc directory if it doesn't exist
mkdir -p ~/.soljson

# Download the specific compiler version
cd ~/.soljson

# Download using curl with insecure flag (for SSL issues)
curl -k -o soljson-v0.8.20+commit.a1b79de6.js \
  https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js

if [ $? -eq 0 ]; then
    echo "✅ Compiler downloaded successfully!"
    echo "📁 Location: ~/.soljson/soljson-v0.8.20+commit.a1b79de6.js"
    
    # Create symlink for Hardhat
    ln -sf soljson-v0.8.20+commit.a1b79de6.js soljson-v0.8.20.js
    
    echo ""
    echo "🚀 Now try running:"
    echo "   npx hardhat compile"
else
    echo "❌ Download failed. Trying alternative method..."
    
    # Try with wget
    wget --no-check-certificate \
      https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js
    
    if [ $? -eq 0 ]; then
        echo "✅ Compiler downloaded successfully with wget!"
    else
        echo "❌ Both curl and wget failed."
        echo "Please try downloading manually from:"
        echo "https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js"
    fi
fi
