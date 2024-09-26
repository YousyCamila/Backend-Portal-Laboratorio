const Joi = require('@hapi/joi');

// Longitudes específicas de identificación según el tipo de documento en Colombia
const LONGITUDES_DOCUMENTO = {
  'Cédula de ciudadanía': 10,
  'Tarjeta de identidad': 10,
  'Pasaporte': 9,
  'Otro': Joi.string().min(1), // Puede ser cualquier longitud
};

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
    .when('tipoIdentificacion', {
      is: 'Pasaporte',
      then: Joi.string().alphanum().length(9).required()
        .messages({
          'string.base': 'El número de pasaporte debe ser un texto alfanumérico',
          'string.empty': 'El número de pasaporte no puede estar vacío',
          'any.required': 'El número de pasaporte es un campo requerido',
          'string.alphanum': 'El número de pasaporte solo puede contener letras y/o dígitos',
          'string.length': 'El número de pasaporte debe tener 9 caracteres',
        }),
      otherwise: Joi.string().pattern(/^\d+$/).length(10).required()
        .messages({
          'string.base': 'El número de identificación debe ser un texto numérico',
          'string.empty': 'El número de identificación no puede estar vacío',
          'any.required': 'El número de identificación es un campo requerido',
          'string.pattern.base': 'El número de identificación solo puede contener dígitos',
          'string.length': 'El número de identificación debe tener 10 caracteres',
        }),
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
    .allow(null, '') // Permitir que sea opcional y también puede ser una cadena vacía o nulo
    .messages({
      'string.base': 'El segundo nombre debe ser un texto',
    }),

  sexoBiologico: Joi.string()
    .valid('Masculino', 'Femenino')
    .required()
    .messages({
      'string.base': 'El sexo biológico debe ser un texto',
      'any.only': 'El sexo biológico debe ser uno de los siguientes: Masculino, Femenino',
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
    .pattern(/^\d{10}$/) // Asegura que el teléfono móvil sea de 10 dígitos
    .required()
    .messages({
      'string.base': 'El teléfono móvil debe ser un texto',
      'string.empty': 'El teléfono móvil no puede estar vacío',
      'any.required': 'El teléfono móvil es un campo requerido',
      'string.pattern.base': 'El teléfono móvil debe tener 10 dígitos',
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
