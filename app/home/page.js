'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../page.module.css';

export default function Home() {
  const [certificates, setCertificates] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [contact, setContact] = useState(null);

  const productImages = [
    '/products/1769150607267_image_0.png',
    '/products/1769160598284_image_0.png'
  ];

  useEffect(() => {
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

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.logoContainer}>
            <Image
              src="/logo.png"
              alt="Tambursan Logo"
              width={700}
              height={233}
              className={styles.heroLogo}
            />
          </div>
          <p className={styles.heroSubtitle}>
            30 yılı aşan tecrübe ile sanayi sektöründe en kaliteli çözümlerini sunuyoruz. Tambur kaplama ve kauçuk işçiliğinde uzman ekibimiz, projelerinizi başarıya taşımak için hazırdır.
          </p>
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
                  style={{objectFit: 'cover', borderRadius: '8px'}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="corporate" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Hakkımızda</h2>
          <div className={styles.aboutContent}>
            <p><strong>TAMBURSAN İMALAT ve KAPLAMA SANAYİ</strong></p>
            <p>
              Müşterilerimizi uzun vadeli ortaklarımız olarak görürüz. Bu yüzden müşteri memnuniyeti bizim birinci önceliğimizdir.
              Dolayısı ile birinci stratejik hedefimiz, müşterilerimizin sadakatlerini hak etmek ve kazanmaktır.
              Uzun yıllar boyunca süren ilişkilerin ardından, birçok müşterimizin aynı zamanda çok yakın dostlarımız haline gelmiş olması,
              bize bu hedefimizde şu ana kadar başarılı olduğumuzu düşündürmektedir.
            </p>
            <p>
              Kaliteli ürün üretmek misyonu çerçevesinde, ileri teknolojinin sağlamış olduğu imkanlar ve yeniliği hedefleyen dinamik kadromuz,
              bugün gerçekleştirmiş olduğumuz ve gelecekte de artacağına inandığımız başarılarımızın kaynağını oluşturmaktadır.
            </p>
            <p>
              Sizlere daha iyi hizmet sunabilmek, kaliteli ve devamlılığı profesyonel olarak sürdürebilmemiz için sürekli olarak kendimizi yenilemeyi hedef olarak belirledik.
            </p>
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
          <div className={styles.catalogButtons}>
            {catalogs.length === 0 ? (
              <p style={{textAlign: 'center', width: '100%'}}>Henüz katalog bulunmamaktadır.</p>
            ) : (
              catalogs.map((catalog) => (
                <div key={catalog.id} className={styles.catalogCard}>
                  <h3>{catalog.name}</h3>
                  <p style={{marginBottom: '1rem'}}>{catalog.description || 'Ürün ve hizmetlerimizi detaylı incelemek için kataloğumuzu indirin.'}</p>
                  <Link href={catalog.file_path} target="_blank" className="btn btn-primary">
                    İncele / İndir
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
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>Kalite standartlarımızı belgeleyen sertifikalarımız.</p>
          <div className={styles.documentsGrid}>
            {certificates.map((cert) => (
              <div key={cert.id} className={styles.documentItem}>
                <Image
                  src={cert.file_path}
                  alt={cert.name}
                  width={300}
                  height={400}
                  style={{width: '100%', height: 'auto'}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Projeleriniz İçin Bizimle İletişime Geçin</h2>
          <p className={styles.ctaText}>
            Sorularınız ve teklif talepleriniz için uzman ekibimizle görüşün.
          </p>
          <Link href={`tel:+90${contact?.phone_number?.replace(/\D/g, '')}`} className="btn btn-primary">
            Bizi Arayın: {contact?.phone_number}
          </Link>
        </div>
      </section>
    </div>
  );
}