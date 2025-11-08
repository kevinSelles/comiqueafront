import "./ComicForm.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ComicForm({ comic = null, onSuccess, onCancel }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(comic?.img || null);
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
        if (key !== "img" && key !== "_id" && key !== "__v") {
          setValue(key, comic[key]);
        }
      }
      if (comic.img) setImagePreview(comic.img);
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
      if (formData.description) payload.append("description", formData.description);
      if (formData.isbn) payload.append("isbn", formData.isbn);
      if (formData.date) payload.append("date", formData.date);
      if (formData.publisher) payload.append("publisher", formData.publisher);
      if (formData.serie) payload.append("serie", formData.serie);
      if (formData.language) payload.append("language", formData.language);
      if (formData.format) payload.append("format", formData.format);

      if (formData.authors) {
        let authorsArray = [];
        if (typeof formData.authors === "string") {
          authorsArray = formData.authors
            .split(",")
            .map((a) => a.trim())
            .filter((a) => a);
        } else if (Array.isArray(formData.authors)) {
          authorsArray = formData.authors.map((a) => a.trim()).filter((a) => a);
        }
        authorsArray.forEach((a) => payload.append("authors", a));
      }

      if (formData.img && formData.img.length > 0) {
        payload.append("image", formData.img[0]);
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

      setMessage(isEdit ? "✅ Cómic actualizado correctamente." : "✅ Cómic creado correctamente.");

      if (onSuccess) onSuccess(data);
      if (!isEdit) {
        setMessage("✅ Cómic creado correctamente.");
        setTimeout(() => {
          reset();
          setImagePreview(null);
          navigate(`/`);
        }, 1500);
};

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
          <input type="text" {...register("title", { required: "El título es obligatorio" })} />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </label>
        <label>
          Descripción *
          <textarea {...register("description", { required: "La descripción es obligatoria" })} />
          {errors.description && <span className="error-message">{errors.description.message}</span>}
        </label>
        <label>
          Autor/es * (separar por comas)
          <input type="text" {...register("authors", { required: "El autor es obligatorio" })} />
          {errors.authors && <span className="error-message">{errors.authors.message}</span>}
        </label>
        <label>
          ISBN *
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
          {errors.isbn && <span className="error-message">{errors.isbn.message}</span>}
        </label>
        <label>
          Fecha de publicación
          <input type="text" {...register("date")} />
        </label>
        <label>
          Colección
          <input type="text" {...register("serie")} />
        </label>
        <label>
          Editorial
          <input type="text" {...register("publisher")} />
        </label>
        <label>
          Idioma
          <input type="text" {...register("language")} />
        </label>
        <label>
          Formato
          <input type="text" {...register("format")} />
        </label>
        <label>
          Portada
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setValue("img", e.target.files);
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