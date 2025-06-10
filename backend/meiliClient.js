// meiliClient.js
import { MeiliSearch } from 'meilisearch'
import dotenv from "dotenv";

dotenv.config();

const client = new MeiliSearch({
    // host: 'http://localhost:7700', // For local development
    host: process.env.MEILI_HOST, // Meilisearch hosted on Render
    apiKey: process.env.MEILI_MASTER_KEY,  // Meilisearch master key
});
console.log(client);

export default client;




