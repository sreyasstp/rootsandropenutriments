import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../../services/productApi";
import { Product } from "../../types/Product";
import AdminLayout from "../../components/AdminLayout";

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
      <div className="max-w-3xl bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        {[
          ["name", "Name"],
          ["category", "Category"],
          ["unit", "Unit"],
          ["image", "Image URL"],
        ].map(([key, label]) => (
          <input
            key={key}
            placeholder={label}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full border px-3 py-2 rounded mb-3"
          />
        ))}

        <input
          placeholder="Pack Sizes (comma separated)"
          value={form.packSizes.join(",")}
          onChange={(e) =>
            setForm({
              ...form,
              packSizes: e.target.value.split(","),
            })
          }
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          placeholder="Prices (comma separated)"
          value={form.prices.join(",")}
          onChange={(e) =>
            setForm({
              ...form,
              prices: e.target.value
                .split(",")
                .map(Number),
            })
          }
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-[#004606] text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
