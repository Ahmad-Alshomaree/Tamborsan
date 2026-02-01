-- Populate Tambursan Database with Sample Data
-- This script adds realistic sample data for a drum and rubber coating manufacturing company
-- Insert Categories
INSERT INTO Category (name, description)
VALUES (
        'Tambur Çeşitleri',
        'Endüstriyel kullanım için çeşitli tambur tipleri ve boyutları'
    ),
    (
        'Kauçuk Kaplamalar',
        'Yüksek kaliteli kauçuk kaplama çözümleri ve malzemeleri'
    ),
    (
        'Konveyör Sistemleri',
        'Konveyör bantları ve sistemleri için tambur ve aksesuar çözümleri'
    );
-- Insert Products
-- Tambur Çeşitleri (Category ID: 1)
INSERT INTO Ürünler (name, slug, description, images, category_id)
VALUES (
        'Çelik Tambur',
        'celik-tambur',
        'Yüksek dayanıklılığa sahip çelik tambur. Ağır yük taşıma kapasitesi ile endüstriyel uygulamalar için idealdir. Korozyon dirençli özel kaplama ile uzun ömürlüdür.',
        '[]',
        1
    ),
    (
        'Alüminyum Tambur',
        'aluminyum-tambur',
        'Hafif ve dayanıklı alüminyum alaşımdan üretilmiş tambur. Kolay montaj ve bakım avantajı sağlar. Gıda ve ilaç sektörü için hijyenik çözüm sunar.',
        '[]',
        1
    ),
    (
        'Paslanmaz Çelik Tambur',
        'paslanmaz-celik-tambur',
        'Paslanmaz çelik malzemeden üretilmiş, korozyon direnci yüksek tambur. Kimya ve gıda endüstrisi için ideal. Uzun ömürlü ve bakım gerektirmez.',
        '[]',
        1
    ),
    (
        'Tahrik Tamburuları',
        'tahrik-tamburlari',
        'Konveyör sistemleri için özel tasarlanmış tahrik tamburları. Yüksek tork kapasitesi ve hassas dengeli yapı. Çeşitli çap ve genişlik seçenekleri mevcuttur.',
        '[]',
        1
    );
-- Kauçuk Kaplamalar (Category ID: 2)
INSERT INTO Ürünler (name, slug, description, images, category_id)
VALUES (
        'Standart Kauçuk Kaplama',
        'standart-kaucuk-kaplama',
        'Genel amaçlı kauçuk kaplama hizmeti. Aşınma direnci yüksek, ekonomik çözüm. Her türlü tambur için uygulanabilir. 6-12mm kalınlık seçenekleri.',
        '[]',
        2
    ),
    (
        'Aşınmaya Dayanıklı Kaplama',
        'asinmaya-dayanikli-kaplama',
        'Ekstra aşınma dirençli özel formül kauçuk kaplama. Ağır hizmet koşulları için geliştirilmiştir. 2-3 kat daha uzun ömürlü, yüksek performans sağlar.',
        '[]',
        2
    ),
    (
        'Yağ Dirençli Kaplama',
        'yag-direncli-kaplama',
        'Yağ ve kimyasal maddelere karşı dirençli özel kauçuk kaplama. Petrol, kimya ve otomotiv sektörü için ideal. Yüksek sıcaklık dayanımı vardır.',
        '[]',
        2
    ),
    (
        'Gıda Sınıfı Kaplama',
        'gida-sinifi-kaplama',
        'FDA onaylı, gıda ile temas için uygun kauçuk kaplama. Hijyenik, kokusuz ve tatsız. Gıda işleme tesisleri için sertifikalı çözüm sunar.',
        '[]',
        2
    );
-- Konveyör Sistemleri (Category ID: 3)
INSERT INTO Ürünler (name, slug, description, images, category_id)
VALUES (
        'Kuyruk Tamburuları',
        'kuyruk-tamburlari',
        'Konveyör sistemleri için kuyruk tamburları. Hassas dengeli, düşük sürtünme katsayılı. Kolay montaj ve uzun ömürlü rulman sistemi içerir.',
        '[]',
        3
    ),
    (
        'Gergi Tamburuları',
        'gergi-tamburlari',
        'Ayarlanabilir gergi mekanizmalı tambur sistemleri. Bant gerginliğini optimize eder. Otomatik ve manuel gergi seçenekleri mevcuttur.',
        '[]',
        3
    ),
    (
        'Yönlendirme Tamburuları',
        'yonlendirme-tamburlari',
        'Konveyör bantlarının yönlendirilmesi için özel tasarım tambur. Hassas açı ayarı yapılabilir. Bant kaymasını önleyen özel yüzey işlemi vardır.',
        '[]',
        3
    ),
    (
        'Ağır Hizmet Tamburları',
        'agir-hizmet-tamburlari',
        'Maden ve taş ocakları için özel tasarlanmış ağır hizmet tamburları. Yüksek yük kapasitesi ve darbe dayanımı. Ekstra güçlendirilmiş yapı ve rulman sistemi.',
        '[]',
        3
    );
