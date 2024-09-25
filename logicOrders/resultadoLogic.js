const Result = require('../modelsOrder/resultadoModels');

// Crear un nuevo resultado de prueba
async function crearResultado(body) {
    const nuevoResultado = new Result(body);
    return await nuevoResultado.save();
}

// Obtener todos los resultados
async function obtenerResultados() {
    return await Result.find();
}

// Obtener un resultado por nombre de prueba
async function obtenerResultadoPorPrueba(prueba) {
    const resultado = await Result.findOne({ prueba });

    if (!resultado) {
        throw new Error('Resultado no encontrado');
    }
    return resultado;
}

// Actualizar un resultado por nombre de prueba
async function actualizarResultado(prueba, body) {
    const resultado = await Result.findOneAndUpdate({ prueba }, body, { new: true });

    if (!resultado) {
        throw new Error('Resultado no encontrado');
    }
    return resultado;
}

// Eliminar un resultado por nombre de prueba
async function eliminarResultado(prueba) {
    const resultado = await Result.findOneAndDelete({ prueba });

    if (!resultado) {
        throw new Error('Resultado no encontrado');
    }
    return { message: 'Resultado eliminado' };
}

module.exports = {
    crearResultado,
    obtenerResultados,
    obtenerResultadoPorPrueba,
    actualizarResultado,
    eliminarResultado,
};
