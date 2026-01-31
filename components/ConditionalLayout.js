"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();

    // Don't show header and footer on the welcome page (root path)
    const isWelcomePage = pathname === '/';

    return (
        <>
            {!isWelcomePage && <Header />}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            {!isWelcomePage && <Footer />}
        </>
    );
}
