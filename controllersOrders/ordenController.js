// controllersOrders/ordenController.js
const logic = require('../logicOrders/ordenLogic');

const crearOrden = async (req, res) => {
    try {
        const orden = await logic.crearOrden(req.body);
        res.status(201).json(orden);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const listarOrdenes = async (req, res) => {
    try {
        const ordenes = await logic.obtenerOrdenes();
        res.json(ordenes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const obtenerOrdenPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await logic.obtenerOrdenPorId(id);
        res.json(orden);
    } catch (err) {
        res.status(404).json({ error: 'Orden no encontrada' });
    }
};

const actualizarOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await logic.actualizarOrden(id, req.body);
        res.json(orden);
    } catch (err) {
        res.status(404).json({ error: 'Orden no encontrada' });
    }
};

const eliminarOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await logic.eliminarOrden(id);
        res.json(orden);
    } catch (err) {
        res.status(404).json({ error: 'Orden no encontrada' });
    }
};

module.exports = {
    crearOrden,
    listarOrdenes,
    obtenerOrdenPorId,
    actualizarOrden,
    eliminarOrden,
};
