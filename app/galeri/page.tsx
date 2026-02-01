'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product, GalleryItem } from '../../types';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  productName?: string;
  productSlug?: string;
}

interface Video {
  id: number;
  title: string;
  url: string;
}

export default function Galeri() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [products, setProducts] = useState<Product[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch('/api/urunler')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });

    fetch('/api/galeri')
      .then(res => res.json())
      .then((data: GalleryItem[]) => {
        const galleryImages = data.filter(item => item.type === 'image').map(item => ({
          src: item.image_path!,
          alt: item.title,
          title: item.title
        }));
        const videoData = data.filter(item => item.type === 'video').map(item => ({
          id: item.id,
          title: item.title,
          url: item.video_path!
        }));

        setGalleryImages(galleryImages);
        setVideos(videoData);
      })
      .catch(err => {
        console.error('Error fetching gallery:', err);
      });

    setLoading(false);
  }, []);

  const allImages: GalleryImage[] = products.flatMap(product => {
    const productImages = JSON.parse(product.images || '[]');
    return productImages.map((image: string) => ({
      src: image,
      alt: product.name,
      productName: product.name,
      productSlug: product.slug
    }));
  });

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark text-white overflow-hidden">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-gradient"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">Galeri</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-down animation-delay-200">
            Ürünlerimizin görsellerini ve videolarını inceleyin
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('images')}
            className={`
              px-8 py-4 rounded-2xl font-semibold transition-all duration-500
              ${activeTab === 'images'
                ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg scale-105'
                : 'bg-secondary/5 text-gray-700 hover:bg-primary/10 hover:text-primary'
              }
            `}
          >
            Resimler
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`
              px-8 py-4 rounded-2xl font-semibold transition-all duration-500
              ${activeTab === 'videos'
                ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg scale-105'
                : 'bg-secondary/5 text-gray-700 hover:bg-primary/10 hover:text-primary'
              }
            `}
          >
            Videolar
          </button>
        </div>

        {/* Images Section */}
        {activeTab === 'images' && (
          <div className="space-y-12">
            {/* Gallery Images */}
            {galleryImages.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8 relative inline-block">
                  Galeri Resimleri
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {galleryImages.map((image, index) => (
                    <div
                      key={`gallery-${index}`}
                      onClick={() => openLightbox({ ...image, productName: image.title })}
                      className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <h3 className="text-white font-semibold text-lg px-4 text-center">{image.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Images */}
            {allImages.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8 relative inline-block">
                  Ürün Görselleri
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {allImages.map((image, index) => (
                    <div
                      key={`product-${index}`}
                      onClick={() => openLightbox(image)}
                      className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <h3 className="text-white font-semibold text-lg px-4 text-center">{image.productName}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {galleryImages.length === 0 && allImages.length === 0 && (
              <div className="text-center py-24 bg-secondary/5 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-xl">Henüz görsel bulunmamaktadır.</p>
              </div>
            )}
          </div>
        )}

        {/* Videos Section */}
        {activeTab === 'videos' && (
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-8 relative inline-block">
              Üretim Videoları
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
            </h2>
            {videos.length === 0 ? (
              <div className="text-center py-24 bg-secondary/5 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-xl mb-2">Henüz video bulunmamaktadır.</p>
                <p className="text-gray-300">Yakında eklenecektir...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                      <iframe
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full aspect-video"
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-secondary">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Image Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in-down"
            onClick={closeLightbox}
          >
            <div
              className="relative bg-white rounded-3xl p-4 max-w-5xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-12 h-12 bg-red-500 text-white rounded-full text-3xl font-bold hover:bg-red-600 transition-colors duration-300 flex items-center justify-center z-10"
                onClick={closeLightbox}
              >
                ×
              </button>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={900}
                className="w-full h-auto"
                style={{ maxHeight: '80vh' }}
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-secondary">{selectedImage.productName}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
