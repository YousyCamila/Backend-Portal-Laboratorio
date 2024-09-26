const ordenLogic = require('../logic/ordenLogic');
const Order = require('../models/ordenModels'); // Asegúrate de tener el modelo Order

// Crear una nueva orden
const crearOrden = async (req, res) => {
    try {
        const pacienteId = req.userId; // Obtén el ID del paciente desde el token
        const orden = await ordenLogic.crearOrden(req.body, pacienteId);
        res.status(201).json(orden);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la orden', error: error.message });
    }
};

// Obtener todas las órdenes de un paciente con paginación, filtros y orden
const obtenerOrdenes = async (req, res) => {
    const pacienteId = req.userId; // Obtén el ID del paciente desde el token
    const { page = 1, sort = 'desc', orderNumber, fromDate, toDate } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Filtro para búsqueda por número de orden o rango de fechas
    const query = { pacienteId };
    if (orderNumber) query.orderNumber = orderNumber;
    if (fromDate && toDate) query.date = { $gte: fromDate, $lte: toDate };

    try {
        const ordenes = await Order.find(query)
            .sort({ date: sort === 'asc' ? 1 : -1 })
            .limit(limit)
            .skip(skip);
        const totalOrdenes = await Order.countDocuments(query);

        res.status(200).json({ ordenes, totalPages: Math.ceil(totalOrdenes / limit) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las órdenes', error: error.message });
    }
};

// Obtener una orden por ID
const obtenerOrdenPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const orden = await ordenLogic.obtenerOrdenPorId(id);
        res.status(200).json(orden);
    } catch (error) {
        console.error(error);
        res.status(404).json({ mensaje: 'Orden no encontrada', error: error.message });
    }
};

// Actualizar una orden por ID
const actualizarOrden = async (req, res) => {
    const { id } = req.params;

    try {
        const orden = await ordenLogic.actualizarOrden(id, req.body);
        res.status(200).json(orden);
    } catch (error) {
        console.error(error);
        res.status(404).json({ mensaje: 'Error al actualizar la orden', error: error.message });
    }
};

// Desactivar una orden por ID
const desactivarOrden = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await ordenLogic.desactivarOrden(id);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(404).json({ mensaje: 'Error al desactivar la orden', error: error.message });
    }
};

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenPorId,
    actualizarOrden,
    desactivarOrden,
};
