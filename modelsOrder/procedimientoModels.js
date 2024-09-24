const mongoose = require('mongoose');
const ResultSchema = require('./resultadoModels'); // Importa el esquema correctamente

const ProcedimientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },  // Nombre del procedimiento, por ejemplo, "Glucometría"
  pruebas: [ResultSchema],  // Lista de pruebas asociadas al procedimiento
}, {
  timestamps: true, 
});


module.exports = mongoose.model('Procedimiento', ProcedimientoSchema);

