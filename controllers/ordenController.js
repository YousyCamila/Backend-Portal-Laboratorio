// controllers/ordenController.js
const ordenLogic = require('../logic/ordenLogic');

// Crear una nueva orden
const crearOrden = async (req, res) => {
    try {
        const orden = await ordenLogic.crearOrden(req.body);
        res.status(201).json(orden);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la orden', error: error.message });
    }
};

// Obtener todas las órdenes
const obtenerOrdenes = async (req, res) => {
    try {
        const ordenes = await ordenLogic.obtenerOrdenes();
        res.status(200).json(ordenes);
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
        res.status(404).json({ mensaje: error.message });
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
        res.status(404).json({ mensaje: error.message });
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
        res.status(404).json({ mensaje: error.message });
    }
};

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenPorId,
    actualizarOrden,
    desactivarOrden,
};
