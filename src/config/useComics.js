import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

export function useComics(searchTerm, page = 1, limit = 20) {
  const [comics, setComics] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);

        const url = searchTerm
          ? `${API_URL}/comics/search?query=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
          : `${API_URL}/comics?page=${page}&limit=${limit}`;

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
  }, [searchTerm, page, limit]);

  return { comics, totalPages, loading };
}