export default function ModalActions({
  user,
  isFavourite,
  isOwned,
  isRead,
  isWanted,
  setIsFavourite,
  setIsOwned,
  setIsRead,
  setIsWanted,
  toggleList,
  setEditing,
  handleDeleteComic,
}) {
  return (
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
      {user && (
        <button onClick={() => setEditing(true)} className="btn-edit" title="Editar cómic">
          ✏️ Editar
        </button>
      )}
      {user?.rol === "admin" && (
        <button onClick={handleDeleteComic} className="btn-delete" title="Eliminar cómic">
          🗑️ Eliminar
        </button>
      )}
    </div>
  );
}