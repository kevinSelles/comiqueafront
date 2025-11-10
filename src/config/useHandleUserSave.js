import { useCallback } from "react";
import { API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

export function useHandleUserSave(setMessage, setUser, setEditing) {
  const navigate = useNavigate();

  const handleUserSave = useCallback(
    async (e, formData, user) => {
      e.preventDefault();
      setMessage("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("❌ Sesión expirada. Inicia sesión de nuevo.");
          navigate("/login");
          return;
        }

        const payload = { ...formData };
        if (payload.password === "******") delete payload.password;

        const res = await fetch(`${API_URL}/users/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage("❌ Error al actualizar el perfil.");
          return;
        }

        const updatedUser = {
          ...user,
          userName: data.userName || formData.userName,
          email: data.email || formData.email,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditing(false);
        setMessage("✅ Perfil actualizado correctamente.");
      } catch {
        setMessage("❌ Error de conexión con el servidor.");
      }
    },
    [navigate, setMessage, setUser, setEditing]
  );

  return handleUserSave;
}