import "./NewComic.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";

export default function NewComic() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Debes iniciar sesión para crear un cómic.");
        return;
      }

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("synopsis", formData.synopsis);
      payload.append("isbn", formData.isbn);
      payload.append("releaseDate", formData.releaseDate);
      payload.append("editorial", formData.editorial);
      payload.append("author", formData.author);
      if (formData.pages) payload.append("pages", formData.pages);
      if (formData.content) payload.append("content", formData.content);
      if (formData.image[0]) payload.append("image", formData.image[0]);

      const res = await fetch(`${API_URL}/comics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al crear el cómic");

      setMessage("✅ Cómic creado correctamente.");
      reset();
      setImagePreview(null);

      setTimeout(() => navigate(`/comics/${data._id}`), 1500);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="new-comic-page">
        <p>Debes iniciar sesión para poder crear nuevos cómics.</p>
      </main>
    );
  }

  return (
    <main className="new-comic-page">
      <h2>📚 Añadir nuevo cómic</h2>
      <form className="new-comic-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Título *
          <input
            type="text"
            {...register("title", { required: "El título es obligatorio" })}
          />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </label>
        <label>
          Sinopsis *
          <textarea
            {...register("synopsis", { required: "La sinopsis es obligatoria" })}
          />
          {errors.synopsis && <span className="error-message">{errors.synopsis.message}</span>}
        </label>
        <label>
          Autor/es * (separar por comas)
          <input
            type="text"
            {...register("author", { required: "El autor es obligatorio" })}
          />
          {errors.author && <span className="error-message">{errors.author.message}</span>}
        </label>
        <label>
          ISBN * (solo números, sin guiones ni espacios)
          <input
            type="text"
            {...register("isbn", {
              required: "El ISBN es obligatorio",
              pattern: {
                value: /^[0-9]{10,13}$/,
                message: "Debe contener solo números, sin guiones ni espacios (10 o 13 dígitos)",
              },
            })}
          />
          {errors.isbn && <span className="error-message">{errors.isbn.message}</span>}
        </label>
        <label>
          Fecha de publicación
          <input type="text" {...register("releaseDate")} />
        </label>
        <label>
          Editorial
          <input type="text" {...register("editorial")} />
        </label>
        <label>
          Páginas
          <input type="number" {...register("pages", { min: 1, valueAsNumber: true })} />
        </label>
        <label>
          Contenido
          <textarea {...register("content")} />
        </label>
        <label>
          Portada
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              if (e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Previsualización de portada" />
          </div>
        )}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creando..." : "Añadir cómic"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </main>
  );
}