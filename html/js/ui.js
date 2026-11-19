// Funciones para pintar la lista y las tarjetas

export function pintarLista(subastas, contenedor) {
    contenedor.replaceChildren();

    subastas.forEach((subasta) => {
        const li = document.createElement("li");
        li.dataset.id = subasta.id;
        li.textContent = subasta.nombre;
        contenedor.appendChild(li);
    });
}

export function pintarTarjeta(subasta, contenedor) {
    contenedor.replaceChildren();

    const h3 = document.createElement("h3");
    const descripcion = document.createElement("p");
    const puja = document.createElement("p");

    h3.textContent = subasta.nombre;
    descripcion.textContent = subasta.descripcion;
    puja.textContent = `${subasta.pujaActual}€`;

    contenedor.appendChild(h3);
    contenedor.appendChild(descripcion);
    contenedor.appendChild(puja);
};
