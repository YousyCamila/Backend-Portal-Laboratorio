const logic = require('../logicOrders/resultadoLogic'); // Asegúrate de que la ruta sea correcta
const { resultadoSchemaValidation } = require('../validationsOrders/resultadoValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todos los resultados
const listarResultados = async (req, res) => {
    try {
        const resultados = await logic.obtenerResultados();
        if (resultados.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(resultados);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo resultado
const crearResultado = async (req, res) => {
    const body = req.body;
    const { error, value } = resultadoSchemaValidation.validate({
        prueba: body.prueba,
        // Añade otros campos necesarios para validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoResultado = await logic.crearResultado(value);
        res.status(201).json(nuevoResultado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un resultado por nombre de prueba
const obtenerResultadoPorPrueba = async (req, res) => {
    const { prueba } = req.params;
    try {
        const resultado = await logic.obtenerResultadoPorPrueba(prueba);
        res.json(resultado);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para actualizar un resultado por nombre de prueba
const actualizarResultado = async (req, res) => {
    const { prueba } = req.params;
    const body = req.body;
    const { error, value } = resultadoSchemaValidation.validate({
        prueba: body.prueba,
        // Añade otros campos que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const resultadoActualizado = await logic.actualizarResultado(prueba, value);
        res.json(resultadoActualizado);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para eliminar un resultado por nombre de prueba
const eliminarResultado = async (req, res) => {
    const { prueba } = req.params;
    try {
        const result = await logic.eliminarResultado(prueba);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarResultados,
    crearResultado,
    obtenerResultadoPorPrueba,
    actualizarResultado,
    eliminarResultado,
};
