export default function ComicCard({ comic, onClick }) {
  return (
    <article className="comic-card" onClick={() => onClick(comic)}>
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
  );
}