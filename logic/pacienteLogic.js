// pacienteController.js
const Paciente = require('../models/pacienteModels');

// Crear un nuevo paciente
async function crearPaciente(body) {
    const pacienteExistente = await Paciente.findOne({ email: body.email });

    if (pacienteExistente) {
        throw new Error('El paciente ya existe con ese email.');
    }

    const paciente = new Paciente(body);
    return await paciente.save();
}

// Obtener todos los pacientes
async function obtenerPaciente() {
    return await Paciente.find();
}

// Obtener un paciente por email
async function obtenerPacientePorEmail(email) {
    const paciente = await Paciente.findOne({ email });

    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    return paciente;
}

// Actualizar un paciente por email
async function actualizarPaciente(email, body) {
    const paciente = await Paciente.findOneAndUpdate({ email }, body, { new: true });

    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    return paciente;
}

// Eliminar un paciente por email
// Desactivar un resultado por nombre de prueba
async function desactivarPaciente(email) {
    const paciente = await Paciente.findOneAndUpdate(
        { email },
        { activo: false }, // Cambiar el estado a inactivo
        { new: true }
    );

    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    return paciente; // Devuelve el paciente actualizado
}
module.exports = {
    crearPaciente,
    obtenerPaciente,
    obtenerPacientePorEmail,
    actualizarPaciente,
    desactivarPaciente,
};

