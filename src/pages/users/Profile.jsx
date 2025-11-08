import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import FormUser from "../../components/profile/UserForm";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileActions from "../../components/profile/ProfileActions";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login");
        return;
      }

      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        userName: parsed.userName,
        email: parsed.email,
        password: "******",
      });

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/users/${parsed._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          console.error("Error al obtener datos del usuario:", data);
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEdit = (e) => { e.preventDefault(); setEditing(true); setMessage(""); };
  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
    setMessage("");
    setFormData({
      userName: user.userName,
      email: user.email,
      password: "******",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) { setMessage("❌ Sesión expirada. Inicia sesión de nuevo."); navigate("/login"); return; }

      const payload = { ...formData };
      if (payload.password === "******") delete payload.password;

      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) { setMessage("❌ Error al actualizar el perfil."); return; }

      const updatedUser = { ...user, userName: data.userName || formData.userName, email: data.email || formData.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
      setMessage("✅ Perfil actualizado correctamente.");
    } catch { setMessage("❌ Error de conexión con el servidor."); }
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "⚠️ Esta acción eliminará tu cuenta permanentemente. ¿Seguro que quieres continuar?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) { setMessage("❌ Sesión expirada. Inicia sesión de nuevo."); navigate("/login"); return; }

      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) { const errorText = await res.text(); setMessage("❌ Error al eliminar la cuenta: " + errorText); return; }

      logout();
      setMessage("✅ Cuenta eliminada correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      setMessage("❌ Error al conectar con el servidor.");
    }
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <h2>Mi Perfil</h2>
      <FormUser
        formData={formData}
        editing={editing}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
      <ProfileStats user={user} />
      <ProfileActions handleLogout={handleLogout} handleDeleteAccount={handleDeleteAccount} />
      {message && <p className="profile-message">{message}</p>}
    </main>
  );
}