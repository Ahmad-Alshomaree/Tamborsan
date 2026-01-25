'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

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
        alert(`${tableName} added successfully!`);
        fetchAllData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
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
        alert(`${tableName} updated successfully!`);
        fetchAllData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (endpoint, id, tableName) => {
    if (!confirm(`Are you sure you want to delete this ${tableName.toLowerCase()}?`)) return;

    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert(`${tableName} deleted successfully!`);
        fetchAllData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'products' ? styles.active : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={activeTab === 'categories' ? styles.active : ''}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={activeTab === 'services' ? styles.active : ''}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button
          className={activeTab === 'catalogs' ? styles.active : ''}
          onClick={() => setActiveTab('catalogs')}
        >
          Catalogs
        </button>
        <button
          className={activeTab === 'documents' ? styles.active : ''}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
        <button
          className={activeTab === 'gallery' ? styles.active : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery
        </button>
      </div>

      <div className={styles.content}>
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
        const result = await response.json();
        alert(`Gallery item ${editingId ? 'updated' : 'added'} successfully!`);
        // Refresh the page to get updated data
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
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
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <h2>Manage Gallery</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          required
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        {formData.type === 'video' && (
          <input
            type="text"
            placeholder="Video URL (YouTube embed)"
            value={formData.video_path}
            onChange={(e) => setFormData({...formData, video_path: e.target.value})}
            required
          />
        )}

        {formData.type === 'image' && (
          <div>
            <label htmlFor="galleryImage">Gallery Image:</label>
            <input
              type="file"
              id="galleryImage"
              accept="image/*"
              onChange={handleFileChange}
              required={!editingId}
            />
            {selectedFile && (
              <small>Selected: {selectedFile.name}</small>
            )}
          </div>
        )}

        <button type="submit">{editingId ? 'Update' : 'Add'} Gallery Item</button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({title:'',type:'image',video_path:'',image:null}); setSelectedFile(null);}}>Cancel</button>}
      </form>

      <div className={styles.list}>
        {gallery.map(item => (
          <div key={item.id} className={styles.item}>
            <div>
              <h3>{item.title}</h3>
              <p>Type: {item.type}</p>
              {item.type === 'image' && item.image_path && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={item.image_path}
                    alt={item.title}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
              )}
              {item.type === 'video' && item.video_path && (
                <div style={{ marginTop: '10px' }}>
                  <small>Video URL: {item.video_path}</small>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => onDelete('galeri', item.id, 'Gallery item')}>Delete</button>
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

    // Add existing images
    if (editingId && formData.images.length > 0) {
      submitData.append('existingImages', JSON.stringify(formData.images));
    }

    // Add new files
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
        const result = await response.json();
        alert(`Product ${editingId ? 'updated' : 'added'} successfully!`);
        // Refresh the page to get updated data
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
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
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={formData.slug}
          onChange={(e) => setFormData({...formData, slug: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <select
          value={formData.category_id}
          onChange={(e) => setFormData({...formData, category_id: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <div>
          <label htmlFor="images">Product Images:</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <small>{selectedFiles.length} file(s) selected</small>
          )}
          {editingId && formData.images.length > 0 && (
            <div>
              <small>Existing images: {formData.images.length}</small>
            </div>
          )}
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name:'',slug:'',description:'',images:[],category_id:''})}}>Cancel</button>}
      </form>

      <div className={styles.list}>
        {products.map(product => {
          const productImages = JSON.parse(product.images || '[]');
          return (
            <div key={product.id} className={styles.item}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <small>Category: {categories.find(c => c.id === product.category_id)?.name}</small>
                {productImages.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <small>Images: {productImages.length}</small>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                      {productImages.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ))}
                      {productImages.length > 3 && (
                        <div style={{ width: '50px', height: '50px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '12px' }}>
                          +{productImages.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => startEdit(product)}>Edit</button>
                <button onClick={() => onDelete('urunler', product.id, 'Product')}>Delete</button>
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
      onEdit('category', editingId, formData, 'Category');
      setEditingId(null);
    } else {
      onSubmit('category', formData, 'Category');
    }
    setFormData({ name: '', description: '' });
  };

  const startEdit = (category) => {
    setFormData({ name: category.name, description: category.description });
    setEditingId(category.id);
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Category</button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name:'',description:''})}}>Cancel</button>}
      </form>

      <div className={styles.list}>
        {categories.map(category => (
          <div key={category.id} className={styles.item}>
            <div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div>
              <button onClick={() => startEdit(category)}>Edit</button>
              <button onClick={() => onDelete('category', category.id, 'Category')}>Delete</button>
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

    // Add existing images
    if (editingId && formData.images.length > 0) {
      submitData.append('existingImages', JSON.stringify(formData.images));
    }

    // Add new files
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
        const result = await response.json();
        alert(`Service ${editingId ? 'updated' : 'added'} successfully!`);
        // Refresh the page to get updated data
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
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
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div>
      <h2>Manage Services</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <div>
          <label htmlFor="serviceImages">Service Images:</label>
          <input
            type="file"
            id="serviceImages"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <small>{selectedFiles.length} file(s) selected</small>
          )}
          {editingId && formData.images.length > 0 && (
            <div>
              <small>Existing images: {formData.images.length}</small>
            </div>
          )}
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Service</button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name:'',description:'',images:[]}); setSelectedFiles([]);}}>Cancel</button>}
      </form>

      <div className={styles.list}>
        {services.map(service => {
          const serviceImages = JSON.parse(service.images || '[]');
          return (
            <div key={service.id} className={styles.item}>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {serviceImages.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <small>Images: {serviceImages.length}</small>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                      {serviceImages.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${service.name} ${index + 1}`}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ))}
                      {serviceImages.length > 3 && (
                        <div style={{ width: '50px', height: '50px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '12px' }}>
                          +{serviceImages.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => startEdit(service)}>Edit</button>
                <button onClick={() => onDelete('hizmetler', service.id, 'Service')}>Delete</button>
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
      onEdit('kataloglar', editingId, formData, 'Catalog');
      setEditingId(null);
    } else {
      onSubmit('kataloglar', formData, 'Catalog');
    }
    setFormData({ name: '', description: '', file_path: '' });
  };

  const startEdit = (catalog) => {
    setFormData({ name: catalog.name, description: catalog.description, file_path: catalog.file_path });
    setEditingId(catalog.id);
  };

  return (
    <div>
      <h2>Manage Catalogs</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="text"
          placeholder="File Path"
          value={formData.file_path}
          onChange={(e) => setFormData({...formData, file_path: e.target.value})}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Catalog</button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name:'',description:'',file_path:''})}}>Cancel</button>}
      </form>

      <div className={styles.list}>
        {catalogs.map(catalog => (
          <div key={catalog.id} className={styles.item}>
            <div>
              <h3>{catalog.name}</h3>
              <p>{catalog.description}</p>
              <small>File: {catalog.file_path}</small>
            </div>
            <div>
              <button onClick={() => startEdit(catalog)}>Edit</button>
              <button onClick={() => onDelete('kataloglar', catalog.id, 'Catalog')}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentManager({ documents, onSubmit, onEdit, onDelete }) {
  const [formData, setFormData] = useState({ name: '', description: '', file_path: '', type: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onEdit('belgeler', editingId, formData, 'Document');
      setEditingId(null);
    } else {
      onSubmit('belgeler', formData, 'Document');
    }
    setFormData({ name: '', description: '', file_path: '', type: '' });
  };

  const startEdit = (document) => {
    setFormData({
      name: document.name,
      description: document.description,
      file_path: document.file_path,
      type: document.type
    });
    setEditingId(document.id);
  };

  return (
    <div>
      <h2>Manage Documents</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="text"
          placeholder="File Path"
          value={formData.file_path}
          onChange={(e) => setFormData({...formData, file_path: e.target.value})}
        />
        <input
          type="text"
          placeholder="Type"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Document</button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name:'',description:'',file_path:'',type:''})}}>Cancel</button>}
      </form>

      <div className={styles.list}>
        {documents.map(document => (
          <div key={document.id} className={styles.item}>
            <div>
              <h3>{document.name}</h3>
              <p>{document.description}</p>
              <small>Type: {document.type} | File: {document.file_path}</small>
            </div>
            <div>
              <button onClick={() => startEdit(document)}>Edit</button>
              <button onClick={() => onDelete('belgeler', document.id, 'Document')}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}