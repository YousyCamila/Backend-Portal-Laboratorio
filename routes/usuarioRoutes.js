const express = require('express');
const { registrar, iniciarSesion } = require('../controllers/usuarioController');
const router = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoIdentificacion:
 *                 type: string
 *               numeroIdentificacion:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [paciente, profesional]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: Conflicto, usuario ya existe
 */
router.post('/register', registrar);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoIdentificacion:
 *                 type: string
 *               numeroIdentificacion:
 *                 type: string
 *               password:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
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
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: Usuario o contraseña incorrectos
 */
router.post('/login', iniciarSesion);

module.exports = router;
