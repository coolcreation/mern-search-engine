// VariantCard.jsx 

function VariantCard({ product, handleProductAdded }) {

  const displayImage =
    product.imageURL && product.imageURL.length > 0 ? product.imageURL[0] : null;

  return (
    <div className="card">
      <div className="card-body">
        <h4>{product.baseName}</h4>
        <hr/>
        <p>{product.description}</p>
        <p>{product.brand}</p>
        <p>{Array.isArray(product.categories) ? product.categories.join(", ") : product.categories}</p>
        <p className="text-primary fs-5">${product.price?.toFixed(2) || "N/A"}</p>
        <p>Stock: {product.stock ?? "N/A"}</p>

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
      <button className='m-3 btn btn-success' onClick={() => handleProductAdded(product.objectID)}> Add to Cart </button>

    </div>
  );
}

export default VariantCard


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