// logicOrders/ordenLogic.js
const Orden = require('../models/ordenModels'); // Asegúrate de que la ruta es correcta

// Crear una nueva orden
async function crearOrden(body) {
    const orden = new Orden(body);
    return await orden.save();
}

// Obtener todas las órdenes
async function obtenerOrdenes() {
    return await Orden.find();
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
    obtenerOrdenes,
    obtenerOrdenPorId,
    actualizarOrden,
    desactivarOrden,
};