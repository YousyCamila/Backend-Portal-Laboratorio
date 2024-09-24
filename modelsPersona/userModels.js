const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipoIdentificacion: { 
    type: String, 
    enum: ['Cédula de ciudadanía', 'Tarjeta de identidad', 'Pasaporte'], 
    required: true 
  },
  numeroIdentificacion: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
}, {
  timestamps: true, // Para registrar las fechas de creación y actualización
});

module.exports = mongoose.model('User', UserSchema);
