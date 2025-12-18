/**
 * GET /api/verify
 * 
 * Retrieves credentials for a given wallet address.
 * 
 * Query parameters:
 * - address: Wallet address to lookup
 * 
 * Response:
 * {
 *   credentials: [
 *     {
 *       tokenId: number,
 *       wallet: string,
 *       skillId: string,
 *       skillTitle: string,
 *       score: number,
 *       metadataURI: string,
 *       txHash: string,
 *       issuedAt: string,
 *       verificationHash: string
 *     }
 *   ]
 * }
 */

import fs from 'fs';
import path from 'path';
import { isDemoMode } from '../../lib/demo';

// Path to issued.json
const issuedPath = path.join(process.cwd(), 'data', 'issued.json');

export default async function handler(req, res) {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { address } = req.query;

        // Validate input
        if (!address || typeof address !== 'string') {
            return res.status(400).json({ error: 'address query parameter is required' });
        }

        if (!address.startsWith('0x') || address.length < 10) {
            return res.status(400).json({ error: 'Invalid wallet address format' });
        }

        const normalizedAddress = address.toLowerCase();

        // Check demo mode or use issued.json as fallback
        const demoMode = isDemoMode(req.query);

        // Try to read from issued.json first (works in demo mode and as fallback)
        let credentials = [];

        try {
            const fileContent = fs.readFileSync(issuedPath, 'utf-8');
            const issuedData = JSON.parse(fileContent);

            credentials = issuedData.credentials.filter(
                cred => cred.wallet.toLowerCase() === normalizedAddress
            );
        } catch (e) {
            // File doesn't exist or is invalid
            console.log('No issued.json found, credentials will be empty');
        }

        // If not in demo mode and RPC is configured, also check on-chain
        if (!demoMode && process.env.RPC_URL) {
            try {
                const { getCredentialsForAddress } = await import('../../lib/contract');
                const onChainCredentials = await getCredentialsForAddress(address);

                // Merge with local credentials (avoiding duplicates by tokenId)
                const existingIds = new Set(credentials.map(c => c.tokenId));
                for (const cred of onChainCredentials) {
                    if (!existingIds.has(cred.tokenId)) {
                        credentials.push(cred);
                    }
                }
            } catch (e) {
                console.error('Failed to fetch on-chain credentials:', e);
                // Continue with local credentials only
            }
        }

        // Sort by issuedAt descending (newest first)
        credentials.sort((a, b) => {
            const dateA = new Date(a.issuedAt);
            const dateB = new Date(b.issuedAt);
            return dateB - dateA;
        });

        return res.status(200).json({
            credentials,
            address: address,
            demoMode
        });

    } catch (error) {
        console.error('Verify error:', error);
        return res.status(500).json({
            error: 'Verification failed',
            message: error.message
        });
    }
}
