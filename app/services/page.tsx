'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Service } from '../../types';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetch('/api/hizmetler')
      .then(res => res.json())
      .then((data: Service[]) => {
        setServices(data);
        setLoading(false);
        if (data.length > 0) {
          setSelectedService(data[0]);
        }
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">Hizmetlerimiz</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-down animation-delay-200">
            Endüstriyel ihtiyaçlarınız için profesyonel tambur ve kauçuk kaplama hizmetleri.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/5 backdrop-blur-md rounded-3xl p-8 sticky top-24 border border-secondary/10 shadow-xl">
              <h3 className="text-2xl font-bold text-secondary mb-8 relative inline-block">
                Hizmetlerimiz
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => setSelectedService(service)}
                      className={`
                        w-full text-left px-6 py-4 rounded-2xl transition-all duration-500
                        ${selectedService && selectedService.id === service.id
                          ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg scale-105'
                          : 'hover:bg-primary/10 text-gray-700 hover:text-primary'
                        }
                      `}
                    >
                      <span className="font-semibold">{service.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {selectedService && (
              <>
                <div className="mb-12 animate-fade-in-down">
                  <h2 className="text-4xl font-bold text-secondary mb-4">{selectedService.name}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{selectedService.description}</p>
                </div>
                {(() => {
                  const images = JSON.parse(selectedService.images || '[]');
                  return images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {images.map((img: string, index: number) => (
                        <div
                          key={index}
                          className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="relative h-56 overflow-hidden">
                            <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <Image
                              src={img}
                              alt={`${selectedService.name} ${index + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null;
                })()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
