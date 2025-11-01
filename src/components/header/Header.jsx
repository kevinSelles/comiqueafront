import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/img/comiquea-logo.webp"
          alt="Logo"
          className="header-logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="header-center">
        <div className="title-container">
          <h1 className="header-title">COMIQUEA</h1>
          <h2 className="slogan">Tu web de cómics en español</h2>
        </div>
        <input
          type="text"
          placeholder="Buscar cómic, autor, ISBN, fecha..."
          className="header-search"
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(e.target.value.trim());
          }}
        />
      </div>
      <div className="header-right">
        {user ? (
          <>
            <span className="header-username">{user.userName}</span>
            <Link to="/profile" className="header-button primary">
              Mi perfil
            </Link>
            <Link to="/comics/new" className="header-button primary" title="Añadir nuevo cómic">
              ➕ Añadir cómic
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="header-button">Iniciar sesión</Link>
            <Link to="/register" className="header-button primary">Registrarse</Link>
          </>
        )}
      </div>
    </header>
  );
}