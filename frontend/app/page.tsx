'use client'

import { useState } from 'react'
import WalletConnect from '@/components/WalletConnect'
import ProofGenerator from '@/components/ProofGenerator'
import ResultsDisplay from '@/components/ResultsDisplay'

export default function Home() {
    const [txHash, setTxHash] = useState('')

    const handleProofSuccess = (hash: string) => {
        setTxHash(hash)
    }

    const explorerLink = txHash ? `https://testnet.bscscan.com/tx/${txHash}` : ''

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                AutoProof
                            </h1>
                            <p className="text-sm text-gray-500">Onchain Deployment Verification</p>
                        </div>
                    </div>
                    <WalletConnect />
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Prove Your Deployments{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                            Onchain
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Generate cryptographic proofs of your code deployments on BSC Testnet.
                        Immutable, verifiable, and transparent.
                    </p>
                </div>

                {/* Main Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-6">
                            <h3 className="text-2xl font-bold text-white">Generate Proof</h3>
                            <p className="text-blue-50 mt-1">Submit your GitHub repository for onchain verification</p>
                        </div>

                        <div className="p-8">
                            <ProofGenerator onSuccess={handleProofSuccess} />
                        </div>
                    </div>

                    {/* Results */}
                    {txHash && (
                        <div className="mt-8">
                            <ResultsDisplay
                                txHash={txHash}
                                explorerLink={explorerLink}
                            />
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Immutable Records</h4>
                        <p className="text-gray-600 text-sm">Deployments are permanently recorded on BSC blockchain</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cryptographically Verified</h4>
                        <p className="text-gray-600 text-sm">Smart contracts ensure authenticity and integrity</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
                        <p className="text-gray-600 text-sm">BSC Testnet provides quick confirmation times</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20">
                <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
                    <p>Built for Web3 Hackathon • Powered by BSC Testnet</p>
                </div>
            </footer>
        </main>
    )
}
