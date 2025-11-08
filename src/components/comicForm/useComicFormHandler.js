import { useEffect } from "react";
import { API_URL } from "../../config/api";

export default function useComicFormHandler({
  comic,
  user,
  setMessage,
  setLoading,
  reset,
  setImagePreview,
  onSuccess,
  navigate,
  setValue,
}) {
  useEffect(() => {
    if (comic && typeof setValue === "function") {
      Object.entries(comic).forEach(([key, value]) => {
        if (!["_id", "__v", "img"].includes(key)) {
          try {
            setValue(key, value);
          } catch (e) {
            console.error("useComicFormHandler: setValue fallo para", key, e);
          }
        }
      });
      if (comic.img && typeof setImagePreview === "function") setImagePreview(comic.img);
    }
  }, [comic, setValue, setImagePreview]);

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

      const fields = ["title", "description", "isbn", "date", "publisher", "serie", "language", "format"];
      for (const field of fields) {
        if (formData[field]) payload.append(field, formData[field]);
      }

      if (formData.authors) {
        const authorsArray = Array.isArray(formData.authors)
          ? formData.authors
          : formData.authors.split(",").map((a) => a.trim()).filter(Boolean);
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
        setTimeout(() => {
          reset();
          if (typeof setImagePreview === "function") setImagePreview(null);
          if (typeof navigate === "function") navigate(`/`);
        }, 1500);
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit };
}