-- Insert Services
INSERT INTO Hizmetler (name, description, images)
VALUES (
        'Kauçuk Kaplama Hizmeti',
        'Profesyonel kauçuk kaplama hizmeti sunuyoruz. Tüm tambur tiplerine uygun, yüksek kaliteli kauçuk malzemeler kullanılır. Hızlı teslimat ve garanti ile güvenilir hizmet. Standart ve özel formül kaplama seçenekleri mevcuttur. Yerinde ve atölyede uygulama imkanı vardır.',
        '[]'
    ),
    (
        'Tambur Üretimi ve Onarımı',
        'Özel ölçülerde tambur üretimi ve mevcut tamburların onarımı. CAD/CAM destekli tasarım ve hassas imalat. Statik ve dinamik dengeleme hizmeti. Rulman değişimi ve mil onarımı dahil kapsamlı servis sunuyoruz.',
        '[]'
    ),
    (
        'Konveyör Bakım ve Servis',
        'Konveyör sistemleri için periyodik bakım ve acil servis hizmeti. Tambur değişimi, bant değişimi ve ayar işlemleri. 7/24 teknik destek ve yerinde müdahale imkanı. Önleyici bakım programları ile kesintisiz üretim sağlıyoruz.',
        '[]'
    ),
    (
        'Özel Tasarım Çözümleri',
        'Müşteri ihtiyaçlarına özel tambur ve kaplama çözümleri geliştiriyoruz. Mühendislik desteği ve prototip üretimi. Özel malzeme ve kaplama formülleri. R&D ekibimiz ile inovatif çözümler sunuyoruz.',
        '[]'
    );
-- Insert Contact Information
INSERT INTO İletişim (
        phone_label,
        phone_number,
        email_label,
        email_address,
        location_label,
        location,
        facebook_account,
        instagram_account,
        x_account
    )
VALUES (
        'Telefon:',
        '+90 (312) 555 12 34',
        'E-posta:',
        'info@tambursan.com.tr',
        'Adres:',
        'Organize Sanayi Bölgesi, 5. Cadde No:42, Sincan/Ankara',
        'tambursan',
        'tambursan_official',
        'tambursan'
    );
-- Insert Gallery Items (Placeholder entries)
INSERT INTO galeri (image_path, video_path, title, type)
VALUES (
        '/gallery/production-1.jpg',
        NULL,
        'Üretim Tesisimiz',
        'image'
    ),
    (
        '/gallery/production-2.jpg',
        NULL,
        'Kauçuk Kaplama İşlemi',
        'image'
    ),
    (
        '/gallery/production-3.jpg',
        NULL,
        'Kalite Kontrol',
        'image'
    ),
    (
        '/gallery/products-1.jpg',
        NULL,
        'Tambur Çeşitleri',
        'image'
    ),
    (
        '/gallery/products-2.jpg',
        NULL,
        'Kaplama Örnekleri',
        'image'
    ),
    (
        NULL,
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Üretim Süreci',
        'video'
    ),
    (
        NULL,
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Kauçuk Kaplama Uygulaması',
        'video'
    );
-- Insert Welcome Images (Homepage carousel)
INSERT INTO welcome_images (
        image_path,
        title,
        description,
        alt_text,
        display_order,
        is_active
    )
VALUES (
        '/welcome/hero-1.jpg',
        'Tambursan''a Hoş Geldiniz',
        'Endüstriyel tambur ve kauçuk kaplama çözümlerinde lider',
        'Tambur üretim tesisi',
        1,
        1
    ),
    (
        '/welcome/hero-2.jpg',
        'Kaliteli Üretim',
        'ISO 9001 sertifikalı üretim tesisimiz',
        'Kalite kontrol süreci',
        2,
        1
    ),
    (
        '/welcome/hero-3.jpg',
        'Profesyonel Hizmet',
        '20 yılı aşkın tecrübe ve uzman kadro',
        'Teknik ekip çalışması',
        3,
        1
    );