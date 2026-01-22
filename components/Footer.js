import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          <h4 className={styles.subtitle}>Hızlı Linkler</h4>
          <ul className={styles.links}>
            <li><Link href="/">Anasayfa</Link></li>
            <li><Link href="#corporate">Kurumsal</Link></li>
            <li><Link href="#catalogs">E-Katalog</Link></li>
            <li><Link href="#documents">Belgeler</Link></li>
            <li><Link href="/services">Hizmetlerimiz</Link></li>
            <li><Link href="#contact">İletişim</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.subtitle}>İletişim</h4>
          <p><strong>Telefon:</strong> 0 (312) 385-8558</p>
          <p><strong>E-posta:</strong> info@tambursan.com.tr</p>
          <p><strong>Adres:</strong> Ankara, Türkiye</p>

          <div className={styles.socialMedia}>
            <Link href="https://www.facebook.com/tambur.san.5" target="_blank" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="https://x.com/tambursan" target="_blank" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </Link>
            <Link href="https://www.instagram.com/tambursan_?/" target="_blank" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
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
