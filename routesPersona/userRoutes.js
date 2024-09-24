const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modelsPersona/userModels');
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: ["Autenticación"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevoUsuario"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('El usuario ya existe');
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar el usuario');
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: ["Autenticación"]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: "usuarioEjemplo"
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: ["Autenticación"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuarioEjemplo"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
});

module.exports = router;
