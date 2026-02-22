import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../../services/productApi";
import { Product } from "../../types/Product";
import AdminLayout from "../../components/admin/AdminLayout";

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<Product>({
    name: "",
    category: "",
    unit: "",
    image: "",
    packSizes: [],
    prices: [],
    description: "",
    benefits: [],
    usage: "",
    features: [],
  });

  useEffect(() => {
    if (isEdit) {
      getProducts().then((list) => {
        const product = list.find((p) => p._id === id);
        if (product) setForm(product);
      });
    }
  }, [id]);

  const save = async () => {
    if (isEdit && id) {
      await updateProduct(id, form);
    } else {
      await createProduct(form);
    }
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl border shadow-sm p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {[
            ["name", "Product Name"],
            ["category", "Category"],
            ["unit", "Unit (kg, g, ml)"],
            ["image", "Image URL"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <input
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="
                  w-full
                  border
                  rounded-lg
                  px-3 py-2
                  text-sm
                  focus:outline-none
                  focus:ring-1
                  focus:ring-[#004606]
                "
              />
            </div>
          ))}
        </div>

        {/* PACKS & PRICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Pack Sizes
            </label>
            <input
              placeholder="e.g. 250,500,1000"
              value={form.packSizes.join(",")}
              onChange={(e) =>
                setForm({
                  ...form,
                  packSizes: e.target.value
                    .split(",")
                    .map((v) => v.trim()),
                })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Prices
            </label>
            <input
              placeholder="e.g. 120,220,400"
              value={form.prices.join(",")}
              onChange={(e) =>
                setForm({
                  ...form,
                  prices: e.target.value
                    .split(",")
                    .map((v) => Number(v.trim())),
                })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="
              w-full
              border
              rounded-lg
              px-3 py-2
              text-sm
              resize-none
            "
          />
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-[#004606] text-white rounded-lg text-sm"
          >
            Save Product
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}