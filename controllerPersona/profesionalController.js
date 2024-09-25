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
        tipoIdentificacion: body.tipoIdentificacion,
        numeroIdentificacion: body.numeroIdentificacion,
        apellido1: body.apellido1,
        apellido2: body.apellido2,
        nombre1: body.nombre1,
        nombre2: body.nombre2,
        sexoBiologico: body.sexoBiologico,
        direccion: body.direccion,
        telefonoMovil: body.telefonoMovil,
        email: body.email,
        especialidad: body.especialidad,
        fechaNacimiento: body.fechaNacimiento,
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
const desactivarProfesional = async (req, res) => {
    const { email } = req.params;

    try {
        const result = await logic.desactivarProfesional(email);
        res.json({ message: 'Profesional desactivado exitosamente', result });
    } catch (err) {
        if (err.message === 'Profesional no encontrado') {
            return res.status(404).json({ error: 'Profesional no encontrado' });
        }
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarProfesionales,
    crearProfesional,
    obtenerProfesionalPorEmail,
    actualizarProfesional,
    desactivarProfesional,
};
