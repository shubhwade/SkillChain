/**
 * POST /api/evaluate
 * 
 * Evaluates a student's answer using the deterministic rubric.
 * 
 * Request body:
 * {
 *   skillId: string,
 *   answer: string
 * }
 * 
 * Response:
 * {
 *   score: number,
 *   breakdown: object,
 *   feedback: string,
 *   pass: boolean
 * }
 */

import { evaluateAnswer } from '../../lib/evaluate';
import { isDemoMode, simulateDelay } from '../../lib/demo';

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { skillId, answer } = req.body;

        // Validate input
        if (!skillId || typeof skillId !== 'string') {
            return res.status(400).json({ error: 'skillId is required' });
        }

        if (!answer || typeof answer !== 'string') {
            return res.status(400).json({ error: 'answer is required' });
        }

        if (answer.trim().length < 10) {
            return res.status(400).json({ error: 'Answer is too short. Please provide more detail.' });
        }

        // Check demo mode
        const demoMode = isDemoMode(req.query);

        // Simulate processing time for better UX
        if (demoMode) {
            await simulateDelay(2500); // Longer delay in demo to show animation
        } else {
            await simulateDelay(1000); // Small delay for realism
        }

        // Evaluate the answer
        const evaluation = evaluateAnswer(skillId, answer, demoMode);

        // Return result
        return res.status(200).json(evaluation);

    } catch (error) {
        console.error('Evaluation error:', error);
        return res.status(500).json({
            error: 'Evaluation failed',
            message: error.message
        });
    }
}
