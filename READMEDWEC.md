# OUTIFY

Este proyecto usa módulos de JavaScript, así que para que todo funcione como debería debe abrirse usando live server.

## Backlog

| Prioridad | Pieza | Descripción | Estado |
| --- | --- | --- | --- |
| 1 | Lista de subastas del perfil | El botón de Gestión abre una ventana con todas las subastas del usuario, filtradas usando "idVendedor" | Hecho |
| 2 | Tarjeta de detalle | Al pulsar una subasta de la lista, esta abre su ficha con nombre, descripción y puja actual | Hecho |
| 3 | Menú de navegación | Footer con enlaces a todas las secciones | Hecho |
| 4 | Listado principal de subastas | Pantalla de subastas generada desde JS a partir de "datos.js", con vendedor y puja | Hecho |    
| 5 | Pujar con validación | La puja nueva debe ser mayor que la actual y actualizarse en tiempo real | Pendiente |
| 6 | Alta de subasta | Formulario en Crear con validación de campos obligatorios y puja inicial positiva | Pendiente |
| 7 | Filtro por marca | Filtrar el listadp de subastas por la marca de la prenda | Pendiente |
| 8 | Buscador por nombre | Buscar subastas disponibles escribiendo parte del nombre | Pendiente |

## Mapa de pantallas

### Inicio ("index.html")

- Datos: logo de la aplicación y acceso a la página de buscador y notificaciones
- Entidades: no cuenta con ninguna por ahora
- Acciones: navegar a otras secciones con el menú y poder visualizar contenido subido por los demás usuarios
- Estado: maquetada, sin contenido dinámica

### Crear Subasta ("crearSubasta.html")

- Datos: formulario con nombre de la prenda, descripción, marca y dos campos para incluir el precio inicial y el precio de venta automática
- Entidades: "subastas"
- Acciones: publicar subastas subastas nuevas con todos sus detalles
- Estado: creada con HTML puro, falta de estilos

### Mensajes ("mensajeria.html")

- Datos: lista de conversaciones entre los usuarios
- Entidades: por definir
- Acciones: abrir conversaciones
- Estado: pendiente, solo menú de navegación

### Perfil ("perfil.html")

- Datos: nombre y foto del usuario, estadísticas y subastas activas
- Entidades: "usuarios" y "subastas"
- Acciones: Gestión abre la lista de subastas que tiene el usuario, al pulsar se abre una tarjeta con todos los detalles de la subasta
- Estado: todo hecho menos las publicaciones

### Crear

- Datos: formulario con descripción de la publicación, una barra de búsqueda para poder añadir música a la publicación
- Entidades: por definir
- Acciones: crear publicaciones con todos sus detalles 
- Estado: pendiente, solo menú de navegación

### Subastas

- Datos: lista de las subastas publicadas por los demás usuarios de la aplicación
- Entidades: "usuarios" y "subastas"
- Acciones: ver detalle de las subastas creadas por los demás usuarios y pujar por las prendas
- Estado: maquetada, sin contenido dinámico