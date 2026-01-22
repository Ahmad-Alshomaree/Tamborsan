import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '../../lib/products';
import styles from './products.module.css';

export const metadata = {
  title: 'Ürünlerimiz - Tambursan',
  description: 'Tambursan ürün yelpazesi: Rulo, Takoz, Sıyırıcılar, Tambur, Motor Redektör ve daha fazlası.',
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className={`container ${styles.pageContainer}`}>
      <h1 className={styles.pageTitle}>Ürünlerimiz</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
               <Image
                 src={product.image}
                 alt={product.title}
                 fill
                 className={styles.image}
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               />
            </div>
            <div className={styles.content}>
              <h2 className={styles.cardTitle}>{product.title}</h2>
              <span className={styles.linkText}>İncele</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
