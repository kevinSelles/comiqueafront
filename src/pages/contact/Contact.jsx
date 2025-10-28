import "./Contact.css";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../config/api";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok) {
        setSuccessMessage("✅ Tu mensaje se ha enviado correctamente.");
        reset();
        nameInputRef.current.focus();
      } else {
        setSuccessMessage("");
        setError("api", { type: "manual", message: resData.error || "❌ No se pudo enviar el mensaje" });
      }
    } catch {
      setSuccessMessage("");
      setError("api", { type: "manual", message: "❌ No se pudo enviar el mensaje" });
    }
  };

  return (
    <>
      <p className="contact-intro">
        Si tienes algún problema, sugerencia o necesitas información, estaremos encantados de atenderte.
      </p>
      <main className="contact-page">
        <h2 className="contact-title">Contáctanos</h2>
        {successMessage && <p className="contact-success">{successMessage}</p>}
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Nombre:
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              ref={(e) => {
                register("name").ref(e);
                nameInputRef.current = e;
              }}
            />
            {errors.name && <span className="contact-error">{errors.name.message}</span>}
          </label>
          <label>
            Email:
            <input
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" },
              })}
            />
            {errors.email && <span className="contact-error">{errors.email.message}</span>}
          </label>
          <label>
            Motivo de la consulta:
            <select {...register("subject", { required: "Debes seleccionar un motivo" })} defaultValue="">
              <option value="" disabled>-- Selecciona un motivo --</option>
              <option value="Sugerencias">Sugerencias</option>
              <option value="Problemas con mi cuenta de usuario">Problemas con mi cuenta de usuario</option>
              <option value="Corregir cómic">Corregir cómic</option>
              <option value="Información general">Información general</option>
              <option value="Otros">Otro</option>
            </select>
            {errors.subject && <span className="contact-error">{errors.subject.message}</span>}
          </label>
          <label>
            Mensaje:
            <textarea rows="6" {...register("message", { required: "El mensaje es obligatorio" })}></textarea>
            {errors.message && <span className="contact-error">{errors.message.message}</span>}
          </label>
          <button type="submit" className="contact-button">Enviar mensaje</button>
          {errors.api && <p className="contact-error">{errors.api.message}</p>}
        </form>
      </main>
    </>
  );
}