# module2-project

| METHOD | PATH                     | DESCRIPTION                                    | JSON |
|--------|--------------------------|------------------------------------------------|------|
| GET    |`/`                       | Página principal                               |      | -
| GET    |`/usuario/registro`       | Página para registro                           |      | -
| POST   |`/usuario/registro`       | Post del registro a la DB                      |      | -
| GET    |`/usuario/inicio-sesion`  | Página para iniciar sesión                     |      | -
| POST   |`/usuario/inicio-sesion`  | Post del inicio de sesión a la DB              |      | -
| GET    |`/usuario/cerrar-sesion`  | Página para cerrar sesión                      |      | -
| GET    |`/usuario/lista`          | Página para ver la lista de usuarios           |      | -
| GET    |`/usuario/:_id`           | Página para ver el perfil de otro usuario      |      | -
| GET    |`/usuario/:_id/editar`    | Página para editar el perfil de usuario        |      | -
| POST   |`/usuario/:_id/editar`    | Post de la edición de perfil a la DB           |      | -
| GET    |`/usuario/:_id/eliminar`  | Eliminación del usuario                        |      | -
| GET    |`/personajes`             | Renderizar a la vista todos los personajes     |      |
| POST   |`/personajes`             | Guardar personajes favoritos                   |      |
| GET    |`/personajes/aleatorio`   | Renderizar a vista un solo personaje aleatorio |      |
| GET    |`/personajes/favoritos`   | Renderizar tus personajes favoritos            |      |
| GET    |`/eventos`                | Mostrar lista de eventos disponibles           |      |
| GET    |`/eventos/crear`          | Página para crear eventos                      |      |
| POST   |`/eventos/crear`          | Post de la creación de los eventos a la DB     |      |
| GET    |`/eventos/:_id`           | Mostrar detalles del evento                    |      |
| GET    |`/eventos/:_id/editar`    | Página para editar eventos                     |      |
| POST   |`/eventos/:_id/editar`    | Post de la edición del evento a la DB          |      |
| GET    |`/eventos/:_id/eliminar`  | Eliminación de eventos                         |      |
| GET    |`/api/events`             | Mapa para eventos                              |   ✅  |
| GET    |`/api/events/:_id`        | Mapa para detalle de evento                    |   ✅  |
