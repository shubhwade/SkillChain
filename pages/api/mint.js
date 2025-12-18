/**
 * POST /api/mint
 * 
 * Mints a skill credential NFT for the user.
 * 
 * Request body:
 * {
 *   walletAddress: string,
 *   skillId: string,
 *   skillTitle: string,
 *   score: number
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   tokenId: number,
 *   txHash: string,
 *   metadataURI: string,
 *   demoMode: boolean
 * }
 */

import fs from 'fs';
import path from 'path';
import {
    isDemoMode,
    generateMockTxHash,
    generateMockTokenId,
    generateMockIPFSUri,
    generateMockMetadata,
    simulateDelay
} from '../../lib/demo';

// Path to issued.json for storing demo credentials
const issuedPath = path.join(process.cwd(), 'data', 'issued.json');

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { walletAddress, skillId, skillTitle, score } = req.body;

        // Validate input
        if (!walletAddress || typeof walletAddress !== 'string') {
            return res.status(400).json({ error: 'walletAddress is required' });
        }

        if (!walletAddress.startsWith('0x') || walletAddress.length < 10) {
            return res.status(400).json({ error: 'Invalid wallet address format' });
        }

        if (!skillId || typeof skillId !== 'string') {
            return res.status(400).json({ error: 'skillId is required' });
        }

        if (!skillTitle || typeof skillTitle !== 'string') {
            return res.status(400).json({ error: 'skillTitle is required' });
        }

        if (typeof score !== 'number' || score < 60) {
            return res.status(400).json({ error: 'Score must be at least 60 to mint a credential' });
        }

        // Check demo mode
        const demoMode = isDemoMode(req.query);

        // Simulate minting delay
        await simulateDelay(demoMode ? 2500 : 1500);

        if (demoMode) {
            // Demo mode: simulate minting and store in issued.json
            const tokenId = generateMockTokenId();
            const txHash = generateMockTxHash();
            const metadataURI = generateMockIPFSUri(skillId);
            const metadata = generateMockMetadata(skillId, skillTitle, score);

            // Read existing issued credentials
            let issuedData = { credentials: [], nextTokenId: 1 };
            try {
                const fileContent = fs.readFileSync(issuedPath, 'utf-8');
                issuedData = JSON.parse(fileContent);
            } catch (e) {
                // File doesn't exist or is invalid, use default
            }

            // Add new credential
            const newCredential = {
                tokenId,
                wallet: walletAddress,
                skillId,
                skillTitle,
                score,
                metadataURI,
                txHash,
                issuedAt: new Date().toISOString(),
                verificationHash: `sha256:${skillId}_${tokenId}_${Date.now().toString(16)}`
            };

            issuedData.credentials.push(newCredential);
            issuedData.nextTokenId = tokenId + 1;

            // Save back to file
            try {
                fs.writeFileSync(issuedPath, JSON.stringify(issuedData, null, 2));
            } catch (e) {
                console.error('Failed to save issued.json:', e);
                // Continue anyway, the credential was "minted" in memory
            }

            return res.status(200).json({
                success: true,
                tokenId,
                txHash,
                metadataURI,
                demoMode: true
            });
        } else {
            // Production mode: interact with smart contract
            // This would use lib/contract.js to call mintCredential
            // For now, we'll return an error since no RPC is configured

            const hasRPC = process.env.RPC_URL && process.env.PRIVATE_KEY;

            if (!hasRPC) {
                return res.status(503).json({
                    error: 'Blockchain not configured',
                    message: 'Enable demo mode or configure RPC_URL and PRIVATE_KEY to mint on-chain'
                });
            }

            // Import and use contract functions
            const { mintCredential } = await import('../../lib/contract');
            const result = await mintCredential(walletAddress, skillId, skillTitle, { score });

            return res.status(200).json(result);
        }

    } catch (error) {
        console.error('Mint error:', error);
        return res.status(500).json({
            error: 'Minting failed',
            message: error.message
        });
    }
}
