import "../../pages/comics/Comics.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import ModalComic from "../modalComic/ModalComic";

export default function ComicList({ listName, title }) {
  const { user } = useAuth();
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);

  const fetchUser = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setComics(data[listName] || []);
    } catch (err) {
      console.error("Error al cargar la lista:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user, listName]);

  const handleComicClick = (comic) => setSelectedComic(comic);
  const handleCloseModal = () => {
    setSelectedComic(null);
    fetchUser();
  };

  if (!user)
    return (
      <main className="comics-container">
        <p className="comics-loading">Debes iniciar sesión para ver tus listas.</p>
      </main>
    );

  if (!comics.length)
    return (
      <main className="comics-container">
        <p className="comics-loading">No hay cómics en esta lista.</p>
      </main>
    );

  return (
    <main className="comics-container">
      <h2 className="comics-title">{title}</h2>
      <section className="comics-grid">
        {comics.map((comic) => (
          <article
            key={comic._id}
            className="comic-card"
            onClick={() => handleComicClick(comic)}
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
      {selectedComic && (
        <ModalComic comic={selectedComic} onClose={handleCloseModal} />
      )}
    </main>
  );
}