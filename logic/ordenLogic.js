// logicOrders/ordenLogic.js
const Orden = require('../models/ordenModels'); // Asegúrate de que la ruta es correcta

// Crear una nueva orden
async function crearOrden(body, pacienteId) {
    const orden = new Orden({
        ...body,
        paciente: pacienteId, // Asigna el ID del paciente a la orden
    });
    return await orden.save();
}

// Obtener todas las órdenes de un paciente específico
async function obtenerOrdenesPorPaciente(pacienteId) {
    return await Orden.find({ paciente: pacienteId });
}

// Obtener una orden por ID
async function obtenerOrdenPorId(id) {
    const orden = await Orden.findById(id);

    if (!orden) {
        throw new Error('Orden no encontrada');
    }
    return orden;
}

// Actualizar una orden por ID
async function actualizarOrden(id, body) {
    const orden = await Orden.findByIdAndUpdate(id, body, { new: true });

    if (!orden) {
        throw new Error('Orden no encontrada');
    }
    return orden;
}

// Desactivar una orden por ID
async function desactivarOrden(id) {
    const orden = await Orden.findById(id);

    if (!orden) {
        throw new Error('Orden no encontrada');
    }

    // Cambia el estado de la orden a desactivada
    orden.activo = false; // Asegúrate de que este campo existe
    await orden.save();

    return { message: 'Orden desactivada', orden };
}

module.exports = {
    crearOrden,
    obtenerOrdenesPorPaciente,
    obtenerOrdenPorId,
    actualizarOrden,
    desactivarOrden,
};
