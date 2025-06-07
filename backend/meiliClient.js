import { MeiliSearch } from 'meilisearch'
import dotenv from "dotenv";

dotenv.config();

const client = new MeiliSearch({
    // host: 'http://localhost:7700', // For local development
    host: process.env.MEILI_HOST + '/v1', // Meilisearch hosted on Render
    // apiKey: process.env.MEILI_MASTER_KEY,  // Replace with your master key or an API key
});

export default client;