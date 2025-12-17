import "./Comics.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useComics } from "../../config/useComics";
import ComicCard from "../../components/comicCard/ComicCard";
import Pagination from "../../components/pagination/Pagination";
import ModalComic from "../../components/modalComic/ModalComic";
import SortComics from "../../components/SortComics/SortComics";

export default function Comics({ searchTerm, onResetSearch }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [activeComic, setActiveComic] = useState(null);

  const handleShowAll = () => {
    onResetSearch();
    navigate("/comics");
  };

  const { comics, totalPages, loading } = useComics(searchTerm, page, 20, sort);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <main className="comics-container">
      <h2 className="comics-title">Catálogo de Cómics</h2>
      <SortComics 
        selectedSort={sort} 
        onSortChange={setSort} 
        onShowAll={handleShowAll}
      />
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
      {activeComic && (
        <ModalComic comic={activeComic} onClose={() => setActiveComic(null)} />
      )}
    </main>
  );
}