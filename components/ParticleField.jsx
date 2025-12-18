import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Advanced 3D Particle System with mouse interaction
 * Creates a stunning floating particle effect with depth
 */
export default function ParticleField({ particleCount = 100 }) {
    const containerRef = useRef(null);

    // Generate random particles with 3D properties
    const particles = useMemo(() => {
        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            z: Math.random() * 100,
            size: Math.random() * 4 + 1,
            color: ['#a855f7', '#3b82f6', '#06b6d4', '#ec4899', '#22c55e'][Math.floor(Math.random() * 5)],
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
    }, [particleCount]);

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

            {/* Animated gradient orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px]"
                style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)' }}
            />

            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px]"
                style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)' }}
            />

            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-[100px]"
                style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)' }}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    }}
                    initial={{
                        top: '110%',
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{
                        top: '-10%',
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Grid overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Scanline effect */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
