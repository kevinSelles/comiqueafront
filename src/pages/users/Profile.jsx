import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
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
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setMessage("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/update/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ Error al actualizar el perfil");
        return;
      }

      const updatedUser = {
        ...user,
        userName: formData.userName,
        email: formData.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
      setMessage("✅ Perfil actualizado correctamente");
    } catch (error) {
      setMessage("❌ Error de conexión con el servidor.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <h2>Mi Perfil</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>
        <div className="profile-buttons">
          {!editing ? (
            <button type="button" onClick={handleEdit} className="user-button primary">
              Modificar
            </button>
          ) : (
            <>
              <button type="submit" className="user-button primary">
                Guardar cambios
              </button>
              <button type="button" onClick={handleCancel} className="user-button">
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
      <section className="profile-stats">
        <h3>Mis listas</h3>
        <p>Favoritos: 0</p>
        <p>Leídos: 0</p>
        <p>Listas personales: 0</p>
      </section>
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
      {message && <p className="profile-message">{message}</p>}
    </main>
  );
}