const logic = require('../logicPersona/profesionalLogic'); // Asegúrate de que la ruta sea correcta
const { profesionalSchemaValidation } = require('../validationsPersona/profesionalValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todos los profesionales
const listarProfesionales = async (req, res) => {
    try {
        const profesionales = await logic.obtenerProfesionales();
        if (profesionales.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(profesionales);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo profesional
const crearProfesional = async (req, res) => {
    const body = req.body;
    const { error, value } = profesionalSchemaValidation.validate({
        email: body.email,
        // Añade otros campos necesarios para validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoProfesional = await logic.crearProfesional(value);
        res.status(201).json(nuevoProfesional);
    } catch (err) {
        if (err.message === 'El profesional ya existe con ese email.') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un profesional por email
const obtenerProfesionalPorEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const profesional = await logic.obtenerProfesionalPorEmail(email);
        res.json(profesional);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para actualizar un profesional por email
const actualizarProfesional = async (req, res) => {
    const { email } = req.params;
    const body = req.body;
    const { error, value } = profesionalSchemaValidation.validate({
        email: body.email,
        // Añade otros campos que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const profesionalActualizado = await logic.actualizarProfesional(email, value);
        res.json(profesionalActualizado);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para eliminar un profesional por email
const eliminarProfesional = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await logic.eliminarProfesional(email);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarProfesionales,
    crearProfesional,
    obtenerProfesionalPorEmail,
    actualizarProfesional,
    eliminarProfesional,
};