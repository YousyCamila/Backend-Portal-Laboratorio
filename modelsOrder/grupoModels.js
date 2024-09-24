const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre del grupo
    procedimientos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Procedimiento' }] // Referencias a Procedimiento
}, {
    timestamps: true // Para registrar las fechas de creación y actualización
});

module.exports = mongoose.model('Grupo', GrupoSchema);

  