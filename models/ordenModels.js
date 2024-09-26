// models/Orden.js
const mongoose = require('mongoose');

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
  activo: { type: Boolean, default: true },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente', // referencia al modelo Paciente
    required: true,
  },
});

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
