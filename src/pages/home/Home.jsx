import "./Home.css";

export default function Home() {
  const sections = [
    {
      title: "¿Qué es Comiquea?",
      text: "Comiquea es una plataforma gratuita creada por y para amantes del cómic. Un espacio donde podrás descubrir, gestionar y organizar tus lecturas favoritas. Con un listado de cómics que no para de crecer gracias a los propios usuarios.",
      img: "/img/comiquea-logo.png",
    },
    {
      title: "Tu organizador de cómics",
      text: "Largas sagas que no vienen numeradas; editoriales que cambian los formatos y nombres de las colecciones; universos que entrelazan sus historias... Todos los lectores de cómics llegamos a un punto en el que nos perdemos dentro de nuestra propia colección. ¿No recuerdas si ya tienes ese número que acabas de ver en la tienda? ¿No consigues aclararte sobre el orden de lectura? ¿Querías comprar tantos títulos que se te acaban olvidado los nombres? Con Comiquea, todo eso se acabó.",
      img: "/img/organizador.webp",
    },
    {
      title: "Multitud de opciones para ayudarte",
      text: "Marca los cómics que ya tienes, los que has leido, los que quieres comprar, tus favoritos... Además, si no estás seguro de que un cómic pueda gustarte, en Comiquea podras encontrar opiniones de otros usuarios que seguro que te darán una idea de si ese título es lo que buscas y tu también podras escribir valoraciones para ayudar a otros lectores como tu.",
      img: "/img/monton-comics.webp",
    },
    {
      title: "Una web creada por toda la comunidad de lectores.",
      text: "Nuestra base de datos de cómics va creciendo en tiempo real gracias a las aportaciones de lectores como tu. No solo tienes la opción de añadir cómics, también podrás editar los existentes si detectas algun error o dispones de más información. Desde clásicos inolvidables hasta lanzamientos recientes, descubre cómics que quizá nunca habrías encontrado por tu cuenta y si no encuentras el cómic que buscas, puedes añadirlo tu mismo.",
      img: "/img/lectores.webp",
    },
      {
      title: "¿Y todo esto es gratuito?",
      text: "Si, es 100% gratuito. Estamos cansados de pagar por herramientas para organizar libros que no cubren nuestras necesidades o plataformas que exigen suscripciones mensuales para utilizar sus herramientas de organización. El mantenimiento se costeará gracias a la publicidad, pero puedes estar tranquilo. Sabemos que es agobiante cuando te bombardean con mil anuncios. Nuestra intención es que puedas navegar con tranquilidad, por lo que introduciremos la publicidad mínima para no entorpecer tu visita a Comiquea y a la vez poder costear los gastos que conlleva la web.",
      img: "/img/gratis.png",
    },
       {
      title: "Evolución constante",
      text: "Comiquea está dando sus primeros pasos y sabemos que hay mucho margen de mejora. ¿Se te ocurre alguna función o utilidad que pueda mejorar la experiencia en la web? El equipo de Comiquea está para ayudarte. Puedes contarnos tus ideas o los errores que encuentres a través del apartado de contacto. Siempre estamos dispuestos a mejorar y trabajamos en base a todas vuestras sugerencias.",
      img: "/img/gracias.webp",
    },
  ];

  return (
    <section className="home">
      {sections.map((section, index) => (
        <article
          key={index}
          className={`home-hero ${index % 2 === 1 ? "reverse" : ""}`}
        >
          <div className="home-text">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
          <figure className="home-image">
            <img src={section.img} alt={section.title} loading="lazy" />
          </figure>
        </article>
      ))}
    </section>
  );
};