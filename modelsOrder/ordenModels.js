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
});

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
