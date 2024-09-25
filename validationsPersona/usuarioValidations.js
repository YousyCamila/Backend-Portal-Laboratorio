// validations/userValidations.js
const Joi = require('@hapi/joi');

const usuarioSchemaValidation = Joi.object({
    tipoIdentificacion: Joi.string()
        .valid('Cédula de ciudadanía', 'Tarjeta de identidad', 'Pasaporte')
        .required()
        .messages({
            'any.required': 'El tipo de identificación es obligatorio.',
            'any.only': 'Tipo de identificación no válido.',
        }),
    numeroIdentificacion: Joi.string()
        .required()
        .messages({
            'any.required': 'El número de identificación es obligatorio.',
        }),
    fechaNacimiento: Joi.date()
        .less('now')
        .required()
        .messages({
            'any.required': 'La fecha de nacimiento es obligatoria.',
            'date.less': 'La fecha de nacimiento debe ser una fecha pasada.',
            'date.base': 'La fecha de nacimiento debe ser válida.',
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'any.required': 'La contraseña es obligatoria.',
            'string.min': 'La contraseña debe tener al menos 6 caracteres.',
        }),
});

module.exports = {
    usuarioSchemaValidation,
};
