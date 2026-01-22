import { getProductBySlug, getAllProducts } from '../../../lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './product-detail.module.css';

// Generating static params for static export
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Ürün Bulunamadı' };
  return {
    title: `${product.title} - Tambursan`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={`container ${styles.pageContainer}`}>
        <div className={styles.breadcrumb}>
            <Link href="/products">Ürünlerimiz</Link> &gt; <span>{product.title}</span>
        </div>

      <div className={styles.layout}>
        {/* Left Column: Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
             <Image
               src={product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image}
               alt={product.title}
               fill
               className={styles.mainImage}
               priority
             />
          </div>
          {product.gallery && product.gallery.length > 1 && (
             <div className={styles.galleryGrid}>
                 {product.gallery.map((img, idx) => (
                     <div key={idx} className={styles.thumbWrapper}>
                         <Image src={img} alt={`${product.title} ${idx+1}`} fill className={styles.thumbImage} />
                     </div>
                 ))}
             </div>
          )}
        </div>

        {/* Right Column: Content */}
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.details}>
             {product.content && product.content.map((section, index) => (
                 <div key={index} className={styles.section}>
                     {section.title && <h3 className={styles.sectionTitle}>{section.title}</h3>}
                     {section.text && <p className={styles.sectionText}>{section.text}</p>}
                     {section.list && (
                         <ul className={styles.sectionList}>
                             {section.list.map((item, i) => (
                                 <li key={i}>{item}</li>
                             ))}
                         </ul>
                     )}
                 </div>
             ))}
          </div>

          <div className={styles.contactCta}>
              <p>Bu ürün hakkında detaylı bilgi ve teklif almak için bizimle iletişime geçin.</p>
              <Link href="/#contact" className="btn btn-primary">Teklif İste</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
