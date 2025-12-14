import "./AlertConfirmModal.css";
import { useEffect, useState } from "react";

export default function ConfirmModal() {
  const [confirmData, setConfirmData] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setConfirmData(e.detail);
    };

    window.addEventListener("app-confirm", handler);
    return () => window.removeEventListener("app-confirm", handler);
  }, []);

  if (!confirmData) return null;

  const { message, resolve } = confirmData;

  const handleConfirm = () => {
    resolve(true);
    setConfirmData(null);
  };

  const handleCancel = () => {
    resolve(false);
    setConfirmData(null);
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="danger" onClick={handleConfirm}>
            Sí, continuar
          </button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}