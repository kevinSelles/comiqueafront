import "./ModalComic.css";
import { useEffect } from "react";

export default function ModalComic({ comic, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!comic) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        <div className="modal-body">
          <div className="modal-image-wrap">
            <img
              src={comic.image}
              alt={comic.title}
              className="modal-image"
              loading="lazy"
            />
          </div>
          <div className="modal-content">
            <h2 className="modal-title">{comic.title}</h2>
            <p className="modal-sub">
              <strong>Contenido:</strong> {comic.content || "—"}
            </p>
            <p className="modal-sub">
              <strong>Fecha:</strong> {comic.releaseDate || "—"}
            </p>
            <p className="modal-sub">
              <strong>Editorial:</strong> {comic.editorial || "—"}
            </p>
            <p className="modal-sub">
              <strong>
                Autor{Array.isArray(comic.author) && comic.author.length > 1 ? "es" : ""}
                :
              </strong>{" "}
              {Array.isArray(comic.author)
                ? comic.author.join(" / ")
                : comic.author || "—"}
            </p>
            <p className="modal-sub">
              <strong>Páginas:</strong> {comic.pages || "—"}
            </p>
            <p className="modal-sub">
              <strong>ISBN:</strong> {comic.isbn || "—"}
            </p>
            <section className="modal-synopsis">
              <h3>Sinopsis</h3>
              <p>{comic.synopsis || "No hay sinopsis disponible."}</p>
            </section>
            <section className="modal-comments">
              <h3>Comentarios</h3>
              {Array.isArray(comic.comments) && comic.comments.length ? (
                <ul>
                  {comic.comments.map((c, i) => (
                    <li key={i}>
                      <strong>{c.user?.userName || "Usuario"}:</strong>{" "}
                      {c.text || c.body || "—"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Aún no hay comentarios.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}