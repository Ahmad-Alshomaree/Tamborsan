'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './urunler.module.css';

export default function Urunler() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/category').then(res => res.json()),
      fetch('/api/urunler').then(res => res.json())
    ]).then(([cats, prods]) => {
      setCategories(cats);
      setProducts(prods);
      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0]); // Default to first category object
      }
    }).catch(err => console.error(err));
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category_id === categoryId);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categoryProducts = selectedCategory ? getProductsByCategory(selectedCategory.id) : [];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Kategoriler</h3>
        <ul className={styles.sidebarNav}>
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href="#"
                className={selectedCategory && selectedCategory.id === category.id ? styles.active : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category);
                }}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        {selectedCategory && (
          <>
            <h1 className={styles.title}>{selectedCategory.name}</h1>
            <div className={styles.textBlock}>
              <p>{selectedCategory.description}</p>
            </div>
            <div className={styles.grid}>
              {categoryProducts.map((product) => (
                <Link key={product.slug} href={`/urunler/${product.slug}`} className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3>{product.name}</h3>
                    <p>Ürün detayları için tıklayın</p>
                  </div>
                </Link>
              ))}
            </div>
            {categoryProducts.length === 0 && <p>Bu kategoride ürün bulunmamaktadır.</p>}
          </>
        )}
      </div>
    </div>
  );
}
