const Joi = require('@hapi/joi');

// Validación del esquema de Procedimiento
const procedimientoSchemaValidation = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre del procedimiento debe ser un texto',
      'string.empty': 'El nombre del procedimiento no puede estar vacío',
      'string.min': 'El nombre del procedimiento debe tener al menos 3 caracteres',
      'string.max': 'El nombre del procedimiento no debe exceder los 50 caracteres',
      'any.required': 'El nombre del procedimiento es un campo requerido',
    }),
    
  pruebas: Joi.array()
    .items(Joi.object({
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
      'array.base': 'Pruebas debe ser un arreglo',
      'any.required': 'La lista de pruebas es requerida',
    }),
});


  