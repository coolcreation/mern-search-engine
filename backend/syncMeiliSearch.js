import Product from './models/productModel.js';
import client from './meiliClient.js';

const syncProducts = async () => {
  try {
    const index = client.index('products');

    const products = await Product.find().lean();

    // Convert `_id` to `id` (Meilisearch expects `id`)
    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      ...product,
    }));

    const response = await index.addDocuments(formattedProducts);

    console.log('Synced products to Meilisearch:', response);
  } catch (error) {
    console.error('Error syncing products to Meilisearch:', error.message);
  }
};

export default syncProducts;
