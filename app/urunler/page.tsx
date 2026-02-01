'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category, Product } from '../../types';

export default function Urunler() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/category').then(res => res.json()),
      fetch('/api/urunler').then(res => res.json())
    ]).then(([cats, prods]) => {
      setCategories(cats);
      setProducts(prods);
      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0]);
      }
    }).catch(err => console.error(err));
  }, []);

  const getProductsByCategory = (categoryId: number) => {
    return products.filter(product => product.category_id === categoryId);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const categoryProducts = selectedCategory ? getProductsByCategory(selectedCategory.id) : [];

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">Ürünlerimiz</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-down animation-delay-200">
            Endüstriyel ihtiyaçlarınız için en kaliteli tambur ve kauçuk kaplama çözümleri.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/5 backdrop-blur-md rounded-3xl p-8 sticky top-24 border border-secondary/10 shadow-xl">
              <h3 className="text-2xl font-bold text-secondary mb-8 relative inline-block">
                Kategoriler
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`
                        w-full text-left px-6 py-4 rounded-2xl transition-all duration-500
                        ${selectedCategory && selectedCategory.id === category.id
                          ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg scale-105'
                          : 'hover:bg-primary/10 text-gray-700 hover:text-primary'
                        }
                      `}
                    >
                      <span className="font-semibold">{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {selectedCategory && (
              <>
                <div className="mb-12 animate-fade-in-down">
                  <h2 className="text-4xl font-bold text-secondary mb-4">{selectedCategory.name}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{selectedCategory.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product, index) => {
                    const images = product.images ? JSON.parse(product.images) : [];
                    const description = product.description ? product.description.substring(0, 150) + (product.description.length > 150 ? '...' : '') : '';
                    return (
                      <Link
                        key={product.slug}
                        href={`/urunler/${product.slug}`}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {images.length > 0 && (
                          <div className="relative h-56 overflow-hidden">
                            <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                              src={images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        )}
                        <div className="p-8">
                          <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{description || 'Ürün detayları için tıklayın'}</p>
                          <div className="mt-6 flex items-center text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                            <span>Detayları Gör</span>
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {categoryProducts.length === 0 && (
                  <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-xl">Bu kategoride ürün bulunmamaktadır.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
