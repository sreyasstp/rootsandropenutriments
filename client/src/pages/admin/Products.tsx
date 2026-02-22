import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productApi";
import { Product } from "../../types/Product";
import AdminLayout from "../../components/admin/AdminLayout";

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
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">Products</h2>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-[#004606] text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          Add Product
        </button>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {p.category}
                </p>
              </div>

              <div className="text-right text-sm font-medium">
                ₹{Math.min(...p.prices)} – ₹{Math.max(...p.prices)}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
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

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-400">
                Updated{" "}
                {p.updatedAt
                  ? new Date(p.updatedAt).toLocaleDateString()
                  : "—"}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/admin/products/${p._id}/edit`)
                  }
                  className="text-blue-600 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmId(p._id!)}
                  className="text-red-500 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-700">
            <tr>
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Packs</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-left">Updated</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">
                  {p.name}
                </td>
                <td className="px-5 py-4">{p.category}</td>

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

                <td className="px-5 py-4 font-medium">
                  ₹{Math.min(...p.prices)} – ₹{Math.max(...p.prices)}
                </td>

                <td className="px-5 py-4 text-xs text-gray-500">
                  {p.updatedAt
                    ? new Date(p.updatedAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-5 py-4 text-right space-x-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/${p._id}/edit`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmId(p._id!)}
                    className="text-red-500 hover:underline"
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
            <h3 className="text-lg font-semibold mb-2">
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