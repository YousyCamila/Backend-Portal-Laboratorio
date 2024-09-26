const { personaSchemaValidation } = require('./personaValidations'); // Importa las validaciones de Persona
const Joi = require('@hapi/joi');

// Validaciones para el objeto Profesional
const profesionalSchemaValidation = personaSchemaValidation.keys({
  especialidad: Joi.string()
    .required()
    .messages({
      'string.base': 'La especialidad debe ser un texto',
      'string.empty': 'La especialidad no puede estar vacía',
      'any.required': 'La especialidad es un campo requerido',
    }),
  fechaNacimiento: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de nacimiento debe ser una fecha válida',
      'date.iso': 'La fecha de nacimiento debe estar en formato ISO',
      'any.required': 'La fecha de nacimiento es un campo requerido',
    }),
});

module.exports = { profesionalSchemaValidation };
