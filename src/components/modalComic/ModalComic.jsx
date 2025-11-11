import "./ModalComic.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ComicForm from "../comicForm/ComicForm";
import ComicComments from "./ModalComments";
import ModalActions from "./ModalActions";
import ComicDetails from "./ComicDetails";
import { useUserLists } from "../../context/useUserList";
import { API_URL } from "../../config/api";

export default function ModalComic({ comic, onClose }) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const { isFavourite, isOwned, isRead, isWanted, setIsFavourite, setIsOwned, setIsRead, setIsWanted, toggleList } =
    useUserLists(comic?._id, user);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleDeleteComic = async () => {
    if (!user || user.rol !== "admin") return alert("Solo los administradores pueden eliminar cómics.");
    if (!window.confirm(`¿Seguro que deseas eliminar "${comic.title}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/comics/${comic._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(await res.text().catch(() => "Error al eliminar el cómic"));

      alert("✅ Cómic eliminado correctamente.");
      onClose();
    } catch (err) {
      console.error("Error al eliminar cómic:", err);
      alert("❌ No se pudo eliminar el cómic.");
    }
  };

  if (!comic) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target.classList.contains("modal-overlay") && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        <div className="modal-body">
        {!editing && (
          <div className="modal-image-wrap">
            <img src={comic.img} alt={comic.title} className="modal-image" loading="lazy" />
          </div>
        )}
          <div className="modal-content">
            {!editing ? (
              <>
                <ModalActions
                  user={user}
                  isFavourite={isFavourite}
                  isOwned={isOwned}
                  isRead={isRead}
                  isWanted={isWanted}
                  setIsFavourite={setIsFavourite}
                  setIsOwned={setIsOwned}
                  setIsRead={setIsRead}
                  setIsWanted={setIsWanted}
                  toggleList={toggleList}
                  setEditing={setEditing}
                  handleDeleteComic={handleDeleteComic}
                />
                <ComicDetails comic={comic} />
                <ComicComments comicId={comic._id} user={user} />
              </>
            ) : (
              <ComicForm
                comic={comic}
                onCancel={() => setEditing(false)}
                onSuccess={(updatedComic) => {
                  Object.assign(comic, updatedComic);
                  setEditing(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}