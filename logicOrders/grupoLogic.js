const Grupo = require('../modelsOrder/grupoModels'); 

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

// Eliminar un grupo por nombre
async function eliminarGrupo(nombre) {
    const grupo = await Grupo.findOneAndDelete({ nombre });

    if (!grupo) {
        throw new Error('Grupo no encontrado');
    }
    return { message: 'Grupo eliminado' };
}

module.exports = {
    crearGrupo,
    obtenerGrupos,
    obtenerGrupoPorNombre,
    actualizarGrupo,
    eliminarGrupo,
};