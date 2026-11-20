import { subastas } from "./datos.js";
import { pintarLista, pintarTarjeta } from "./ui.js";

const ID_USUARIO_PERFIL = 1;

const btnGestion = document.getElementById("btnGestion");
const ventanaLista = document.getElementById("ventanaLista");
const listaSubastas = document.getElementById("listaSubastas");
const ventanaTarjeta = document.getElementById("ventanaTarjeta");
const tarjetaSubasta = document.getElementById("tarjetaSubasta");

btnGestion.addEventListener("click", () => {
    const misSubastas = subastas.filter((subasta) => subasta.idVendedor === ID_USUARIO_PERFIL);
    pintarLista(misSubastas, listaSubastas);
    ventanaLista.showModal();
});

listaSubastas.addEventListener("click",(evento) => {
    const fila = evento.target.closest("[data-id]");
    if (fila === null) {
        return;
    }
    const idBuscado = Number(fila.dataset.id);
    const subasta = subastas.find((elemento) => idBuscado === elemento.id);

    pintarTarjeta(subasta, tarjetaSubasta);
    ventanaTarjeta.showModal();
});