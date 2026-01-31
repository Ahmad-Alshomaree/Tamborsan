'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Welcome() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroImages = [
    encodeURI('/Galary/Hero section/Adsız tasarım (7).jpg'),
    encodeURI('/Galary/Hero section/kaucuk-kaplama-tahrik-tamburu-327_03_2018_10_02_03.jpg'),
    encodeURI('/Galary/Hero section/orta-1.png'),
    encodeURI('/Galary/Hero section/TAM KARŞI 6,7,8.jpg'),
    encodeURI('/Galary/Hero section/tambur-kaplama-2.jpg')
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const features = [
    {
      icon: '⚙️',
      title: 'Yüksek Kalite',
      description: 'Endüstri standardında üretim ve kaplama hizmetleri'
    },
    {
      icon: '🚀',
      title: 'Hızlı Teslimat',
      description: 'Zamanında ve güvenilir teslimat garantisi'
    },
    {
      icon: '🛡️',
      title: 'Uzman Ekip',
      description: 'Deneyimli mühendislik ve teknik destek'
    },
    {
      icon: '💎',
      title: 'Özel Çözümler',
      description: 'İhtiyaçlarınıza özel tasarım ve üretim'
    }
  ];

  const stats = [
    { value: '25+', label: 'Yıllık Deneyim' },
    { value: '500+', label: 'Mutlu Müşteri' },
    { value: '1000+', label: 'Tamamlanan Proje' }
  ];

  return (
    <div className={styles.welcomePage}>
      {/* Background Images with Crossfade */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`${styles.backgroundImage} ${index === currentImage ? styles.activeImage : ''
            }`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.7) 0%, rgba(198, 156, 46, 0.3) 100%), url(${image})`
          }}
        />
      ))}

      {/* Animated Geometric Shapes */}
      <div className={styles.geometricShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      <div className={`${styles.welcomeContent} ${isLoaded ? styles.loaded : ''}`}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Tambursan Logo" className={styles.logo} />
        </div>

        {/* Main Title */}
        <h1 className={styles.welcomeTitle}>Tambursan'a Hoş Geldiniz</h1>
        <p className={styles.welcomeMessage}>
          Kaliteli tambur ve kauçuk kaplama çözümlerinde güvenilir partneriniz.
          Sanayi ihtiyaçlarınıza yönelik yüksek performanslı üretim ve kaplama hizmetleri sunuyoruz.
        </p>

        {/* Statistics */}
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.welcomeActions}>
          <Link href="/home" className={styles.ctaButton}>
            <span>Siteye Giriş</span>
            <svg className={styles.ctaIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollArrow}></div>
        </div>
      </div>
    </div>
  );
}
