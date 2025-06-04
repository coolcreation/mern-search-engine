import express from "express"
import Product from "../models/productModel.js"
import client from '../meiliClient.js';    // import Meilisearch

const router = express.Router()
const index = client.index('products');    // Meili needs our 'products' collection via Mongo

router.get("/", async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

// Create product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();

    // Sync to Meilisearch
    await index.addDocuments([{ id: saved._id.toString(), ...saved.toObject() }]);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Sync to Meilisearch
    await index.addDocuments([{ id: updated._id.toString(), ...updated.toObject() }]);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router
