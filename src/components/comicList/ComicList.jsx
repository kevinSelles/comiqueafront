import "../../pages/comics/Comics.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import ModalComic from "../modalComic/ModalComic";

export default function ComicList({ listName, title }) {
  const { user } = useAuth();
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);

  const fetchUserListComics = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");

      const resUser = await fetch(`${API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataUser = await resUser.json();
      const comicIds = dataUser[listName] || [];

      if (comicIds.length === 0) {
        setComics([]);
        return;
      }

      const comicsPromises = comicIds.map((id) =>
        fetch(`${API_URL}/comics/${id}`).then((res) => res.json())
      );
      const comicsData = await Promise.all(comicsPromises);

      setComics(comicsData);
    } catch (err) {
      console.error("Error al cargar la lista de comics:", err);
    }
  };

  useEffect(() => {
    fetchUserListComics();
  }, [user, listName]);

  const handleComicClick = (comic) => setSelectedComic(comic);
  const handleCloseModal = () => {
    setSelectedComic(null);
    fetchUserListComics();
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
            key={comic._id || Math.random()}
            className="comic-card"
            onClick={() => handleComicClick(comic)}
          >
            <img
              src={comic.img}
              alt={comic.title}
              className="comic-image"
              loading="lazy"
            />
            <div className="comic-info">
              <h3 className="comic-title">{comic.title}</h3>
              <p className="comic-author">
                {Array.isArray(comic.authors) && comic.authors.length > 0
                  ? comic.authors.join(" / ")
                  : "Autor desconocido"}
              </p>
              <p className="comic-date">{comic.date || "—"}</p>
              {comic.publisher && <p className="comic-publisher">{comic.publisher}</p>}
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