export default function ComicDetails({ comic }) {
  return (
    <>
      <h2 className="modal-title">{comic.title}</h2>
      <p className="modal-sub"><strong>Fecha:</strong> {comic.date || "—"}</p>
      <p className="modal-sub"><strong>Editorial:</strong> {comic.publisher || "—"}</p>
      <p className="modal-sub">
        <strong>Autor{Array.isArray(comic.authors) && comic.authors.length > 1 ? "es" : ""}:</strong>{" "}
        {Array.isArray(comic.authors) ? comic.authors.join(" / ") : comic.authors || "—"}
      </p>
      {comic.serie && <p className="modal-sub"><strong>Colección:</strong> {comic.serie}</p>}
      {comic.format && <p className="modal-sub"><strong>Formato:</strong> {comic.format}</p>}
      {comic.language && <p className="modal-sub"><strong>Lenguaje:</strong> {comic.language}</p>}
      {comic.characters?.length > 0 && <p className="modal-sub"><strong>Personajes:</strong> {comic.characters.join(" / ")}</p>}
      {comic.pages && <p className="modal-sub"><strong>Páginas:</strong> {comic.pages}</p>}
      {comic.isbn && <p className="modal-sub"><strong>ISBN:</strong> {comic.isbn}</p>}
      {comic.price && <p className="modal-sub"><strong>Precio:</strong> {comic.price} €</p>}
      {comic.availability && <p className="modal-sub"><strong>Disponibilidad:</strong> {comic.availability}</p>}
      <section className="modal-synopsis">
        <h3>Sinopsis</h3>
        <p>{comic.description || "No hay sinopsis disponible."}</p>
      </section>
    </>
  );
};