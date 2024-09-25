const mongoose = require('mongoose');
const Persona = require('./personaModels'); 

const ProfesionalSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    required: true, // Obligatorio para profesionales
  },
  activo: { 
    type: Boolean, 
    default: true 
  },
});

// Combinar el esquema base con el nuevo
ProfesionalSchema.add(Persona.schema);

module.exports = mongoose.model('Profesional', ProfesionalSchema);

