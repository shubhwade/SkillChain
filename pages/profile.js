import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Certificate, AchievementBadges, ShareButtons } from '../components/Achievements';
import { DEMO_WALLET, formatAddress, isDemoMode } from '../lib/demo';
import skills from '../data/skills.json';

// Demo credentials data
const demoCredentials = [
    {
        skillId: 'smart-contracts',
        tokenId: 42,
        score: 92,
        issuedAt: '2024-12-15T10:30:00Z',
        txHash: '0xabc123...def456'
    },
    {
        skillId: 'blockchain-basics',
        tokenId: 38,
        score: 88,
        issuedAt: '2024-12-14T14:20:00Z',
        txHash: '0x789abc...123def'
    }
];

export default function Profile() {
    const [walletAddress, setWalletAddress] = useState(null);
    const [credentials, setCredentials] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Auto-connect in demo mode
        if (isDemoMode()) {
            setWalletAddress(DEMO_WALLET);
            setCredentials(demoCredentials);
        }
        setLoading(false);
    }, []);

    const skillList = Object.values(skills);
    const completedCount = credentials.length;
    const totalScore = credentials.reduce((sum, c) => sum + c.score, 0);

    return (
        <Layout>
            <Head>
                <title>My Profile — SkillChain</title>
            </Head>

            <div className="min-h-screen py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card p-8 mb-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">
                                        {walletAddress ? walletAddress.slice(2, 4).toUpperCase() : '??'}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">
                                        {walletAddress ? formatAddress(walletAddress) : 'Not Connected'}
                                    </h1>
                                    <p className="text-sm text-neutral-500">
                                        Member since Dec 2024
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{completedCount}</div>
                                    <div className="text-xs text-neutral-500">Credentials</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{totalScore}</div>
                                    <div className="text-xs text-neutral-500">Total Score</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-accent-500">#4</div>
                                    <div className="text-xs text-neutral-500">Rank</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Credentials */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="section-title">My Credentials</h2>

                            {loading ? (
                                <div className="card p-8 text-center">
                                    <div className="animate-spin w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full mx-auto" />
                                </div>
                            ) : credentials.length === 0 ? (
                                <div className="card p-8 text-center">
                                    <p className="text-neutral-500 mb-4">No credentials yet</p>
                                    <Link href="/dashboard">
                                        <button className="btn-primary">Start Learning</button>
                                    </Link>
                                </div>
                            ) : (
                                credentials.map((cred, i) => {
                                    const skill = skills[cred.skillId];
                                    return (
                                        <motion.div
                                            key={cred.tokenId}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="card p-5 hover:border-accent-600/50 transition-colors cursor-pointer"
                                            onClick={() => setSelectedCert(cred)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center">
                                                        <span className="font-bold text-accent-500">{skill?.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-white">{skill?.title}</h3>
                                                        <p className="text-xs text-neutral-500">
                                                            Token #{cred.tokenId} · {new Date(cred.issuedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-white">{cred.score}/100</div>
                                                    <div className="text-xs text-emerald-400">Verified</div>
                                                </div>
                                            </div>

                                            {/* Share buttons */}
                                            <div className="mt-4 pt-4 border-t border-dark-700">
                                                <ShareButtons skillTitle={skill?.title} score={cred.score} />
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Achievements */}
                            <div className="card p-6">
                                <AchievementBadges completedCount={completedCount} totalSkills={skillList.length} />
                            </div>

                            {/* Quick links */}
                            <div className="card p-6">
                                <h3 className="section-title mb-4">Quick Links</h3>
                                <div className="space-y-2">
                                    <Link href="/dashboard" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                        → Earn more credentials
                                    </Link>
                                    <Link href="/leaderboard" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                        → View leaderboard
                                    </Link>
                                    <Link href="/verify" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                        → Verify credentials
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Modal */}
                    {selectedCert && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm"
                            onClick={() => setSelectedCert(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="max-w-lg w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Certificate
                                    skillTitle={skills[selectedCert.skillId]?.title}
                                    score={selectedCert.score}
                                    walletAddress={walletAddress}
                                    tokenId={selectedCert.tokenId}
                                    issuedAt={selectedCert.issuedAt}
                                />
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => setSelectedCert(null)}
                                        className="btn-secondary"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
