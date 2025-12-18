import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { formatAddress, DEMO_WALLET, isDemoMode } from '../lib/demo';

// Demo leaderboard data
const demoLeaderboard = [
    { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f8d2E1', skills: 6, totalScore: 540, username: 'blockchain_master' },
    { address: '0x8ba1f109551bD432803012645Hac136c22C0507', skills: 5, totalScore: 485, username: 'defi_wizard' },
    { address: '0x1234567890123456789012345678901234567890', skills: 5, totalScore: 470, username: 'nft_collector' },
    { address: DEMO_WALLET, skills: 4, totalScore: 380, username: 'you' },
    { address: '0xABCD567890123456789012345678901234567890', skills: 3, totalScore: 285, username: 'web3_learner' },
    { address: '0xEFGH567890123456789012345678901234567890', skills: 3, totalScore: 270, username: 'crypto_newbie' },
    { address: '0xIJKL567890123456789012345678901234567890', skills: 2, totalScore: 180, username: 'solidity_dev' },
    { address: '0xMNOP567890123456789012345678901234567890', skills: 2, totalScore: 165, username: 'eth_builder' },
];

export default function Leaderboard() {
    const [timeframe, setTimeframe] = useState('all');
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // In demo mode, use demo data
        if (isDemoMode()) {
            setLeaderboard(demoLeaderboard);
        } else {
            // Would fetch from API in production
            setLeaderboard(demoLeaderboard);
        }
    }, []);

    return (
        <Layout>
            <Head>
                <title>Leaderboard — SkillChain</title>
            </Head>

            <div className="min-h-screen py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl font-bold text-white mb-3">Leaderboard</h1>
                        <p className="text-neutral-400">
                            Top performers ranked by verified skills and scores
                        </p>
                    </motion.div>

                    {/* Timeframe filter */}
                    <div className="flex justify-center gap-2 mb-8">
                        {['all', 'month', 'week'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeframe === t
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-dark-800 text-neutral-400 hover:text-white'
                                    }`}
                            >
                                {t === 'all' ? 'All Time' : t === 'month' ? 'This Month' : 'This Week'}
                            </button>
                        ))}
                    </div>

                    {/* Top 3 Podium */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center items-end gap-4 mb-12"
                    >
                        {/* 2nd Place - Silver */}
                        {leaderboard[1] && (
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-neutral-500/20 border-2 border-neutral-400 flex items-center justify-center mb-2">
                                    <span className="text-2xl font-bold text-neutral-300">2</span>
                                </div>
                                <div className="text-sm font-medium text-white mb-1">{leaderboard[1].username}</div>
                                <div className="text-xs text-neutral-500 mb-2">{leaderboard[1].skills} skills</div>
                                <div className="h-20 w-24 bg-neutral-500/20 rounded-t-lg flex items-center justify-center border-t-2 border-neutral-400">
                                    <span className="text-neutral-300 font-bold">{leaderboard[1].totalScore}</span>
                                </div>
                            </div>
                        )}

                        {/* 1st Place - Gold */}
                        {leaderboard[0] && (
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-2">
                                    <span className="text-3xl font-bold text-amber-400">1</span>
                                </div>
                                <div className="text-sm font-medium text-white mb-1">{leaderboard[0].username}</div>
                                <div className="text-xs text-neutral-500 mb-2">{leaderboard[0].skills} skills</div>
                                <div className="h-28 w-28 bg-amber-500/20 rounded-t-lg flex items-center justify-center border-t-2 border-amber-400">
                                    <span className="text-amber-400 font-bold text-lg">{leaderboard[0].totalScore}</span>
                                </div>
                            </div>
                        )}

                        {/* 3rd Place - Bronze */}
                        {leaderboard[2] && (
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-amber-700/20 border-2 border-amber-600 flex items-center justify-center mb-2">
                                    <span className="text-2xl font-bold text-amber-600">3</span>
                                </div>
                                <div className="text-sm font-medium text-white mb-1">{leaderboard[2].username}</div>
                                <div className="text-xs text-neutral-500 mb-2">{leaderboard[2].skills} skills</div>
                                <div className="h-14 w-24 bg-amber-700/20 rounded-t-lg flex items-center justify-center border-t-2 border-amber-600">
                                    <span className="text-amber-600 font-bold">{leaderboard[2].totalScore}</span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Full Leaderboard Table */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="card overflow-hidden"
                    >
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-700">
                                    <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Rank</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">User</th>
                                    <th className="text-center text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Skills</th>
                                    <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry, index) => (
                                    <motion.tr
                                        key={entry.address}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`border-b border-dark-800 hover:bg-dark-800/50 transition-colors ${entry.address === DEMO_WALLET ? 'bg-accent-600/10' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${index === 0 ? 'text-amber-500' :
                                                index === 1 ? 'text-neutral-400' :
                                                    index === 2 ? 'text-amber-700' : 'text-neutral-500'
                                                }`}>
                                                #{index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-white flex items-center gap-2">
                                                    {entry.username}
                                                    {entry.address === DEMO_WALLET && (
                                                        <span className="px-2 py-0.5 bg-accent-600/20 text-accent-500 text-xs rounded">You</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-neutral-500 font-mono">{formatAddress(entry.address)}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-white">{entry.skills}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-white">{entry.totalScore}</span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-center"
                    >
                        <Link href="/dashboard">
                            <button className="btn-primary">
                                Earn More Credentials
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
