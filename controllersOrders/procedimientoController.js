const logic = require('../logicOrders/procedimientoLogic'); // Asegúrate de que la ruta sea correcta
const { procedimientoSchemaValidation } = require('../validationsOrders/procedimientoValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todos los procedimientos
const listarProcedimientos = async (req, res) => {
    try {
        const procedimientos = await logic.obtenerProcedimientos();
        if (procedimientos.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(procedimientos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo procedimiento
const crearProcedimiento = async (req, res) => {
    const body = req.body;
    const { error, value } = procedimientoSchemaValidation.validate({
        nombre: body.nombre,
        // Añade otros campos necesarios para validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoProcedimiento = await logic.crearProcedimiento(value);
        res.status(201).json(nuevoProcedimiento);
    } catch (err) {
        if (err.message === 'El procedimiento ya existe con ese nombre.') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un procedimiento por nombre
const obtenerProcedimientoPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const procedimiento = await logic.obtenerProcedimientoPorNombre(nombre);
        res.json(procedimiento);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para actualizar un procedimiento por nombre
const actualizarProcedimiento = async (req, res) => {
    const { nombre } = req.params;
    const body = req.body;
    const { error, value } = procedimientoSchemaValidation.validate({
        nombre: body.nombre,
        // Añade otros campos que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const procedimientoActualizado = await logic.actualizarProcedimiento(nombre, value);
        res.json(procedimientoActualizado);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para eliminar un procedimiento por nombre
const eliminarProcedimiento = async (req, res) => {
    const { nombre } = req.params;
    try {
        const result = await logic.eliminarProcedimiento(nombre);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarProcedimientos,
    crearProcedimiento,
    obtenerProcedimientoPorNombre,
    actualizarProcedimiento,
    eliminarProcedimiento,
};
