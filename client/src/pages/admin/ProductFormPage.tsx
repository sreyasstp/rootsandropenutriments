import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  updateProduct,
  getProductById,
  productToFormData,
  ProductFormData,
  EMPTY_PRODUCT_FORM,
} from '../../services/productApi';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'react-toastify';
import { Plus, Trash2, ChevronLeft } from 'lucide-react';

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<ProductFormData>(EMPTY_PRODUCT_FORM);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load product if editing
  useEffect(() => {
    if (isEdit && id) {
      const loadProduct = async () => {
        try {
          const product = await getProductById(id);
          if (product) {
            setForm(productToFormData(product));
          } else {
            toast.error('Product not found');
            navigate('/admin/products');
          }
        } catch (err: any) {
          console.error('Error loading product:', err);
          toast.error('Failed to load product');
          navigate('/admin/products');
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, isEdit, navigate]);

  const set = (key: keyof ProductFormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  // Variant helpers
  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      pack_sizes: [...prev.pack_sizes, ''],
      prices: [...prev.prices, 0],
      stocks: [...prev.stocks, 0],
    }));
  };

  const removeVariant = (i: number) => {
    setForm((prev) => ({
      ...prev,
      pack_sizes: prev.pack_sizes.filter((_, idx) => idx !== i),
      prices: prev.prices.filter((_, idx) => idx !== i),
      stocks: prev.stocks.filter((_, idx) => idx !== i),
    }));
  };

  const updateVariant = (i: number, field: 'pack_sizes' | 'prices' | 'stocks', value: string) => {
    setForm((prev) => {
      const arr = [...(prev[field] as any[])];
      arr[i] = field === 'pack_sizes' ? value : Number(value) || 0;
      return { ...prev, [field]: arr };
    });
  };

  const handleArrayField = (key: 'benefits' | 'features', raw: string) =>
    set(key, raw.split('\n').map((s) => s.trim()).filter(Boolean));

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name?.trim()) newErrors.name = 'Product name is required';
    if (!form.category?.trim()) newErrors.category = 'Category is required';

    const validVariants = form.pack_sizes.filter((s) => s.trim());
    if (validVariants.length === 0) newErrors.variants = 'At least one variant is required';

    // Check for duplicate pack sizes
    const packSizeSet = new Set(validVariants);
    if (packSizeSet.size !== validVariants.length) {
      newErrors.variants = 'Duplicate pack sizes are not allowed';
    }

    // Check for valid prices
    const hasInvalidPrice = form.prices.some((p, i) => {
      if (!form.pack_sizes[i]?.trim()) return false;
      return p <= 0;
    });
    if (hasInvalidPrice) newErrors.variants = 'All prices must be greater than 0';

    if (form.is_featured && !form.tagline?.trim()) {
      newErrors.tagline = 'Tagline is required for featured products';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save product
  const handleSave = async () => {
    if (!validate()) {
      toast.error('Please fix the errors below');
      return;
    }

    try {
      setSaving(true);
      if (isEdit && id) {
        await updateProduct(id, form);
        toast.success('Product updated successfully');
      } else {
        await createProduct(form);
        toast.success('Product created successfully');
      }
      navigate('/admin/products');
    } catch (err: any) {
      console.error('Save error:', err);
      toast.error(err?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="bg-white rounded-xl border p-12 text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#004606] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading product…</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Product' : 'Create Product'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEdit ? 'Update product details and variants' : 'Add a new product to your catalog'}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          {/* BASIC INFO */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                ['name', 'Product Name *', 'Almond Flour'],
                ['category', 'Category *', 'Flours'],
                ['unit', 'Unit (g, ml, kg…)', 'g'],
                ['image', 'Image Path', '/almond-flour.jpg'],
              ] as [keyof ProductFormData, string, string][]).map(([key, label, placeholder]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type={key === 'image' ? 'text' : 'text'}
                    placeholder={placeholder}
                    value={(form[key] as string) ?? ''}
                    onChange={(e) => set(key, e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20 ${errors[key] ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors[key] && <p className="text-xs text-red-600 mt-1">{errors[key]}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* VARIANTS */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Variants *</h3>
              <button
                onClick={addVariant}
                className="flex items-center gap-1 text-[#004606] text-sm font-medium hover:bg-[#004606]/5 px-3 py-1.5 rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>

            {errors.variants && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{errors.variants}</p>
              </div>
            )}

            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              {form.pack_sizes.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No variants yet. Add one to get started.</p>
              ) : (
                form.pack_sizes.map((size, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg border">
                    <div>
                      {i === 0 && (
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Size — First is default
                        </label>
                      )}
                      <input
                        placeholder="e.g., 250"
                        value={size}
                        onChange={(e) => updateVariant(i, 'pack_sizes', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                      />
                    </div>
                    <div>
                      {i === 0 && (
                        <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                      )}
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={form.prices[i] ?? ''}
                        onChange={(e) => updateVariant(i, 'prices', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                      />
                    </div>
                    <div>
                      {i === 0 && (
                        <label className="block text-xs font-medium text-gray-600 mb-1">Stock</label>
                      )}
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={form.stocks[i] ?? ''}
                        onChange={(e) => updateVariant(i, 'stocks', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                      />
                    </div>
                    {form.pack_sizes.length > 1 && (
                      <button
                        onClick={() => removeVariant(i)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                        title="Remove variant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* DESCRIPTION */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter product description…"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usage Instructions</label>
                <textarea
                  rows={2}
                  placeholder="How to use the product…"
                  value={form.usage}
                  onChange={(e) => set('usage', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits (one per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Rich in protein&#10;High in fiber&#10;…"
                    value={form.benefits.join('\n')}
                    onChange={(e) => handleArrayField('benefits', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="100% Natural&#10;Organic&#10;…"
                    value={form.features.join('\n')}
                    onChange={(e) => handleArrayField('features', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED PRODUCT */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Featured Product</h3>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => set('is_featured', e.target.checked)}
                className="w-4 h-4 accent-[#004606] rounded cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">
                Show in Featured Products section
              </span>
            </label>

            {form.is_featured && (
              <div className="bg-[#004606]/5 border border-[#004606]/20 rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tagline *</label>
                  <input
                    placeholder="e.g., Rich in Resistant Starch"
                    value={form.tagline}
                    onChange={(e) => set('tagline', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20 ${errors.tagline ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.tagline && <p className="text-xs text-red-600 mt-1">{errors.tagline}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Description
                  </label>
                  <input
                    placeholder="Short marketing description…"
                    value={form.featured_description}
                    onChange={(e) => set('featured_description', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                  />
                </div>
              </div>
            )}
          </section>

          {/* STATUS */}
          <section className="border-t pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => set('is_active', e.target.checked)}
                className="w-4 h-4 accent-[#004606] rounded cursor-pointer"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Active on Storefront</span>
                <p className="text-xs text-gray-500">When unchecked, product is hidden from customers</p>
              </div>
            </label>
          </section>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t">
            <button
              onClick={() => navigate('/admin/products')}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-[#004606] hover:bg-[#006609] disabled:opacity-60 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}