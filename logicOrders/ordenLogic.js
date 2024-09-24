const Order = require('../modelsOrder/ordenModels'); 
const Paciente = require('../modelsPersona/pacienteModels'); 
const Grupo = require('../modelsOrder/grupoModels'); 

// Crear una nueva orden
async function crearOrden(body) {
    const paciente = await Paciente.findById(body.paciente);
    
    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }

    const ordenExistente = await Order.findOne({ numeroOrden: body.numeroOrden });

    if (ordenExistente) {
        throw new Error('Ya existe una orden con ese número.');
    }

    const nuevaOrden = new Order(body);
    return await nuevaOrden.save();
}

// Obtener todas las órdenes
async function obtenerOrdenes() {
    return await Order.find().populate('paciente').populate('grupos');
}

// Obtener una orden por número de orden
async function obtenerOrdenPorNumero(numeroOrden) {
    const orden = await Order.findOne({ numeroOrden })
        .populate('paciente')
        .populate('grupos');

    if (!orden) {
        throw new Error('Orden no encontrada');
    }
    return orden;
}

// Actualizar una orden por número de orden
async function actualizarOrden(numeroOrden, body) {
    const orden = await Order.findOneAndUpdate({ numeroOrden }, body, { new: true })
        .populate('paciente')
        .populate('grupos');

    if (!orden) {
        throw new Error('Orden no encontrada');
    }
    return orden;
}


module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenPorNumero,
    actualizarOrden,
};
