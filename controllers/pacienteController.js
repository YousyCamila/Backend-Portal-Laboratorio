const logic = require('../logic/pacienteLogic'); // Asegúrate de que la ruta sea correcta
const { pacienteSchemaValidation } = require('../validations/pacienteValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todos los pacientes
const listarPaciente = async (req, res) => {
    try {
        const pacientes = await logic.obtenerPaciente();
        if (pacientes.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(pacientes);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearPaciente = async (req, res) => {
    
    const body = req.body;

    // Validar todos los campos necesarios para el esquema de Persona
    const { error, value } = pacienteSchemaValidation.validate({
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
        fechaNacimiento: body.fechaNacimiento,
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
const desactivarPaciente = async (req, res) => {
    const { email } = req.params;
  
    try {
        const procedimiento = await logic.desactivarPaciente(email);
        res.json({ message: 'Resultado desactivado exitosamente', procedimiento });
    } catch (err) {
        if (err.message === 'Resultado no encontrado') {
            return res.status(404).json({ error: 'Resultado no encontrado' });
        }
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
  };

// Exportar los controladores
module.exports = {
    listarPaciente,
    crearPaciente,
    obtenerPacientePorEmail,
    actualizarPaciente,
    desactivarPaciente,
};
