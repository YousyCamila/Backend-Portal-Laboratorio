const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  prueba: { type: String, required: true },  // Nombre de la prueba, por ejemplo, "Glucometría"
  resultado: { type: String, required: true }, // Resultado de la prueba
  unidad: { type: String, required: true }, // Unidades del resultado
  rangoReferencia: { type: String }, // Rango de referencia opcional
}, {
  timestamps: true, // Para registrar las fechas de creación y actualización
});

// Exportar solo el esquema, no el modelo
module.exports = ResultSchema;


