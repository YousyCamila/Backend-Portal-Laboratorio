const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
  prueba: { type: String, required: true },  // Nombre de la prueba, por ejemplo, "Glucometría"
  resultado: { type: String, required: true }, // Resultado de la prueba
  unidad: { type: String, required: true }, // Unidades del resultado
  rangoReferencia: { type: String }, // Rango de referencia opcional
}, {
  timestamps: true, // Para registrar las fechas de creación y actualización
});

// Crear y exportar el modelo
module.exports = mongoose.model('Resultado', ResultadoSchema);
