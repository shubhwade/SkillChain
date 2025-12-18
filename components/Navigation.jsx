import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import WalletConnect from './WalletConnect';

export default function Navigation() {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Skills', href: '/dashboard' },
        { label: 'Leaderboard', href: '/leaderboard' },
        { label: 'Profile', href: '/profile' },
        { label: 'Verify', href: '/verify' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-dark-800 bg-dark-950/90 backdrop-blur-sm">
            <div className="container-wide">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 text-white hover:text-accent-500 transition-colors">
                        <Logo size={28} />
                        <span className="font-semibold tracking-tight">SkillChain</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${router.pathname === item.href
                                    ? 'text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <WalletConnect />

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-neutral-400 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-dark-800">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-2 text-sm font-medium ${router.pathname === item.href
                                    ? 'text-white'
                                    : 'text-neutral-400'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
