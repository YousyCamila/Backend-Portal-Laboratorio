const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  // Nombre del grupo, por ejemplo, "Química sanguínea"
    procedimientos: [ProcedimientoSchema],  // Lista de procedimientos asociados al grupo
  },{
    timestamps: true, // Para registrar las fechas de creación y actualización
  });


  module.exports = mongoose.model('Grupo', GrupoSchema);
  