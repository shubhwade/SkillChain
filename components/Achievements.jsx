import { motion } from 'framer-motion';

/**
 * Achievement badges component
 * Shows earned badges based on skills completed
 */
export function AchievementBadges({ completedCount, totalSkills }) {
    const achievements = [
        { id: 'first', name: 'First Steps', desc: 'Complete your first skill', required: 1, icon: '01' },
        { id: 'three', name: 'Hat Trick', desc: 'Complete 3 skills', required: 3, icon: '03' },
        { id: 'half', name: 'Halfway There', desc: 'Complete 50% of skills', required: Math.ceil(totalSkills / 2), icon: '50' },
        { id: 'all', name: 'Master', desc: 'Complete all skills', required: totalSkills, icon: 'M' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="section-title">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, i) => {
                    const earned = completedCount >= achievement.required;
                    return (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-3 rounded-lg border transition-all ${earned
                                    ? 'bg-accent-600/10 border-accent-600/30'
                                    : 'bg-dark-800/50 border-dark-700 opacity-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${earned
                                        ? 'bg-accent-600 text-white'
                                        : 'bg-dark-700 text-neutral-500'
                                    }`}>
                                    {achievement.icon}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium ${earned ? 'text-white' : 'text-neutral-500'}`}>
                                        {achievement.name}
                                    </div>
                                    <div className="text-xs text-neutral-500">{achievement.desc}</div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Share buttons component
 */
export function ShareButtons({ skillTitle, score }) {
    const shareText = `I just earned a verified ${skillTitle} credential with a score of ${score}/100 on SkillChain! 🎓`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const shareLinks = [
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            color: 'hover:text-blue-400'
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: 'hover:text-blue-600'
        },
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">Share:</span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm text-neutral-400 ${link.color} transition-colors`}
                >
                    {link.name}
                </a>
            ))}
        </div>
    );
}

/**
 * Certificate component for display/download
 */
export function Certificate({ skillTitle, score, walletAddress, tokenId, issuedAt }) {
    const formattedDate = new Date(issuedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="card overflow-hidden">
            <div className="p-8 text-center border-b border-dark-700 bg-gradient-to-br from-dark-800 to-dark-900">
                {/* Header */}
                <div className="mb-6">
                    <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Certificate of Completion</div>
                    <h2 className="text-2xl font-bold text-white">SkillChain</h2>
                </div>

                {/* Award text */}
                <div className="mb-6">
                    <p className="text-neutral-400 mb-2">This certifies that</p>
                    <p className="text-lg font-mono text-accent-500">{walletAddress?.slice(0, 10)}...{walletAddress?.slice(-8)}</p>
                </div>

                {/* Skill */}
                <div className="mb-6">
                    <p className="text-neutral-400 mb-2">has successfully completed</p>
                    <p className="text-2xl font-bold text-white">{skillTitle}</p>
                </div>

                {/* Score */}
                <div className="inline-flex items-center gap-2 bg-dark-700/50 rounded-full px-4 py-2">
                    <span className="text-neutral-400">Score:</span>
                    <span className="font-bold text-white">{score}/100</span>
                </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 flex items-center justify-between text-xs text-neutral-500">
                <div>Token #{tokenId}</div>
                <div>{formattedDate}</div>
                <div>Verified on-chain</div>
            </div>
        </div>
    );
}

export default { AchievementBadges, ShareButtons, Certificate };
