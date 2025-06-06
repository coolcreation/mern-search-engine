import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./database.js";      // MongoDB connection

import { MeiliSearch } from 'meilisearch'           // Meilisearch object
import syncProducts from './syncMeiliSearch.js';    // MeiliSearch connection

// Route Imports
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import usersRoutes from "./routes/usersRoute.js"
import searchRoutes from "./routes/searchRoutes.js"

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use("/cart", cartRoutes)
app.use("/products", productRoutes)
app.use("/users", usersRoutes)
app.use("/api/search", searchRoutes);

// Use Meilisearch object as `client`
const client = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_MASTER_KEY
})

// Start function to connect DB, sync, and start server
async function startServer() {
  try {
    await connectToDatabase();  // connect to MongoDB
    console.log("➡️ Syncing products to Meilisearch...");
    await syncProducts();       // Initial sync to Meilisearch (not CRUD updates)
    
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();