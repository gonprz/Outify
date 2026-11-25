import { obtenerTodos, obtenerPorId, crear, borrar } from "./almacen.js";
import { validarNombre, validarEmail, validarTelefono, validarMotivo, validarMensaje } from "./validacion.js";

const COLECCION = "mensajes";

const formularios = document.getElementById("formContacto");
const estadoEnvio = document.getElementById("estadoEnvio");
const contador = document.getElementById("contador-mensaje");
const listaMensajes = document.getElementById("listaMensajes");
const sinMensajes = document.getElementById("sinMensajes");
const dialogoBorrar = document.getElementById("dialogoBorrar");
const textoDialogoBorrar = document.getElementById("textoDialogoBorrar");
const btnConfirmarBorrar = document.getElementById("btnConfirmarBorrar");
const btnCancelarBorrar = document.getElementById("btnCancelarBorrar");

const campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    telefono: document.getElementById("telefono"),
    prefieroLlamada: document.getElementById("prefieroLlamada"),
    motivo: document.getElementById("motivo"),
    mensaje: document.getElementById("mensaje")
};

let idABorrar = null;
const tocados = new Set();

const reglas = {
    nombre: () => validarNombre(
        campos.nombre.value,
        Number(campos.nombre.minLength),
        Number(campos.nombre.maxLength)
    ),

    correo: () => validarEmail(campos.correo.value),

    telefono: () => validarTelefono(campos.telefono.value, campos.prefieroLlamada.checked),

    motivo: () => validarMotivo(campos.motivo.value),

    mensaje: () => validarMensaje(
        campos.mensaje.value,
        Number(campos.mensaje.minLength),
        Number(campos.mensaje.maxLength)
    )
};

function mostrarError(nombreCampo, mensaje) {
    const campo = campos[nombreCampo];
    const zonaError = document.getElementById(`error-${nombreCampo}`);

    zonaError.textContent = mensaje ?? "";
    if (mensaje) {
        campo.setAttribute("aria-invalid", "true");
    } else {
        campo.removeAttribute("aria-invalid");
    }
}

function validarCampo(nombreCampo) {
    const error = reglas[nombreCampo]();
    mostrarError(nombreCampo, error);
    return error;
}

function validarTodo() {
    let primerConError = null;

    Object.keys(reglas).forEach((nombreCampo) => {
        const error = validarCampo(nombreCampo);
        if (error && primerConError === null) {
            primerConError = campos[nombreCampo];
        }
    });
    return primerConError;
}

Object.keys(reglas).forEach((nombreCampo) => {
    const campo = campos[nombreCampo];

    campo.addEventListener("blur", () => {
        tocados.add(nombreCampo);
        validarCampo(nombreCampo);
    });

    campo.addEventListener("input", () => {
        if (tocados.has(nombreCampo)) {
            validarCampo(nombreCampo);
        }
    });
});

campos.prefieroLlamada.addEventListener("change", () => {
    if (tocados.has("telefono")) {
        validarCampo("telefono");
    }
});

function actualizarContador() {
    const longitud = campos.mensaje.value.length;
    const maximo = campos.mensaje.maxLength;
    const minimo = campos.mensaje.minLength;

    contador.textContent = `${longitud} / ${maximo} caracteres (el mínimo es ${minimo})`;
}

campos.mensaje.addEventListener("input", actualizarContador);

function limpiarFormulario() {
    formularios.reset();
    tocados.clear();
    Object.keys(reglas).forEach((nombreCampo) => mostrarError(nombreCampo, null));
    actualizarContador();
}

formularios.addEventListener("submit", (evento) => {
    evento.preventDefault();
    estadoEnvio.textContent = "";

    Object.keys(reglas).forEach((nombreCampo) => tocados.add(nombreCampo));

    const primerConError = validarTodo();
    if (primerConError) {
        primerConError.focus();
        return;
    }

    const mensaje = {
        nombre: campos.nombre.value.trim(),
        correo: campos.correo.value.trim(),
        telefono: campos.telefono.value.trim(),
        prefieroLlamada: campos.prefieroLlamada.checked,
        motivo: campos.motivo.value,
        mensaje: campos.mensaje.value.trim(),
        fecha: new Date().toISOString()
    };

    crear(COLECCION, mensaje);

    limpiarFormulario();
    pintarMensaje();
    estadoEnvio.textContent = "Mensaje enviado, ya le responderemos";
});

function textoMotivo(valor) {
    const opcion = campos.motivo.querySelector(`option[value="${valor}"]`);
    return opcion ? opcion.textContent : valor;
}

function pintarMensaje() {
    const mensajes = obtenerTodos(COLECCION);

    listaMensajes.replaceChildren();
    sinMensajes.hidden = mensajes.length > 0;

    [...mensajes].reverse().forEach((mensaje) => {
        const fila = document.createElement("li");
        fila.className = "filaSubasta";

        const info = document.createElement("div");
        info.className = "filaInfo";

        const motivo = document.createElement("p");
        motivo.className = "filaNombre";
        motivo.textContent = textoMotivo(mensaje.motivo);

        const texto = document.createElement("p");
        texto.textContent = mensaje.mensaje;

        const fecha = new Date(mensaje.fecha).toLocaleString("es-ES", {
            dateStyle: "short", timeStyle: "short"
        });

        const datos = document.createElement("p");
        datos.className = "ayudaCampo";
        datos.textContent = `${mensaje.nombre} - ${mensaje.correo} - ${fecha}`;

        info.append(motivo, texto, datos);

        if (mensaje.prefieroLlamada) {
            const llamada = document.createElement("p");
            llamada.className = "ayudaCampo";
            llamada.textContent = "Prefiere que le llamen";
            info.append(llamada);
        }

        const acciones = document.createElement("div");
        acciones.className = "filaAcciones";

        const btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.className = "btnPeligro";
        btnBorrar.textContent = "Borrar";
        btnBorrar.dataset.accion = "borrar";
        btnBorrar.dataset.id = mensaje.id;

        acciones.append(btnBorrar);
        fila.append(info, acciones);
        listaMensajes.append(fila);
    });
}

listaMensajes.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion]");
    if (boton === null) {
        return;
    }

    const id = Number(boton.dataset.id);
    if (obtenerPorId(COLECCION, id) === null) {
        return;
    }

    if (boton.dataset.accion === "borrar") {
        idABorrar = id;
        textoDialogoBorrar.textContent = "¿Seguro que quieres borrar este mensaje?";
        dialogoBorrar.showModal();
    }
});

btnConfirmarBorrar.addEventListener("click", () => {
    if (idABorrar !== null) {
        borrar(COLECCION, idABorrar);
        idABorrar = null;
    }
    dialogoBorrar.close();
    pintarMensaje();
});

btnCancelarBorrar.addEventListener("click", () => {
    idABorrar = null;
    dialogoBorrar.close();
});

actualizarContador();
pintarMensaje();