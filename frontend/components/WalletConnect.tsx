'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function WalletConnect() {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()

    const handleConnect = () => {
        const metaMaskConnector = connectors.find(c => c.id === 'injected')
        if (metaMaskConnector) {
            connect({ connector: metaMaskConnector })
        }
    }

    return (
        <div>
            {!isConnected ? (
                <button
                    onClick={handleConnect}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Connect Wallet
                </button>
            ) : (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-700 font-medium">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                    </div>
                    <button
                        onClick={() => disconnect()}
                        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    )
}
