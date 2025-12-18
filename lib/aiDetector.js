/**
 * GPTZero-Level AI Detection v3.0
 * 
 * Advanced detection using methods similar to GPTZero:
 * 1. Perplexity Proxy - word predictability analysis
 * 2. Burstiness - variation in sentence complexity
 * 3. N-gram Analysis - common AI word sequences
 * 4. Vocabulary Richness - type-token ratio
 * 5. Sentence Structure Analysis
 * 6. Phrase Pattern Detection
 */

// Common AI word sequences (2-grams and 3-grams)
const AI_NGRAMS = [
    "is a", "it is", "this is", "that is", "there are", "there is",
    "can be", "will be", "would be", "could be", "should be", "must be",
    "has been", "have been", "had been", "being a", "such as",
    "as well", "in order", "due to", "based on", "according to",
    "refers to", "known as", "defined as", "allows for", "enables the",
    "one of the", "in order to", "as well as", "on the other",
    "the other hand", "due to the", "in the context", "plays a role",
    "a wide range", "a variety of", "in terms of", "with respect to",
    "it should be", "can be seen", "is known for", "is defined as"
];

// Words that AI uses with unusually high frequency
const AI_FORMAL_WORDS = [
    "furthermore", "moreover", "additionally", "consequently", "nevertheless",
    "nonetheless", "whereby", "wherein", "thereof", "hereby", "thereby",
    "crucial", "essential", "vital", "paramount", "fundamental", "pivotal",
    "comprehensive", "extensive", "thorough", "holistic", "nuanced", "intricate",
    "facilitate", "leverage", "utilize", "implement", "optimize", "streamline",
    "robust", "scalable", "seamless", "innovative", "dynamic", "versatile",
    "paradigm", "framework", "methodology", "mechanism", "infrastructure",
    "significantly", "substantially", "considerably", "notably", "particularly",
    "inherently", "intrinsically", "fundamentally", "essentially", "primarily",
    "multifaceted", "encompass", "elucidate", "delineate", "ascertain",
    "aforementioned", "henceforth", "therein", "heretofore", "notwithstanding"
];

// AI signature phrases
const AI_PHRASES = [
    "it's important to note", "it is important to note", "it's worth noting",
    "in conclusion", "to summarize", "in summary", "let me explain",
    "furthermore", "moreover", "additionally", "in essence", "ultimately",
    "plays a crucial role", "plays a vital role", "serves as a", "acts as a",
    "it should be noted", "one might argue", "needless to say",
    "at its core", "on the other hand", "that being said", "with that in mind",
    "when it comes to", "in terms of", "with respect to", "as such",
    "this is because", "the reason is", "this allows", "this enables",
    "wide range of", "variety of", "plethora of", "myriad of",
    "ensure that", "in order to", "so as to", "thereby", "hence", "therefore",
    "as a result", "due to this", "because of this", "for this reason",
    "provides a", "offers a", "presents a", "demonstrates a",
    "is characterized by", "is defined by", "is known for",
    "take into account", "bear in mind", "keep in mind",
    "first and foremost", "last but not least", "by and large",
    "delve into", "delve deeper", "comprehensive understanding",
    "cutting-edge", "state-of-the-art", "game-changer",
    "it can be argued", "one could say", "speaking of which",
    "having said that", "to put it simply", "in other words",
    "broadly speaking", "generally speaking", "to be more specific"
];

/**
 * Calculate Perplexity Proxy (0-100)
 * Lower perplexity = more predictable = more likely AI
 */
function calculatePerplexityProxy(words) {
    if (words.length < 10) return 50;

    let predictableCount = 0;
    const lowWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''));

    // Check bigrams
    for (let i = 1; i < lowWords.length; i++) {
        const bigram = `${lowWords[i - 1]} ${lowWords[i]}`;
        for (const ngram of AI_NGRAMS) {
            if (bigram === ngram.toLowerCase()) {
                predictableCount++;
                break;
            }
        }
    }

    // Check trigrams
    for (let i = 2; i < lowWords.length; i++) {
        const trigram = `${lowWords[i - 2]} ${lowWords[i - 1]} ${lowWords[i]}`;
        for (const ngram of AI_NGRAMS) {
            if (trigram === ngram.toLowerCase()) {
                predictableCount += 2; // Trigrams are more significant
                break;
            }
        }
    }

    // Type-token ratio for repetitiveness
    const substantiveWords = lowWords.filter(w => w.length > 3);
    const uniqueWords = new Set(substantiveWords);
    const ttr = uniqueWords.size / Math.max(1, substantiveWords.length);

    // Low TTR = repetitive = AI-like
    const repetitionPenalty = ttr < 0.4 ? 40 : ttr < 0.5 ? 30 : ttr < 0.6 ? 20 : ttr < 0.7 ? 10 : 0;

    const predictability = (predictableCount / Math.max(1, words.length - 1)) * 100;
    return Math.min(100, predictability * 3 + repetitionPenalty);
}

/**
 * Calculate Burstiness (0-100)
 * Human text has HIGH burstiness (varied sentence lengths)
 * AI text has LOW burstiness (uniform sentences)
 * Returns score where HIGH = more AI-like
 */
