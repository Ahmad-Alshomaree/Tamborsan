import Image from 'next/image';
import styles from '../services.module.css';

export default function YedekParcaPage() {
  return (
    <div>
      <h1 className={styles.title}>Yedek Parça</h1>

      <div className={styles.imageContainer}>
        <Image
          src="/services/makina_yedek_parca.jpg"
          alt="Makina Yedek Parça"
          width={800}
          height={600}
          className={styles.image}
        />
      </div>

      <div className={styles.textBlock}>
        <h3>Yedek Parça Temini</h3>
        <p>
          İmalatlarımızın yedek parça teminleri için firmamız ile iletişime geçebilir ve temin edebilirsiniz.
        </p>
        <p>
          Konveyör sistemleriniz ve tamburlarınız için gerekli olan tüm rulman, mil, dişli, kayış ve diğer mekanik parçaların tedariğini sağlamaktayız. Orijinal ve kaliteli yedek parçalarla sistemlerinizin ömrünü uzatın ve performansını artırın.
        </p>
      </div>
    </div>
  );
}
