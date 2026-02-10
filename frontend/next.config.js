/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    output: 'standalone', // Required for Docker containerization
    webpack: (config) => {
        const webpack = require('webpack')

        // Replace optional peer dependencies with empty stubs to prevent build errors
        // These are connectors we don't use (only using injected connector)
        const unusedModules = [
            'porto',
            'porto/internal',
            '@base-org/account',
            '@coinbase/wallet-sdk',
            '@gemini-wallet/core',
            '@metamask/sdk',
            '@safe-global/safe-apps-sdk',
            '@safe-global/safe-apps-provider',
            '@walletconnect/ethereum-provider',
        ]

        unusedModules.forEach(moduleName => {
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(
                    new RegExp(moduleName.replace(/[\/]/g, '\\/')),
                    path.resolve(__dirname, 'lib/empty-stub.js')
                )
            )
        })

        return config
    },
}

module.exports = nextConfig
