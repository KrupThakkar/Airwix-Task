import { useState } from "react";

export default function ProductTable({ products, onUpdate, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (product) => {
    setEditId(product.id);
    setEditForm(product);
  };

 const saveEdit = () => {
  if (!editForm.name || !editForm.qty || !editForm.price || !editForm.category) {
    alert("All fields are required");
    return;
  }

  if (editForm.qty <= 0 || editForm.price <= 0) {
    alert("Qty & Price must be greater than 0");
    return;
  }

  onUpdate(editId, {
    ...editForm,
    qty: Number(editForm.qty),
    price: Number(editForm.price),
  });

  setEditId(null);
};

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Product</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) =>
          editId === p.id ? (
            <tr key={p.id} className="bg-yellow-50">
              <td className="border p-2">
                <input
                  className="border p-1 rounded"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </td>

              <td className="border p-2">
                <input
                  className="border p-1 rounded"
                  type="number"
                  value={editForm.qty}
                  onChange={(e) =>
                    setEditForm({ ...editForm, qty: e.target.value })
                  }
                />
              </td>

              <td className="border p-2">
                <input
                  className="border p-1 rounded"
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                />
              </td>

              <td className="border p-2">
                ₹{editForm.qty * editForm.price}
              </td>

              <td className="border p-2">
                <select
                  className="border p-1 rounded"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                >
                  <option>Electronics</option>
                  <option>Grocery</option>
                  <option>Fashion</option>
                </select>
              </td>

              <td className="border p-2 flex gap-2">
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-600 text-white px-2 py-1 rounded"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.qty}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">₹{p.qty * p.price}</td>
              <td className="border p-2">{p.category}</td>

              <td className="border p-2 flex gap-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
