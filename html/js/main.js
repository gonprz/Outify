import { subastas } from "./datos.js";
import { pintarLista, pintarTarjeta } from "./ui.js";

const ID_USUARIO_PERFIL = 1;

const btnGestion = document.getElementById("btnGestion");
const ventanaLista = document.getElementById("ventanaLista");
const listaSubastas = document.getElementById("listaSubastas");

btnGestion.addEventListener("click", () => {
    const misSubastas = subastas.filter((subasta) => subasta.idVendedor === ID_USUARIO_PERFIL);
    pintarLista(misSubastas, listaSubastas);
    ventanaLista.showModal();
});