const Orden = require('../modelsOrder/ordenModels'); // Asegúrate de que la ruta sea correcta
const Paciente = require('../modelsPersona/pacienteModels');

async function obtenerOrdenesPorNumeroIdentificacion(numeroIdentificacion) {
  // Buscar el paciente por número de identificación
  const paciente = await Paciente.findOne({ numeroIdentificacion });

  // Si el paciente no se encuentra, lanzar un error
  if (!paciente) {
    throw new Error('Paciente no encontrado');
  }

  // Buscar las órdenes de laboratorio asociadas al paciente
  const ordenes = await Orden.find({ pacienteId: paciente._id });

  // Si no se encuentran órdenes, retornar un mensaje o una lista vacía
  if (ordenes.length === 0) {
    return { message: 'No se encontraron órdenes para este paciente' };
  }

  return ordenes;
}

module.exports = {
  obtenerOrdenesPorNumeroIdentificacion,
};
