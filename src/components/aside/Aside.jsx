import "./Aside.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Aside() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="aside">
      <Link to="/" className="aside-link">Inicio</Link>
      <Link to="/comics" className="aside-link">Cómics</Link>
      <Link to="/news" className="aside-link">Noticias</Link>
      <Link to="/contact" className="aside-link">Contacto</Link>
      <div className="aside-dropdown">
        <button
          className="aside-link aside-dropdown-button"
          onClick={() => setOpen(!open)}
        >
          Mis listas ▼
        </button>
        {open && (
          <div className="aside-dropdown-content">
            <Link to="/favoritos" className="aside-link aside-dropdown-item">Favoritos</Link>
            <Link to="/leidos" className="aside-link aside-dropdown-item">Leídos</Link>
            <Link to="/wishlist" className="aside-link aside-dropdown-item">Wishlist</Link>
          </div>
        )}
      </div>
    </aside>
  );
}