import "./AlertModal.css";
import { useEffect, useState } from "react";

export default function AlertModal() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setMessage(e.detail.message);
    };

    window.addEventListener("app-alert", handler);
    return () => window.removeEventListener("app-alert", handler);
  }, []);

  if (!message) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-modal">
        <p>{message}</p>
        <button onClick={() => setMessage(null)}>Aceptar</button>
      </div>
    </div>
  );
}