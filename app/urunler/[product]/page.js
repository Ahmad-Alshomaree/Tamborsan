'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './product.module.css';

export default function ProductPage() {
  const { product } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/urunler/${product}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setProductData(null);
        } else {
          setProductData(data);
        }
        setLoading(false);
      })
      .catch(err => {
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

  return (
    <div className="container">
      <h1>{productData.name}</h1>
      <p>{productData.description}</p>
      <div className={styles.images}>
        {images.map((img, index) => (
          <Image key={index} src={img} alt={`${productData.name} ${index + 1}`} width={300} height={200} />
        ))}
      </div>
    </div>
  );
}
