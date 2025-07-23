export const sortProducts = (products, sortBy) => {
  if (!sortBy || !products) return products;

  const sortedProducts = [...products];

  switch (sortBy) {
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-low':
      return sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case 'price-high':
      return sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    default:
      return sortedProducts;
  }
};

export const filterProducts = (products, searchTerm) => {
  if (!searchTerm || !products) return products;
  
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};