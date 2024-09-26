const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  tipoIdentificacion: { 
    type: String, 
    enum: ['Cédula de ciudadanía', 'Tarjeta de identidad', 'Pasaporte'], 
    required: true 
  },
  numeroIdentificacion: { 
    type: String, 
    required: true, 
    unique: true 
  },
  fechaNacimiento: { 
    type: Date, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  rol: { 
    type: String, enum: ['paciente', 'profesional'], 
    required: true }, 
 
  activo: { 
    type: Boolean, 
    default: true 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
