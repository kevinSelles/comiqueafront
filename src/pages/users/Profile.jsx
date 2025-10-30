import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
    setMessage("");
  };

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
    } catch (error) {
      setMessage("❌ Error de conexión con el servidor.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <h2>Mi Perfil</h2>
      <form className="profile-form" onSubmit={handleSave} noValidate>
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
            <button
              type="button"
              onClick={handleEdit}
              className="user-button primary"
            >
              Modificar
            </button>
          ) : (
            <>
              <button type="submit" className="user-button primary">
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="user-button"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
      <section className="profile-stats">
        <h3>Mis listas</h3>
        <p>Favoritos: {user?.favorites?.length || 0}</p>
        <p>Leídos: {user?.read?.length || 0}</p>
        <p>Lo tengo: {user?.owned?.length || 0}</p>
        <p>Lo quiero: {user?.wishlist?.length || 0}</p>
        <p>Mis cómics creados: {user?.createdComics?.length || 0}</p>
      </section>
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
      {message && <p className="profile-message">{message}</p>}
    </main>
  );
}