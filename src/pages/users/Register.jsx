import "./UserForms.css";
import { useState } from "react";
import { API_URL } from "../../config/api";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSuccess(false);
        setMessage(data || "❌ No se pudo registrar el usuario.");
        return;
      }

      setSuccess(true);
      setMessage("✅ Registro completado correctamente. Ya puedes iniciar sesión.");
      setFormData({ userName: "", email: "", password: "" });
    } catch (error) {
      setSuccess(false);
      setMessage("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <main className="user-page">
      <h2>Crear cuenta</h2>
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
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
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
          Registrarse
        </button>
        {message && (
          <p className={success ? "user-success" : "user-error"}>{message}</p>
        )}
      </form>
    </main>
  );
}