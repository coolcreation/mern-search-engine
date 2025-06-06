import Product from './models/productModel.js';
import client from './meiliClient.js';

const syncProducts = async () => {

  try {
    // Try creating the index with primary key 'id' if it doesn't exist
    try {
      await client.createIndex('products', { primaryKey: 'id' });
      console.log("Index created with primaryKey 'id'");
    } catch (err) {
      if (err.code === 'index_already_exists') {
        console.log('Index already exists');
      } else {
        throw err; // rethrow unexpected errors
      }
    }
  
    const index = client.index('products');

    // Set searchable attributes before adding documents
    await index.updateSearchableAttributes([
      'baseName',
      'description',
      'brand',
      'categories',
      'tags',
      'variants.name',
    ]);

    const products = await Product.find().lean();

    console.log(`Found ${products.length} products in MongoDB`);
    console.log("Sending to Meilisearch...");

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
