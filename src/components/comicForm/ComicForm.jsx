import "./ComicForm.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ComicForm({ comic = null, onSuccess, onCancel }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(comic?.image || null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (comic) {
      for (const key in comic) {
        if (key !== "image" && key !== "_id" && key !== "__v") {
          setValue(key, comic[key]);
        }
      }
      if (comic.image) setImagePreview(comic.image);
    }
  }, [comic, setValue]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setMessage("");

      if (!user) {
        setMessage("❌ Debes iniciar sesión para continuar.");
        return;
      }

      const token = localStorage.getItem("token");
      const payload = new FormData();

      if (formData.title) payload.append("title", formData.title);
      if (formData.synopsis) payload.append("synopsis", formData.synopsis);
      if (formData.isbn) payload.append("isbn", formData.isbn);
      if (formData.releaseDate) payload.append("releaseDate", formData.releaseDate);
      if (formData.editorial) payload.append("editorial", formData.editorial);
      if (formData.pages) payload.append("pages", formData.pages);
      if (formData.content) payload.append("content", formData.content);
      if (formData.author) {
        let authorsArray = [];
        if (typeof formData.author === "string") {
          authorsArray = formData.author
            .split(",")
            .map((a) => a.trim())
            .filter((a) => a);
        } else if (Array.isArray(formData.author)) {
          authorsArray = formData.author.map((a) => a.trim()).filter((a) => a);
        }
        authorsArray.forEach((a) => payload.append("author", a));
      }

      if (formData.image && formData.image.length > 0) {
        payload.append("image", formData.image[0]);
      }

      const isEdit = Boolean(comic);
      const url = isEdit ? `${API_URL}/comics/${comic._id}` : `${API_URL}/comics`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error en el formulario");

      setMessage(
        isEdit
          ? "✅ Cómic actualizado correctamente."
          : "✅ Cómic creado correctamente."
      );

      if (onSuccess) onSuccess(data);

      if (!isEdit) {
        reset();
        setImagePreview(null);
        setTimeout(() => navigate(`/comics/${data._id}`), 1200);
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="comic-form-page">
        <p>Debes iniciar sesión para poder usar este formulario.</p>
      </main>
    );
  }

  const isEdit = Boolean(comic);

  return (
    <main className="comic-form-page">
      <h2>{isEdit ? "✏️ Editar cómic" : "📚 Añadir nuevo cómic"}</h2>
      <form className="comic-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Título *
          <input
            type="text"
            {...register("title", { required: "El título es obligatorio" })}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </label>
        <label>
          Sinopsis *
          <textarea
            {...register("synopsis", { required: "La sinopsis es obligatoria" })}
          />
          {errors.synopsis && (
            <span className="error-message">{errors.synopsis.message}</span>
          )}
        </label>
        <label>
          Autor/es * (separar por comas)
          <input
            type="text"
            {...register("author", { required: "El autor es obligatorio" })}
          />
          {errors.author && (
            <span className="error-message">{errors.author.message}</span>
          )}
        </label>
        <label>
          ISBN * (solo números)
          <input
            type="text"
            {...register("isbn", {
              required: "El ISBN es obligatorio",
              pattern: {
                value: /^[0-9]{10,13}$/,
                message: "Debe tener 10 o 13 dígitos sin espacios ni guiones",
              },
            })}
          />
          {errors.isbn && (
            <span className="error-message">{errors.isbn.message}</span>
          )}
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
            onChange={(e) => {
              if (e.target.files[0]) {
                setValue("image", e.target.files);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Previsualización" />
          </div>
        )}
        <div className="comic-form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Añadir cómic"}
          </button>
          {onCancel && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
      {message && <p className="form-message">{message}</p>}
    </main>
  );
}