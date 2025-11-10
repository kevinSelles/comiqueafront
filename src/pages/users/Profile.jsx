import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import FormUser from "../../components/profile/UserForm";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileActions from "../../components/profile/ProfileActions";
import { useHandleUserSave } from "../../config/useHandleUserSave";

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

  const handleSave = useHandleUserSave(setMessage, setUser, setEditing);

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        handleSave={(e) => handleSave(e, formData, user)}
      />
      <ProfileStats user={user} />
      <ProfileActions user={user} setMessage={setMessage} />
      {message && <p className="profile-message">{message}</p>}
    </main>
  );
}