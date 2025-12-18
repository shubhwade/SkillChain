/**
 * Demo Mode Utilities
 * 
 * Provides demo mode detection and mock data generation
 * for hackathon presentations where testnet/RPC may not be available.
 */

// Demo wallet address for verification testing
export const DEMO_WALLET = '0xDEMO000000000000000000000000000000000001';

// Demo contract address
export const DEMO_CONTRACT = '0xDEMO_CONTRACT_SKILLCHAIN_CREDENTIAL';

/**
 * Check if demo mode is enabled
 * - Environment variable: NEXT_PUBLIC_DEMO_MODE=true
 * - Query parameter: ?demo=true
 */
export function isDemoMode(queryParams = {}) {
    // Check environment variable
    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
        return true;
    }

    // Check query parameter (client-side)
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'true') {
            return true;
        }
    }

    // Check passed query params (server-side API routes)
    if (queryParams.demo === 'true') {
        return true;
    }

    return false;
}

/**
 * Generate a mock transaction hash
 */
export function generateMockTxHash() {
    const timestamp = Date.now().toString(16);
    const random = Math.random().toString(16).substring(2, 10);
    return `0xDEMO_${timestamp}_${random}`.toUpperCase();
}

/**
 * Generate a mock token ID
 */
let mockTokenCounter = 100;
export function generateMockTokenId() {
    return ++mockTokenCounter;
}

/**
 * Generate mock NFT metadata
 */
export function generateMockMetadata(skillId, skillTitle, score) {
    const now = new Date().toISOString();
    const hash = `sha256:demo_${skillId}_${Date.now().toString(16)}`;

    return {
        name: `SkillChain: ${skillTitle}`,
        description: `Verified completion of '${skillTitle}' on SkillChain with a score of ${score}/100`,
        image: `https://skillchain.demo/nft/${skillId}.png`,
        attributes: [
            { trait_type: 'Skill', value: skillTitle },
            { trait_type: 'Score', value: score },
            { trait_type: 'Pass Threshold', value: 60 },
            { trait_type: 'Issued By', value: 'SkillChain' }
        ],
        issuedAt: now,
        verificationHash: hash
    };
}

/**
 * Generate a mock IPFS URI
 */
export function generateMockIPFSUri(skillId) {
    return `ipfs://QmDEMO_${skillId.toUpperCase()}_${Date.now().toString(36)}`;
}

/**
 * Simulate network delay for realistic demo feel
 */
export function simulateDelay(ms = 1500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format wallet address for display (truncated)
 */
export function formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format timestamp for display
 */
export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export default {
    isDemoMode,
    generateMockTxHash,
    generateMockTokenId,
    generateMockMetadata,
    generateMockIPFSUri,
    simulateDelay,
    formatAddress,
    formatDate,
    DEMO_WALLET,
    DEMO_CONTRACT
};
