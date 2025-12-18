import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiTerminal({ evaluation, isLoading }) {
    const [lines, setLines] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const terminalRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            setLines([]);
            setShowResult(false);

            const messages = [
                'Initializing evaluation engine...',
                'Loading skill rubric...',
                'Analyzing response...',
                'Computing score...',
            ];

            let i = 0;
            const interval = setInterval(() => {
                if (i < messages.length) {
                    setLines(prev => [...prev, messages[i]]);
                    i++;
                }
            }, 600);

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    useEffect(() => {
        if (evaluation && !isLoading) {
            setShowResult(true);
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }
    }, [evaluation, isLoading]);

    return (
        <div className="card overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-dark-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-dark-600" />
                    <div className="w-3 h-3 rounded-full bg-dark-600" />
                    <div className="w-3 h-3 rounded-full bg-dark-600" />
                </div>
                <span className="text-xs font-mono text-neutral-500">evaluation.log</span>
                {isLoading && (
                    <span className="text-xs text-accent-500 font-medium">Processing</span>
                )}
            </div>

            {/* Terminal body */}
            <div ref={terminalRef} className="p-4 font-mono text-sm max-h-[400px] overflow-y-auto">
                {/* Loading lines */}
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-neutral-400 mb-1"
                    >
                        <span className="text-neutral-600 mr-2">$</span>
                        {line}
                    </motion.div>
                ))}

                {isLoading && (
                    <span className="inline-block w-2 h-4 bg-neutral-500 ml-4 animate-pulse" />
                )}

                {/* Result */}
                <AnimatePresence>
                    {showResult && evaluation && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 space-y-6"
                        >
                            <div className="divider" />

                            {/* Score */}
                            <div className="text-center py-6">
                                <div className={`text-6xl font-bold ${evaluation.pass ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {evaluation.score}
                                </div>
                                <div className="text-neutral-500 mt-1">out of 100</div>

                                <div className={`inline-block mt-4 badge ${evaluation.pass ? 'badge-success' : 'badge-danger'}`}>
                                    {evaluation.pass ? 'Passed' : 'Not Passed'}
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                                <div className="section-title mb-4">Score Breakdown</div>

                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-400">Concept Coverage</span>
                                            <span className="text-white">{evaluation.breakdown?.keyphrases || 0}/90</span>
                                        </div>
                                        <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-accent-600 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${((evaluation.breakdown?.keyphrases || 0) / 90) * 100}%` }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-400">Coherence</span>
                                            <span className="text-white">{evaluation.breakdown?.coherence || 0}/10</span>
                                        </div>
                                        <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-accent-600 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${((evaluation.breakdown?.coherence || 0) / 10) * 100}%` }}
                                                transition={{ duration: 0.8, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Matched concepts */}
                                {evaluation.breakdown?.matched?.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-dark-700">
                                        <div className="text-xs text-neutral-500 mb-2">Concepts identified:</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {evaluation.breakdown.matched.map((phrase, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-0.5 bg-dark-700 text-neutral-300 text-xs rounded"
                                                >
                                                    {phrase}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Feedback */}
                            <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                                <div className="section-title mb-2">Feedback</div>
                                <p className="text-neutral-300 text-sm leading-relaxed">
                                    {evaluation.feedback}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
