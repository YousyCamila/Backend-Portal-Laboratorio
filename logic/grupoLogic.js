// logicOrders/grupoLogic.js
const Grupo = require('../models/grupoModels');

// Crear un nuevo grupo
async function crearGrupo(body) {
    const grupoExistente = await Grupo.findOne({ nombre: body.nombre });

    if (grupoExistente) {
        throw new Error('El grupo ya existe con ese nombre.');
    }

    const grupo = new Grupo(body);
    return await grupo.save();
}

// Obtener todos los grupos
async function obtenerGrupos() {
    return await Grupo.find();
}

// Obtener un grupo por nombre
async function obtenerGrupoPorNombre(nombre) {
    const grupo = await Grupo.findOne({ nombre });

    if (!grupo) {
        throw new Error('Grupo no encontrado');
    }
    return grupo;
}

// Actualizar un grupo por nombre
async function actualizarGrupo(nombre, body) {
    const grupo = await Grupo.findOneAndUpdate({ nombre }, body, { new: true });

    if (!grupo) {
        throw new Error('Grupo no encontrado');
    }
    return grupo;
}
// Desactivar un grupo por nombre
async function desactivarGrupo(nombre) {
    const grupo = await Grupo.findOneAndUpdate(
        { nombre },
        { activo: false }, // Actualiza el campo 'activo'
        { new: true }
    );

    if (!grupo) {
        throw new Error('Grupo no encontrado');
    }
    return { message: 'Grupo desactivado', grupo };
}

module.exports = {
    crearGrupo,
    obtenerGrupos,
    obtenerGrupoPorNombre,
    actualizarGrupo,
    desactivarGrupo,
};
