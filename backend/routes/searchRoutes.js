import express from "express";
import meiliClient from "../meiliClient.js"; 

const router = express.Router();

// GET /api/search?q='typed-search-of-some-kind'
router.get("/", async (req, res) => {
  const query = req.query.q || "";

  try {
    const index = meiliClient.index("products"); // MongoDB 'products' collection

    const result = await index.search(query, {
      limit: 20,
    });

    // Send back only the relevant part
    res.json({ products: result.hits });
    
  } catch (error) {
    console.error("Meilisearch error:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
