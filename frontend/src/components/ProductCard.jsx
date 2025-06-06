// ProductCard.jsx

import React, { useState } from 'react';

function ProductCard({ product, handleProductAdded }) {

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const variants = product.variants || [];
  const variant = variants[selectedVariantIndex] || {};

  const displayPrice = variant.price ?? product.price ?? 0;
  const displayStock = variant.stock ?? product.stock ?? 0;
  const displayImage =
    variant.imageURL?.[0] ||
    product.imageURL?.[0] ||
    null;



  return (

    <div className="card">
      <div className="card-body">
        <h4>{product.baseName}</h4>
        <hr/>
        <p>{product.description}</p>
        <p>{product.brand}</p>
        <p>{Array.isArray(product.categories) ? product.categories.join(", ") : product.categories}</p>

        <select
          className='btn btn-light border border-2 col-11 col-lg-8 mx-auto'
          value={selectedVariantIndex}
          onChange={e => setSelectedVariantIndex(parseInt(e.target.value))}
        >
          {variants.map((v, i) => (
            <option key={v.sku} value={i}>
              {v.name}
            </option>
          ))}
        </select>

        <p className='text-primary fs-5 mt-3'>${displayPrice.toFixed(2)}</p>
        <p>Stock: {displayStock}</p>

        {/* Use ?. to safely access .url only if displayImage is defined, preventing crashes  */}
        {displayImage?.url ? (
          <img
            src={displayImage.url}
            alt={displayImage.alt || "Product image"}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>No image available</p>
        )}

        
      </div>
      <button className='m-3 btn btn-success' onClick={() => handleProductAdded(`${product.objectID}-${variant.sku || variant.id}`)}> Add to Cart </button>
      {/* <pre>{JSON.stringify(variant, null, 2)}</pre> */}
    </div>
        
  );
}

export default ProductCard;





/***********************************************************************
 VariantCard & ProductCard Components will use the following attributes:

// Variant-Level Records
        objectID: ? `${p._id.toString()}-${v.sku}` : p._id.toString(),
        name 
        price 
        stock 
        description 
        brand 
        categories 
        imageURL 
        
// Product-Level Records
        objectID: p._id.toString(),
        baseName 
        description 
        brand 
        categories 
        price: p.variants?.[0]?.price || 0,
        stock: p.variants?.[0]?.stock || 0,
        imageURL

************************************************************************/

