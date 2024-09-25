// models/Procedimiento.js
const mongoose = require('mongoose');

const procedimientoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  activo: {
    type: Boolean,
    default: true, // Los procedimientos son activos por defecto
  },
}, {
  timestamps: true, // Para registrar la fecha de creación y actualización
});

const Procedimiento = mongoose.model('Procedimiento', procedimientoSchema);

module.exports = Procedimiento;

