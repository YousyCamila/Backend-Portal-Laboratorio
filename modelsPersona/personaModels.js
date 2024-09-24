const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
  tipoIdentificacion: {
    type: String,
    enum: ['Cédula de ciudadanía', 'Tarjeta de identidad', 'Pasaporte', 'Otro'], // Lista de opciones
    required: true,
  },
  numeroIdentificacion: {
    type: String,
    required: true,
    unique: true,
  },
  apellido1: {
    type: String,
    required: true,
  },
  apellido2: {
    type: String,
  },
  nombre1: {
    type: String,
    required: true,
  },
  nombre2: {
    type: String,
  },
  sexoBiologico: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'], // Opciones de sexo biológico
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefonoMovil: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Para registrar las fechas de creación y actualización
});

module.exports = mongoose.model('Persona', PersonaSchema);
