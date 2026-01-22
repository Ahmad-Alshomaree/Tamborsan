const db = require('../lib/database');

const categories = [
  { name: 'Rulo', slug: 'rulo', description: 'Rulo ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/rulo1.jpg', '/products/rulo2.jpg']), category_id: 1 },
  { name: 'Takoz', slug: 'takoz', description: 'Takoz ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/takoz1.jpg']), category_id: 1 },
  { name: 'Sıyrıcılar', slug: 'siricilar', description: 'Sıyrıcılar ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/siricilar1.jpg']), category_id: 1 },
  { name: 'Tambur', slug: 'tambur', description: 'Tambur ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/tambur1.jpg']), category_id: 1 },
  { name: 'Motor Redektör', slug: 'motor-redektor', description: 'Motor Redektör ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/motor-redektor1.jpg']), category_id: 1 },
  { name: 'Mil', slug: 'mil', description: 'Mil ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/mil1.jpg']), category_id: 1 },
  { name: 'Konveyör Bantı', slug: 'konveyoer-banti', description: 'Konveyör Bantı ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/konveyoer-banti1.jpg']), category_id: 2 },
  { name: 'Kauçuk Yer Zeminleri', slug: 'kauck-yer-zeminleri', description: 'Kauçuk Yer Zeminleri ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/kauck-yer-zeminleri1.jpg']), category_id: 3 },
  { name: 'Kaplama Çeşitleri', slug: 'kaplama-cesitleri', description: 'Kaplama Çeşitleri ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/kaplama-cesitleri1.jpg']), category_id: 4 },
  { name: 'Hayvan Yatakları', slug: 'hayvan-yataklari', description: 'Hayvan Yatakları ürünleri hakkında detaylı bilgi.', images: JSON.stringify(['/products/hayvan-yataklari1.jpg']), category_id: 3 },
];

const products = [];

const certificates = [
  { name: 'Belge 1', description: 'Kalite sertifikası 1', file_path: '/certificates/belge1.jpg', type: 'sertifika' },
  { name: 'Belge 2', description: 'Kalite sertifikası 2', file_path: '/certificates/belge2.jpg', type: 'sertifika' },
  { name: 'Belge 3', description: 'Kalite sertifikası 3', file_path: '/certificates/belge3.jpg', type: 'sertifika' },
  { name: 'Belge 4', description: 'Kalite sertifikası 4', file_path: '/certificates/belge4.jpg', type: 'sertifika' },
  { name: 'Belge 5', description: 'Kalite sertifikası 5', file_path: '/certificates/belge5.jpg', type: 'sertifika' },
  { name: 'Belge 6', description: 'Kalite sertifikası 6', file_path: '/certificates/belge6.jpg', type: 'sertifika' },
];

db.serialize(() => {
  // Insert categories
  const stmtCat = db.prepare('INSERT OR IGNORE INTO Category (name, description) VALUES (?, ?)');
  categories.forEach(cat => {
    stmtCat.run(cat.name, cat.description);
  });
  stmtCat.finalize();

  // Insert products
  const stmtProd = db.prepare('INSERT OR IGNORE INTO Ürünler (name, slug, description, images, category_id) VALUES (?, ?, ?, ?, ?)');
  products.forEach(product => {
    stmtProd.run(product.name, product.slug, product.description, product.images, product.category_id);
  });
  stmtProd.finalize();

  // Insert certificates
  const stmtCert = db.prepare('INSERT OR IGNORE INTO Belgeler (name, description, file_path, type) VALUES (?, ?, ?, ?)');
  certificates.forEach(cert => {
    stmtCert.run(cert.name, cert.description, cert.file_path, cert.type);
  });
  stmtCert.finalize();

  console.log('Categories, products and certificates seeded successfully');
  db.close();
});
