import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.column}>
          <h3 className={styles.title}>TAMBURSAN</h3>
          <p className={styles.description}>
            Tambur Kaplama ve Kauçuk Kaplama İmalatı. Kalite ve güvenin adresi.
          </p>
        </div>
        <div className={styles.column}>
          <h4 className={styles.subtitle}>Hızlı Linkler</h4>
          <ul className={styles.links}>
            <li><Link href="/">Anasayfa</Link></li>
            <li><Link href="#corporate">Kurumsal</Link></li>
            <li><Link href="#products">Ürünlerimiz</Link></li>
            <li><Link href="#contact">İletişim</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.subtitle}>İletişim</h4>
          <p><strong>Telefon:</strong> 0 (312) 385-8558</p>
          <p><strong>E-posta:</strong> info@tambursan.com.tr</p>
          <p><strong>Adres:</strong> Ankara, Türkiye</p>
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
