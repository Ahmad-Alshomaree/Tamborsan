"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <header className={`
            sticky top-0 z-50 h-[90px] flex items-center
            transition-all duration-300
            ${isScrolled
                ? 'bg-white/98 backdrop-blur-lg shadow-xl h-20'
                : 'bg-white shadow-md'
            }
        `}>
            <div className="container mx-auto px-4 flex justify-between items-center w-full">
                {/* Logo */}
                <div className="transition-transform duration-300 hover:scale-105">
                    <Link href="/home">
                        <Image
                            src="/logo.png"
                            alt="Tambursan Logo"
                            width={200}
                            height={75}
                            priority
                            className="h-auto"
                        />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`
                        md:hidden flex flex-col justify-center items-center w-10 h-10
                        bg-transparent border-none cursor-pointer z-50
                        ${isMenuOpen ? 'fixed right-4' : ''}
                    `}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span className={`
                        block w-6 h-0.5 bg-secondary transition-all duration-300
                        ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}
                    `}></span>
                    <span className={`
                        block w-6 h-0.5 bg-secondary transition-all duration-300
                        ${isMenuOpen ? 'opacity-0' : 'mb-1'}
                    `}></span>
                    <span className={`
                        block w-6 h-0.5 bg-secondary transition-all duration-300
                        ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}
                    `}></span>
                </button>

                {/* Navigation */}
                <nav className={`
                    md:flex
                    ${isMenuOpen
                        ? 'fixed inset-0 bg-white flex items-center justify-center z-40'
                        : 'hidden'
                    }
                `}>
                    <ul className={`
                        flex gap-8
                        ${isMenuOpen ? 'flex-col text-center' : 'flex-row'}
                    `}>
                        <li>
                            <Link
                                href="/home"
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    text-secondary font-medium transition-all duration-300
                                    hover:text-primary relative pb-1
                                    ${isMenuOpen ? 'text-2xl' : 'text-base'}
                                    ${isActive('/home')
                                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                        : ''
                                    }
                                `}
                            >
                                Anasayfa
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services"
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    text-secondary font-medium transition-all duration-300
                                    hover:text-primary relative pb-1
                                    ${isMenuOpen ? 'text-2xl' : 'text-base'}
                                    ${isActive('/services')
                                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                        : ''
                                    }
                                `}
                            >
                                Hizmetlerimiz
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/urunler"
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    text-secondary font-medium transition-all duration-300
                                    hover:text-primary relative pb-1
                                    ${isMenuOpen ? 'text-2xl' : 'text-base'}
                                    ${isActive('/urunler')
                                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                        : ''
                                    }
                                `}
                            >
                                Ürünlerimiz
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/galeri"
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    text-secondary font-medium transition-all duration-300
                                    hover:text-primary relative pb-1
                                    ${isMenuOpen ? 'text-2xl' : 'text-base'}
                                    ${isActive('/galeri')
                                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                        : ''
                                    }
                                `}
                            >
                                Galeri
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/iletisim"
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    px-6 py-2 rounded-full font-semibold transition-all duration-300
                                    ${isMenuOpen ? 'text-2xl px-8 py-3' : 'text-base'}
                                    ${isActive('/iletisim')
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:scale-105'
                                    }
                                `}
                            >
                                İletişim
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
