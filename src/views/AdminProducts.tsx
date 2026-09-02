import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.tsx';

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured;

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return 'http://localhost:4000/api';
  }

  return 'https://jbrelec.onrender.com';
};

const API_BASE = getApiBaseUrl();

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  images: string[];
  category: Category;
  brand: Brand;
}

export function AdminProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    categoryId: '',
    name: '',
    sku: '',
    description: '',
    brandId: '',
    price: '',
    salePrice: '',
    stock: '',
    specifications: '',
    status: 'ACTIVE',
  });

  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [defaultBrandId, setDefaultBrandId] = useState<string>('');

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/admin');
      return;
    }
    loadCategories();
    loadBrands();
    loadProducts();
  }, [user, navigate]);

  async function loadBrands() {
    try {
      const res = await fetch(`${API_BASE}/products/brands`);
      const data = await res.json();
      const brandList = data.brands || [];
      setBrands(brandList);
      if (brandList.length > 0 && !defaultBrandId) {
        setDefaultBrandId(brandList[0].id);
      }
    } catch (err) {
      console.error('Failed to load brands', err);
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch(`${API_BASE}/products/categories`);
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  }

  async function loadProducts() {
    try {
      const res = await fetch(`${API_BASE}/products?limit=3000`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }

  function processFiles(files: File[]) {
    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setImages((prev) => [...prev, ...results]);
    });
  }

  async function submitProduct(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('jbr_token');
      const url = editingId ? `${API_BASE}/products/${editingId}` : `${API_BASE}/products`;
      const method = editingId ? 'PUT' : 'POST';

      const name = form.name.trim();
      const sku = form.sku.trim();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      const payload = {
        ...form,
        sku,
        slug,
        brandId: form.brandId || defaultBrandId,
        price: Number(form.price),
        salePrice: form.salePrice ? Number(form.salePrice) : undefined,
        stock: Number(form.stock),
        images,
        specifications: form.specifications || undefined,
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.message || 'Failed to save product' });
        return;
      }

      setMessage({ type: 'success', text: editingId ? 'Product updated successfully' : 'Product added successfully' });
      setEditingId(null);
      setForm({
        categoryId: '',
        name: '',
        sku: '',
        description: '',
        brandId: '',
        price: '',
        salePrice: '',
        stock: '',
        specifications: '',
        status: 'ACTIVE',
      });
      setImages([]);
      loadProducts();
    } catch {
      setMessage({ type: 'error', text: 'Error saving product' });
    } finally {
      setSaving(false);
    }
  }

  async function editProduct(id: string) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      const product = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: product.message || 'Failed to load product' });
        return;
      }

      setEditingId(id);
      setForm({
        categoryId: product.categoryId || '',
        name: product.name || '',
        sku: product.sku || '',
        description: product.description || '',
        brandId: product.brandId || '',
        price: String(product.price ?? ''),
        salePrice: product.salePrice ? String(product.salePrice) : '',
        stock: String(product.stock ?? ''),
        specifications: product.specifications ? JSON.stringify(product.specifications) : '',
        status: product.status || 'ACTIVE',
      });

      if (product.images && product.images.length > 0) {
        setImages(product.images);
      } else {
        setImages([]);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setMessage({ type: 'error', text: 'Error loading product' });
    }
  }

  async function submitCategory(e: FormEvent) {
    e.preventDefault();
    setCategoryLoading(true);
    const token = localStorage.getItem('jbr_token');

    try {
      const res = await fetch(`${API_BASE}/products/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.message || 'Failed to add category' });
        return;
      }

      setMessage({ type: 'success', text: 'Category added successfully' });
      setCategoryName('');
      loadCategories();
    } catch {
      setMessage({ type: 'error', text: 'Error adding category' });
    } finally {
      setCategoryLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    const token = localStorage.getItem('jbr_token');
    try {
      const res = await fetch(`${API_BASE}/products/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.message || 'Failed to delete category' });
        return;
      }
      setMessage({ type: 'success', text: 'Category deleted successfully' });
      loadCategories();
    } catch {
      setMessage({ type: 'error', text: 'Error deleting category' });
    }
  }

  async function deleteCategoryByName() {
    const name = categoryName.trim();
    if (!name) {
      setMessage({ type: 'error', text: 'Enter a category name to delete' });
      return;
    }
    if (!confirm(`Delete category "${name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/products/categories/search?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.message || 'Failed to find category' });
        return;
      }
      const category = data.categories?.find((c: { name: string }) => c.name.toLowerCase() === name.toLowerCase());
      if (!category) {
        setMessage({ type: 'error', text: 'Category not found' });
        return;
      }
      await deleteCategory(category.id);
      setCategoryName('');
    } catch {
      setMessage({ type: 'error', text: 'Error deleting category' });
    }
  }

  if (loading) return <div className="page-shell">Loading...</div>;

  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>Products</h1>
        <p>Add and manage products for the website.</p>
      </section>

      {message && (
        <div style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 16, background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontWeight: 600 }}>
          {message.text}
        </div>
      )}

      <section className="dashboard-grid">
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ margin: '0 0 12px' }}>Add Category</h2>
          <form onSubmit={submitCategory} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#3d5260', marginBottom: 6, display: 'block' }}>Category Name</label>
              <input
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g. Switches & Sockets"
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }}
              />
            </div>
            <button type="submit" disabled={categoryLoading} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0d9488', color: 'white', fontWeight: 800, cursor: 'pointer', height: 42 }}>
              {categoryLoading ? 'Adding...' : 'Add Category'}
            </button>
            <button type="button" onClick={deleteCategoryByName} disabled={categoryLoading} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#e11d48', color: 'white', fontWeight: 800, cursor: 'pointer', height: 42 }}>
              Delete Category
            </button>
          </form>
        </div>

        {categories.length > 0 && (
          <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
            <h2 style={{ margin: '0 0 12px' }}>Categories</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {categories.map((c) => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fbfa', border: '1px solid #dce6e8', borderRadius: 8 }}>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                  <button type="button" onClick={() => deleteCategory(c.id)} style={{ padding: '4px 10px', fontSize: 12, background: '#e11d48', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ margin: '0 0 12px' }}>{editingId ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={submitProduct} style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Category</span>
                <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }}>
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Product Name</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. House wire" style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>SKU</span>
                <input required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="Unique SKU" style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Brand</span>
                <select value={form.brandId} onChange={(e) => setForm({ ...form, brandId: e.target.value })} style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }}>
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <label style={{ display: 'block' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Description</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" rows={3} style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Price (₹)</span>
                <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Sale Price (₹)</span>
                <input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} placeholder="Optional" style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Stock</span>
                <input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
              </label>
            </div>

            <label style={{ display: 'block' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Specifications</span>
              <textarea value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} placeholder='{"size":"1.5 sqmm","unit":"meter"}' rows={2} style={{ width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #dce6e8' }} />
            </label>

            <label style={{ display: 'block' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#3d5260' }}>Product Photos</span>
              <div
                onClick={() => document.getElementById('adminImages')?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                  if (files.length) processFiles(files);
                }}
                style={{
                  border: `2px dashed ${dragOver ? '#0d9488' : '#cbd5e1'}`,
                  borderRadius: 12,
                  padding: '40px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragOver ? '#f0fdfa' : '#f8fbfa',
                  marginTop: 8,
                  transition: 'all .2s'
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f3d3a' }}>Drop product photos here</p>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b7f8c' }}>or click to browse from your device</p>
                <input
                  id="adminImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
              {images.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                  {images.map((img, idx) => (
                    <img key={idx} src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2eaed' }} />
                  ))}
                </div>
              )}
            </label>

            <button type="submit" disabled={saving} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', background: '#0d9488', color: 'white', fontWeight: 800, cursor: 'pointer' }}>
              {saving ? 'Saving...' : editingId ? 'Update Product' : 'Save Product'}
            </button>
          </form>
        </div>

        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ margin: '0 0 12px' }}>Product List</h2>
          {products.length === 0 ? (
            <p style={{ color: '#6b7f8c' }}>No products found.</p>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {products.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#f8fbfa', border: '1px solid #e2eaed', borderRadius: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7f8c' }}>SKU: {p.sku} · ₹{p.price} · Stock: {p.stock}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {p.images?.[0] && <img src={p.images[0]} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2eaed' }} />}
                    <button onClick={() => editProduct(p.id)} style={{ padding: '4px 12px', fontSize: 12, background: '#0d9488', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
