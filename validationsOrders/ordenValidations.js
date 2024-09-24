const Joi = require('@hapi/joi');

// Validación del esquema de Orden
const orderSchemaValidation = Joi.object({
  fechaOrden: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha de la orden debe ser una fecha válida',
      'any.required': 'La fecha de la orden es un campo requerido',
    }),

  codigoDocumento: Joi.string()
    .required()
    .messages({
      'string.base': 'El código de documento debe ser un texto',
      'string.empty': 'El código de documento no puede estar vacío',
      'any.required': 'El código de documento es un campo requerido',
    }),

  numeroOrden: Joi.string()
    .required()
    .messages({
      'string.base': 'El número de orden debe ser un texto',
      'string.empty': 'El número de orden no puede estar vacío',
      'any.required': 'El número de orden es un campo requerido',
    }),

  paciente: Joi.string()
    .required()
    .messages({
      'string.base': 'El paciente debe ser un ID válido',
      'any.required': 'El paciente es un campo requerido',
    }),

  grupos: Joi.array()
    .items(Joi.object({
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

      procedimientos: Joi.array()
        .items(Joi.object({
          // Aquí puedes definir la validación para los procedimientos dentro del grupo
          prueba: Joi.string().required().messages({
            'string.base': 'El nombre de la prueba debe ser un texto',
            'any.required': 'El nombre de la prueba es requerido',
          }),
          resultado: Joi.string().required().messages({
            'string.base': 'El resultado debe ser un texto',
            'any.required': 'El resultado es requerido',
          }),
          unidad: Joi.string().required().messages({
            'string.base': 'La unidad debe ser un texto',
            'any.required': 'La unidad es requerida',
          }),
          rangoReferencia: Joi.string().allow(null, '').optional().messages({
            'string.base': 'El rango de referencia debe ser un texto',
          }),
        })).required().messages({
          'array.base': 'Los procedimientos deben ser un arreglo',
          'any.required': 'La lista de procedimientos es requerida',
        }),
    })).required().messages({
      'array.base': 'Los grupos deben ser un arreglo',
      'any.required': 'La lista de grupos es requerida',
    }),
});

module.exports = { orderSchemaValidation };
