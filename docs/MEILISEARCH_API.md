## Meilisearch API docs 
---  

### Backend Express items to implement for Meilisearch 
```
/backend
  ├── routes
  │    └── searchRoutes.js
  ├── .env
  ├── .gitignore
  ├── server.js 
  ├── meiliClient.js
  └── syncMeiliSearch.js
```

```
npm install meilisearch
```

We need a master key for security as **Meilisearch free tier doesn't have an API Key.**  
Run this in powershell, it outputs a strong 32-byte base64 string: 
```
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))   
```                              

Take that base64 string and store it in `backend/.env` file, along with host key:
```
MEILI_HOST=http://127.0.0.1:7700  # or Meilisearch cloud URL if hosted (paid account)
MEILI_MASTER_KEY=your_base64_string
```  
It's extremely important to add `**/.env` file extension to a `.gitignore` as to **not push secrets to Github**    

Then in `server.js`:
```js
import { MeiliSearch } from 'meilisearch'
import dotenv from 'dotenv'

dotenv.config()

const client = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_MASTER_KEY
})
```

---  
### Frontend React items to implement for Meilisearch 

**Step 1.** Create a custom **React hook** that:

   - Watches the user's search input (`query`)
   - Calls Express backend (`/api/search?q=...`)
   - Stores the search results in `results`
   - Tells the UI when it's `loading`

Create a new folder `hooks` and a new file called `useProductsSearch.js` inside frontend React src:

```
/src/hooks/useProductsSearch.js
```

`useProductsSearch.js` is a helper function "hook" components can use - a reusable search

```js
// useProductsSearch.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useProductsSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return setResults([]);

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/search?q=${query}`);
        setResults(res.data.hits);  // 'hits' comes from Meilisearch
      } catch (error) {
        console.error("Search error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return { results, loading };
}
```
`Searchbox` component will use `useProductsSearch.js` like this:

```js
const { results, loading } = useProductsSearch(query);
```

Whenever the `query` changes, this hook:

* Talks to your `/api/search` Express route
* Returns updated search results


**Step 2.**  Update `Searchbox.jsx` Component to use the `hook`:
```js
import { useState } from 'react';
import useProductsSearch from '../hooks/useProductsSearch.js'; // Custom hook
import ProductCard from './ProductCard.jsx';
import VariantCard from './VariantCard.jsx';
import { useCart } from '../context/CartContext';

export default function Searchbox() {
  const [query, setQuery] = useState("");
  const { results, loading } = useProductsSearch(query);  // Use helper function 'hook'
  const { addToCart } = useCart();

  const handleProductAdded = (id) => {
    console.log("Added to cart:", id);
    addToCart(id);
  };

  function isTrueVariantProduct(product) {
    const variants = product.variants;
    return Array.isArray(variants) && variants.length > 1;
  }

  function isPseudoVariant(product) {
    const variants = product.variants;
    if (!Array.isArray(variants) || variants.length !== 1) return false;

    const variant = variants[0];
    return variant.name?.toLowerCase().includes(product.baseName?.toLowerCase());
  }

  return (
    <div className="search-container">
      <input
        type="search"
        className="form-control my-3"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <div className="product-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {results.map(product => {
          if (isTrueVariantProduct(product)) {
            return (
              <div className="col" key={product._id}>
                <ProductCard product={product} handleProductAdded={handleProductAdded} />
              </div>
            );
          }

          if (isPseudoVariant(product)) {
            return (
              <div className="col" key={product._id}>
                <VariantCard
                  product={{ ...product, ...product.variants[0] }}
                  handleProductAdded={handleProductAdded}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
```

**Step 3.**  Create the `/api/search` route in Express backend to connect React to Meilisearch.
This will be the endpoint your React app calls when it runs this:

```js
axios.get(`/api/search?q=${query}`);
```
In Express backend create a file inside `routes` named `searchRoutes.js`:

```
/routes/searchRoutes.js
```

Use this code inside `searchRoutes.js`:

```js
import express from "express";
import { meiliClient } from "../meiliClient.js"; 

const router = express.Router();

// GET /api/search?q=...
router.get("/", async (req, res) => {
  const query = req.query.q || "";

  try {
    const index = meiliClient.index("products"); // MongoDB 'products' collection

    const result = await index.search(query, {
      limit: 20,
    });

    res.json(result); // returns { products, offset, limit, etc  }
  } catch (error) {
    console.error("Meilisearch error:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;

```
`searchRoutes.js` main objectives are to:
   - Get the search query from `req.query.q`
   - Talk to the Meilisearch instance
   - Send the results (including `.products`) back to React frontend

---

In `backend/server.js` add the route `searchRoutes.js`:

```js
import searchRoutes from "./routes/searchRoutes.js"; 
app.use("/api/search", searchRoutes);
```


#### Basic workflow for search:
1. React sends search queries to `/api/search?q=shoes`
2. Express receives that query
3. Express calls Meilisearch and sends back results
4. React displays products in `Searchbox`

---  


### Production Setup for Meilisearch (Free & Scalable)

If not using Meilisearch Cloud then deploy Meilisearch as a Private Web Service on Render.  
  - Meilisearch will run as a separate service in Render **not locally**   
  - It's hosting a search engine server alongside the API — not inside it.  
  
**Step 1.** Create a New Web Service on Render 

* Go to [Render Dashboard](https://dashboard.render.com/)
* Click **“New +” > “Web Service”**
* Select **“Deploy an Image from a Docker Repository”**
* Use the official Meilisearch image:

```bash
getmeili/meilisearch:v1.7
```

**Step 2.** Configure the Service 

* **Name:** `meilisearch`
* **Environment:** `Docker`
* **Region:** (Same as your backend)
* **Instance Type:** Starter (or free if available)
* **Port:** `7700`
* **Health Check Path:** `/health`
* **Environment Variables:**

  * `MEILI_MASTER_KEY=your-strong-master-key`

**Step 3.**  Save the URL

Once deployed, Render will give you a public URL, e.g.:

```
https://meilisearch-yourname.onrender.com
```

Use this **in your backend** and React app — no more `localhost`.

---

### 🧠 Update Your Frontend/Backend

#### 🔒 Your frontend uses a search hook like:

```js
const res = await axios.get(`/api/search?q=${query}`);
```

That’s fine **if your backend handles the Meilisearch call**.

But in your **backend**, update your search logic to hit **Render’s public Meilisearch URL** like:

```js
const response = await axios.post(
  'https://meilisearch-yourname.onrender.com/indexes/products/search',
  { q: searchQuery },
  { headers: { 'X-Meili-API-Key': process.env.MEILI_MASTER_KEY } }
);
```

---

#### Advantages of This Approach

* Production-ready: Secure, scalable, cloud-hosted Meilisearch
* Easy to switch to Meilisearch Cloud later if needed
* You own the infrastructure — no hacks, no localhost dependencies

---

Would you like a template for the backend search route and frontend changes to connect this all cleanly?





