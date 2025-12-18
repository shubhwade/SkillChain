import Link from 'next/link';
import { motion } from 'framer-motion';

const difficultyStyles = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function SkillCard({ skill, index = 0, completed = false }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Link href={`/skill/${skill.id}`}>
                <div className="card p-6 h-full cursor-pointer group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-accent-500">{skill.icon}</span>
                        </div>
                        <span className={`badge border ${difficultyStyles[skill.difficulty]}`}>
                            {skill.difficulty}
                        </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-500 transition-colors">
                        {skill.title}
                    </h3>

                    <p className="text-sm text-neutral-500 mb-4">
                        {skill.category}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">
                            {skill.time}
                        </span>

                        {completed ? (
                            <span className="badge-success badge">
                                Verified
                            </span>
                        ) : (
                            <span className="text-accent-500 font-medium group-hover:underline">
                                Start →
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
