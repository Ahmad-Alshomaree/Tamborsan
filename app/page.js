import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
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
            <p>
              Tambursan, sektördeki tecrübesiyle tambur imalatı, kauçuk kaplama ve yedek parça temini konularında hizmet vermektedir.
              Müşteri memnuniyetini ön planda tutan firmamız, kaliteli malzeme ve uzman işçilikle sanayinin ihtiyaçlarına çözüm üretmektedir.
            </p>
            <p>
              Üretim parkurumuz ve geniş ürün yelpazemiz ile konveyör sistemleri, rulo, takoz ve diğer endüstriyel ekipmanların tedariğinde güvenilir ortağınızız.
            </p>
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
          <Link href="tel:+903123858558" className={`${styles.btnWhite} btn`}>
            Bizi Arayın: 0 (312) 385-8558
          </Link>
        </div>
      </section>
    </div>
  );
}
