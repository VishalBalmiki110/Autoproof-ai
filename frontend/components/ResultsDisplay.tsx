'use client'

interface ResultsDisplayProps {
    txHash: string
    explorerLink: string
}

export default function ResultsDisplay({ txHash, explorerLink }: ResultsDisplayProps) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Proof Generated!</h3>
                        <p className="text-emerald-50">Your deployment is now onchain</p>
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-6">
                {/* Transaction Hash */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Hash
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm text-gray-700 overflow-x-auto">
                            {txHash}
                        </div>
                        <button
                            onClick={() => copyToClipboard(txHash)}
                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-colors"
                            title="Copy to clipboard"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Explorer Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        View on BSCScan
                    </label>
                    <a
                        href={explorerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                    >
                        <span>View Transaction</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                {/* Success Message */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-emerald-900 mb-1">Transaction Confirmed</h4>
                            <p className="text-sm text-emerald-700">
                                Your deployment proof has been permanently recorded on the BSC blockchain.
                                This transaction serves as immutable evidence of your deployment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
