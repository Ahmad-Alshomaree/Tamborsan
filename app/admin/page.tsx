'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [data, setData] = useState({
    products: [],
    categories: [],
    services: [],
    catalogs: [],
    documents: [],
    gallery: []
  });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [productsRes, categoriesRes, servicesRes, catalogsRes, documentsRes, galleryRes] = await Promise.all([
        fetch('/api/urunler'),
        fetch('/api/category'),
        fetch('/api/hizmetler'),
        fetch('/api/kataloglar'),
        fetch('/api/belgeler'),
        fetch('/api/galeri')
      ]);

      const [products, categories, services, catalogs, documents, gallery] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        servicesRes.json(),
        catalogsRes.json(),
        documentsRes.json(),
        galleryRes.json()
      ]);

      setData({
        products,
        categories,
        services,
        catalogs,
        documents,
        gallery
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (endpoint, formData, tableName) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(`${tableName} başarıyla eklendi!`);
        fetchAllData();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    }
  };

  const handleEdit = async (endpoint, id, formData, tableName) => {
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(`${tableName} başarıyla güncellendi!`);
        fetchAllData();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    }
  };

  const handleDelete = async (endpoint, id, tableName) => {
    if (!confirm(`${tableName} silmek istediğinize emin misiniz?`)) return;

    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert(`${tableName} başarıyla silindi!`);
        fetchAllData();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full animate-ping" />
          <div className="absolute inset-0 w-20 h-20 border-t-2 border-primary rounded-full animate-spin" />
        </div>
        <div className="text-primary text-sm font-bold tracking-[0.4em] uppercase animate-pulse">
          Yükleniyor...
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'products', label: 'Ürünler', icon: '📦' },
    { id: 'categories', label: 'Kategoriler', icon: '📂' },
    { id: 'services', label: 'Hizmetler', icon: '🛠️' },
    { id: 'catalogs', label: 'Kataloglar', icon: '📖' },
    { id: 'documents', label: 'Belgeler', icon: '📜' },
    { id: 'gallery', label: 'Galeri', icon: '🖼️' },
  ];

  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary/30">
      {/* Cinematic Background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -ml-72 -mb-72" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-secondary-dark/80 backdrop-blur-xl border-r border-white/5
          transition-all duration-500 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
        `}>
          <div className="h-full flex flex-col p-4">
            {/* Sidebar Logo Area */}
            <div className="flex items-center gap-4 mb-12 px-2 mt-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(198,156,46,0.3)]">
                <span className="text-black font-bold">T</span>
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-bold tracking-widest text-white uppercase text-xs">Tambursan</span>
                  <span className="text-[10px] text-gray-500 tracking-wider">Admin Paneli</span>
                </div>
              )}
            </div>

            {/* Navigation tabs */}
            <nav className="flex-1 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${activeTab === tab.id
                      ? 'bg-primary text-black shadow-[0_0_25px_rgba(198,156,46,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {isSidebarOpen && (
                    <span className="text-sm font-medium tracking-wide">
                      {tab.label}
                    </span>
                  )}
                  {activeTab === tab.id && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* User Area & Logout */}
            <div className="mt-auto px-2 py-4 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-dark" />
                {isSidebarOpen && (
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Yönetici</span>
                    <span className="text-[10px] text-gray-500">admin@tambursan.com</span>
                  </div>
                )}
              </div>

              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/auth/logout', { method: 'POST' });
                    if (res.ok) {
                      window.location.href = '/admin/login';
                    }
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent
                `}
              >
                <span className="text-xl">🚪</span>
                {isSidebarOpen && <span className="text-sm font-medium tracking-wide">Çıkış Yap</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen overflow-x-hidden">
          <div className="p-8 pb-20 max-w-7xl mx-auto">
            {/* View Managers based on active tab */}
            <div className="animate-fade-in-up">
              {activeTab === 'products' && (
                <ProductManager
                  products={data.products}
                  categories={data.categories}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === 'categories' && (
                <CategoryManager
                  categories={data.categories}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === 'services' && (
                <ServiceManager
                  services={data.services}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === 'catalogs' && (
                <CatalogManager
                  catalogs={data.catalogs}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === 'documents' && (
                <DocumentManager
                  documents={data.documents}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === 'gallery' && (
                <GalleryManager
                  gallery={data.gallery}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function GalleryManager({ gallery, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    video_path: '',
    image: null
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('type', formData.type);

    if (formData.type === 'video') {
      submitData.append('video_path', formData.video_path);
    } else if (formData.type === 'image' && selectedFile) {
      submitData.append('image', selectedFile);
    }

    try {
      const url = editingId ? `/api/galeri?id=${editingId}` : '/api/galeri';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: submitData
      });

      if (response.ok) {
        alert(`Galeri öğesi başarıyla ${editingId ? 'güncellendi' : 'eklendi'}!`);
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    }

    setFormData({ title: '', type: 'image', video_path: '', image: null });
    setSelectedFile(null);
    setEditingId(null);
  };

  const startEdit = (item) => {
    setFormData({
      title: item.title,
      type: item.type,
      video_path: item.video_path || '',
      image: null
    });
    setSelectedFile(null);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="space-y-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">
            {editingId ? '✍️' : '📸'}
          </span>
          {editingId ? 'Galeri Öğesi Düzenle' : 'Yeni Galeri Öğesi Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Başlık</label>
            <input
              type="text"
              placeholder="Görsel veya video başlığı"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tür</label>
            <select
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none appearance-none"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="image" className="bg-secondary">Resim</option>
              <option value="video" className="bg-secondary">Video</option>
            </select>
          </div>

          {formData.type === 'video' ? (
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Video URL (YouTube Embed)</label>
              <input
                type="text"
                placeholder="Örn: https://www.youtube.com/embed/..."
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                value={formData.video_path}
                onChange={(e) => setFormData({ ...formData, video_path: e.target.value })}
                required
              />
            </div>
          ) : (
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Görsel Seç</label>
              <div className="relative group overflow-hidden bg-black/40 border border-dashed border-white/10 rounded-2xl p-8 transition-all hover:border-primary/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  required={!editingId}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">🖼️</span>
                  <span className="text-xs text-gray-500 font-medium tracking-wide">
                    {selectedFile ? selectedFile.name : 'Bir görsel seçin veya sürükleyin'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="md:col-span-2 flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl shadow-[0_0_30px_rgba(198,156,46,0.2)] hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {editingId ? 'Öğeyi Güncelle' : 'Öğeyi Ekle'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ title: '', type: 'image', video_path: '', image: null }); setSelectedFile(null); }}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map(item => (
          <div key={item.id} className="group relative aspect-square bg-black/40 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-500">
            {item.type === 'image' && item.image_path ? (
              <img src={item.image_path} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-secondary-dark/50">
                <span className="text-4xl mb-2">📹</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Video</span>
              </div>
            )}

            {/* Hover actions */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4 text-center">
              <h4 className="text-white font-medium text-sm mb-4 line-clamp-2">{item.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="p-3 bg-primary text-black rounded-xl hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete('galeri', item.id, 'Galeri öğesi')}
                  className="p-3 bg-red-500/80 text-white rounded-xl hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 2 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductManager({ products, categories, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    images: [],
    category_id: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('slug', formData.slug);
    submitData.append('description', formData.description);
    submitData.append('category_id', formData.category_id);

    if (editingId && formData.images.length > 0) {
      submitData.append('existingImages', JSON.stringify(formData.images));
    }

    selectedFiles.forEach((file, index) => {
      submitData.append(`image_${index}`, file);
    });

    try {
      const url = editingId ? `/api/urunler/${editingId}` : '/api/urunler';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: submitData
      });

      if (response.ok) {
        alert(`Ürün başarıyla ${editingId ? 'güncellendi' : 'eklendi'}!`);
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    }

    setFormData({ name: '', slug: '', description: '', images: [], category_id: '' });
    setSelectedFiles([]);
    setEditingId(null);
  };

  const startEdit = (product) => {
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      images: JSON.parse(product.images || '[]'),
      category_id: product.category_id
    });
    setSelectedFiles([]);
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div className="space-y-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">
            {editingId ? '✍️' : '➕'}
          </span>
          {editingId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Ürün Adı</label>
            <input
              type="text"
              placeholder="Örn: Konveyör Tamburu"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Slug (URL)</label>
            <input
              type="text"
              placeholder="konveyor-tamburu"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Kategori</label>
            <select
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none appearance-none"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
            >
              <option value="" className="bg-secondary">Kategori Seçin</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-secondary text-white">{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Açıklama</label>
            <textarea
              placeholder="Ürün detaylarını buraya yazın..."
              rows={4}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Ürün Görselleri</label>
            <div className="relative group overflow-hidden bg-black/40 border border-dashed border-white/10 rounded-2xl p-8 transition-all hover:border-primary/30">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-3xl">📸</span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  Görselleri buraya sürükleyin veya <span className="text-primary hover:underline">dosya seçin</span>
                </span>
                {selectedFiles.length > 0 && (
                  <div className="mt-4 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase">
                    {selectedFiles.length} Dosya Seçildi
                  </div>
                )}
              </div>
            </div>
            {editingId && formData.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl shadow-[0_0_30px_rgba(198,156,46,0.2)] hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {editingId ? 'Ürün Güncelle' : 'Ürün Ekle'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ name: '', slug: '', description: '', images: [], category_id: '' }) }}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map(product => {
          const productImages = JSON.parse(product.images || '[]');
          return (
            <div key={product.id} className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              {/* Image Preview Container */}
              <div className="relative h-48 bg-black/40 overflow-hidden">
                {productImages[0] ? (
                  <img src={productImages[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-800 text-6xl">📦</div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-primary tracking-widest uppercase">
                    {categories.find(c => c.id === product.category_id)?.name || 'Kategorisiz'}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-6 h-8">
                  {product.description || 'Açıklama belirtilmemiş.'}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex gap-2">
                    {productImages.length > 1 && (
                      <span className="text-[10px] text-gray-600 font-bold tracking-wider uppercase">+{productImages.length - 1} görsel</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="p-2.5 bg-white/5 text-white hover:bg-primary hover:text-black rounded-lg transition-all duration-300"
                      title="Düzenle"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete('urunler', product.id, 'Ürün')}
                      className="p-2.5 bg-white/5 text-white hover:bg-red-500/80 rounded-lg transition-all duration-300"
                      title="Sil"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryManager({ categories, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onEdit('category', editingId, formData, 'Kategori');
      setEditingId(null);
    } else {
      onSubmit('category', formData, 'Kategori');
    }
    setFormData({ name: '', description: '' });
  };

  const startEdit = (category) => {
    setFormData({ name: category.name, description: category.description });
    setEditingId(category.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">
            {editingId ? '✍️' : '📂'}
          </span>
          {editingId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Kategori Adı</label>
            <input
              type="text"
              placeholder="Örn: Kaplama Çözümleri"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Açıklama</label>
            <textarea
              placeholder="Kategori açıklamasını buraya yazın..."
              rows={3}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl shadow-[0_0_30px_rgba(198,156,46,0.2)] hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {editingId ? 'Kategori Güncelle' : 'Kategori Ekle'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ name: '', description: '' }) }}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => (
          <div key={category.id} className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {category.description || 'Açıklama belirtilmemiş.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
              <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">Kategori Detayı</span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(category)}
                  className="p-2.5 bg-white/5 text-white hover:bg-primary hover:text-black rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete('category', category.id, 'Kategori')}
                  className="p-2.5 bg-white/5 text-white hover:bg-red-500/80 rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceManager({ services, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({ name: '', description: '', images: [] });
  const [editingId, setEditingId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);

    if (editingId && formData.images.length > 0) {
      submitData.append('existingImages', JSON.stringify(formData.images));
    }

    selectedFiles.forEach((file, index) => {
      submitData.append(`image_${index}`, file);
    });

    try {
      const url = editingId ? `/api/hizmetler/${editingId}` : '/api/hizmetler';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: submitData
      });

      if (response.ok) {
        alert(`Hizmet başarıyla ${editingId ? 'güncellendi' : 'eklendi'}!`);
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    }

    setFormData({ name: '', description: '', images: [] });
    setSelectedFiles([]);
    setEditingId(null);
  };

  const startEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      images: JSON.parse(service.images || '[]')
    });
    setSelectedFiles([]);
    setEditingId(service.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div className="space-y-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">
            {editingId ? '✍️' : '🛠️'}
          </span>
          {editingId ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Hizmet Adı</label>
            <input
              type="text"
              placeholder="Örn: Kauçuk Kaplama"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Açıklama</label>
            <textarea
              placeholder="Hizmet detaylarını buraya yazın..."
              rows={4}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Hizmet Görselleri</label>
            <div className="relative group overflow-hidden bg-black/40 border border-dashed border-white/10 rounded-2xl p-8 transition-all hover:border-primary/30">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-3xl">🖼️</span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  Görselleri buraya sürükleyin veya <span className="text-primary hover:underline">dosya seçin</span>
                </span>
                {selectedFiles.length > 0 && (
                  <div className="mt-4 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase">
                    {selectedFiles.length} Dosya Seçildi
                  </div>
                )}
              </div>
            </div>
            {editingId && formData.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl shadow-[0_0_30px_rgba(198,156,46,0.2)] hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {editingId ? 'Hizmeti Güncelle' : 'Hizmet Ekle'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ name: '', description: '', images: [] }); setSelectedFiles([]) }}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map(service => {
          const serviceImages = JSON.parse(service.images || '[]');
          return (
            <div key={service.id} className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-500">
              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="sm:w-48 h-48 bg-black/40 shrink-0">
                  {serviceImages[0] ? (
                    <img src={serviceImages[0]} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-800 text-4xl">🛠️</div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                      {service.description || 'Açıklama belirtilmemiş.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <div className="flex gap-2">
                      {serviceImages.length > 1 && (
                        <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">+{serviceImages.length - 1} görsel</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(service)}
                        className="p-2 bg-white/5 text-white hover:bg-primary hover:text-black rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete('hizmetler', service.id, 'Hizmet')}
                        className="p-2 bg-white/5 text-white hover:bg-red-500/80 rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CatalogManager({ catalogs, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({ name: '', description: '', file_path: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onEdit('kataloglar', editingId, formData, 'Katalog');
      setEditingId(null);
    } else {
      onSubmit('kataloglar', formData, 'Katalog');
    }
    setFormData({ name: '', description: '', file_path: '' });
  };

  const startEdit = (catalog) => {
    setFormData({
      name: catalog.name,
      description: catalog.description,
      file_path: catalog.file_path
    });
    setEditingId(catalog.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">
            {editingId ? '✍️' : '📖'}
          </span>
          {editingId ? 'Katalog Düzenle' : 'Yeni Katalog Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Katalog Adı</label>
            <input
              type="text"
              placeholder="Örn: 2024 Ürün Kataloğu"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Dosya Yolu (URL/Hizmet)</label>
            <input
              type="text"
              placeholder="/catalogs/catalog.pdf"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.file_path}
              onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Açıklama</label>
            <textarea
              placeholder="Katalog içeriği hakkında kısa bilgi..."
              rows={3}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl shadow-[0_0_30px_rgba(198,156,46,0.2)] hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {editingId ? 'Kataloğu Güncelle' : 'Katalog Ekle'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ name: '', description: '', file_path: '' }) }}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogs.map(catalog => (
          <div key={catalog.id} className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl transition-transform group-hover:scale-110">
                📖
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white mb-1 truncate group-hover:text-primary transition-colors">{catalog.name}</h3>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase truncate">{catalog.file_path}</p>
              </div>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 h-8 mb-6">
              {catalog.description || 'Açıklama belirtilmemiş.'}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
              <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">Katalog Dosyası</span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(catalog)}
                  className="p-2.5 bg-white/5 text-white hover:bg-primary hover:text-black rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete('kataloglar', catalog.id, 'Katalog')}
                  className="p-2.5 bg-white/5 text-white hover:bg-red-500/80 rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentManager({ documents, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({ name: '', description: '', file_path: '', type: 'Sertifika' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onEdit('belgeler', editingId, formData, 'Belge');
      setEditingId(null);
    } else {
      onSubmit('belgeler', formData, 'Belge');
    }
    setFormData({ name: '', description: '', file_path: '', type: 'Sertifika' });
  };

  const startEdit = (doc) => {
    setFormData({
      name: doc.name,
      description: doc.description,
      file_path: doc.file_path,
      type: doc.type
    });
    setEditingId(doc.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">
            {editingId ? '✍️' : '📜'}
          </span>
          {editingId ? 'Belge Düzenle' : 'Yeni Belge Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Belge Adı</label>
            <input
              type="text"
              placeholder="Örn: ISO 9001 Sertifikası"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Belge Türü</label>
            <select
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none appearance-none"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="Sertifika" className="bg-secondary">Sertifika</option>
              <option value="Kalite Belgesi" className="bg-secondary">Kalite Belgesi</option>
              <option value="Teknik Doküman" className="bg-secondary">Teknik Doküman</option>
              <option value="Diğer" className="bg-secondary">Diğer</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Dosya Yolu (URL)</label>
            <input
              type="text"
              placeholder="/documents/iso-9001.pdf"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              value={formData.file_path}
              onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Açıklama</label>
            <textarea
              placeholder="Belge hakkında kısa bilgi..."
              rows={3}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl shadow-[0_0_30px_rgba(198,156,46,0.2)] hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {editingId ? 'Belgeyi Güncelle' : 'Belge Ekle'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ name: '', description: '', file_path: '', type: 'Sertifika' }) }}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl transition-transform group-hover:scale-110">
                📜
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white mb-1 truncate group-hover:text-primary transition-colors">{doc.name}</h3>
                <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[9px] font-bold text-primary tracking-widest uppercase">
                  {doc.type}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 h-8 mb-6">
              {doc.description || 'Açıklama belirtilmemiş.'}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase mb-1">Dosya</span>
                <span className="text-[10px] text-white/40 truncate max-w-[120px]">{doc.file_path}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(doc)}
                  className="p-2.5 bg-white/5 text-white hover:bg-primary hover:text-black rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete('belgeler', doc.id, 'Belge')}
                  className="p-2.5 bg-white/5 text-white hover:bg-red-500/80 rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}