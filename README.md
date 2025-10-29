- En main.jsx uso react-router-dom para envolver mediante la etiqueta BrowserRouter a toda la App.

- En App.jsx creo la estructura base de la web, como Header, Aside y Footer.

- En src/router/ComiqueaRouter.jsx he colocado todas las rutas que mostrará cada section que aparecerá en el main segun se pulsen los botones del aside (nav en pantallas pequeñas).

- Creado AuthContext en src/context/AuthContext.jsx para informar a la App de cuando se ha iniciado o cerrado sesion, ya que surgia un problema en el que al iniciar/cerrar sesión la web no actualizaba la información mediante simples props como nombre de usuario y se seguian mostrando los botones de usuario incluso con la sesión cerrada.