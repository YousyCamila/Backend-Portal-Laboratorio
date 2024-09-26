// models/Orden.js
const mongoose = require('mongoose');

// Esquema para los resultados de las pruebas
const resultadoSchema = new mongoose.Schema({
  prueba: {
    type: String,
    required: true,
  },
  resultado: {
    type: String,
    required: true,
  },
});

// Esquema para las órdenes
const ordenSchema = new mongoose.Schema({
  grupo: {
    type: String,
    required: true,
  },
  procedimientos: {
    type: [String],
    required: true,
  },
  resultados: {
    type: [resultadoSchema],
    required: true,
  },
  activo: { 
    type: Boolean, 
    default: true 
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente', // Referencia al modelo Paciente
    required: true,
  },
});

// Crear el modelo de Orden
const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
