import { obtenerTodos, obtenerPorId, crear, actualizar, borrar } from "./almacen.js";
import { validarNombre, validarEmail, validarPassword, validarRepetirPassword, validarFechaDeNacimiento, validarCondiciones } from "./validacion.js";

const COLECCION = "usuarios";

const formulario = document.getElementById("formRegistro");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");
const listaUsuarios = document.getElementById("listaUsuarios");
const sinUsuarios = document.getElementById("sinUsuarios");
const dialogoBorrar = document.getElementById("dialogoBorrar");
const textoDialogoBorrar = document.getElementById("textoDialogoBorrar");
const btnConfirmarBorrar = document.getElementById("btnConfirmarBorrar");
const btnCancelarBorrar = document.getElementById("btnCancelarBorrar");

const campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    password: document.getElementById("password"),
    repetirPassword: document.getElementById("repetirPassword"),
    fechaNacimiento: document.getElementById("fechaNacimiento"),
    condiciones: document.getElementById("condiciones")
};

let idEditando = null;
let idABorrar = null;

const camposTocados = new Set();

const reglas = {
    nombre: () => validarNombre(
        campos.nombre.value,
        Number(campos.nombre.minLength),
        Number(campos.nombre.maxLength)
    ),
    correo: () => validarEmail(campos.correo.value),
    password: () => idEditando !== null ? null : validarPassword(campos.password.value),
    repetirPassword: () => idEditando !== null ? null : validarRepetirPassword(campos.repetirPassword.value, campos.password.value),
    fechaNacimiento: () => validarFechaDeNacimiento(
        campos.fechaNacimiento.value,
        Number(campos.fechaNacimiento.dataset.edadMinima)
    ),
    condiciones: () => validarCondiciones(campos.condiciones.checked)
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

Object.keys(campos).forEach((nombreCampo) => {
    const campo = campos[nombreCampo];

    campo.addEventListener("blur", () => {
        camposTocados.add(nombreCampo);
        validarCampo(nombreCampo);
    });

    const evento = campo.type === "checkbox" ? "change" : "input";
    campo.addEventListener(evento, () => {
        if (camposTocados.has(nombreCampo)) {
            validarCampo(nombreCampo);
        }
        if (nombreCampo === "password" && camposTocados.has("repetirPassword")) {
            validarCampo("repetirPassword");
        }
    });
});

function mostrarCamposPassword(visible) {
    campos.password.closest(".campo").hidden = !visible;
    campos.repetirPassword.closest(".campo").hidden = !visible;
}

function limpiarFormulario() {
    formulario.reset();
    camposTocados.clear();
    Object.keys(campos).forEach((nombreCampo) => mostrarError(nombreCampo, null));
}

function entrarModoCrear() {
    idEditando = null;
    limpiarFormulario();
    mostrarCamposPassword(true);
    tituloFormulario.textContent = "Crear cuenta";
    btnGuardar.textContent = "Registrarme";
    btnCancelar.hidden = true;
}

function entrarModoEditar(usuario) {
    idEditando = usuario.id;
    limpiarFormulario();

    campos.nombre.value = usuario.nombre;
    campos.correo.value = usuario.correo;
    campos.fechaNacimiento.value = usuario.fechaNacimiento;
    campos.condiciones.checked = usuario.condiciones;

    mostrarCamposPassword(false);
    tituloFormulario.textContent = "Editar usuario";
    btnGuardar.textContent = "Guardar cambios";
    btnCancelar.hidden = false;

    formulario.scrollIntoView({ behavior: "smooth" });
    campos.nombre.focus();
}

btnCancelar.addEventListener("click", entrarModoCrear);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    Object.keys(campos).forEach((nombreCampo) => camposTocados.add(nombreCampo));

    const primerConError = validarTodo();
    if (primerConError) {
        primerConError.focus();
        return;
    }

    const usuario = {
        nombre: campos.nombre.value.trim(),
        correo: campos.correo.value.trim(),
        fechaNacimiento: campos.fechaNacimiento.value,
        condiciones: campos.condiciones.checked
    };

    if (idEditando === null) {
        crear(COLECCION, usuario);
    } else {
        actualizar(COLECCION, idEditando, usuario);
    }

    entrarModoCrear();
    pintarUsuarios();
});

function crearBoton(texto, accion, id, clase) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.className = clase;
    boton.dataset.accion = accion;
    boton.dataset.id = id;
    return boton;
}

function pintarUsuarios() {
    const usuarios = obtenerTodos(COLECCION);

    listaUsuarios.replaceChildren();
    sinUsuarios.hidden = usuarios.length > 0;

    usuarios.forEach((usuario) => {
        const fila = document.createElement("li");
        fila.className = "filaSubasta";

        const info = document.createElement("div");
        info.className = "filaInfo";

        const nombre = document.createElement("p");
        nombre.className = "filaNombre";
        nombre.textContent = usuario.nombre;

        const correo = document.createElement("p");
        correo.textContent = usuario.correo;

        info.append(nombre, correo);

        const acciones = document.createElement("div");
        acciones.className = "filaAcciones";
        acciones.append(
            crearBoton("Editar", "editar", usuario.id, "btnSecundario"),
            crearBoton("Borrar", "borrar", usuario.id, "btnPeligro")
        );

        fila.append(info, acciones);
        listaUsuarios.append(fila);
    });
}

listaUsuarios.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion]");
    if (boton === null) {
        return;
    }

    const id = Number(boton.dataset.id);
    const usuario = obtenerPorId(COLECCION, id);
    if (usuario === null) {
        return;
    }

    if (boton.dataset.accion === "editar") {
        entrarModoEditar(usuario);
    } else if (boton.dataset.accion === "borrar") {
        idABorrar = id;
        textoDialogoBorrar.textContent = `¿Seguro que quieres borrar a ${usuario.nombre}?`;
        dialogoBorrar.showModal();
    }
});

btnConfirmarBorrar.addEventListener("click", () => {
    if (idABorrar !== null) {
        borrar(COLECCION, idABorrar);

        if (idEditando === idABorrar) {
            entrarModoCrear();
        }
        idABorrar = null;
    }
    dialogoBorrar.close();
    pintarUsuarios();
});

btnCancelarBorrar.addEventListener("click", () => {
    idABorrar = null;
    dialogoBorrar.close();
});

pintarUsuarios();