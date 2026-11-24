const PREFIJO = "outify_";

function leer(coleccion) {
    try{
        const texto = localStorage.getItem(PREFIJO + coleccion);
        return texto === null ? [] : JSON.parse(texto);
    } catch(error) {
        console.error(`Datos corruptos en "${coleccion}"`, error);
        return[];
    }
}

function guardar(coleccion, datos) {
    localStorage.setItem(PREFIJO + coleccion, JSON.stringify(datos));
}

export function obtenerTodos(coleccion) {
    return leer(coleccion);
}

export function obtenerPorId(coleccion, id) {
    return leer(coleccion).find((elemento) => elemento.id === Number(id)) ?? null;
}

export function crear(coleccion, dato) {
    const datos = leer(coleccion);
    const nuevoId = Math.max(0, ...datos.map((elemento) => elemento.id)) + 1;
    const nuevo = {...dato, id: nuevoId };

    datos.push(nuevo);
    guardar(coleccion, datos);
    return nuevo;
}

export function actualizar(coleccion, id, dato) {
    const datos = leer(coleccion);
    const indice = datos.findIndex((elemento) => elemento.id === Number(id));

    if(indice === -1){
        return null;
    }

    datos[indice] = {...datos[indice], ...dato, id: datos[indice].id };
    guardar(coleccion, datos);
    return datos[indice];
}

export function borrar(coleccion, id) {
    const datos = leer(coleccion);
    const restantes = datos.filter((elemento) => elemento.id !== Number(id));

    if(restantes.length === datos.length) {
        return false;
    }

    guardar(coleccion, restantes);
    return true;
}