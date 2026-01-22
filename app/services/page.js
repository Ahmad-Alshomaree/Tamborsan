import styles from './services.module.css';

export default function TamburImalatiPage() {
  return (
    <div>
      <h1 className={styles.title}>Tambur İmalatı</h1>

      <div className={styles.textBlock}>
        <h3>TAMBUR: TAHRİK TAMBURU, GERGİ TAMBURU, AVARE TAMBURU, YATAKLI TAMBURU, MIKNATISLI TAMBUR</h3>
        <p>
          Endüstriyel ihtiyaçlarınıza yönelik çeşitli tipte ve özellikte tambur imalatı yapmaktayız.
        </p>
      </div>

      <div className={styles.textBlock}>
        <h3>TAHRİK TAMBURU</h3>
        <p>
          Konveyör bant kayışına hareket veren konveyör tamburudur ve bandın başına takılır. Bant boyunun uzun olması halinde bir bant tesisinde birden fazla tahrik tamburu kullanılabilir. Konveyör tamburun gövde borusunu iyi kavrayabilmesi için kauçuk kaplama yapılır. Sökülebilir milli olup pens sistemi ile tambur borusuna bağlanır. Kavramanın daha iyi olması için 10-25 mm kalınlıklarda, 65 ± 5 Shore sertlikte kaplanıp taşlanır, baklava veya çavuş desen açılır. Projeye uygun çeşitli sertlik değerlerine göre sıcak vulkanize olarak imal edilir.
        </p>
      </div>

      <div className={styles.textBlock}>
        <h3>GERGİ VE KUYRUK TAMBURU</h3>
        <p>
          Konveyör bant boyunun kısa olması durumunda kayışının sonuna konveyör kuyruk tamburu takılır ve gerdirme sistemi gergi tamburunun miline bağlanır. Konveyör bant boyunun uzun olması durumunda ise konveyör kuyruk tamburu olarak sona takıldığı gibi bant gergi sistemi içinde ağırlık mekanizmaları ile beraber kullanılır. Sökülebilir milli olup pens sistemi ile tambur borusuna bağlanır. Tambur boruların çapları; taşıyacağı yüke göre hesaplanmış bandın genişliğine ve uzunluğuna göre 220 mm ile 1400 mm arasındaki çaplarda ve 400 mm ile 3000 mm’ye kadar yüzey genişliğindedir.
        </p>
      </div>

      <div className={styles.textBlock}>
        <h3>AVARE TAMBURU</h3>
        <p>
          Avare tamburlar tamamen bağımsız çalışır.
        </p>
      </div>

      <div className={styles.textBlock}>
        <h3>MANYETİK TAMBUR</h3>
        <p>
          Manyetik tambur paslanmaz çelikten üretilmiş ve gereksinimlerinize uygun boyutlara getirebiliriz. Hububatların ve un, irmiğin metal parçacıklardan temizlenmesinde kullanılır. Buğday, mısır gibi hububatların temizleme, işleme, öğütme tesislerinde ve yem fabrikalarında kullanılır.
        </p>
      </div>
    </div>
  );
}
