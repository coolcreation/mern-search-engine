// server.js (Revised)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import syncProducts from './syncMeiliSearch.js';
// import client from './meiliClient.js'; // This imports the Meilisearch client instance

// Route Imports
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import usersRoutes from "./routes/usersRoute.js"
import searchRoutes from "./routes/searchRoutes.js"

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: [
    'https://mern-search-frontend.vercel.app', // connect frontend Securely!
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));


// Routes
app.use("/cart", cartRoutes)
app.use("/products", productRoutes)
app.use("/users", usersRoutes)
app.use("/api/search", searchRoutes);

// The `client` object is already imported from meiliClient.js
// No need to re-initialize here unless you want a separate instance
// console.log(client); // You can keep this for debugging the client config

async function main() {
  try {
    // 1. Connect to MongoDB (can be awaited as it's usually fast)
    await connectToDatabase();
    console.log("Successfully connected to MongoDB!");

    // 2. Start the Express server FIRST
    // This allows Render to detect an open port and mark the service as live.
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // 3. Trigger Meilisearch sync in the background
    // We await it here so the `startServer` function waits for it to complete.
    // If this is a very long operation, you might consider not awaiting it
    // or running it as a separate worker service on Render.
    console.log("➡️ Syncing products to Meilisearch...");
    await syncProducts();
    console.log("✅ Meilisearch sync operation completed (or encountered an error).");

  } catch (error) {
    console.error('🚨 Failed during server startup or product sync:', error);
    process.exit(1); // Exit if critical startup or sync fails
  }
}

main();