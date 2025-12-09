import { useState, useMemo } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductTable from "./components/ProductTable";
import GrandTotal from "./components/GrandTotal";

export default function App() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAdd = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const handleUpdate = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || p.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

      <AddProductForm onAdd={handleAdd} />

      <div className="flex justify-between my-4">
        <input
          className="border p-2 w-1/2 rounded"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>

      <ProductTable
        products={filteredProducts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <GrandTotal products={filteredProducts} />
    </div>
  );
}
