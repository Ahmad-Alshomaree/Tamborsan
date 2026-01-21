"use client";

import Link from 'next/link';
import Image from 'next/image';
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
            <Image
              src="/logo.png"
              alt="Tambursan Logo"
              width={153}
              height={57}
              priority
            />
          </Link>
        </div>
        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
          <span className={styles.hamburger}></span>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Anasayfa</Link></li>
            <li><Link href="#corporate" onClick={() => setIsMenuOpen(false)}>Kurumsal</Link></li>
            <li><Link href="#catalogs" onClick={() => setIsMenuOpen(false)}>E-Katalog</Link></li>
            <li><Link href="#documents" onClick={() => setIsMenuOpen(false)}>Belgeler</Link></li>
            <li><Link href="#services" onClick={() => setIsMenuOpen(false)}>Hizmetlerimiz</Link></li>
            <li><Link href="#contact" onClick={() => setIsMenuOpen(false)}>İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
