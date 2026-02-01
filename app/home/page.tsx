'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Certificate, Catalog, Contact } from '../../types';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function Home() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const productImages: string[] = [
    '/products/1769150607267_image_0.png',
    '/products/1769160598284_image_0.png'
  ];

  useEffect(() => {
    setIsLoaded(true);
    Promise.all([
      fetch('/api/belgeler').then(res => res.json()),
      fetch('/api/kataloglar').then(res => res.json()),
      fetch('/api/iletisim').then(res => res.json())
    ]).then(([certData, catalogData, contactData]) => {
      setCertificates(certData);
      setCatalogs(catalogData);
      if (contactData.length > 0) {
        setContact(contactData[0]);
      }
    }).catch(err => console.error(err));
  }, []);

  const features: Feature[] = [
    {
      icon: '🏭',
      title: 'Endüstriyel Çözümler',
      description: 'Sanayi sektörüne özel profesyonel tambur kaplama hizmetleri'
    },
    {
      icon: '✨',
      title: 'Kalite Garantisi',
      description: 'Uluslararası standartlarda üretim ve kalite kontrol'
    },
    {
      icon: '⚡',
      title: 'Hızlı Üretim',
      description: 'Zamanında teslimat ve esnek üretim kapasitesi'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`
        relative min-h-[35vh] flex items-center justify-center overflow-hidden bg-black
        transition-all duration-1000 ease-in-out
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />

          <img
            src="/Galary/Hero section/TAM KARŞI 6,7,8.jpg"
            alt="Cinematic Background"
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          />

          {/* Golden Ambient Glow */}
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
            {/* Branding Column */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-6 animate-fade-in-left">
              <div className="relative group">
                <div className="absolute -inset-6 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
                <img
                  src="/logo.png"
                  alt="Tambursan Logo"
                  className="relative h-24 md:h-32 w-auto brightness-0 invert filter drop-shadow-[0_0_15px_rgba(198,156,46,0.3)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-primary/40" />
                <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase">
                  Tambursan Industrial
                </span>
              </div>
            </div>

            {/* Typography Column */}
            <div className="flex-[1.5] text-center lg:text-left animate-fade-in-right">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white tracking-widest leading-none mb-4 animate-reveal-text">
                MÜKEMMEL <span className="font-bold text-primary">İŞÇİLİK.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-400 font-light tracking-wide leading-relaxed max-w-2xl animate-fade-in-up animation-delay-500">
                30 yılı aşkın tecrübe ile endüstriyel tambur ve kauçuk kaplama dünyasında <span className="text-white">standartları biz belirliyoruz.</span>
              </p>
            </div>

            {/* Compact Feature Bar (Desktop) */}
            <div className="hidden xl:flex flex-col gap-4 border-l border-white/10 pl-12 animate-fade-in-right animation-delay-700">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <span className="text-primary text-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                      {feature.title}
                    </span>
                    <span className="text-gray-600 text-[8px] tracking-widest uppercase truncate max-w-[100px]">
                      {feature.description.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Vertical Line */}
        <div className="absolute left-10 bottom-0 h-32 w-[1px] bg-gradient-to-t from-primary to-transparent z-20 hidden lg:block" />

        {/* Quick Link Indicator */}
        <div className="absolute right-10 bottom-10 flex flex-col items-center gap-6 z-20 hidden lg:flex">
          <span className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180">
            Aşağı Kaydır
          </span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary animate-shimmer" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="corporate" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-16">Hakkımızda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-primary mb-4">TAMBURSAN İMALAT ve KAPLAMA SANAYİ</h3>
              <p className="text-gray-600 leading-relaxed">
                Müşterilerimizi uzun vadeli ortaklarımız olarak görürüz. Bu yüzden müşteri memnuniyeti bizim birinci önceliğimizdir.
                Dolayısı ile birinci stratejik hedefimiz, müşterilerimizin sadakatlerini hak etmek ve kazanmaktır.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-primary mb-4">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Kaliteli ürün üretmek misyonu çerçevesinde, ileri teknolojinin sağlamış olduğu imkanlar ve yeniliği hedefleyen dinamik kadromuz,
                bugün gerçekleştirmiş olduğumuz ve gelecekte de artacağına inandığımız başarılarımızın kaynağını oluşturmaktadır.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-primary mb-4">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Sizlere daha iyi hizmet sunabilmek, kaliteli ve devamlılığı profesyonel olarak sürdürebilmemiz için sürekli olarak kendimizi yenilemeyi hedef olarak belirledik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">Çalışmalarımızın Bir Önizlemesi</h2>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <video controls className="w-full">
              <source src="/Galary/tambursan.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* E-Catalog Section */}
      <section id="catalogs" className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-4">E-Kataloglar</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Ürün ve hizmetlerimizi detaylı incelemek için kataloglarımızı inceleyin</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogs.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">Henüz katalog bulunmamaktadır.</p>
            ) : (
              catalogs.map((catalog) => (
                <div key={catalog.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-6xl mb-4 text-center">📄</div>
                  <h3 className="text-2xl font-bold text-secondary mb-3 text-center">{catalog.name}</h3>
                  <p className="text-gray-600 mb-6 text-center">{catalog.description || 'Ürün ve hizmetlerimizi detaylı incelemek için kataloğumuzu indirin.'}</p>
                  <Link
                    href={catalog.file_path}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span>İncele / İndir</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Documents/Certificates Section */}
      <section id="documents" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-4">Belgelerimiz</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Kalite standartlarımızı belgeleyen sertifikalarımız</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-down"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCertificate(cert)}
              >
                <Image
                  src={cert.file_path}
                  alt={cert.name}
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Görüntüle</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-7xl mb-6">📞</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className="text-xl text-white/90 mb-8">
              Sorularınız ve teklif talepleriniz için uzman ekibimizle görüşün.
            </p>
            <Link
              href={`tel:+90${contact?.phone_number?.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Bizi Arayın: {contact?.phone_number}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Certificate Lightbox */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in-down"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative bg-white rounded-2xl p-4 max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-red-500 text-white rounded-full text-3xl font-bold hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
              onClick={() => setSelectedCertificate(null)}
            >
              ×
            </button>
            <Image
              src={selectedCertificate.file_path}
              alt={selectedCertificate.name}
              width={800}
              height={1000}
              className="w-full h-auto"
              style={{ maxHeight: '85vh', objectFit: 'contain' }}
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-secondary">{selectedCertificate.name}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}