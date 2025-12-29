import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Comiquea — Proyecto académico realizado por{" "}
        <a
          href="https://kevinfy.es/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Kevin Selles
        </a>.
      </p>
    </footer>
  );
}