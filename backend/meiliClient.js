import { MeiliSearch } from 'meilisearch'
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.MEILI_HOST
const MASTER_KEY = process.env.MEILI_MASTER_KEY

const client = new MeiliSearch({
    // host: 'http://localhost:7700', // For local development
    host: `${HOST}`, // Meilisearch hosted on Render
    apiKey: `${MASTER_KEY}`,  // Replace with your master key or an API key
});

export default client;