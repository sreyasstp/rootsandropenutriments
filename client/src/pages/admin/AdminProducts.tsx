import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductsAdmin, deleteProduct } from '../../services/productApi';
import { Product } from '../../types/Product';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'react-toastify';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmName, setConfirmName] = useState<string>('');
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProductsAdmin();
      setProducts(data);
    } catch (err: any) {
      console.error('Error loading products:', err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async () => {
    if (!confirmId) return;
    try {
      await deleteProduct(confirmId);
      toast.success('Product deactivated successfully');
      setConfirmId(null);
      setConfirmName('');
      await loadProducts();
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error(err?.message || 'Failed to deactivate product');
    }
  };

  const priceRange = (p: Product) => {
    const prices = p.product_variants?.map((v) => v.price) || [];
    if (prices.length === 0) return '—';
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min}` : `₹${min} – ₹${max}`;
  };

  const variantCount = (p: Product) => {
    return p.product_variants?.length || 0;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Products</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          <button
            onClick={() => navigate('/admin/products/new')}
            className="flex items-center justify-center gap-2 bg-[#004606] hover:bg-[#006609] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#004606] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading products…</p>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl border p-12 text-center">
            <p className="text-gray-500 mb-4">No products yet</p>
            <button
              onClick={() => navigate('/admin/products/new')}
              className="inline-flex items-center gap-2 bg-[#004606] hover:bg-[#006609] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
            >
              <Plus className="w-4 h-4" />
              Create your first product
            </button>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW */}
            <div className="space-y-3 md:hidden">
              {products.map((p) => (
                <div key={p.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex gap-3 mb-3">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 object-contain bg-[#f2ecdc] rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{p.name}</h3>
                      <p className="text-xs text-gray-500">{p.category}</p>
                      <p className="text-sm font-bold text-[#004606] mt-1">{priceRange(p)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.product_variants?.map((v) => (
                      <span key={v.id} className="px-2 py-0.5 rounded text-xs bg-[#f2ecdc] text-[#004606]">
                        {v.pack_size}{p.unit}
                      </span>
                    )) || <span className="text-xs text-gray-400">No variants</span>}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b">
                    <span>{variantCount(p)} variant{variantCount(p) !== 1 ? 's' : ''}</span>
                    <span className={p.is_active ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-blue-600 hover:bg-blue-50 rounded transition text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />

                    </button>
                    <button
                      onClick={() => {
                        setConfirmId(p.id);
                        setConfirmName(p.name);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-red-600 hover:bg-red-50 rounded transition text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />

                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block bg-white rounded-xl border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Product</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                      <th className="px-6 py-3 text-center font-semibold text-gray-700">Variants</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-3 text-center font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Updated</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {p.image && (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 object-contain bg-[#f2ecdc] rounded flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate">{p.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{p.category}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block px-3 py-1 bg-[#f2ecdc] text-[#004606] rounded-full text-xs font-medium">
                            {variantCount(p)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{priceRange(p)}</td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${p.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {p.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500">
                          {new Date(p.updated_at).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded transition text-sm font-medium"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />

                            </button>
                            <button
                              onClick={() => {
                                setConfirmId(p.id);
                                setConfirmName(p.name);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded transition text-sm font-medium"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />

                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {confirmId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Deactivate Product?</h3>
              <p className="text-sm text-gray-600">
                You're about to deactivate <span className="font-semibold">"{confirmName}"</span>
              </p>
              <p className="text-sm text-gray-500">
                This product will be hidden from the storefront. You can reactivate it anytime by editing the product.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setConfirmId(null);
                    setConfirmName('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}