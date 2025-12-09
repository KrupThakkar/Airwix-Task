import { useState } from "react";
import { validateProduct } from "../utils/validations.js";

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    qty: "",
    price: "",
    category: "",
  });

  const categories = ["Electronics", "Grocery", "Fashion"];

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const error = validateProduct(form);
    if (error) {
      alert(error);
      return;
    }

    onAdd({
      ...form,
      qty: Number(form.qty),
      price: Number(form.price),
    });

    setForm({ name: "", qty: "", price: "", category: "" });
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 border rounded bg-gray-50">
      <input
        className="border p-2 rounded"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="number"
        placeholder="Qty"
        value={form.qty}
        onChange={(e) => handleChange("qty", e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => handleChange("price", e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={form.category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <button
        className="col-span-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Add Product
      </button>
    </div>
  );
}
