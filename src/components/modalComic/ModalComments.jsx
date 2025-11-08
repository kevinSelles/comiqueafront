import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

export default function ComicComments({ comicId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/comments/${comicId}`);
      setComments((await res.json()) || []);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [comicId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return setError("Debes escribir un comentario.");
    if (!user) return setError("Debes estar logueado para comentar.");

    setSending(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: newComment, comic: comicId }),
      });
      if (!res.ok) throw new Error();
      const savedComment = await res.json();
      setComments((prev) => [{ ...savedComment, user }, ...prev]);
      setNewComment("");
    } catch {
      setError("No se pudo enviar el comentario.");
    } finally {
      setSending(false);
    }
  };

  return (
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
  );
}