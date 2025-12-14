import { API_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProfileActions({ user, setMessage }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = await window.confirm(
      "⚠️ Esta acción eliminará tu cuenta permanentemente. ¿Seguro que quieres continuar?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Sesión expirada. Inicia sesión de nuevo.");
        navigate("/login");
        return;
      }

      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessage("❌ Error al eliminar la cuenta: " + errorText);
        return;
      }

      logout();
      setMessage("✅ Cuenta eliminada correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      setMessage("❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="profile-actions">
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
      <button onClick={handleDeleteAccount} className="delete-account-button">
        Eliminar cuenta
      </button>
    </div>
  );
}