// Searchbox.jsx

import { useState } from 'react';
import useProductsSearch from '../hooks/useProductSearch'; // Custom hook
import ProductCard from './ProductCard.jsx';
import VariantCard from './VariantCard.jsx';
import { useCart } from '../context/CartContext';

export default function Searchbox() {
  const [query, setQuery] = useState("");
  const { results, loading } = useProductsSearch(query);  // Use helper function 'hook'
  const { addToCart } = useCart();

  const handleProductAdded = (id) => {
    console.log("Added to cart:", id);
    addToCart(id);
  };

  function isTrueVariantProduct(product) {
    const variants = product.variants;
    return Array.isArray(variants) && variants.length > 1;
  }

  function isPseudoVariant(product) {
    const variants = product.variants;
    if (!Array.isArray(variants) || variants.length !== 1) return false;

    const variant = variants[0];
    return variant.name?.toLowerCase().includes(product.baseName?.toLowerCase());
  }

  return (
    <div className="search-container p-2">
      <input
        type="search"
        className="col-12 col-lg-4 col-xl-3 mb-3"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <div className="product-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {Array.isArray(results) && results.map(product => {
          if (isTrueVariantProduct(product)) {
            return (
              <div className="col" key={product._id}>
                <ProductCard product={product} handleProductAdded={handleProductAdded} />
              </div>
            );
          }

          if (isPseudoVariant(product)) {
            return (
              <div className="col" key={product._id}>
                <VariantCard
                  product={{ ...product, ...product.variants[0] }}
                  handleProductAdded={handleProductAdded}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}


