// modelsOrder/grupoModels.js
const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre del grupo
    procedimientos: [{ type: String }],
    activo: { type: Boolean, default: true } // Procedimientos como un array de strings
}, {
    timestamps: true // Para registrar las fechas de creación y actualización
});

module.exports = mongoose.model('Grupo', GrupoSchema);

  