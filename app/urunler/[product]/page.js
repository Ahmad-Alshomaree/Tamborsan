'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './product.module.css';

export default function ProductPage() {
  const { product } = useParams();
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/urunler/${product}`).then(res => res.json()),
      fetch('/api/urunler').then(res => res.json()),
      fetch('/api/category').then(res => res.json())
    ]).then(([productRes, allProducts, cats]) => {
      if (productRes.error) {
        setProductData(null);
      } else {
        setProductData(productRes);
        setCategories(cats);
        // Filter related products from same category, excluding current product
        const related = allProducts.filter(p => p.category_id === productRes.category_id && p.slug !== product);
        setRelatedProducts(related);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [product]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!productData) {
    return <div className="container">Product not found</div>;
  }

  const images = JSON.parse(productData.images || '[]');
  const category = categories.find(cat => cat.id === productData.category_id);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1>{productData.name}</h1>
        <p>{productData.description}</p>
        <div className={styles.images}>
          {images.map((img, index) => (
            <Image key={index} src={img} alt={`${productData.name} ${index + 1}`} width={300} height={200} />
          ))}
        </div>
      </div>
      <div className={styles.sidebar}>
        {category && (
          <div className={styles.categoryInfo}>
            <h3>Kategori</h3>
            <Link href="/urunler" className={styles.categoryLink}>
              <span className={styles.categoryName}>{category.name}</span>
            </Link>
            <p className={styles.categoryDesc}>{category.description}</p>
          </div>
        )}
        <h3>Benzer Ürünler</h3>
        {relatedProducts.length > 0 ? (
          <div className={styles.relatedProducts}>
            {relatedProducts.map((relatedProduct) => {
              const relatedImages = JSON.parse(relatedProduct.images || '[]');
              const description = relatedProduct.description ? relatedProduct.description.substring(0, 100) + '...' : '';
              return (
                <Link key={relatedProduct.slug} href={`/urunler/${relatedProduct.slug}`} className={styles.relatedCard}>
                  {relatedImages.length > 0 && (
                    <img src={relatedImages[0]} alt={relatedProduct.name} className={styles.relatedImage} />
                  )}
                  <div className={styles.relatedContent}>
                    <h4>{relatedProduct.name}</h4>
                    <p>{description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p>Bu kategoride başka ürün bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}
