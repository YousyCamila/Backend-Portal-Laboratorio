// profesionalController.js
const Profesional = require('../models/profesionalModels');

// Crear un nuevo profesional
async function crearProfesional(body) {
    const profesionalExistente = await Profesional.findOne({ email: body.email });

    if (profesionalExistente) {
        throw new Error('El profesional ya existe con ese email.');
    }

    const profesional = new Profesional(body);
    return await profesional.save();
}

// Obtener todos los profesionales
async function obtenerProfesionales() {
    return await Profesional.find();
}

// Obtener un profesional por email
async function obtenerProfesionalPorEmail(email) {
    const profesional = await Profesional.findOne({ email });

    if (!profesional) {
        throw new Error('Profesional no encontrado');
    }
    return profesional;
}

// Actualizar un profesional por email
async function actualizarProfesional(email, body) {
    const profesional = await Profesional.findOneAndUpdate({ email }, body, { new: true });

    if (!profesional) {
        throw new Error('Profesional no encontrado');
    }
    return profesional;
}

// Eliminar un profesional por email
async function desactivarProfesional(email) {
    return Profesional.findOneAndUpdate(
        { email },
        { activo: false }, // Cambia el estado a inactivo
        { new: true }
    ).then((profesional) => {
        if (!profesional) {
            throw new Error('Profesional no encontrado');
        }
        return profesional; // Devuelve el profesional actualizado
    });
}
module.exports = {
    crearProfesional,
    obtenerProfesionales,
    obtenerProfesionalPorEmail,
    actualizarProfesional,
    desactivarProfesional,
};

