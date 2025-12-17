import "./ComicForm.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useComicFormHandler from "./useComicFormHandler";
import ComicFormFields from "./ComicFormFields";
import PostComicModal from "../modalPostComic/PostComicModal";

export default function ComicForm({ comic = null, onSuccess, onCancel }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(comic?.img || null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdComicId, setCreatedComicId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { onSubmit } = useComicFormHandler({
    comic,
    user,
    setMessage,
    setLoading,
    reset,
    setImagePreview,
    onSuccess: (createdComic) => {
      setCreatedComicId(createdComic._id);
    },
    setValue,
  });

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
        <ComicFormFields
          register={register}
          errors={errors}
          setValue={setValue}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
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
      {createdComicId && (
        <PostComicModal
          comicId={createdComicId}
          onClose={() => setCreatedComicId(null)}
        />
      )}
    </main>
  );
}