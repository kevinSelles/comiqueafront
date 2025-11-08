export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={onPrev}
        disabled={page === 1}
      >
        ⬅️ Anterior
      </button>
      <span className="pagination-info">
        Página {page} de {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={onNext}
        disabled={page === totalPages}
      >
        Siguiente ➡️
      </button>
    </div>
  );
}