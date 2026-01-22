import Link from 'next/link';
import styles from './services.module.css';

export default function ServicesLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Hizmetlerimiz</h3>
        <ul className={styles.sidebarNav}>
          <li>
            <Link href="/services">
              Tambur İmalatı
            </Link>
          </li>
          <li>
            <Link href="/services/yedek-parca">
              Yedek Parça
            </Link>
          </li>
        </ul>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
