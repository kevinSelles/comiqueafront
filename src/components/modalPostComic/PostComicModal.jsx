import "./PostComicModal.css";
import { useNavigate } from "react-router-dom";

export default function PostComicModal({ comicId, onClose }) {
  const navigate = useNavigate();

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.classList.contains("modal-overlay") && onClose()}
      >
      <div className="modalpost" role="dialog" aria-modal="true">
        <button
          className="modalpost-close"
          aria-label="Cerrar modal"
          onClick={onClose}
        >
          ✕
        </button>
        <h3>✅ Cómic añadido correctamente</h3>
        <p>¿Qué te gustaría hacer ahora?</p>
        <div className="modalpost-actions">
          <button
            className="primary"
            onClick={() => {
              navigate("/comics", { state: { comicId } });
              onClose();
            }}
          >
            Ver cómic añadido
          </button>
          <button
            onClick={() => {
              onClose();
              navigate("/comics/new");
            }}
          >
            Añadir otro cómic
          </button>
        </div>
      </div>
    </div>
  );
}