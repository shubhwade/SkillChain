import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import AiTerminal from '../../components/AiTerminal';
import MintButton from '../../components/MintButton';
import WalletConnect from '../../components/WalletConnect';
import skills from '../../data/skills.json';
import demoAnswers from '../../data/demo-answers.json';
import { isDemoMode } from '../../lib/demo';

export default function SkillAttempt() {
    const router = useRouter();
    const { id } = router.query;

    const [skill, setSkill] = useState(null);
    const [answer, setAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [demoActive, setDemoActive] = useState(false);

    useEffect(() => {
        if (id && skills[id]) {
            setSkill(skills[id]);
        }
        setDemoActive(isDemoMode());
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!answer.trim() || submitting) return;

        setSubmitting(true);
        setEvaluation(null);

        try {
            const response = await fetch('/api/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    skillId: id,
                    answer: answer.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Evaluation failed');
            }

            setEvaluation(data);

            if (data.pass) {
                const saved = localStorage.getItem('skillchain_completed');
                let completed = saved ? JSON.parse(saved) : [];
                if (!completed.includes(id)) {
                    completed.push(id);
                    localStorage.setItem('skillchain_completed', JSON.stringify(completed));
                }
            }
        } catch (err) {
            console.error('Evaluation error:', err);
            setEvaluation({
                score: 0,
                breakdown: { error: err.message },
                feedback: `Error: ${err.message}`,
                pass: false
            });
        } finally {
            setSubmitting(false);
        }
    }

    function handleUseDemoAnswer() {
        if (id && demoAnswers[id]) {
            setAnswer(demoAnswers[id].answer);
        }
    }

    if (!skill) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-neutral-500">Loading...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>{skill.title} — SkillChain</title>
            </Head>

            <div className="min-h-screen py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back link */}
                    <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
                        ← Back to Skills
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card p-6 mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center">
                                    <span className="font-bold text-accent-500">{skill.icon}</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-white">{skill.title}</h1>
                                    <p className="text-sm text-neutral-500">{skill.category} · {skill.time}</p>
                                </div>
                            </div>
                            <WalletConnect onConnect={setWalletAddress} />
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left: Question and Answer */}
                        <div className="space-y-6">
                            {/* Question */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="card p-6"
                            >
                                <h2 className="section-title mb-3">Question</h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    {skill.question}
                                </p>
                            </motion.div>

                            {/* Answer form */}
                            <motion.form
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                onSubmit={handleSubmit}
                                className="card p-6"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="section-title">Your Answer</h2>
                                    {demoActive && demoAnswers[id] && (
                                        <button
                                            type="button"
                                            onClick={handleUseDemoAnswer}
                                            className="text-xs text-accent-500 hover:text-accent-400"
                                        >
                                            Use demo answer
                                        </button>
                                    )}
                                </div>

                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Write your answer here..."
                                    className="textarea mb-4"
                                    rows={8}
                                    disabled={submitting}
                                />

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-neutral-500">
                                        {answer.split(/\s+/).filter(w => w).length} words
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={!answer.trim() || submitting}
                                        className={`btn-primary ${(!answer.trim() || submitting) ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {submitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Evaluating...
                                            </span>
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </div>
                            </motion.form>
                        </div>

                        {/* Right: Terminal and Mint */}
                        <div className="space-y-6">
                            {/* AI Terminal */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <AiTerminal
                                    evaluation={evaluation}
                                    isLoading={submitting}
                                />
                            </motion.div>

                            {/* Mint button */}
                            <AnimatePresence>
                                {evaluation?.pass && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                    >
                                        <MintButton
                                            skillId={id}
                                            skillTitle={skill.title}
                                            score={evaluation.score}
                                            walletAddress={walletAddress}
                                            onMintSuccess={(data) => console.log('Minted:', data)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Tips */}
                            <div className="card p-6">
                                <h3 className="section-title mb-3">Tips</h3>
                                <ul className="text-sm text-neutral-400 space-y-2">
                                    <li>• Cover all key concepts in the question</li>
                                    <li>• Use proper terminology</li>
                                    <li>• Aim for 50-100 words minimum</li>
                                    <li>• Passing score: {skill.passThreshold}+</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
