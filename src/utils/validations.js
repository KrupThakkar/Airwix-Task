export const validateProduct = (product) => {
  if (!product.name || !product.qty || !product.price || !product.category) {
    return "All fields are required";
  }

  if (product.qty <= 0 || product.price <= 0) {
    return "Qty & Price must be greater than zero";
  }

  return null;
};
