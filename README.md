# Comiquea - Frontend

Este es el frontend de **Comiquea**, la web para organizar tu comicteca, consultar información de cómics, dejar comentarios y mantener listas personales de favoritos, leídos, comprados o deseados.

El proyecto está creado con **React** y **Vite** como bundler.

---

## Tecnologías y dependencias

- **React 19**
- **React Router DOM **: para gestionar la navegación entre páginas como SPA.
- **React Hook Form **: para la gestión de formularios.
- **Vite**: bundler y entorno de desarrollo.

---

## Rutas del Frontend

| Ruta                | Componente / Página                  | Descripción                                           |
|--------------------|-------------------------------------|------------------------------------------------------|
| `/`                | `Home`                              | Página de inicio                                     |
| `/comics`          | `Comics`                            | Listado general de cómics                            |
| `/comics/new`      | `NewComic`                           | Formulario para añadir un nuevo cómic               |
| `/news`            | `News`                              | Noticias relacionadas con cómics                    |
| `/contact`         | `Contact`                            | Formulario de contacto                               |
| `/register`        | `Register`                           | Registro de nuevos usuarios                          |
| `/login`           | `Login`                              | Login de usuarios                                    |
| `/profile`         | `Profile`                            | Perfil del usuario                                   |
| `/mycomics`        | `MyComics`                           | Lista de cómics del usuario                          |
| `/favourites`      | `Favourites`                         | Lista de cómics favoritos                            |
| `/readed`          | `Readed`                             | Lista de cómics leídos                               |
| `/wanted`          | `Wanted`                             | Lista de cómics deseados                             |


## Estructura del proyecto

### Archivos principales

- **main.jsx**  
  Envuelve la aplicación con `<BrowserRouter>` para habilitar el enrutado de la SPA.

- **App.jsx**  
  Define la estructura base de la web, incluyendo **Header**, **Aside** y **Footer**.

- **src/router/ComiqueaRouter.jsx**  
  Contiene todas las rutas que renderizan las diferentes secciones del `main` según donde se pulse en el Aside.

### Context y gestión de sesión

- **src/context/AuthContext.jsx**  
  Proporciona la información de sesión a toda la App.  
  Permite actualizar la UI cuando un usuario inicia o cierra sesión, evitando que se sigan mostrando botones de usuario incorrectos.

### Componentes reutilizables

- **src/components/ComicLists.jsx**  
  Componente que crea la estructura de una lista de cómics reutilizable en diferentes páginas: favoritos, leídos, comprados, deseados, etc.  
  Evita duplicar código y mantiene consistencia visual.

### Configuración y hooks

- **src/config/**  
  - Parámetros reutilizables de la API  
  - Hooks personalizados:  
    - `useHandleUserSave.js`: lógica para modificar los datos de un usuario existente  
    - `useComics.js`: gestión de carga de cómics desde el backend  

### Despliegue y SPA

- **vercel.json**  
  Configura la SPA para que al recargar la web en cualquier ruta, se redirija a `index.html` y React Router se encargue de renderizar correctamente la página correspondiente.  
  Soluciona errores de recarga o 404.

---

## Notas importantes

- La web está diseñada como SPA, por lo que todas las interacciones se gestionan sin recargar la página.
- La información del usuario se gestiona mediante Context y hooks, no mediante props simples, para asegurar que los cambios de sesión se reflejen correctamente.
- Los componentes reutilizables permiten mantener consistencia en el diseño y lógica de la aplicación.

