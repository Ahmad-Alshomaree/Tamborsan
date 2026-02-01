"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
    children: ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();

    // Don't show header and footer on the welcome page (root path) or admin pages
    const isExcludedPage = pathname === '/' || pathname.startsWith('/admin');

    return (
        <>
            {!isExcludedPage && <Header />}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            {!isExcludedPage && <Footer />}
        </>
    );
}
