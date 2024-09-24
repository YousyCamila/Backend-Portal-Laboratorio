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
});

module.exports = { profesionalSchemaValidation };
