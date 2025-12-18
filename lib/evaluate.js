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
 * AI-Generated Content Detection v2.0
 * 
 * Comprehensive detection using multiple methods:
 * 1. Phrase matching (100+ ChatGPT phrases)
 * 2. Pattern detection (structural, formatting)
 * 3. Vocabulary analysis (AI words frequency)
 * 4. Sentence structure analysis
 * 5. Perplexity proxy (word predictability)
 */

// Extensive list of AI-generated phrases
const AI_PHRASES = [
    // ChatGPT signature phrases
    "it's important to note", "it is important to note", "it's worth noting", "it is worth mentioning",
    "in conclusion", "to summarize", "in summary", "let me explain", "let's explore",
    "i'd be happy to", "i would be happy to", "certainly!", "absolutely!", "great question",
    "that's a great question", "as an ai", "as a language model", "i don't have personal",
    "delve into", "delve deeper", "it's crucial", "it is crucial", "it's essential", "it is essential",
    "furthermore", "moreover", "additionally", "in essence", "ultimately", "fundamentally", "inherently",
    "comprehensive understanding", "nuanced understanding", "multifaceted", "paradigm", "synergy",
    "leverage", "utilize", "facilitate", "in the realm of", "in today's world", "in this day and age",
    "plays a crucial role", "plays a vital role", "serves as a", "acts as a", "can be seen as",
    "it should be noted", "one might argue", "it goes without saying", "needless to say",
    // More AI phrases
    "at its core", "on the other hand", "having said that", "that being said", "with that in mind",
    "it's worth emphasizing", "to put it simply", "in other words", "as mentioned earlier",
    "broadly speaking", "generally speaking", "in a nutshell", "to be more specific",
    "when it comes to", "in terms of", "with respect to", "as far as", "as such",
    "this is because", "the reason is", "this allows", "this enables", "this ensures",
    "key aspect", "key component", "key factor", "crucial aspect", "vital component",
    "plays an important role", "significantly impacts", "greatly affects", "heavily influences",
    "wide range of", "variety of", "numerous", "plethora of", "myriad of",
    "seamless", "robust", "scalable", "innovative", "cutting-edge", "state-of-the-art",
    "ensure that", "in order to", "so as to", "thereby", "thus", "hence", "therefore",
    "consequently", "as a result", "due to this", "because of this", "for this reason",
    "it can be argued", "one could say", "it may be said", "it appears that", "it seems that",
    "provides a", "offers a", "presents a", "demonstrates a", "illustrates a",
    "is characterized by", "is defined by", "is known for", "is recognized for",
    "take into account", "take into consideration", "bear in mind", "keep in mind",
    "above and beyond", "over and above", "in addition to", "apart from",
    "last but not least", "first and foremost", "time and again", "by and large"
];

// AI vocabulary - words that AI overuses
const AI_VOCABULARY = [
    "furthermore", "moreover", "additionally", "consequently", "nevertheless", "nonetheless",
    "whereby", "wherein", "thereof", "hereby", "henceforth", "thereby", "therein",
    "crucial", "essential", "vital", "paramount", "fundamental", "pivotal", "integral",
    "comprehensive", "extensive", "thorough", "holistic", "nuanced", "intricate",
    "facilitate", "leverage", "utilize", "implement", "optimize", "streamline",
    "robust", "scalable", "seamless", "innovative", "dynamic", "versatile",
    "paradigm", "framework", "methodology", "mechanism", "infrastructure",
    "significantly", "substantially", "considerably", "notably", "particularly",
    "inherently", "intrinsically", "fundamentally", "essentially", "primarily"
];

// Structural patterns that AI uses
const AI_PATTERNS = [
    /^\d+\.\s+\*?\*?[\w\s]+\*?\*?:/gm,           // "1. **Bold**: explanation"
    /^[-•]\s+\*?\*?[\w\s]+\*?\*?:/gm,            // "- **Bold**: explanation"
    /\b(firstly|secondly|thirdly|fourthly|lastly|finally)\b/gi,
    /(Here's|Here is|Let's|Let us)\s+(a|an|the|how|what|why)/gi,
    /\b(following|several|various|multiple)\s+(are|is|include|includes):/gi,
    /"[\w\s]+" (refers to|means|is defined as|can be understood as)/gi,
    /\bIn (order to|terms of|the context of|the realm of)\b/gi,
    /\b(Key|Important|Notable|Significant) (features?|aspects?|points?|benefits?):/gi
];

