const Joi = require('@hapi/joi');
const { personaSchemaValidation } = require('./personaValidations'); // Importa la validación de Persona

// Validaciones para el objeto Paciente
const pacienteSchemaValidation = Joi.object({
  ...personaSchemaValidation.describe().keys, // Incluye las validaciones de Persona
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
