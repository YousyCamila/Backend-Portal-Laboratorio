const logic = require('../logicOrders/ordenLogic'); // Asegúrate de que la ruta sea correcta
const { ordenSchemaValidation } = require('../validationsOrders/ordenValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todas las órdenes
const listarOrdenes = async (req, res) => {
    try {
        const ordenes = await logic.obtenerOrdenes();
        if (ordenes.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(ordenes);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una nueva orden
const crearOrden = async (req, res) => {
    const body = req.body;
    const { error, value } = ordenSchemaValidation.validate({
        numeroOrden: body.numeroOrden,
        paciente: body.paciente,
        grupos: body.grupos, // Añade otros campos necesarios para validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaOrden = await logic.crearOrden(value);
        res.status(201).json(nuevaOrden);
    } catch (err) {
        if (err.message === 'Paciente no encontrado' || err.message === 'Ya existe una orden con ese número.') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una orden por número de orden
const obtenerOrdenPorNumero = async (req, res) => {
    const { numeroOrden } = req.params;
    try {
        const orden = await logic.obtenerOrdenPorNumero(numeroOrden);
        res.json(orden);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para actualizar una orden por número de orden
const actualizarOrden = async (req, res) => {
    const { numeroOrden } = req.params;
    const body = req.body;
    const { error, value } = ordenSchemaValidation.validate({
        // Añade los campos que necesites validar
        numeroOrden: body.numeroOrden,
        paciente: body.paciente,
        grupos: body.grupos,
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const ordenActualizada = await logic.actualizarOrden(numeroOrden, value);
        res.json(ordenActualizada);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarOrdenes,
    crearOrden,
    obtenerOrdenPorNumero,
    actualizarOrden,
};
