const Joi = require('@hapi/joi');

// Validación del esquema de Result
const resultSchemaValidation = Joi.object({
  prueba: Joi.string()
    .required()
    .messages({
      'string.base': 'El nombre de la prueba debe ser un texto',
      'any.required': 'El nombre de la prueba es un campo requerido',
    }),

  resultado: Joi.string()
    .required()
    .messages({
      'string.base': 'El resultado debe ser un texto',
      'any.required': 'El resultado es un campo requerido',
    }),

  unidad: Joi.string()
    .required()
    .messages({
      'string.base': 'La unidad debe ser un texto',
      'any.required': 'La unidad es un campo requerido',
    }),

  rangoReferencia: Joi.string()
    .allow(null, '') // Permite que el rango de referencia sea opcional
    .optional()
    .messages({
      'string.base': 'El rango de referencia debe ser un texto',
    }),
});

module.exports = { resultSchemaValidation };
