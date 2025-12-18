import { useState, useEffect } from 'react';
import { DEMO_WALLET, formatAddress } from '../lib/demo';

export default function WalletConnect({ onConnect }) {
    const [address, setAddress] = useState(null);
    const [connecting, setConnecting] = useState(false);

    // Auto-connect with demo wallet on mount
    useEffect(() => {
        // Always use demo wallet for hackathon demo
        const savedWallet = localStorage.getItem('skillchain_wallet');
        if (savedWallet) {
            setAddress(savedWallet);
            onConnect?.(savedWallet);
        }
    }, []);

    // Notify parent when address changes
    useEffect(() => {
        if (address) {
            onConnect?.(address);
        }
    }, [address, onConnect]);

    async function connect() {
        setConnecting(true);

        // Try MetaMask first
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                if (accounts[0]) {
                    setAddress(accounts[0]);
                    localStorage.setItem('skillchain_wallet', accounts[0]);
                    setConnecting(false);
                    return;
                }
            } catch (error) {
                console.log('MetaMask connection failed, using demo wallet');
            }
        }

        // Fallback to demo wallet
        setAddress(DEMO_WALLET);
        localStorage.setItem('skillchain_wallet', DEMO_WALLET);
        setConnecting(false);
    }

    function useDemoWallet() {
        setAddress(DEMO_WALLET);
        localStorage.setItem('skillchain_wallet', DEMO_WALLET);
        onConnect?.(DEMO_WALLET);
    }

    function disconnect() {
        setAddress(null);
        localStorage.removeItem('skillchain_wallet');
        onConnect?.(null);
    }

    if (address) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-mono text-neutral-300">
                        {formatAddress(address)}
                    </span>
                </div>
                <button
                    onClick={disconnect}
                    className="text-xs text-neutral-500 hover:text-white transition-colors"
                    title="Disconnect"
                >
                    ✕
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={connect}
                disabled={connecting}
                className="btn-secondary text-sm py-2 px-4"
            >
                {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
            <button
                onClick={useDemoWallet}
                className="text-xs text-accent-500 hover:text-accent-400 transition-colors"
            >
                Demo
            </button>
        </div>
    );
}
