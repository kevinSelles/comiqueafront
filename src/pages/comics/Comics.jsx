import "./Comics.css";
import { useEffect, useState } from "react";
import ModalComic from "../../components/modalComic/ModalComic";

export default function Comics({ searchTerm }) {
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeComic, setActiveComic] = useState(null);

  const limit = 20;
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:3000/api/v1"
      : "https://comiquea-backend.vercel.app/api/v1");
  const API_URL = `${API_BASE_URL}/comics`;

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);

        const url = searchTerm
          ? `${API_URL}/search?query=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
          : `${API_URL}?page=${page}&limit=${limit}`;

        const res = await fetch(url);
        const data = await res.json();
        setComics(data.comics || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error al cargar cómics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, [page, searchTerm]);


  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <main className="comics-container">
      <h2 className="comics-title">Catálogo de Cómics</h2>

      {loading ? (
        <p className="comics-loading">Cargando cómics...</p>
      ) : (
        <>
          <section className="comics-grid">
            {comics.map((comic) => (
              <article
                className="comic-card"
                key={comic._id}
                onClick={() => setActiveComic(comic)}
              >
                <img
                  src={comic.image}
                  alt={comic.title}
                  className="comic-image"
                  loading="lazy"
                />
                <div className="comic-info">
                  <h3 className="comic-title">{comic.title}</h3>
                  <p className="comic-author">
                    {Array.isArray(comic.author)
                      ? comic.author.join(" / ")
                      : comic.author || "—"}
                  </p>
                  <p className="comic-date">{comic.releaseDate || "—"}</p>
                </div>
              </article>
            ))}
          </section>
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePrev}
              disabled={page === 1}
            >
              ⬅️ Anterior
            </button>
            <span className="pagination-info">
              Página {page} de {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Siguiente ➡️
            </button>
          </div>
        </>
      )}
      {activeComic && (
        <ModalComic comic={activeComic} onClose={() => setActiveComic(null)} />
      )}
    </main>
  );
}