const { personaSchemaValidation } = require('./personaValidations'); // Importa las validaciones de Persona
const Joi = require('@hapi/joi');

// Validaciones para el objeto Paciente
const pacienteSchemaValidation = personaSchemaValidation.keys({
  fechaNacimiento: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de nacimiento debe ser una fecha válida',
      'date.iso': 'La fecha de nacimiento debe estar en formato ISO',
      'any.required': 'La fecha de nacimiento es un campo requerido',
    }),
});

module.exports = { pacienteSchemaValidation };
