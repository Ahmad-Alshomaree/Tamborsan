"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <Link href="/">
            TAMBURSAN
          </Link>
        </div>
        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
          <span className={styles.hamburger}></span>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Anasayfa</Link></li>
            <li><Link href="#corporate" onClick={() => setIsMenuOpen(false)}>Kurumsal</Link></li>
            <li><Link href="#services" onClick={() => setIsMenuOpen(false)}>Hizmetlerimiz</Link></li>
            <li><Link href="#products" onClick={() => setIsMenuOpen(false)}>Ürünlerimiz</Link></li>
            <li><Link href="#contact" onClick={() => setIsMenuOpen(false)}>İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
