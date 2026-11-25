export function validarObligatorio(valor) {
    return valor.trim() === "" ? "Este campo es obligatorio" : null;
}

export function validarNombre(valor, min, max) {
    const errorObligatorio = validarObligatorio(valor);
    if (errorObligatorio){
        return errorObligatorio;
    }

    const limpio = valor.trim();
    if (min > 0 && limpio.length < min) {
        return `El nombre debe tener al menos ${min} caracteres.`;
    }

    if (max > 0 && limpio.length > max) {
        return `El nombre no puede tener más de ${max} caracteres.`;
    }
    return null;
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarEmail(valor) {
    const errorObligatorio = validarObligatorio(valor);
    if(errorObligatorio){
        return errorObligatorio;
    }

    if(!REGEX_EMAIL.test(valor.trim())) {
        return "Introduce una dirección de correo valida anda";
    }

    return null;
}

export function validarPassword(valor) {
    const errorObligatorio = validarObligatorio(valor);
    if(errorObligatorio) {
        return errorObligatorio;
    }

    if(valor.length < 8) {
        return "La contraseña tiene que tener mínimo 8 caracteres"
    }

    if(!/[A-Z]/.test(valor)){
        return "La contraseña tiene que tener una mayúscula al menos"
    }

    if(!/[0-9]/.test(valor)){
        return "La contraseña debe tenr un número al menos"
    }
    return null;
}

export function validarRepetirPassword(valor, password){
    const errorObligatorio = validarObligatorio(valor);
    if(errorObligatorio) {
        return errorObligatorio;
    }

    if (valor !== password) {
        return "Las contraseñas no coinciden";
    }
    return null;
}

export function validarFechaDeNacimiento(valor, edadMinima) {
    const errorObligatorio = validarObligatorio(valor);
    if (errorObligatorio) {
        return errorObligatorio;
    }

    const [anio, mes, dia] = valor.split("-").map(Number);
    const nacimiento = new Date(anio, mes - 1, dia);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (nacimiento > hoy) {
        return "La fecha de nacimiento no puede ser futura.";
    }

    const limite = new Date(hoy.getFullYear() - edadMinima, hoy.getMonth(), hoy.getDate());
    if (nacimiento > limite) {
        return `Debes tener al menos 18 años.`;
    }
    return null;
}

export function validarCondiciones(marcada) {
    return marcada ? null : "Debes aceptar las condiciones.";
}

const REGEX_TELEFONO = /^(\+34|0034)?[6-9]\d{8}$/;

export function validarTelefono(valor, obligatorio = false) {
    const limpio = valor.replace(/[\s.\-()]/g, "");

    if (limpio === "") {
        return obligatorio ? "Si prefieres que te llamemos, el teléfono es obligatorio" : null;
    }

    if (!REGEX_TELEFONO.test(limpio)) {
        return "Introduce un teléfono válido";
    }
    return null;
}

export function validarMotivo(valor) {
    return valor === "" ? "Elige un motivo" : null;
}

export function validarMensaje(valor, min, max) {
    const errorObligatorio = validarObligatorio(valor);
    if (errorObligatorio) {
      return errorObligatorio      
    }

    const limpio = valor.trim();
    if (min > 0 && limpio.length < min) {
        return "El mensaje es demasiado corto";
    }

    if (max > 0 && limpio.length > max) {
        return "El mensaje es demasiado largo";
    }

    return null;
}