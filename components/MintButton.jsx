import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isDemoMode, simulateDelay, generateMockTxHash, generateMockTokenId } from '../lib/demo';

export default function MintButton({ skillId, skillTitle, score, walletAddress, onMintSuccess }) {
    const [status, setStatus] = useState('idle');
    const [txData, setTxData] = useState(null);
    const [error, setError] = useState(null);

    async function handleMint() {
        if (!walletAddress) {
            setError('Please connect your wallet first');
            return;
        }

        if (score < 60) {
            setError('Score must be at least 60 to mint');
            return;
        }

        setStatus('minting');
        setError(null);

        try {
            const response = await fetch('/api/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,
                    skillId,
                    skillTitle,
                    score
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Minting failed');
            }

            setTxData(data);
            setStatus('success');
            onMintSuccess?.(data);

        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }

    if (status === 'success' && txData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Credential Minted</h3>
                        <p className="text-sm text-neutral-500">Token #{txData.tokenId}</p>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-neutral-500">Transaction</span>
                        <span className="font-mono text-neutral-300 text-xs">
                            {txData.txHash?.substring(0, 16)}...
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-500">Skill</span>
                        <span className="text-white">{skillTitle}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-500">Score</span>
                        <span className="text-white">{score}/100</span>
                    </div>
                </div>

                {txData.demoMode && (
                    <p className="mt-4 text-xs text-neutral-500 text-center">
                        Demo mode — transaction simulated
                    </p>
                )}
            </motion.div>
        );
    }

    return (
        <div className="card p-6">
            <h3 className="font-semibold text-white mb-2">Mint Credential</h3>
            <p className="text-sm text-neutral-400 mb-4">
                Create an NFT credential for this verified skill.
            </p>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm mb-4"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            <button
                onClick={handleMint}
                disabled={status === 'minting' || !walletAddress}
                className={`w-full btn-primary ${status === 'minting' || !walletAddress ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {status === 'minting' ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Minting...
                    </span>
                ) : (
                    'Mint Credential'
                )}
            </button>

            {!walletAddress && (
                <p className="text-xs text-neutral-500 text-center mt-2">
                    Connect wallet to mint
                </p>
            )}
        </div>
    );
}
