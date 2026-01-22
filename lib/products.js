
export const products = [
  {
    id: "rulo",
    title: "Rulo",
    image: "/products/cards/rulo.jpg",
    description: "Endüstriyel kullanıma uygun yüksek kaliteli taşıyıcı, darbe ve dönüş ruloları.",
    content: [
      {
        title: "TAŞIYICI RULO",
        text: "3 çeşit taşıyıcı rulomuz mevcutdur.",
        list: [
          "Düz rulo: malzemenin taşındığı üst kolda bulunur.",
          "İkili taşıyıcı rulo: bandın yük taşıma kapasitesini arttırır.",
          "Üçlü taşıyıcı rulo: yan makaraların eğimini arttırarak yük taşıma kapasitesini arttırmaktadır.",
        ],
      },
      {
        title: "DARBE RULOSU",
        text: "Banda dökülen iri malzemelerin banda zarar vermemesi için lastik kaplı darbe makaraları kullanılır.",
      },
      {
        title: "DÖNÜŞ RULOSU",
        text: "Dönüş ruloları bandın alt kolunu taşır ve tek bir parçadan oluşur banda yapışan malzeme kalıntısını ve düzensiz malzeme birikimini engeller.",
      },
    ],
    gallery: [
      "/products/rulo/main.jpg",
      "/products/rulo/darbe.png",
      "/products/rulo/donus.png",
    ],
  },
  {
    id: "takoz",
    title: "Takoz",
    image: "/products/cards/takoz.jpg",
    description: "Dayanıklı ve uzun ömürlü takoz çeşitleri.",
    content: [
      {
        title: "Takoz Çeşitleri",
        text: "Farklı endüstriyel ihtiyaçlara uygun, yüksek mukavemetli takoz üretimimiz mevcuttur.",
      },
    ],
    gallery: ["/products/cards/takoz.jpg"],
  },
  {
    id: "siyiricilar",
    title: "Sıyrıcılar",
    image: "/products/cards/siyiricilar.jpg",
    description: "Konveyör bant temizliği için etkili sıyırıcı çözümleri.",
    content: [
      {
        title: "Sıyrıcı Bant Sistemleri",
        text: "Bant sıyırıcılarımız, bant üzerindeki malzeme kalıntılarını temizleyerek sistem verimliliğini artırır.",
      },
    ],
    gallery: ["/products/cards/siyiricilar.jpg"],
  },
  {
    id: "tambur",
    title: "Tambur",
    image: "/products/cards/tambur.png",
    description: "Yüksek performanslı konveyör tamburları.",
    content: [
      {
        title: "Tambur İmalatı",
        text: "Tahrik tamburu, kuyruk tamburu ve gergi tamburu gibi çeşitli tambur tiplerinin imalatını yapmaktayız.",
      },
    ],
    gallery: ["/products/cards/tambur.png"],
  },
  {
    id: "motor-redektor",
    title: "Motor Redektör",
    image: "/products/cards/motor-redektor.png",
    description: "Güçlü ve verimli motor redektör sistemleri.",
    content: [
      {
        title: "Motor ve Redektör Çözümleri",
        text: "Endüstriyel uygulamalarınız için en uygun motor ve redektör seçeneklerini sunuyoruz.",
      },
    ],
    gallery: ["/products/cards/motor-redektor.png"],
  },
  {
    id: "mil",
    title: "Mil",
    image: "/products/cards/mil.jpg",
    description: "Özel üretim çelik miller.",
    content: [
      {
        title: "Mil Üretimi",
        text: "İstenilen ölçü ve özelliklerde, yüksek hassasiyetli mil üretimi gerçekleştirmekteyiz.",
      },
    ],
    gallery: ["/products/cards/mil.jpg"],
  },
  {
    id: "konveyor-banti",
    title: "Konveyör Bantı",
    image: "/products/cards/konveyor-banti.jpg",
    description: "Her sektöre uygun konveyör bant çeşitleri.",
    content: [
      {
        title: "Konveyör Bant Sistemleri",
        text: "Taşıma sistemlerinizin vazgeçilmezi olan dayanıklı konveyör bantlarımızla hizmetinizdeyiz.",
      },
    ],
    gallery: ["/products/cards/konveyor-banti.jpg"],
  },
  {
    id: "kaucuk-yer-zeminleri",
    title: "Kauçuk Yer Zeminleri",
    image: "/products/cards/hayvan-yataklari.jpg", // Reusing image as placeholder/shared
    description: "Kaymaz ve darbe emici kauçuk zemin kaplamaları.",
    content: [
      {
        title: "Zemin Kaplama Çözümleri",
        text: "Güvenli ve konforlu çalışma alanları için kauçuk zemin çözümleri sunuyoruz.",
      },
    ],
    gallery: ["/products/cards/hayvan-yataklari.jpg"],
  },
  {
    id: "kaplama-cesitleri",
    title: "Kaplama Çeşitleri",
    image: "/products/cards/kaplama-cesitleri.jpg",
    description: "Tambur ve rulo kaplama hizmetleri.",
    content: [
      {
        title: "Kauçuk Kaplama",
        text: "Sıcak vulkanize ve soğuk kaplama yöntemleriyle tambur ve rulolarınızın ömrünü uzatıyoruz.",
      },
    ],
    gallery: ["/products/cards/kaplama-cesitleri.jpg"],
  },
  {
    id: "hayvan-yataklari",
    title: "Hayvan Yatakları",
    image: "/products/cards/hayvan-yataklari.jpg",
    description: "Konforlu ve hijyenik hayvan yatakları.",
    content: [
      {
        title: "Hayvan Yatakları",
        text: "Hayvanlarınızın sağlığı ve konforu için özel olarak tasarlanmış yatak sistemleri.",
      },
    ],
    gallery: ["/products/cards/hayvan-yataklari.jpg"],
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.id === slug);
}
