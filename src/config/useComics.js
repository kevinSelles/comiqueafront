import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

export function useComics(searchTerm, page = 1, limit = 20, sort = "") {
  const [comics, setComics] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);

        let url = "";
        if (searchTerm) {
          url = `${API_URL}/comics/search?query=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`;
        } else {
          url = `${API_URL}/comics?page=${page}&limit=${limit}`;
        }

        if (sort) {
          url += `&sort=${sort}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setComics(data.comics || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error al cargar cómics:", err);
        setComics([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [searchTerm, page, limit, sort]);

  return { comics, totalPages, loading };
}