const Procedimiento = require('../modelsOrder/procedimientoModels'); // Asegúrate de importar correctamente el modelo

// Crear un nuevo procedimiento
async function crearProcedimiento(body) {
    const procedimientoExistente = await Procedimiento.findOne({ nombre: body.nombre });

    if (procedimientoExistente) {
        throw new Error('El procedimiento ya existe con ese nombre.');
    }

    const nuevoProcedimiento = new Procedimiento(body);
    return await nuevoProcedimiento.save();
}

// Obtener todos los procedimientos
async function obtenerProcedimientos() {
    return await Procedimiento.find();
}

// Obtener un procedimiento por nombre
async function obtenerProcedimientoPorNombre(nombre) {
    const procedimiento = await Procedimiento.findOne({ nombre });

    if (!procedimiento) {
        throw new Error('Procedimiento no encontrado');
    }
    return procedimiento;
}

// Actualizar un procedimiento por nombre
async function actualizarProcedimiento(nombre, body) {
    const procedimiento = await Procedimiento.findOneAndUpdate({ nombre }, body, { new: true });

    if (!procedimiento) {
        throw new Error('Procedimiento no encontrado');
    }
    return procedimiento;
}

// Eliminar un procedimiento por nombre
async function eliminarProcedimiento(nombre) {
    const procedimiento = await Procedimiento.findOneAndDelete({ nombre });

    if (!procedimiento) {
        throw new Error('Procedimiento no encontrado');
    }
    return { message: 'Procedimiento eliminado' };
}

module.exports = {
    crearProcedimiento,
    obtenerProcedimientos,
    obtenerProcedimientoPorNombre,
    actualizarProcedimiento,
    eliminarProcedimiento,
};
