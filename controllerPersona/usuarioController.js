// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modelsPersona/usuarioModel'); // Asegúrate de que tu modelo de usuario esté configurado

// Función para registrar un nuevo usuario
const registrar = async (req, res) => {
    const { tipoIdentificacion, numeroIdentificacion, fechaNacimiento, password } = req.body;

    // Verificar si el usuario ya existe
    const existeUsuario = await User.findOne({ numeroIdentificacion });
    if (existeUsuario) {
        return res.status(409).json({ error: 'El usuario ya existe con ese número de identificación.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
        tipoIdentificacion,
        numeroIdentificacion,
        fechaNacimiento,
        password: hashedPassword,
    });

    try {
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente', nuevoUsuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
    const { numeroIdentificacion, password } = req.body;

    // Buscar el usuario por número de identificación
    const usuario = await User.findOne({ numeroIdentificacion });
    if (!usuario) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña
    const esCoincidente = await bcrypt.compare(password, usuario.password);
    if (!esCoincidente) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar un token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = {
    registrar,
    iniciarSesion,
};
