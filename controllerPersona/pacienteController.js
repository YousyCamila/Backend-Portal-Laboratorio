const logic = require('../logicPersona/pacienteLogic'); // Asegúrate de que la ruta sea correcta
const { pacienteSchemaValidation } = require('../validationsPersona/pacienteValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todos los pacientes
const listarPacientes = async (req, res) => {
    try {
        const pacientes = await logic.obtenerPacientes();
        if (pacientes.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(pacientes);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo paciente
const crearPaciente = async (req, res) => {
    const body = req.body;
    const { error, value } = pacienteSchemaValidation.validate({
        email: body.email,
        // Añade otros campos necesarios para validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoPaciente = await logic.crearPaciente(value);
        res.status(201).json(nuevoPaciente);
    } catch (err) {
        if (err.message === 'El paciente ya existe con ese email.') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un paciente por email
const obtenerPacientePorEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const paciente = await logic.obtenerPacientePorEmail(email);
        res.json(paciente);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para actualizar un paciente por email
const actualizarPaciente = async (req, res) => {
    const { email } = req.params;
    const body = req.body;
    const { error, value } = pacienteSchemaValidation.validate({
        email: body.email,
        // Añade otros campos que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const pacienteActualizado = await logic.actualizarPaciente(email, value);
        res.json(pacienteActualizado);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para eliminar un paciente por email
const eliminarPaciente = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await logic.eliminarPaciente(email);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarPacientes,
    crearPaciente,
    obtenerPacientePorEmail,
    actualizarPaciente,
    eliminarPaciente,
};
