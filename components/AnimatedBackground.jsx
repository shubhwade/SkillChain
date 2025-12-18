import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    const canvasRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs that follow mouse */}
            <motion.div
                animate={{
                    x: mousePos.x * 100 - 50,
                    y: mousePos.y * 100 - 50,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                className="absolute w-[600px] h-[600px] -left-32 -top-32 rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                }}
            />

            <motion.div
                animate={{
                    x: -mousePos.x * 80 + 40,
                    y: -mousePos.y * 80 + 40,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                className="absolute w-[500px] h-[500px] -right-32 -bottom-32 rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
                }}
            />

            <motion.div
                animate={{
                    x: mousePos.x * 60 - 30,
                    y: -mousePos.y * 60 + 30,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                className="absolute w-[400px] h-[400px] right-1/4 top-1/4 rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [null, Math.random() * -200 - 100],
                        opacity: [0.2, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                    }}
                />
            ))}
        </div>
    );
}
