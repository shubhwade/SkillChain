import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Animated statistics counter with particle burst effect
 */
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;

        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
                setHasAnimated(true);
            } else {
                setCount(Math.floor(current));
            }
        }, (duration * 1000) / steps);

        return () => clearInterval(timer);
    }, [value, duration, hasAnimated]);

    return (
        <span className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}

/**
 * Holographic stat card with glassmorphism
 */
export function HoloCard({ icon, value, label, suffix = '', color = 'purple', delay = 0 }) {
    const colors = {
        purple: 'from-neon-purple/20 to-neon-purple/5 border-neon-purple/30 shadow-neon-purple/20',
        cyan: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30 shadow-neon-cyan/20',
        blue: 'from-neon-blue/20 to-neon-blue/5 border-neon-blue/30 shadow-neon-blue/20',
        green: 'from-neon-green/20 to-neon-green/5 border-neon-green/30 shadow-neon-green/20',
        pink: 'from-neon-pink/20 to-neon-pink/5 border-neon-pink/30 shadow-neon-pink/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, type: 'spring' }}
            whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)'
            }}
            className={`
        relative overflow-hidden rounded-2xl p-6
        bg-gradient-to-br ${colors[color]}
        border backdrop-blur-xl
        shadow-lg cursor-pointer
        transform-gpu
      `}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
            {/* Holographic shimmer */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, transparent 50%)',
                    backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />

            <div className="relative z-10">
                <span className="text-3xl mb-3 block">{icon}</span>
                <div className="text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="text-sm text-white/60">{label}</div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-20"
                style={{
                    background: `radial-gradient(circle at top right, ${color === 'purple' ? '#a855f7' : '#06b6d4'} 0%, transparent 70%)`,
                }}
            />
        </motion.div>
    );
}

/**
 * Animated typing text effect
 */
export function TypewriterText({ text, speed = 50, className = '' }) {
    const [displayedText, setDisplayedText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        const cursorTimer = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);

        return () => {
            clearInterval(timer);
            clearInterval(cursorTimer);
        };
    }, [text, speed]);

    return (
        <span className={className}>
            {displayedText}
            <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
        </span>
    );
}

/**
 * Animated gradient text
 */
export function GradientText({ children, className = '' }) {
    return (
        <motion.span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-[length:200%_auto] ${className}`}
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
            {children}
        </motion.span>
    );
}

/**
 * Glowing button with ripple effect
 */
export function GlowButton({ children, onClick, variant = 'primary', className = '', disabled = false }) {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 1000);

        onClick?.(e);
    };

    const variants = {
        primary: 'bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]',
        secondary: 'bg-dark-600 border border-white/10 hover:border-neon-purple/50',
        danger: 'bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]',
    };

    return (
        <motion.button
            onClick={handleClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`
        relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white
        transition-all duration-300 ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
        >
            {/* Ripple effects */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute w-10 h-10 rounded-full bg-white/30"
                        style={{ left: ripple.x - 20, top: ripple.y - 20 }}
                    />
                ))}
            </AnimatePresence>

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}

/**
 * Animated badge with pulse effect
 */
export function PulseBadge({ children, color = 'green' }) {
    const colors = {
        green: 'bg-neon-green/20 text-neon-green border-neon-green/30',
        purple: 'bg-neon-purple/20 text-neon-purple border-neon-purple/30',
        cyan: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
        red: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${colors[color]}`}>
            <motion.span
                className={`w-2 h-2 rounded-full ${color === 'green' ? 'bg-neon-green' : color === 'purple' ? 'bg-neon-purple' : color === 'cyan' ? 'bg-neon-cyan' : 'bg-red-400'}`}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            {children}
        </span>
    );
}

export default { HoloCard, TypewriterText, GradientText, GlowButton, PulseBadge };
