'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product, Category } from '../../../types';

export default function ProductPage() {
  const { product } = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        const related = allProducts.filter((p: Product) => p.category_id === productRes.category_id && p.slug !== product);
        setRelatedProducts(related);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [product]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-2xl text-gray-600">Product not found</div>
      </div>
    );
  }

  const images = JSON.parse(productData.images || '[]');
  const category = categories.find(cat => cat.id === productData.category_id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-secondary mb-6">{productData.name}</h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{productData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((img: string, index: number) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={img}
                      alt={`${productData.name} ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {category && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-secondary mb-4">Kategori</h3>
                <Link
                  href="/urunler"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 mb-3"
                >
                  {category.name}
                </Link>
                <p className="text-gray-600">{category.description}</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-secondary mb-6">Benzer Ürünler</h3>
              {relatedProducts.length > 0 ? (
                <div className="space-y-4">
                  {relatedProducts.map((relatedProduct) => {
                    const relatedImages = JSON.parse(relatedProduct.images || '[]');
                    const description = relatedProduct.description ? relatedProduct.description.substring(0, 100) + '...' : '';
                    return (
                      <Link
                        key={relatedProduct.slug}
                        href={`/urunler/${relatedProduct.slug}`}
                        className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
                      >
                        {relatedImages.length > 0 && (
                          <img
                            src={relatedImages[0]}
                            alt={relatedProduct.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                            {relatedProduct.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">Bu kategoride başka ürün bulunmamaktadır.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
