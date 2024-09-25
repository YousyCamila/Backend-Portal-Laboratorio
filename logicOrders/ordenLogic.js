// logicOrders/ordenLogic.js
const Orden = require('../modelsOrder/ordenModels');

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

// Eliminar una orden por ID
async function eliminarOrden(id) {
    const orden = await Orden.findByIdAndDelete(id);

    if (!orden) {
        throw new Error('Orden no encontrada');
    }
    return { message: 'Orden eliminada' };
}

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenPorId,
    actualizarOrden,
    eliminarOrden,
};
