import Head from 'next/head';
import Navigation from './Navigation';
import DemoBanner from './DemoBanner';

export default function Layout({ children, showNav = true }) {
    return (
        <div className="min-h-screen bg-dark-950 text-white">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <DemoBanner />
            {showNav && <Navigation />}

            <main className="relative">
                {children}
            </main>
        </div>
    );
}
