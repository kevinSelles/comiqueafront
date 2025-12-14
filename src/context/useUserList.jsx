import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

export function useUserLists(comicId, user) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isWanted, setIsWanted] = useState(false);

  const itemExistsInList = (list) => {
    if (!Array.isArray(list)) return false;
    return list.some((c) => {
      if (!c) return false;
      const id = typeof c === "object" ? c._id || c : c;
      return id.toString() === comicId.toString();
    });
  };

  const fetchUserLists = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return console.error("fetchUserLists: respuesta no OK", res.status);

      const data = await res.json();
      setIsFavourite(itemExistsInList(data.favorites));
      setIsOwned(itemExistsInList(data.owned));
      setIsRead(itemExistsInList(data.read));
      setIsWanted(itemExistsInList(data.wishlist));
    } catch (err) {
      console.error("Error al cargar listas del usuario:", err);
    }
  };

  const toggleList = async (listName, stateSetter) => {
    if (!user) return alert("Debes iniciar sesión para guardar cómics en tus listas.");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/lists/${listName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comicId }),
      });

      if (!res.ok) throw new Error(await res.text().catch(() => "Error al actualizar la lista"));

      const updatedList = await res.json();
      stateSetter(itemExistsInList(updatedList));
    } catch (err) {
      console.error("Error al modificar la lista:", err);
    }
  };

  useEffect(() => {
    if (user) fetchUserLists();
  }, [user, comicId]);

  return { isFavourite, isOwned, isRead, isWanted, setIsFavourite, setIsOwned, setIsRead, setIsWanted, toggleList };
}