const mongoose = require('mongoose');
const ResultSchema = require('./resultadoModels');

const ProcedimientoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  // Nombre del procedimiento, por ejemplo, "Glucometría"
    pruebas: [ResultSchema],  // Lista de pruebas asociadas al procedimiento
  },{
    timestamps: true, // Para registrar las fechas de creación y actualización
  });

  module.exports = mongoose.model('Procedimiento ', ProcedimientoSchema);
