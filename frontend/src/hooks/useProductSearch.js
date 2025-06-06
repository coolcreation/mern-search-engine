// useProductsSearch.js
// This is just a helper function (a "hook") your component can use — like a reusable search

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
        const res = await axios.get(`http://localhost:8000/api/search?q=${query}`);
        console.log("Search API response:", res.data);
        setResults(res.data.products);  // 'products' comes from Meilisearch
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
