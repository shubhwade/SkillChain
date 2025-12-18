/**
 * SkillChain AI Evaluation System
 * 
 * Deterministic rubric-based scoring algorithm that works 100% offline.
 * No external APIs required - evaluates answers based on keyword matching,
 * synonym expansion, and coherence heuristics.
 * 
 * Scoring breakdown:
 * - Keyphrase matching: up to 90 points (configurable per skill)
 * - Length/coherence bonus: up to 10 points
 * - Minimum word count penalty: -10 points if < 30 words
 */

import skills from '../data/skills.json';

/**
 * Preprocess text for matching
 * - Lowercase
 * - Remove punctuation
 * - Normalize whitespace
 */
function preprocess(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"()\[\]{}]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Count words in a string
 */
function wordCount(text) {
    return text.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Check if text contains a phrase or any of its synonyms
 */
function containsPhrase(text, phrase) {
    return text.includes(phrase.toLowerCase());
}

/**
 * Evaluate a student's answer against the skill rubric
 * 
 * @param {string} skillId - The skill identifier
 * @param {string} answer - The student's answer
 * @param {boolean} demoMode - If true, always return a passing score
 * @returns {Object} Evaluation result with score, breakdown, feedback, and pass status
 */
export function evaluateAnswer(skillId, answer, demoMode = false) {
    // Demo mode: instant pass
    if (demoMode) {
        return {
            score: 95,
            breakdown: {
                keyphrases: 80,
                coherence: 15,
                matched: ['distributed ledger', 'immutable', 'consensus', 'decentralized', 'cryptographic']
            },
            feedback: "Excellent response! You've demonstrated a comprehensive understanding of the core concepts. Your explanation is clear, well-structured, and covers all the key points. NFT credential ready to mint!",
            pass: true,
            demoMode: true
        };
    }

    // Get skill rubric
    const skill = skills[skillId];
    if (!skill) {
        return {
            score: 0,
            breakdown: { error: 'Skill not found' },
            feedback: 'Error: Skill rubric not found.',
            pass: false
        };
    }

    const normalizedAnswer = preprocess(answer);
    const words = wordCount(answer);

    let keyphraseScore = 0;
    const matchedPhrases = [];
    const missedPhrases = [];

    // Check each keyphrase and its synonyms
    for (const kp of skill.keyphrases) {
        const allVariants = [kp.text, ...(kp.synonyms || [])];
        let found = false;

        for (const variant of allVariants) {
            if (containsPhrase(normalizedAnswer, variant)) {
                keyphraseScore += kp.weight;
                matchedPhrases.push(kp.text);
                found = true;
                break;
            }
        }

        if (!found) {
            missedPhrases.push(kp.text);
        }
    }

    // Cap keyphrase score at 90
    keyphraseScore = Math.min(90, keyphraseScore);

    // Coherence/length bonus (up to 10 points)
    let coherenceScore = 0;
    if (words >= 100) {
        coherenceScore = 10;
    } else if (words >= 75) {
        coherenceScore = 8;
    } else if (words >= 50) {
        coherenceScore = 5;
    } else if (words >= 30) {
        coherenceScore = 3;
    }

    // Penalty for very short answers
    let penalty = 0;
    if (words < 30) {
        penalty = 10;
    }

    // Calculate final score
    const rawScore = keyphraseScore + coherenceScore - penalty;
    const score = Math.max(0, Math.min(100, Math.round(rawScore)));
    const pass = score >= skill.passThreshold;

    // Generate feedback
    let feedback = '';
    if (pass) {
        if (score >= 85) {
            feedback = `Outstanding! You've demonstrated excellent understanding of ${skill.title}. `;
        } else if (score >= 70) {
            feedback = `Good work! You've shown solid grasp of the key concepts. `;
        } else {
            feedback = `You've passed with the minimum required score. `;
        }
        feedback += `Key concepts covered: ${matchedPhrases.slice(0, 3).join(', ')}. `;
        if (missedPhrases.length > 0 && score < 90) {
            feedback += `Consider also discussing: ${missedPhrases.slice(0, 2).join(', ')}.`;
        }
    } else {
        feedback = `Not quite there yet. Your answer needs more detail on: ${missedPhrases.slice(0, 3).join(', ')}. `;
        if (words < 30) {
            feedback += `Your response is too brief (${words} words). Aim for at least 50-100 words. `;
        }
        feedback += `Required score: ${skill.passThreshold}, your score: ${score}.`;
    }

    return {
        score,
        breakdown: {
            keyphrases: keyphraseScore,
            coherence: coherenceScore,
            penalty,
            matched: matchedPhrases,
            missed: missedPhrases,
            wordCount: words
        },
        feedback: feedback.trim(),
        pass,
        threshold: skill.passThreshold
    };
}

/**
 * Get LLM prompt template for optional OSS LLM integration
 * 
 * This can be used with GPT4All, llama.cpp, or similar local LLMs.
 * The deterministic rubric above is always the fallback.
 */
export function getLLMPrompt(skillTitle, answer) {
    return `You are an impartial grader evaluating a student's answer for the skill: "${skillTitle}".

Student's Answer:
"""
${answer}
"""

Evaluate based on these criteria:
- Concept correctness (0-40 points): Is the core concept explained accurately?
- Coverage of key concepts (0-30 points): Are all important aspects mentioned?
- Clarity & reasoning (0-20 points): Is the explanation clear and logical?
- Examples/Insight (0-10 points): Are there practical examples or unique insights?

Return ONLY valid JSON in this exact format:
{
  "score": <number 0-100>,
  "breakdown": {
    "concept": <number 0-40>,
    "coverage": <number 0-30>,
    "clarity": <number 0-20>,
    "examples": <number 0-10>
  },
  "feedback": "<25-40 word constructive feedback>"
}`;
}

export default { evaluateAnswer, getLLMPrompt };
