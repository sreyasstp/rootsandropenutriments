import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productApi";
import { Product } from "../../types/Product";
import AdminLayout from "../../components/AdminLayout";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    await deleteProduct(confirmId);
    setConfirmId(null);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-[#004606] text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <table className="w-full text-sm">
    <thead className="bg-gray-50 border-b text-gray-700">
      <tr>
        <th className="px-5 py-3 text-left font-semibold">Product</th>
        <th className="px-5 py-3 text-left font-semibold">Category</th>
        <th className="px-5 py-3 text-left font-semibold">Packs</th>
        <th className="px-5 py-3 text-left font-semibold">Price</th>
        <th className="px-5 py-3 text-left font-semibold">Updated</th>
        <th className="px-5 py-3 text-right font-semibold">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y">
      {products.map((p) => (
        <tr
          key={p._id}
          className="hover:bg-gray-50 transition"
        >
          {/* Product */}
          <td className="px-5 py-4">
            <div className="font-medium text-gray-900">
              {p.name}
            </div>
          </td>

          {/* Category */}
          <td className="px-5 py-4 text-gray-700">
            {p.category}
          </td>

          {/* Packs */}
          <td className="px-5 py-4">
            <div className="flex flex-wrap gap-1">
              {p.packSizes.map((size) => (
                <span
                  key={size}
                  className="px-2 py-0.5 rounded-full text-xs bg-[#f2ecdc] text-[#004606]"
                >
                  {size}
                  {p.unit}
                </span>
              ))}
            </div>
          </td>

          {/* Price */}
          <td className="px-5 py-4 text-gray-800 font-medium">
            ₹{Math.min(...p.prices)} – ₹{Math.max(...p.prices)}
          </td>

          {/* Updated */}
          <td className="px-5 py-4 text-gray-500 text-xs">
            {p.updatedAt
              ? new Date(p.updatedAt).toLocaleDateString()
              : "—"}
          </td>

          {/* Actions */}
          <td className="px-5 py-4 text-right space-x-3">
            <button
              onClick={() =>
                navigate(`/admin/products/${p._id}/edit`)
              }
              className="text-blue-600 hover:underline font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmId(p._id!)}
              className="text-red-500 hover:underline font-medium"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* DELETE CONFIRMATION */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
