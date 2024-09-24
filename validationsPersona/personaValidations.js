const Joi = require('@hapi/joi');

// Validaciones para el objeto Persona
const personaSchemaValidation = Joi.object({
  tipoIdentificacion: Joi.string()
    .valid('Cédula de ciudadanía', 'Tarjeta de identidad', 'Pasaporte', 'Otro')
    .required()
    .messages({
      'string.base': 'El tipo de identificación debe ser un texto',
      'any.only': 'El tipo de identificación debe ser uno de los siguientes: Cédula de ciudadanía, Tarjeta de identidad, Pasaporte, Otro',
      'any.required': 'El tipo de identificación es un campo requerido',
    }),

  numeroIdentificacion: Joi.string()
    .required()
    .messages({
      'string.base': 'El número de identificación debe ser un texto',
      'string.empty': 'El número de identificación no puede estar vacío',
      'any.required': 'El número de identificación es un campo requerido',
    }),

  apellido1: Joi.string()
    .required()
    .messages({
      'string.base': 'El primer apellido debe ser un texto',
      'string.empty': 'El primer apellido no puede estar vacío',
      'any.required': 'El primer apellido es un campo requerido',
    }),

  apellido2: Joi.string()
    .optional()
    .messages({
      'string.base': 'El segundo apellido debe ser un texto',
    }),

  nombre1: Joi.string()
    .required()
    .messages({
      'string.base': 'El primer nombre debe ser un texto',
      'string.empty': 'El primer nombre no puede estar vacío',
      'any.required': 'El primer nombre es un campo requerido',
    }),

  nombre2: Joi.string()
    .optional()
    .messages({
      'string.base': 'El segundo nombre debe ser un texto',
    }),

  sexoBiologico: Joi.string()
    .valid('Masculino', 'Femenino', 'Otro')
    .required()
    .messages({
      'string.base': 'El sexo biológico debe ser un texto',
      'any.only': 'El sexo biológico debe ser uno de los siguientes: Masculino, Femenino, Otro',
      'any.required': 'El sexo biológico es un campo requerido',
    }),

  direccion: Joi.string()
    .required()
    .messages({
      'string.base': 'La dirección debe ser un texto',
      'string.empty': 'La dirección no puede estar vacía',
      'any.required': 'La dirección es un campo requerido',
    }),

  telefonoMovil: Joi.string()
    .required()
    .messages({
      'string.base': 'El teléfono móvil debe ser un texto',
      'string.empty': 'El teléfono móvil no puede estar vacío',
      'any.required': 'El teléfono móvil es un campo requerido',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'El email debe ser un texto',
      'string.email': 'El email debe ser una dirección de correo válida',
      'string.empty': 'El email no puede estar vacío',
      'any.required': 'El email es un campo requerido',
    }),
});

module.exports = { personaSchemaValidation };
