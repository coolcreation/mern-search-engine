import { MeiliSearch } from 'meilisearch'
import dotenv from "dotenv";

dotenv.config();

const MASTER_KEY = process.env.MEILI_MASTER_KEY

const client = new MeiliSearch({
    // host: 'http://localhost:7700', // For local development
    host: 'https://collab-ecommerce-meili-proxy.onrender.com', // Meilisearch hosted on Render
    apiKey: `${MASTER_KEY}`,  // Replace with your master key or an API key
});

export default client;