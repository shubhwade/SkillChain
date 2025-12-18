import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function Home() {
    return (
        <Layout showNav={true}>
            <Head>
                <title>SkillChain — Ethereum Skill Credentials</title>
                <meta name="description" content="Prove your blockchain skills with AI-verified credentials minted as NFTs on Ethereum." />
            </Head>

            <div className="relative min-h-screen">
                {/* Subtle grid background */}
                <div className="fixed inset-0 bg-grid opacity-50" />

                {/* Hero Section */}
                <section className="relative pt-24 pb-20 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Ethereum Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-600/10 border border-accent-600/30 mb-8"
                        >
                            <svg className="w-4 h-4 text-accent-500" viewBox="0 0 256 417" fill="currentColor">
                                <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" opacity="0.6" />
                                <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
                                <path d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.601L256 236.587z" opacity="0.6" />
                                <path d="M127.962 416.905v-104.72L0 236.585z" />
                            </svg>
                            <span className="text-sm font-medium text-accent-500">Built on Ethereum</span>
                        </motion.div>

                        {/* Main headline - Impactful but balanced */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
                        >
                            Your Skills.
                            <br />
                            <span className="text-accent-500">On-Chain.</span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                        >
                            AI evaluates your knowledge. Ethereum stores your proof.
                            <br className="hidden md:block" />
                            <span className="text-white">Verifiable credentials that employers actually trust.</span>
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        >
                            <Link href="/dashboard">
                                <button className="btn-primary text-lg px-10 py-5 font-semibold">
                                    Start Assessment
                                </button>
                            </Link>

                            <Link href="/verify">
                                <button className="btn-secondary text-lg px-10 py-5">
                                    Verify a Credential
                                </button>
                            </Link>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                ERC-721 NFTs
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent-500" />
                                Polygon Network
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                Gas-Optimized
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="relative py-16 border-y border-dark-800 bg-dark-900/50">
                    <div className="container-wide">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: '6', label: 'Skill Tracks' },
                                { value: '100%', label: 'On-Chain' },
                                { value: 'AI', label: 'Evaluation' },
                                { value: 'NFT', label: 'Credentials' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-5xl font-bold text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-neutral-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="relative py-24 px-6">
                    <div className="container-wide">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <p className="section-title mb-3">How It Works</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Three Steps to Verified Skills
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: '01',
                                    title: 'Prove Your Knowledge',
                                    description: 'Answer skill-based questions in blockchain, DeFi, NFTs, and more. Write in your own words.'
                                },
                                {
                                    step: '02',
                                    title: 'AI Grades You',
                                    description: 'Our AI evaluates your response against a comprehensive rubric. No cheating possible.'
                                },
                                {
                                    step: '03',
                                    title: 'Mint Your NFT',
                                    description: 'Pass the assessment and receive an ERC-721 credential stored permanently on Ethereum.'
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="card p-8 hover:border-accent-600/50 transition-all"
                                >
                                    <div className="text-accent-500 font-mono text-sm mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ethereum Features */}
                <section className="relative py-24 px-6 bg-dark-900">
                    <div className="container-wide">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <p className="section-title mb-3">Ethereum Native</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Built for Web3
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'ERC-721 Credentials',
                                    desc: 'Each credential is a unique NFT that you truly own. Transfer, showcase, or hold forever.',
                                    icon: '721'
                                },
                                {
                                    title: 'Wallet Authentication',
                                    desc: 'Connect with MetaMask or any WalletConnect-compatible wallet. Your keys, your identity.',
                                    icon: 'WC'
                                },
                                {
                                    title: 'On-Chain Verification',
                                    desc: 'Anyone can verify your credentials by checking the smart contract. No middlemen required.',
                                    icon: 'SC'
                                },
                                {
                                    title: 'Polygon L2',
                                    desc: 'Deploy on Polygon for fast, cheap transactions while maintaining Ethereum security.',
                                    icon: 'L2'
                                },
                                {
                                    title: 'IPFS Metadata',
                                    desc: 'Credential metadata stored on IPFS for permanent, decentralized access.',
                                    icon: 'IP'
                                },
                                {
                                    title: 'Open Source',
                                    desc: 'Fully open-source smart contracts. Verify the code, contribute, or fork.',
                                    icon: 'OS'
                                },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-6 rounded-xl border border-dark-700 bg-dark-800/50 hover:border-accent-600/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center mb-4 group-hover:bg-accent-600/20 transition-colors">
                                        <span className="text-sm font-bold text-accent-500">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="relative py-24 px-6">
                    <div className="container-wide">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <p className="section-title mb-3">Use Cases</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Who Uses SkillChain?
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Job Seekers',
                                    description: 'Stand out with verifiable blockchain skills. Share your credential NFT directly with recruiters.',
                                    cta: 'Prove your skills',
                                    href: '/dashboard'
                                },
                                {
                                    title: 'Employers',
                                    description: 'Instantly verify candidate skills on-chain. No fake certificates, no background check delays.',
                                    cta: 'Verify credentials',
                                    href: '/verify'
                                },
                                {
                                    title: 'Educators',
                                    description: 'Issue immutable certificates to your students. Track completion in a transparent way.',
                                    cta: 'Partner with us',
                                    href: 'https://github.com/shubhwade/SkillChain'
                                }
                            ].map((useCase, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="card p-8 text-center hover:border-accent-600/50 transition-all cursor-pointer"
                                    onClick={() => {
                                        if (useCase.href.startsWith('http')) {
                                            window.open(useCase.href, '_blank');
                                        } else {
                                            window.location.href = useCase.href;
                                        }
                                    }}
                                >
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-neutral-400 mb-6 leading-relaxed">
                                        {useCase.description}
                                    </p>
                                    <span className="text-accent-500 text-sm font-medium hover:text-accent-400 transition-colors">
                                        {useCase.cta} →
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24 px-6 bg-gradient-to-t from-dark-900 to-dark-950">
                    <div className="container-narrow text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Ready to prove yourself?
                            </h2>
                            <p className="text-xl text-neutral-400 mb-10 max-w-xl mx-auto">
                                Join the future of credentialing. Free, fast, and permanently on Ethereum.
                            </p>
                            <Link href="/dashboard">
                                <button className="btn-primary text-xl px-12 py-6 font-semibold">
                                    Start Now — It's Free
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative py-8 px-6 border-t border-dark-800">
                    <div className="container-wide">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">SkillChain</span>
                                <span className="px-2 py-0.5 rounded bg-accent-600/10 text-accent-500 text-xs">Ethereum Track</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span>Open Source</span>
                                <span>Polygon Testnet</span>
                                <span>MIT License</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Layout>
    );
}
