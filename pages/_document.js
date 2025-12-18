import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="SkillChain - AI-evaluated, blockchain-verified skill credentials. Proof that you actually learned." />
                <meta name="theme-color" content="#0a0a0f" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph */}
                <meta property="og:title" content="SkillChain - Skill Passport" />
                <meta property="og:description" content="AI-evaluated, blockchain-verified skill credentials (Proof-of-Learning)" />
                <meta property="og:type" content="website" />

                {/* Preload fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <body className="bg-dark-900">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
