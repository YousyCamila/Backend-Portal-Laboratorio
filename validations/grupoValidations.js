const Joi = require('@hapi/joi');

// Validación del esquema de Grupo
const grupoSchemaValidation = Joi.object({
    nombre: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.base': 'El nombre del grupo debe ser un texto',
        'string.empty': 'El nombre del grupo no puede estar vacío',
        'string.min': 'El nombre del grupo debe tener al menos 3 caracteres',
        'string.max': 'El nombre del grupo no debe exceder los 50 caracteres',
        'any.required': 'El nombre del grupo es un campo requerido',
      }),
  });

  module.exports = { grupoSchemaValidation };

