import "./Comics.css";
import { useState } from "react";
import ModalComic from "../../components/modalComic/ModalComic";
import { useComics } from "../../config/useComics";
import ComicCard from "../../components/comicCard/ComicCard";
import Pagination from "../../components/pagination/Pagination";

export default function Comics({ searchTerm }) {
  const [page, setPage] = useState(1);
  const [activeComic, setActiveComic] = useState(null);

  const { comics, totalPages, loading } = useComics(searchTerm, page);

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
              <ComicCard key={comic._id} comic={comic} onClick={setActiveComic} />
            ))}
          </section>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}
      {activeComic && <ModalComic comic={activeComic} onClose={() => setActiveComic(null)} />}
    </main>
  );
}