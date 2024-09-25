const mongoose = require('mongoose');
const Persona = require('./personaModels');

const PacienteSchema = new mongoose.Schema({
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  activo: { 
    type: Boolean, 
    default: true 
  },
});

// Combinar el esquema base con el nuevo
PacienteSchema.add(Persona.schema);

module.exports = mongoose.model('Paciente', PacienteSchema);

