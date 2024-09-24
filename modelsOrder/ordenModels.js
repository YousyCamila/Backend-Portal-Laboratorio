const mongoose = require('mongoose');
const Grupo = require('./grupoModels');  // Asegúrate de importar el modelo o el esquema correctamente

const OrdenSchema = new mongoose.Schema({
  fechaOrden: {
    type: Date,
    default: Date.now,  // Asigna la fecha automáticamente al momento de la creación
  },
  codigoDocumento: {
    type: String,
    required: true,
  },
  numeroOrden: {
    type: String,
    unique: true,
  },
  // Almacenar el nombre completo del paciente en lugar de su ID
  pacienteNombre: {
    nombre1: { type: String, required: true },
    nombre2: { type: String },
    apellido1: { type: String, required: true },
    apellido2: { type: String },
  },
  grupos: [Grupo.schema],  // Utiliza Grupo.schema si importaste el modelo
}, {
  timestamps: true,  // Para registrar las fechas de creación y actualización
});

// Middleware para generar automáticamente el número de orden
OrdenSchema.pre('save', async function (next) {
  if (!this.numeroOrden) {
    // Generar un número de orden único basado en una lógica personalizada
    // Por ejemplo, usando la fecha actual y un número aleatorio o contador
    this.numeroOrden = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('Orden', OrdenSchema);

