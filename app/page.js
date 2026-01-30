'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Welcome() {
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    encodeURI('/Galary/Hero section/Adsız tasarım (7).jpg'),
    encodeURI('/Galary/Hero section/kaucuk-kaplama-tahrik-tamburu-327_03_2018_10_02_03.jpg'),
    encodeURI('/Galary/Hero section/orta-1.png'),
    encodeURI('/Galary/Hero section/TAM KARŞI 6,7,8.jpg'),
    encodeURI('/Galary/Hero section/tambur-kaplama-2.jpg')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className={styles.welcomePage}>
      <div className={styles.welcomeGrid}>
        {/* Left Side - Text Content */}
        <div className={styles.textSection}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="Tambursan Logo" className={styles.logo} />
          </div>

          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>Tambursan'a Hoş Geldiniz</h1>
            <p className={styles.welcomeMessage}>
              Kaliteli tambur ve kauçuk kaplama çözümlerinde güvenilir partneriniz.
              Sanayi ihtiyaçlarınıza yönelik yüksek performanslı üretim ve kaplama hizmetleri sunuyoruz.
            </p>

            <div className={styles.welcomeActions}>
              <Link href="/home" className="btn btn-primary">
                Siteye Giriş
              </Link>
            </div>
          </div>

          <div className={styles.welcomeFooter}>
            <p>TAMBURSAN İMALAT ve KAPLAMA SANAYİ</p>
          </div>
        </div>

        {/* Right Side - Rotating Images */}
        <div className={styles.imageSection}>
          <div
            className={styles.heroImage}
            style={{
              backgroundImage: `url(${heroImages[currentImage]})`
            }}
          />
        </div>
      </div>
    </div>
  );
}
