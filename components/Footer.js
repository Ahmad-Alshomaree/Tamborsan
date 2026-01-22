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
          <h4 className={styles.subtitle}>İletişim</h4>
          <p><strong>Telefon:</strong> 0 (312) 385-8558</p>
          <p><strong>E-posta:</strong> info@tambursan.com.tr</p>
          <p><strong>Adres:</strong> Ankara, Türkiye</p>
        </div>
      </div>
    </footer>
  );
}
