const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  fechaOrden: { type: Date, required: true },
  codigoDocumento: { type: String, required: true },
  numeroOrden: { type: String, required: true, unique: true },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },  // Relación con el paciente
  grupos: [GrupoSchema],  // Lista de grupos con sus procedimientos y resultados
}, {
  timestamps: true,  // Para registrar las fechas de creación y actualización
});

module.exports = mongoose.model('Order', OrderSchema);
