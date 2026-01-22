import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const certificates = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Kaliteli Tambur ve Kauçuk Kaplama Çözümleri</h1>
          <p className={styles.heroSubtitle}>
            Sanayi ihtiyaçlarınıza yönelik yüksek performanslı üretim ve kaplama hizmetleri.
          </p>
          <Link href="#contact" className="btn btn-primary">
            Teklif Alın
          </Link>
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

      {/* E-Catalog Section */}
      <section id="catalogs" className={`${styles.section} ${styles.catalogSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>E-Kataloglar</h2>
          <div className={styles.catalogButtons}>
             <div className={styles.catalogCard}>
                <h3>2022 Tambursan Kataloğu (TR)</h3>
                <p style={{marginBottom: '1rem'}}>Ürün ve hizmetlerimizi detaylı incelemek için kataloğumuzu indirin.</p>
                <Link href="https://www.tambursan.com.tr/tema/firma/uploads/kataloglar/dosya/tm2022-tr.pdf" target="_blank" className="btn btn-primary">
                   İncele / İndir
                </Link>
             </div>
             <div className={styles.catalogCard}>
                <h3>2022 Tambursan Catalog (EN)</h3>
                <p style={{marginBottom: '1rem'}}>Download our catalog to review our products and services in detail.</p>
                <Link href="https://www.tambursan.com.tr/tema/firma/uploads/kataloglar/dosya/tm2022-eng.pdf" target="_blank" className="btn btn-primary">
                   Review / Download
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Documents/Certificates Section */}
      <section id="documents" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Belgelerimiz</h2>
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>Kalite standartlarımızı belgeleyen sertifikalarımız.</p>
          <div className={styles.documentsGrid}>
            {certificates.map((num) => (
              <div key={num} className={styles.documentItem}>
                <Image
                  src={`/certificates/belge${num}.jpg`}
                  alt={`Belge ${num}`}
                  width={300}
                  height={400}
                  style={{width: '100%', height: 'auto'}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Products Section */}
      <section id="services" className={styles.section} style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Hizmetlerimiz ve Ürünlerimiz</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⚙️</div>
              <h3 className={styles.cardTitle}>Tambur İmalatı</h3>
              <p className={styles.cardText}>
                Endüstriyel standartlara uygun, dayanıklı ve yüksek performanslı tambur üretimi.
              </p>
              <Link href="#" className="btn btn-primary">Detaylı Bilgi</Link>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🛡️</div>
              <h3 className={styles.cardTitle}>Kauçuk Kaplama</h3>
              <p className={styles.cardText}>
                Aşınmaya dayanıklı, uzun ömürlü ve çeşitli sertliklerde kauçuk kaplama hizmetleri.
              </p>
              <Link href="#" className="btn btn-primary">Detaylı Bilgi</Link>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🔧</div>
              <h3 className={styles.cardTitle}>Yedek Parça</h3>
              <p className={styles.cardText}>
                Konveyör bantları, rulolar, sıyırıcılar ve diğer yedek parça tedariği.
              </p>
              <Link href="#" className="btn btn-primary">Detaylı Bilgi</Link>
            </div>
             <div className={styles.card}>
              <div className={styles.cardIcon}>🏭</div>
              <h3 className={styles.cardTitle}>Konveyör Sistemleri</h3>
              <p className={styles.cardText}>
                İhtiyacınıza özel konveyör bant ve sistem çözümleri.
              </p>
              <Link href="#" className="btn btn-primary">Detaylı Bilgi</Link>
            </div>
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
          <Link href="tel:+903123858558" className="btn btn-primary">
            Bizi Arayın: 0 (312) 385-8558
          </Link>
        </div>
      </section>
    </div>
  );
}
