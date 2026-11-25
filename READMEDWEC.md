# OUTIFY

Este proyecto usa módulos de JavaScript, así que para que todo funcione como debería debe abrirse usando live server.

## Backlog

| Prioridad | Pieza | Descripción | Estado |
| --- | --- | --- | --- |
| 1 | Lista de subastas del perfil | El botón de Gestión abre una ventana con todas las subastas del usuario, filtradas usando "idVendedor" | Hecho |
| 2 | Tarjeta de detalle | Al pulsar una subasta de la lista, esta abre su ficha con nombre, descripción y puja actual | Hecho |
| 3 | Menú de navegación | Footer con enlaces a todas las secciones | Hecho |
| 4 | Listado principal de subastas | Pantalla de subastas generada desde JS a partir de "datos.js", con vendedor y puja | Hecho |    
| 5 | Capa de datos | Módulo "almacen.js" con obtenerTodos, obtenerPorId, crear, actualizar y borrar sobre localStorage. El resto de la app solo accede a los datos a través de él | Hecho |
| 6 | Funciones de validación | Módulo "validacion.js": cada función recibe un valor y devuelve el mensaje de error o null | Hecho |
| 7 | Formulario de registro | Alta de usuarios con validación, que sirve también para editar. No guarda la contraseña | Hecho |
| 8 | Vista de usuarios | Lista de usuarios registrados con botones de editar y borrar (con confirmación) | Hecho |
| 9 | Formulario de contacto | Consulta con motivo propio de Outify, teléfono opcional, validación entre campos y contador de caracteres | Hecho |
| 10 | Mensajes enviados | Lista de mensajes de contacto guardados, con botón de borrar | Hecho |
| 11 | Cookie del contacto | Recordar nombre y correo del último envío con fecha de caducidad | Pendiente |

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
- Acciones: Gestión abre la lista de subastas que tiene el usuario, al pulsar se abre una tarjeta con todos los detalles de la subasta, desde esta pantalla se puede acceder al regsitro de usuarios y a la pantalla de contacto
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

### Registro ("registro.html")

- Datos: nombre de usuario, correo, contraseña, repetir contraseña, fecha de nacimiento y aceptación de condiciones
- Entidades: "usuarios"
- Acciones: crear una cuenta, ver la lista de usuarios registrados, editarlos con el mismo formulario y borrarlos con confirmación
- Estado: terminada (hito 2)

### Contacto ("contacto.html")

- Datos: nombre, correo, teléfono (opcional), preferencia de llamada, motivo y mensaje
- Entidades: "mensajes"
- Acciones: enviar una consulta, ver los mensajes enviados y borrarlos con confirmación
- Estado: terminada salvo la cookie (hito 2)

## Hito 2: formularios

### Qué se ha hecho

- **Capa de datos** ("html/js/almacen.js"): guarda y lee de localStorage con las cinco funciones pedidas, los datos se guardan con un id numérico autoincremental y siguen ahí al recargar la página, ninguna otra parte de la app toca localStorage directamente.
- **Validación** ("html/js/validacion.js"): un único módulo con todas las funciones, que usan los dos formularios. Cada una devuelve el texto del error o null.
- **Registro** ("html/js/registro.js"): el mismo formulario crea y edita (al editar aparece relleno y no pide contraseña, porque no se guarda). La contraseña se valida pero nunca se guarda: se quita antes de llamar a crear().
- **Contacto** ("html/js/contacto.js"): motivo con opciones propias de Outify, teléfono validado con expresión regular, contador de caracteres y mensajes guardados.

### Mapa de validación

Los límites marcados como "HTML" se leen del propio campo.

#### Registro

| Campo | Regla | Mensaje de error |
| --- | --- | --- |
| Nombre de usuario | Obligatorio | Este campo es obligatorio |
| Nombre de usuario | Mínimo 3 caracteres (HTML) | El nombre debe tener al menos 3 caracteres. |
| Nombre de usuario | Máximo 20 caracteres (HTML) | El nombre no puede tener más de 20 caracteres. |
| Correo | Obligatorio | Este campo es obligatorio |
| Correo | Formato de correo (expresión regular: algo, @, algo, punto, algo) | Introduce una dirección de correo válida |
| Contraseña | Obligatorio (al crear; al editar no se pide) | Este campo es obligatorio |
| Contraseña | Mínimo 8 caracteres | La contraseña tiene que tener mínimo 8 caracteres |
| Contraseña | Al menos una mayúscula | La contraseña tiene que tener una mayúscula al menos |
| Contraseña | Al menos un número | La contraseña debe tener un número al menos |
| Repetir contraseña | Obligatorio (al crear) | Este campo es obligatorio |
| Repetir contraseña | Igual que la contraseña | Las contraseñas no coinciden |
| Fecha de nacimiento | Obligatoria | Este campo es obligatorio |
| Fecha de nacimiento | No puede ser futura | La fecha de nacimiento no puede ser futura. |
| Fecha de nacimiento | Edad mínima 18 años (HTML, "data-edad-minima"). Se exige por las compras y pujas de la app | Debes tener al menos 18 años. |
| Condiciones | Casilla marcada | Debes aceptar las condiciones. |

#### Contacto

| Campo | Regla | Mensaje de error |
| --- | --- | --- |
| Nombre | Obligatorio | Este campo es obligatorio |
| Nombre | Entre 2 y 40 caracteres (HTML) | El nombre debe tener al menos 2 caracteres. / El nombre no puede tener más de 40 caracteres. |
| Correo | Obligatorio y con formato de correo (la misma regla que en el registro) | Este campo es obligatorio / Introduce una dirección de correo válida |
| Teléfono | Opcional. Si se rellena, 9 cifras que empiezan por 6, 7, 8 o 9, con prefijo +34 o 0034 opcional. Se aceptan espacios, puntos y guiones | Introduce un teléfono válido, por ejemplo 612 345 678 |
| Teléfono | Validación entre campos: obligatorio si se marca "Prefiero que me llaméis" | Si prefieres que te llamemos, el teléfono es obligatorio |
| Motivo | Hay que elegir una opción | Elige un motivo |
| Mensaje | Obligatorio | Este campo es obligatorio |
| Mensaje | Entre 20 y 500 caracteres (HTML), con contador | El mensaje debe tener al menos 20 caracteres. / El mensaje no puede tener más de 500 caracteres. |

### Qué falta

- **Cookie del formulario** (punto 11 del enunciado): no está hecha habría que guardar el nombre y el correo del último envío en una cookie con fecha de caducidad y rellenarlos al abrir la página.

### Qué me ha costado más

- **Entender qué pedía la práctica.** Me costó mucho entender bien qué se pedía en cada punto y cómo se relacionaban entre sí las partes (la capa de datos, la validación y los dos formularios).
- **Guardar los datos con localStorage.** No sabía cómo hacerlo. No sabía cómo guardar y leer datos en el navegador ni cómo organizarlos para que siguieran ahí al recargar la página.
- **La estructura de la validación.** Me costó ver cómo montar un solo archivo de validación que sirviera a los dos formularios y que cada formulario tuviera su propio archivo que lo use. Al principio pensaba en un archivo de validación por formulario.