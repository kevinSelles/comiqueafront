import "./Aside.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdBanner from "../../utils/ads/bannerAside/AdBanner";

export default function Aside({ onResetSearch }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleComicsClick = (e) => {
    e.preventDefault();
    onResetSearch();
    navigate("/comics");
  };

  return (
    <aside className="aside">
      <Link to="/" className="aside-link">Inicio</Link>
      <a href="/comics" onClick={handleComicsClick} className="aside-link">
        Cómics
      </a>
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
            <Link to="/mycomics" className="aside-link aside-dropdown-item">Mis cómics</Link>
            <Link to="/favourites" className="aside-link aside-dropdown-item">Favoritos</Link>
            <Link to="/readed" className="aside-link aside-dropdown-item">Leídos</Link>
            <Link to="/wanted" className="aside-link aside-dropdown-item">Deseados</Link>
          </div>
        )}
      </div>
      <AdBanner
        image="https://res.cloudinary.com/damjp56im/image/upload/v1762567458/comics/pwoejlvcfxcyp0luolec.webp"
        text="Cómic del mes, con un 5% de descuento"
        link="https://amzn.to/47Qs0hC"
      />
    </aside>
  );
}