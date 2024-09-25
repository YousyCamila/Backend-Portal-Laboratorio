// logicOrders/ordenLogic.js
const Orden = require('../models/ordenModels');

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

// Desactivar un grupo por nombre
async function desactivarOrden(id) {
    const orden = await Orden.findById(id);

    if (!orden) {
        throw new Error('Orden no encontrada');
    }

    // Cambia el estado de la orden a desactivada
    orden.estado = 'desactivada'; // Asegúrate de tener un campo para el estado
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
