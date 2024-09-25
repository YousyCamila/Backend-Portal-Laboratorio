const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel'); // Asegúrate de que la ruta sea correcta

// Función para validar la fecha de nacimiento
const esFechaNacimientoValida = (fechaNacimiento, tipoIdentificacion) => {
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    // Verifica si la fecha es válida
    if (!(fecha instanceof Date) || isNaN(fecha)) {
        return false;
    }

    // Permitir menores de edad solo con tarjeta de identidad o pasaporte
    if (tipoIdentificacion === 'Cédula de ciudadanía' && edad < 18) {
        return false;
    }

    return true; // La fecha es válida
};

// Función para registrar un nuevo usuario
const registrar = async (req, res) => {
    const { tipoIdentificacion, numeroIdentificacion, fechaNacimiento, password, rol } = req.body;

    if (!tipoIdentificacion || !numeroIdentificacion || !fechaNacimiento || !password || !rol) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    if (!esFechaNacimientoValida(fechaNacimiento)) {
        return res.status(400).json({ error: 'Fecha de nacimiento no válida. Debe tener al menos 18 años.' });
    }

    try {
        const existeUsuario = await User.findOne({ numeroIdentificacion });
        if (existeUsuario) {
            return res.status(409).json({ error: 'El usuario ya existe con ese número de identificación.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new User({
            tipoIdentificacion,
            numeroIdentificacion,
            fechaNacimiento,
            password: hashedPassword,
            rol, // Almacena el rol
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor.', details: err.message });
    }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
    const { tipoIdentificacion, numeroIdentificacion, password, fechaNacimiento } = req.body;

    if (!tipoIdentificacion || !numeroIdentificacion || !password || !fechaNacimiento) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    if (!esFechaNacimientoValida(fechaNacimiento)) {
        return res.status(400).json({ error: 'Fecha de nacimiento no válida. Debe tener al menos 18 años.' });
    }

    try {
        const usuario = await User.findOne({ numeroIdentificacion });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        }

        if (usuario.tipoIdentificacion !== tipoIdentificacion) {
            return res.status(400).json({ error: 'Tipo de identificación incorrecto.' });
        }

        if (new Date(usuario.fechaNacimiento).getTime() !== new Date(fechaNacimiento).getTime()) {
            return res.status(400).json({ error: 'La fecha de nacimiento es incorrecta.' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        }

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Incluye el rol en el token
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = { registrar, iniciarSesion };

