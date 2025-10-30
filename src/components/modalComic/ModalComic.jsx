import "./ModalComic.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";

export default function ModalComic({ comic, onClose }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isWanted, setIsWanted] = useState(false);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    fetchComments();
    if (user) fetchUserLists();

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [comic, user]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/comments/${comic._id}`);
      const data = await res.json();
      setComments(data || []);
    } catch (err) {
      console.error("Error al cargar comentarios:", err);
      setComments([]);
    }
  };

  const itemExistsInList = (list, comicId) => {
    if (!Array.isArray(list)) return false;
    return list.some((c) => {
      if (!c) return false;
      if (typeof c === "string") return c === comicId;
      if (typeof c === "object" && c._id) return c._id.toString() === comicId.toString();
      try {
        return c.toString() === comicId.toString();
      } catch {
        return false;
      }
    });
  };

  const fetchUserLists = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("fetchUserLists: respuesta no OK", res.status);
        return;
      }

      const data = await res.json();

      setIsFavourite(itemExistsInList(data.favorites, comic._id));
      setIsOwned(itemExistsInList(data.owned, comic._id));
      setIsRead(itemExistsInList(data.read, comic._id));
      setIsWanted(itemExistsInList(data.wishlist, comic._id));
    } catch (err) {
      console.error("Error al cargar listas del usuario:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      setError("Debes estar logueado para comentar.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          comic: comic._id,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        throw new Error(errText || "Error al enviar el comentario");
      }

      const savedComment = await res.json();
      setComments((prev) => [{ ...savedComment, user }, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar el comentario.");
    } finally {
      setSending(false);
    }
  };

  const toggleList = async (listName, stateSetter) => {
    if (!user) {
      alert("Debes iniciar sesión para guardar en tus listas.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/lists/${listName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comicId: comic._id }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        throw new Error(errText || "Error al actualizar la lista");
      }

      const updatedList = await res.json();

      const exists = itemExistsInList(updatedList, comic._id);
      stateSetter(Boolean(exists));
    } catch (err) {
      console.error("Error al modificar la lista:", err);
    }
  };

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
            <div className="modal-actions">
              <button
                className={`modal-action-btn btn-fav ${isFavourite ? "active" : ""}`}
                onClick={() => toggleList("favorites", setIsFavourite)}
                aria-pressed={isFavourite}
                title={isFavourite ? "Quitar de favoritos" : "Añadir a favoritos"}
              >
                ❤️
              </button>
              <button
                className={`modal-action-btn btn-own ${isOwned ? "active" : ""}`}
                onClick={() => toggleList("owned", setIsOwned)}
                aria-pressed={isOwned}
                title={isOwned ? "Quitar de mis cómics" : "Añadir a mis cómics"}
              >
                Lo tengo
              </button>
              <button
                className={`modal-action-btn btn-read ${isRead ? "active" : ""}`}
                onClick={() => toggleList("read", setIsRead)}
                aria-pressed={isRead}
                title={isRead ? "Marcar como no leído" : "Marcar como leído"}
              >
                Leído
              </button>
              <button
                className={`modal-action-btn btn-want ${isWanted ? "active" : ""}`}
                onClick={() => toggleList("wishlist", setIsWanted)}
                aria-pressed={isWanted}
                title={isWanted ? "Quitar de deseados" : "Añadir a deseados"}
              >
                Lo quiero
              </button>
            </div>
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
                Autor{Array.isArray(comic.author) && comic.author.length > 1 ? "es" : ""}:
              </strong>{" "}
              {Array.isArray(comic.author) ? comic.author.join(" / ") : comic.author || "—"}
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
              {comments.length ? (
                <ul>
                  {comments.map((c, i) => (
                    <li key={i}>
                      <strong>{c.user?.userName || "Usuario"}:</strong> {c.content || "—"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Aún no hay comentarios.</p>
              )}
              <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe tu comentario..."
                  rows={3}
                  disabled={sending}
                  required
                />
                <button type="submit" disabled={sending}>
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </form>
              {error && <p className="comment-error">{error}</p>}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}