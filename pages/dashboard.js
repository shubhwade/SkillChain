import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SkillCard from '../components/SkillCard';
import { AchievementBadges } from '../components/Achievements';
import skills from '../data/skills.json';

export default function Dashboard() {
    const [completedSkills, setCompletedSkills] = useState([]);
    const [filter, setFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    const skillList = Object.values(skills);

    // Get unique categories
    const categories = ['all', ...new Set(skillList.map(s => s.category))];
    const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

    // Filter skills
    const filteredSkills = skillList.filter(skill => {
        const categoryMatch = filter === 'all' || skill.category === filter;
        const difficultyMatch = difficultyFilter === 'all' || skill.difficulty === difficultyFilter;
        return categoryMatch && difficultyMatch;
    });

    useEffect(() => {
        const saved = localStorage.getItem('skillchain_completed');
        if (saved) {
            try {
                setCompletedSkills(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load completed skills');
            }
        }
    }, []);

    return (
        <Layout>
            <Head>
                <title>Skills — SkillChain</title>
            </Head>

            <div className="min-h-screen py-12 px-6">
                <div className="container-wide">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Skill Assessments
                                </h1>
                                <p className="text-neutral-400">
                                    Complete assessments to earn verified credentials
                                </p>
                            </div>
                            <Link href="/leaderboard">
                                <button className="btn-secondary text-sm">
                                    View Leaderboard
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8 flex flex-wrap gap-4"
                    >
                        {/* Category filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500">Category:</span>
                            <div className="flex gap-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === cat
                                                ? 'bg-accent-600 text-white'
                                                : 'bg-dark-800 text-neutral-400 hover:text-white'
                                            }`}
                                    >
                                        {cat === 'all' ? 'All' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500">Difficulty:</span>
                            <div className="flex gap-1">
                                {difficulties.map(diff => (
                                    <button
                                        key={diff}
                                        onClick={() => setDifficultyFilter(diff)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${difficultyFilter === diff
                                                ? 'bg-accent-600 text-white'
                                                : 'bg-dark-800 text-neutral-400 hover:text-white'
                                            }`}
                                    >
                                        {diff === 'all' ? 'All' : diff}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar - Progress & Achievements */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="space-y-6 sticky top-24">
                                {/* Progress Card */}
                                <div className="card p-6">
                                    <h2 className="font-semibold text-white mb-6">Progress</h2>

                                    {/* Progress ring */}
                                    <div className="relative w-28 h-28 mx-auto mb-6">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle
                                                cx="56"
                                                cy="56"
                                                r="48"
                                                stroke="currentColor"
                                                strokeWidth="6"
                                                fill="none"
                                                className="text-dark-700"
                                            />
                                            <circle
                                                cx="56"
                                                cy="56"
                                                r="48"
                                                stroke="currentColor"
                                                strokeWidth="6"
                                                fill="none"
                                                strokeLinecap="round"
                                                className="text-accent-600"
                                                strokeDasharray={`${(completedSkills.length / skillList.length) * 301} 301`}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <span className="text-2xl font-bold text-white">{completedSkills.length}</span>
                                                <span className="text-neutral-500">/{skillList.length}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Completed</span>
                                            <span className="text-white">{completedSkills.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Available</span>
                                            <span className="text-white">{skillList.length - completedSkills.length}</span>
                                        </div>
                                    </div>

                                    <div className="divider my-6" />

                                    <a
                                        href="/verify"
                                        className="text-sm text-accent-500 hover:text-accent-400 transition-colors"
                                    >
                                        View credentials →
                                    </a>
                                </div>

                                {/* Achievements Card */}
                                <div className="card p-6">
                                    <AchievementBadges
                                        completedCount={completedSkills.length}
                                        totalSkills={skillList.length}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Main content - Skill cards */}
                        <div className="lg:col-span-3">
                            {filteredSkills.length === 0 ? (
                                <div className="card p-12 text-center">
                                    <p className="text-neutral-500">No skills match the selected filters.</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filteredSkills.map((skill, index) => (
                                        <SkillCard
                                            key={skill.id}
                                            skill={skill}
                                            index={index}
                                            completed={completedSkills.includes(skill.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
