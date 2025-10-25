import { Link } from "react-router-dom";
import "./Aside.css";

export default function Aside() {
  return (
    <aside className="aside">
      <Link to="/" className="aside-link">Inicio</Link>
      <Link to="/comics" className="aside-link">Cómics</Link>
      <Link to="/news" className="aside-link">Noticias</Link>
      <Link to="/contact" className="aside-link">Contacto</Link>
    </aside>
  );
}