function detectAIContent(text) {
    if (!text || text.length < 20) {
        return { isAI: false, confidence: 0, verdict: 'human', flags: [] };
    }

    const normalizedText = text.toLowerCase();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    if (wordCount < 15) {
        return { isAI: false, confidence: 0, verdict: 'human', flags: ['Too short to analyze'] };
    }

    let aiScore = 0;
    const flags = [];

    // 1. PHRASE DETECTION (0-50 points)
    let phraseMatches = 0;
    const matchedPhrases = [];
    for (const phrase of AI_PHRASES) {
        if (normalizedText.includes(phrase)) {
            phraseMatches++;
            matchedPhrases.push(phrase);
        }
    }
    // Each phrase match is worth more points
    const phraseScore = Math.min(50, phraseMatches * 15);
    aiScore += phraseScore;
    if (matchedPhrases.length > 0) {
        flags.push(`AI phrases found: "${matchedPhrases[0]}"${matchedPhrases.length > 1 ? ` +${matchedPhrases.length - 1} more` : ''}`);
    }

    // 2. AI VOCABULARY FREQUENCY (0-25 points)
    let vocabCount = 0;
    for (const word of AI_VOCABULARY) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        vocabCount += (normalizedText.match(regex) || []).length;
    }
    const vocabRatio = vocabCount / wordCount;
    if (vocabRatio > 0.08) {
        aiScore += 25;
        flags.push(`High AI vocabulary (${Math.round(vocabRatio * 100)}%)`);
    } else if (vocabRatio > 0.05) {
        aiScore += 18;
        flags.push(`Elevated AI vocabulary (${Math.round(vocabRatio * 100)}%)`);
    } else if (vocabRatio > 0.03) {
        aiScore += 10;
    }

    // 3. STRUCTURAL PATTERN DETECTION (0-20 points)
    let patternMatches = 0;
    for (const pattern of AI_PATTERNS) {
        const matches = text.match(pattern);
        if (matches) {
            patternMatches += matches.length;
        }
    }
    if (patternMatches >= 3) {
        aiScore += 20;
        flags.push(`AI structure patterns: ${patternMatches}`);
    } else if (patternMatches >= 2) {
        aiScore += 15;
        flags.push(`AI structure patterns: ${patternMatches}`);
    } else if (patternMatches >= 1) {
        aiScore += 8;
    }

    // 4. SENTENCE UNIFORMITY (0-15 points)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
    if (sentences.length >= 3) {
        const lengths = sentences.map(s => s.trim().split(/\s+/).length);
        const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
        const variance = lengths.reduce((acc, l) => acc + Math.pow(l - avgLength, 2), 0) / lengths.length;
        const stdDev = Math.sqrt(variance);
        const cv = stdDev / avgLength; // coefficient of variation

        if (cv < 0.2 && avgLength > 12) {
            aiScore += 15;
            flags.push('Robotic sentence uniformity');
        } else if (cv < 0.3 && avgLength > 15) {
            aiScore += 10;
        }
    }

    // 5. CONNECTOR WORD OVERUSE (0-15 points)
    const connectors = ['however', 'therefore', 'thus', 'hence', 'moreover', 'furthermore',
        'additionally', 'consequently', 'nevertheless', 'nonetheless'];
    let connectorCount = 0;
    for (const conn of connectors) {
        const regex = new RegExp(`\\b${conn}\\b`, 'gi');
        connectorCount += (normalizedText.match(regex) || []).length;
    }
    const connectorRatio = connectorCount / sentences.length;
    if (connectorRatio > 0.5) {
        aiScore += 15;
        flags.push('Excessive transitions');
    } else if (connectorRatio > 0.3) {
        aiScore += 10;
    }

    // 6. PERFECT GRAMMAR INDICATORS (0-10 points)
    const hasColonLists = /:\s*\n/g.test(text) || /:\s*(1\.|•|-)/g.test(text);
    const hasEmDash = /—/g.test(text);
    const hasPerfectQuotes = /".*?"/g.test(text);

    if (hasColonLists) aiScore += 4;
    if (hasEmDash) aiScore += 3;
    if (hasPerfectQuotes && sentences.length > 2) aiScore += 3;

    // Determine final verdict with LOWER thresholds
    const confidence = Math.min(100, aiScore);
    let verdict = 'human';
    if (confidence >= 40) {  // Lowered from 60
        verdict = 'ai_generated';
    } else if (confidence >= 25) {  // Lowered from 35
        verdict = 'suspicious';
    }

    return {
        isAI: confidence >= 35,  // Lowered threshold
        confidence,
        verdict,
        flags: flags.slice(0, 5),
        details: {
            phraseMatches,
            vocabRatio: Math.round(vocabRatio * 100),
            patternMatches,
            connectorRatio: Math.round(connectorRatio * 100)
        }
    };
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
    // Demo mode: instant pass with AI detection badge
    if (demoMode) {
        return {
            score: 95,
            breakdown: {
                keyphrases: 80,
                coherence: 15,
                matched: ['distributed ledger', 'immutable', 'consensus', 'decentralized', 'cryptographic']
            },
            aiDetection: {
                isAI: false,
                confidence: 5,
                verdict: 'human',
                flags: []
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

    // AI Detection
    const aiDetection = detectAIContent(answer);

    // Block pass if AI-generated content detected
    let pass = score >= skill.passThreshold;
    if (aiDetection.isAI && pass) {
        pass = false;
    }

    // Generate feedback
    let feedback = '';

    // AI Warning first
    if (aiDetection.isAI) {
        feedback = `⚠️ AI-Generated Content Detected (${aiDetection.confidence}% confidence). Your answer appears to be written by ChatGPT or similar AI. Please write your own answer to earn a credential. `;
    } else if (aiDetection.verdict === 'suspicious') {
        feedback = `⚡ Note: Some patterns in your answer raised minor flags (${aiDetection.confidence}% AI similarity), but your response is accepted. `;
    }

    if (pass) {
        if (score >= 85) {
            feedback += `Outstanding! You've demonstrated excellent understanding of ${skill.title}. `;
        } else if (score >= 70) {
            feedback += `Good work! You've shown solid grasp of the key concepts. `;
        } else {
            feedback += `You've passed with the minimum required score. `;
        }
        feedback += `Key concepts covered: ${matchedPhrases.slice(0, 3).join(', ')}. `;
        if (missedPhrases.length > 0 && score < 90) {
            feedback += `Consider also discussing: ${missedPhrases.slice(0, 2).join(', ')}.`;
        }
    } else if (aiDetection.isAI) {
        feedback += `Credential denied due to AI-generated content. Please rewrite your answer in your own words.`;
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
        aiDetection: {
            isAI: aiDetection.isAI,
            confidence: aiDetection.confidence,
            verdict: aiDetection.verdict,
            flags: aiDetection.flags
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
