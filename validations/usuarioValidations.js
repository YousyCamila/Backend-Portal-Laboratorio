const Joi = require('@hapi/joi');

// Longitudes específicas de identificación según el tipo de documento en Colombia
const LONGITUDES_DOCUMENTO = {
    'Cédula de ciudadanía': 10,
    'Tarjeta de identidad': 10,
    'Pasaporte': 8,
};

const usuarioSchemaValidation = Joi.object({
    tipoIdentificacion: Joi.string()
        .valid('Cédula de ciudadanía', 'Tarjeta de identidad', 'Pasaporte')
        .required()
        .messages({
            'any.required': 'El tipo de identificación es obligatorio.',
            'any.only': 'Tipo de identificación no válido.',
        }),

    numeroIdentificacion: Joi.string()
        .pattern(/^\d+$/) // Solo permite números
        .required()
        .custom((value, helpers) => {
            const tipoId = helpers.state.ancestors[0].tipoIdentificacion; // Obtener el tipo de identificación
            const longitudEsperada = LONGITUDES_DOCUMENTO[tipoId];

            if (longitudEsperada && value.length !== longitudEsperada) {
                return helpers.message(`El número de identificación debe tener ${longitudEsperada} dígitos para ${tipoId}.`);
            }
            return value; // Retorna el valor si todo está bien
        })
        .messages({
            'any.required': 'El número de identificación es obligatorio.',
            'string.pattern.base': 'El número de identificación solo puede contener dígitos.',
        }),

    fechaNacimiento: Joi.date()
        .greater('1-1-1900') // Asegura que la fecha sea posterior a una fecha razonable
        .less('now')
        .required()
        .custom((value, helpers) => {
            const hoy = new Date();
            const fechaNacimiento = new Date(value);
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            const dia = hoy.getDate() - fechaNacimiento.getDate();

            if (edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)))) {
                return helpers.message('Debes tener al menos 18 años para registrarte.');
            }
            return value; // Retorna el valor si todo está bien
        })
        .messages({
            'any.required': 'La fecha de nacimiento es obligatoria.',
            'date.base': 'La fecha de nacimiento debe ser válida.',
            'date.greater': 'La fecha de nacimiento debe ser después del 1 de enero de 1900.',
            'date.less': 'La fecha de nacimiento debe ser una fecha pasada.',
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'any.required': 'La contraseña es obligatoria.',
            'string.min': 'La contraseña debe tener al menos 6 caracteres.',
        }),

    rol: Joi.string()
        .valid('paciente', 'profesional')
        .required()
        .messages({
            'any.required': 'El rol es obligatorio.',
            'any.only': 'Rol no válido.',
        }),
});

module.exports = {
    usuarioSchemaValidation,
};
