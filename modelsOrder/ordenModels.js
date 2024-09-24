const mongoose = require('mongoose');
const Grupo = require('./grupoModels');  // Asegúrate de importar el modelo o el esquema correctamente

const OrdenSchema = new mongoose.Schema({
  fechaOrden: { type: Date, required: true },
  codigoDocumento: { type: String, required: true },
  numeroOrden: { type: String, required: true, unique: true },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },  // Relación con el paciente
  grupos: [Grupo.schema],  // Utiliza Grupo.schema si importaste el modelo
}, {
  timestamps: true,  // Para registrar las fechas de creación y actualización
});

module.exports = mongoose.model('Orden', OrdenSchema);
