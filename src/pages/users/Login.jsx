import "./UserForms.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export default function Login() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSuccess(false);
        setMessage(data || "❌ Usuario o contraseña incorrectos.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userResponse));

      setSuccess(true);
      setMessage(`✅ Bienvenido, ${data.userResponse.userName}!`);

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setSuccess(false);
      setMessage("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <main className="user-page">
      <h2>Iniciar sesión</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="user-button">
          Entrar
        </button>
        {message && (
          <p className={success ? "user-success" : "user-error"}>{message}</p>
        )}
      </form>
    </main>
  );
}