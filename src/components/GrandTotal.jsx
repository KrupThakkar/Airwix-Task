export default function GrandTotal({ products }) {
  const total = products.reduce((acc, p) => acc + p.qty * p.price, 0);

  return (
    <h2 className="text-xl font-bold mt-4 text-right">
      Grand Total: ₹{total}
    </h2>
  );
}
