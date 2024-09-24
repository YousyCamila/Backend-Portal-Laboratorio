const Joi = require('@hapi/joi');
const { personaSchemaValidation } = require('./personaValidation'); // Importa la validación de Persona

// Validaciones para el objeto Profesional
const profesionalSchemaValidation = Joi.object({
  ...personaSchemaValidation.describe().keys, // Incluye las validaciones de Persona
  especialidad: Joi.string()
    .required()
    .messages({
      'string.base': 'La especialidad debe ser un texto',
      'string.empty': 'La especialidad no puede estar vacía',
      'any.required': 'La especialidad es un campo requerido',
    }),
});

module.exports = { profesionalSchemaValidation };
