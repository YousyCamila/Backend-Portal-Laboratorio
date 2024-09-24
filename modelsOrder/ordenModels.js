const mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
  fechaOrden: { type: Date, required: true },
  codigoDocumento: { type: String, required: true },
  numeroOrden: { type: String, required: true },
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
  // otros campos que necesites...
}, {
  timestamps: true,
});

module.exports = mongoose.model('Orden', OrdenSchema);