function calculateBurstiness(sentences) {
    if (sentences.length < 3) return 50;

    const lengths = sentences.map(s => {
        const words = s.trim().split(/\s+/).filter(w => w.length > 0);
        return words.length;
    }).filter(l => l > 3);

    if (lengths.length < 3) return 50;

    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((acc, l) => acc + Math.pow(l - avgLength, 2), 0) / lengths.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / Math.max(1, avgLength); // Coefficient of variation

    // Low CV = uniform = AI
    if (cv < 0.15) return 100;  // Very uniform = definitely AI
    if (cv < 0.20) return 85;
    if (cv < 0.25) return 70;
    if (cv < 0.30) return 55;
    if (cv < 0.35) return 40;
    if (cv < 0.40) return 25;
    if (cv < 0.50) return 15;
    return 5; // High variation = human
}

/**
 * Detect formality level (0-100)
 */
function detectFormalityLevel(text, wordCount) {
    const lowText = text.toLowerCase();
    let formalCount = 0;

    for (const word of AI_FORMAL_WORDS) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = lowText.match(regex);
        if (matches) formalCount += matches.length;
    }

    const formalRatio = formalCount / Math.max(1, wordCount);

    if (formalRatio > 0.12) return 100;
    if (formalRatio > 0.08) return 85;
    if (formalRatio > 0.06) return 70;
    if (formalRatio > 0.04) return 55;
    if (formalRatio > 0.03) return 40;
    if (formalRatio > 0.02) return 25;
    if (formalRatio > 0.01) return 10;
    return 0;
}

/**
 * Detect phrase matches (0-100)
 */
function detectPhrases(text) {
    const lowText = text.toLowerCase();
    let matchCount = 0;
    const matched = [];

    for (const phrase of AI_PHRASES) {
        if (lowText.includes(phrase)) {
            matchCount++;
            if (matched.length < 3) matched.push(phrase);
        }
    }

    return {
        score: Math.min(100, matchCount * 25),
        count: matchCount,
        examples: matched
    };
}

/**
 * Analyze sentence starters for repetitiveness (0-100)
 */
function analyzeSentenceStarters(sentences) {
    if (sentences.length < 4) return 0;

    const starters = sentences.map(s => {
        const words = s.trim().split(/\s+/);
        return words.slice(0, 2).join(' ').toLowerCase();
    });

    const uniqueStarters = new Set(starters);
    const ratio = uniqueStarters.size / starters.length;

    // Low ratio = repetitive starters = AI
    if (ratio < 0.4) return 80;
    if (ratio < 0.5) return 60;
    if (ratio < 0.6) return 40;
    if (ratio < 0.7) return 20;
    return 0;
}

/**
 * Main AI Detection Function - GPTZero Level
 */
export function detectAIContent(text) {
    if (!text || text.length < 50) {
        return { isAI: false, confidence: 0, verdict: 'human', flags: [] };
    }

    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    if (wordCount < 20) {
        return { isAI: false, confidence: 0, verdict: 'human', flags: ['Too short'] };
    }

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const flags = [];

    // === SCORING COMPONENTS ===

    // 1. PERPLEXITY PROXY (0-100)
    const perplexity = calculatePerplexityProxy(words);
    if (perplexity > 40) flags.push(`Low perplexity: ${Math.round(perplexity)}%`);

    // 2. BURSTINESS (0-100)
    const burstiness = calculateBurstiness(sentences);
    if (burstiness > 50) flags.push(`Uniform sentences: ${Math.round(burstiness)}%`);

    // 3. FORMALITY (0-100)
    const formality = detectFormalityLevel(text, wordCount);
    if (formality > 40) flags.push(`High formality: ${Math.round(formality)}%`);

    // 4. PHRASE DETECTION (0-100)
    const phraseResult = detectPhrases(text);
    if (phraseResult.count > 0) flags.push(`AI phrases: ${phraseResult.count}`);

    // 5. SENTENCE STARTERS (0-100)
    const starterScore = analyzeSentenceStarters(sentences);
    if (starterScore > 40) flags.push('Repetitive structure');

    // === WEIGHTED FINAL SCORE (GPTZero-style) ===
    const finalScore = Math.round(
        perplexity * 0.30 +       // 30% - word predictability 
        burstiness * 0.30 +       // 30% - sentence uniformity
        formality * 0.15 +        // 15% - formal vocabulary
        phraseResult.score * 0.15 + // 15% - AI phrases
        starterScore * 0.10       // 10% - structure repetition
    );

    // AGGRESSIVE THRESHOLDS
    let verdict = 'human';
    if (finalScore >= 45) {
        verdict = 'ai_generated';
    } else if (finalScore >= 30) {
        verdict = 'likely_ai';
    } else if (finalScore >= 20) {
        verdict = 'mixed';
    }

    return {
        isAI: finalScore >= 25, // Block at 25%+
        confidence: finalScore,
        verdict,
        flags: flags.slice(0, 5),
        details: {
            perplexity: Math.round(perplexity),
            burstiness: Math.round(burstiness),
            formality: Math.round(formality),
            phrases: phraseResult.count,
            structure: Math.round(starterScore)
        }
    };
}

export default { detectAIContent };
