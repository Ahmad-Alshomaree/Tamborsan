"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <Link href="/home">
            <Image
              src="/logo.png"
              alt="Tambursan Logo"
              width={200}
              height={75}
              priority
              className={styles.logoImage}
            />
          </Link>
        </div>
        <button
          className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={styles.hamburger}></span>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li>
              <Link
                href="/home"
                onClick={() => setIsMenuOpen(false)}
                className={isActive('/home') ? styles.active : ''}
              >
                Anasayfa
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className={isActive('/services') ? styles.active : ''}
              >
                Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link
                href="/urunler"
                onClick={() => setIsMenuOpen(false)}
                className={isActive('/urunler') ? styles.active : ''}
              >
                Ürünlerimiz
              </Link>
            </li>
            <li>
              <Link
                href="/galeri"
                onClick={() => setIsMenuOpen(false)}
                className={isActive('/galeri') ? styles.active : ''}
              >
                Galeri
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                onClick={() => setIsMenuOpen(false)}
                className={`${styles.contactLink} ${isActive('/iletisim') ? styles.active : ''}`}
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
