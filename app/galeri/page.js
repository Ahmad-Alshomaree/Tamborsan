'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './galeri.module.css';

export default function Galeri() {
  const [activeTab, setActiveTab] = useState('images');
  const [products, setProducts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch products for images
    fetch('/api/urunler')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });

    // Fetch videos from galeri
    fetch('/api/galeri')
      .then(res => res.json())
      .then(data => {
        const videoData = data.filter(item => item.type === 'video').map(item => ({
          id: item.id,
          title: item.title,
          url: item.video_path
        }));
        setVideos(videoData);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
      });

    setLoading(false);
  }, []);

  // Collect all images from products
  const allImages = products.flatMap(product => {
    const productImages = JSON.parse(product.images || '[]');
    return productImages.map(image => ({
      src: image,
      alt: product.name,
      productName: product.name,
      productSlug: product.slug
    }));
  });

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="container">Yükleniyor...</div>;
  }

  return (
    <div className="container">
      <h1 className={styles.title}>Galeri</h1>
      <p className={styles.subtitle}>Ürünlerimizin görsellerini ve videolarını inceleyin</p>

      {/* Tab Navigation */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'images' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Resimler
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'videos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videolar
        </button>
      </div>

      {/* Images Section */}
      {activeTab === 'images' && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Ürün Görselleri</h2>
          {allImages.length === 0 ? (
            <p className={styles.noContent}>Henüz görsel bulunmamaktadır.</p>
          ) : (
            <div className={styles.galleryGrid}>
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className={styles.galleryItem}
                  onClick={() => openLightbox(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={200}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                  <div className={styles.overlay}>
                    <h3>{image.productName}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Videos Section */}
      {activeTab === 'videos' && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Üretim Videoları</h2>
          {videos.length === 0 ? (
            <div className={styles.noContent}>
              <p>Henüz video bulunmamaktadır.</p>
              <p className={styles.comingSoon}>Yakında eklenecektir...</p>
            </div>
          ) : (
            <div className={styles.videoGrid}>
              {videos.map((video) => (
                <div key={video.id} className={styles.videoItem}>
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoPlayer}
                    width="100%"
                    height="315"
                  ></iframe>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeLightbox}>×</button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', maxHeight: '80vh' }}
            />
            <div className={styles.lightboxInfo}>
              <h3>{selectedImage.productName}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
