import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

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
            if (e.key === "Enter") {
              onSearch(e.target.value.trim());
            }
          }}
        />
      </div>
      <div className="header-right">
        {user ? (
          <>
            <span className="header-username">👋 {user.userName}</span>
            <Link to="/profile" className="header-button primary">
              Mi perfil
            </Link>
            <button onClick={handleLogout} className="header-button">
              Cerrar sesión
            </button>
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