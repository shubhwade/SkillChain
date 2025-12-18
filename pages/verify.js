import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { formatAddress, formatDate, DEMO_WALLET, isDemoMode } from '../lib/demo';

export default function Verify() {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState(null);
    const [error, setError] = useState(null);

    async function handleVerify(e) {
        e.preventDefault();
        if (!address.trim()) return;

        setLoading(true);
        setError(null);
        setCredentials(null);

        try {
            const response = await fetch(`/api/verify?address=${encodeURIComponent(address.trim())}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Verification failed');
            }

            setCredentials(data.credentials);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Verify — SkillChain</title>
            </Head>

            <div className="min-h-screen py-12 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl font-bold text-white mb-3">Verify Credentials</h1>
                        <p className="text-neutral-400">
                            Enter a wallet address to view verified skill credentials.
                        </p>
                    </motion.div>

                    {/* Search form */}
                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleVerify}
                        className="card p-6 mb-8"
                    >
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Wallet Address
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="0x..."
                                className="input flex-1 font-mono text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!address.trim() || loading}
                                className={`btn-primary ${(!address.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? 'Checking...' : 'Verify'}
                            </button>
                        </div>

                        {isDemoMode() && (
                            <button
                                type="button"
                                onClick={() => setAddress(DEMO_WALLET)}
                                className="mt-3 text-xs text-accent-500 hover:text-accent-400"
                            >
                                Use demo wallet
                            </button>
                        )}
                    </motion.form>

                    {/* Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center mb-8"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results */}
                    <AnimatePresence mode="wait">
                        {credentials !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {credentials.length === 0 ? (
                                    <div className="card p-12 text-center">
                                        <h3 className="font-semibold text-white mb-2">No Credentials Found</h3>
                                        <p className="text-neutral-500 text-sm">
                                            This address has no verified credentials.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="font-semibold text-white">Credentials</h2>
                                            <span className="text-sm text-neutral-500">{credentials.length} found</span>
                                        </div>

                                        {credentials.map((cred, index) => (
                                            <motion.div
                                                key={cred.tokenId}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="card p-6"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            {cred.skillTitle || cred.skillId}
                                                        </h3>
                                                        <p className="text-sm text-neutral-500">Token #{cred.tokenId}</p>
                                                    </div>
                                                    <span className="badge badge-success">Verified</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-neutral-500 block">Score</span>
                                                        <span className="text-white">{cred.score}/100</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-neutral-500 block">Issued</span>
                                                        <span className="text-white">{formatDate(cred.issuedAt)}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-dark-700">
                                                    <span className="text-xs text-neutral-500">Transaction: </span>
                                                    <span className="text-xs text-neutral-400 font-mono">
                                                        {cred.txHash?.substring(0, 24)}...
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
