import { useState } from "react";
import { Product } from "../types/Product";

interface Props {
  initialData?: Product;
  onSave: (data: Product) => void;
  onClose: () => void;
}

export default function ProductForm({ initialData, onSave, onClose }: Props) {
  const [form, setForm] = useState<Product>(
    initialData || {
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
    }
  );

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-4">

        <h3 className="text-xl font-bold">
          {initialData ? "Edit Product" : "Add Product"}
        </h3>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Unit (g / ml)"
          value={form.unit}
          onChange={(e) => handleChange("unit", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Image URL (/almond.jpg)"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Pack Sizes (comma separated)"
          value={form.packSizes.join(",")}
          onChange={(e) =>
            handleChange("packSizes", e.target.value.split(","))
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Prices (comma separated)"
          value={form.prices.join(",")}
          onChange={(e) =>
            handleChange(
              "prices",
              e.target.value.split(",").map(Number)
            )
          }
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-[#004606] text-white rounded"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
