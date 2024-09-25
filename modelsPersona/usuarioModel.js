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
  username: { // Asegúrate de que esta propiedad exista
    type: String,
    required: true,
    unique: true,
  },
  activo: { 
    type: Boolean, 
    default: true 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);