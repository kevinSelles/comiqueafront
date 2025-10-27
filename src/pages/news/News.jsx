import { useEffect, useState } from "react";
import "./News.css";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/news");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();

        const cleanedNews = data.map((item) => {
          if (item.image) {
            item.image = item.image.replace(/\/s\d+-w\d+-h\d+-c\//, "/s1600/"); 
          }
          return item;
        });

        setNews(cleanedNews);
      } catch (err) {
        console.error("Error al obtener noticias:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <p className="news-loading">Cargando noticias...</p>;
  if (error) return <p className="news-error">Error al cargar las noticias 😢</p>;

  return (
    <main className="news-container">
      <h2 className="news-title">Últimas noticias</h2>
      <section className="news-list">
        {news.map((item, index) => (
          <article key={index} className="news-card">
            <img src={item.image} alt={item.title} className="news-image" />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Leer más →
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}