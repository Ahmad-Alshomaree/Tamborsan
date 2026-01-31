"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch('/api/iletisim')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setContact(data[0]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.column}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo-footer.png"
              alt="Tambursan"
              width={280}
              height={105}
            />
          </div>
          <p className={styles.description}>
            Tambur Kaplama ve Kauçuk Kaplama İmalatı.
          </p>
          <p className={styles.tagline}>
            Kalite ve güvenin adresi.
          </p>
          <div className={styles.socialMedia}>
            {contact?.facebook_account && (
              <Link href={contact.facebook_account} target="_blank" aria-label="Facebook" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            )}
            {contact?.x_account && (
              <Link href={contact.x_account} target="_blank" aria-label="X (Twitter)" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            )}
            {contact?.instagram_account && (
              <Link href={contact.instagram_account} target="_blank" aria-label="Instagram" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            )}
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.subtitle}>İletişim</h4>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{contact?.phone_number}</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{contact?.email_address}</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{contact?.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.subtitle}>Konum</h4>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0846471819356!2d32.7399191!3d39.9701205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349c77005bcab%3A0x6fa679a04e4c1cf8!2s1200%20Ostim%20Industrial%20Sites%20Sokak%20No%3A84%2C%2006370%20Yenimahalle%2FAnkara!5e0!3m2!1sen!2str!4v1643000000000"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {currentYear} Tambursan. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
