import { MeiliSearch } from 'meilisearch'
import dotenv from "dotenv";

dotenv.config();

const MASTER_KEY = process.env.MEILI_MASTER_KEY

const client = new MeiliSearch({
    host: 'http://localhost:7700', // Replace with your Meilisearch host
    apiKey: `${MASTER_KEY}`,  // Replace with your master key or an API key
});

export default client;