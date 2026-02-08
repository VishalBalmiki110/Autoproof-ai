'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract'
import { generateProofSummary } from '@/lib/ai-service'

interface ProofGeneratorProps {
    onSuccess: (txHash: string) => void
}

export default function ProofGenerator({ onSuccess }: ProofGeneratorProps) {
    const [repoUrl, setRepoUrl] = useState('')
    const [aiSummary, setAiSummary] = useState('')
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const { isConnected } = useAccount()
    const { data: hash, writeContract, isPending, error } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const handleGenerateSummary = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!repoUrl.trim() || !isConnected) return

        setIsGeneratingSummary(true)
        try {
            const summary = await generateProofSummary(repoUrl)
            setAiSummary(summary)
            setShowConfirmation(true)
        } catch (err) {
            console.error('Error generating summary:', err)
        } finally {
            setIsGeneratingSummary(false)
        }
    }

    const handleConfirmTransaction = async () => {
        try {
            writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: CONTRACT_ABI,
                functionName: 'logDeployment',
                args: [repoUrl],
            })
            setShowConfirmation(false)
        } catch (err) {
            console.error('Error calling contract:', err)
        }
    }

    const handleCancel = () => {
        setShowConfirmation(false)
        setAiSummary('')
    }

    // Call onSuccess when transaction is confirmed
    useEffect(() => {
        if (isSuccess && hash) {
            onSuccess(hash)
            setRepoUrl('')
            setAiSummary('')
        }
    }, [isSuccess, hash, onSuccess])

    const isLoading = isPending || isConfirming

    return (
        <div className="space-y-6">
            <form onSubmit={handleGenerateSummary} className="space-y-6">
                <div>
                    <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub Repository URL
                    </label>
                    <input
                        id="repoUrl"
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/username/repository"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                        disabled={!isConnected || isLoading || showConfirmation}
                    />
                    {!isConnected && (
                        <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Please connect your wallet first
                        </p>
                    )}
                    {error && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error.message || 'Transaction failed'}
                        </p>
                    )}
                </div>

                {!showConfirmation && (
                    <button
                        type="submit"
                        disabled={!isConnected || isGeneratingSummary || isLoading || !repoUrl.trim()}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {isGeneratingSummary ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing with AI...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Generate Proof with AI
                            </span>
                        )}
                    </button>
                )}
            </form>

            {/* AI Summary Confirmation */}
            {showConfirmation && (
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-xl p-6 space-y-4 animate-fadeIn">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">AI-Generated Proof Summary</h4>
                            <p className="text-gray-700 italic">"{aiSummary}"</p>
                            <p className="text-xs text-gray-500 mt-2">Review the summary above before confirming the transaction</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleConfirmTransaction}
                            disabled={isLoading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isPending ? 'Confirming...' : 'Processing...'}
                                </span>
                            ) : (
                                'Confirm & Send Transaction'
                            )}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
