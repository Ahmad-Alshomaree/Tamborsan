'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../page.module.css';

export default function Home() {
  const [certificates, setCertificates] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [contact, setContact] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const productImages = [
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

  const features = [
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
    <div className={styles.homePageContainer}>
      {/* Hero Section */}
      <section className={`${styles.hero} ${isLoaded ? styles.heroLoaded : ''}`}>
        <div className="container">
          <div className={styles.logoContainer}>
            <Image
              src="/logo.png"
              alt="Tambursan Logo"
              width={900}
              height={300}
              className={styles.heroLogo}
              priority
              quality={100}
            />
          </div>
          <p className={styles.heroSubtitle}>
            30 yılı aşan tecrübe ile sanayi sektöründe en kaliteli çözümlerini sunuyoruz.
            Tambur kaplama ve kauçuk işçiliğinde uzman ekibimiz, projelerinizi başarıya taşımak için hazırdır.
          </p>

          {/* Feature Highlights */}
          <div className={styles.featureHighlights}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureHighlight}>
                <div className={styles.featureHighlightIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productSlider}>
          <div className={styles.sliderContainer}>
            {[...productImages, ...productImages].map((image, index) => (
              <div key={index} className={styles.productSlide}>
                <Image
                  src={image}
                  alt={`Product ${index % productImages.length + 1}`}
                  width={250}
                  height={150}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="corporate" className={`${styles.section} ${styles.aboutSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Hakkımızda</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutCard}>
              <h3>TAMBURSAN İMALAT ve KAPLAMA SANAYİ</h3>
              <p>
                Müşterilerimizi uzun vadeli ortaklarımız olarak görürüz. Bu yüzden müşteri memnuniyeti bizim birinci önceliğimizdir.
                Dolayısı ile birinci stratejik hedefimiz, müşterilerimizin sadakatlerini hak etmek ve kazanmaktır.
                Uzun yıllar boyunca süren ilişkilerin ardından, birçok müşterimizin aynı zamanda çok yakın dostlarımız haline gelmiş olması,
                bize bu hedefimizde şu ana kadar başarılı olduğumuzu düşündürmektedir.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>Misyonumuz</h3>
              <p>
                Kaliteli ürün üretmek misyonu çerçevesinde, ileri teknolojinin sağlamış olduğu imkanlar ve yeniliği hedefleyen dinamik kadromuz,
                bugün gerçekleştirmiş olduğumuz ve gelecekte de artacağına inandığımız başarılarımızın kaynağını oluşturmaktadır.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>Vizyonumuz</h3>
              <p>
                Sizlere daha iyi hizmet sunabilmek, kaliteli ve devamlılığı profesyonel olarak sürdürebilmemiz için sürekli olarak kendimizi yenilemeyi hedef olarak belirledik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className={styles.introVideo}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Çalışmalarımızın Bir Önizlemesi</h2>
        </div>
        <div className={styles.videoContainer}>
          <video controls className={styles.video}>
            <source src="/Galary/tambursan.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* E-Catalog Section */}
      <section id="catalogs" className={`${styles.section} ${styles.catalogSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>E-Kataloglar</h2>
          <p className={styles.sectionSubtitle}>Ürün ve hizmetlerimizi detaylı incelemek için kataloglarımızı inceleyin</p>
          <div className={styles.catalogButtons}>
            {catalogs.length === 0 ? (
              <p className={styles.noContent}>Henüz katalog bulunmamaktadır.</p>
            ) : (
              catalogs.map((catalog) => (
                <div key={catalog.id} className={styles.catalogCard}>
                  <div className={styles.catalogIcon}>📄</div>
                  <h3>{catalog.name}</h3>
                  <p>{catalog.description || 'Ürün ve hizmetlerimizi detaylı incelemek için kataloğumuzu indirin.'}</p>
                  <Link href={catalog.file_path} target="_blank" className={styles.catalogButton}>
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
      <section id="documents" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Belgelerimiz</h2>
          <p className={styles.sectionSubtitle}>Kalite standartlarımızı belgeleyen sertifikalarımız</p>
          <div className={styles.documentsGrid}>
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={styles.documentItem}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCertificate(cert)}
              >
                <Image
                  src={cert.file_path}
                  alt={cert.name}
                  width={300}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className={styles.documentOverlay}>
                  <span>Görüntüle</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>📞</div>
            <h2 className={styles.ctaTitle}>Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className={styles.ctaText}>
              Sorularınız ve teklif talepleriniz için uzman ekibimizle görüşün.
            </p>
            <Link href={`tel:+90${contact?.phone_number?.replace(/\D/g, '')}`} className={styles.ctaButton}>
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
        <div className={styles.lightbox} onClick={() => setSelectedCertificate(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedCertificate(null)}>×</button>
            <Image
              src={selectedCertificate.file_path}
              alt={selectedCertificate.name}
              width={800}
              height={1000}
              style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain' }}
            />
            <div className={styles.lightboxInfo}>
              <h3>{selectedCertificate.name}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}