import { MeiliSearch } from 'meilisearch'
import dotenv from "dotenv";

dotenv.config();

const client = new MeiliSearch({
    // host: 'http://localhost:7700', // For local development
    host: 'https://collab-ecommerce-meili-proxy.onrender.com',
    //host: process.env.MEILI_HOST, // Meilisearch hosted on Render
    apiKey: process.env.MEILI_MASTER_KEY,  // Replace with your master key or an API key
});
console.log(client);
export default client;