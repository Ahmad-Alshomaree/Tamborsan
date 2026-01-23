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
          <div style={{ marginBottom: '1rem' }}>
            <Image 
              src="/logo-footer.png" 
              alt="Tambursan" 
              width={153} 
              height={57} 
            />
          </div>
          <p className={styles.description}>
            Tambur Kaplama ve Kauçuk Kaplama İmalatı. Kalite ve güvenin adresi.
          </p>
        </div>
        <div className={styles.column}>
          <h4 className={styles.subtitle}>İletişim</h4>
          <p><strong>{contact?.phone_label}</strong> {contact?.phone_number}</p>
          <p><strong>{contact?.email_label}</strong> {contact?.email_address}</p>
          <p><strong>{contact?.location_label}</strong> {contact?.location}</p>

          <div className={styles.socialMedia}>
            {contact?.facebook_account && (
              <Link href={contact.facebook_account} target="_blank" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            )}
            {contact?.x_account && (
              <Link href={contact.x_account} target="_blank" aria-label="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            )}
            {contact?.instagram_account && (
              <Link href={contact.instagram_account} target="_blank" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
