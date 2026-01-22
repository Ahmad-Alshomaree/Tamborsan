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
      if (cats.length > 0) {
        setSelectedCategory(cats[0].id); // Default to first category
      }
    }).catch(err => console.error(err));
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category_id === categoryId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const categoryProducts = selectedCategory ? getProductsByCategory(selectedCategory) : [];

  return (
    <div className="container">
      <h1>Ürünlerimiz</h1>
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      {selectedCategoryData && (
        <div className={styles.categorySection}>
          <h2>{selectedCategoryData.name}</h2>
          <p>{selectedCategoryData.description}</p>
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
        </div>
      )}
    </div>
  );
}
