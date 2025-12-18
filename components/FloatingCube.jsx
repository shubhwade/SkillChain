import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

/**
 * Interactive 3D Floating Cube with mouse tracking
 * Creates a blockchain-themed rotating cube that follows cursor
 */
export default function FloatingCube({ size = 200 }) {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth spring physics
    const springConfig = { damping: 20, stiffness: 100 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [30, -30]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const faces = [
        { rotateY: 0, translateZ: size / 2, icon: '⛓️', label: 'CHAIN' },
        { rotateY: 180, translateZ: size / 2, icon: '🔐', label: 'SECURE' },
        { rotateY: 90, translateZ: size / 2, icon: '🤖', label: 'AI' },
        { rotateY: -90, translateZ: size / 2, icon: '📜', label: 'NFT' },
        { rotateX: 90, translateZ: size / 2, icon: '✓', label: 'VERIFY' },
        { rotateX: -90, translateZ: size / 2, icon: '🎓', label: 'SKILL' },
    ];

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{
                width: size,
                height: size,
                perspective: 1000,
            }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    transformStyle: 'preserve-3d',
                    rotateX,
                    rotateY,
                }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {faces.map((face, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-white/20"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: `
                rotateX(${face.rotateX || 0}deg) 
                rotateY(${face.rotateY || 0}deg) 
                translateZ(${face.translateZ}px)
              `,
                            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(255,255,255,0.05)',
                        }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <span className="text-4xl mb-2">{face.icon}</span>
                        <span className="text-xs font-bold tracking-widest text-white/70">{face.label}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-full blur-3xl opacity-50 -z-10"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}
