const express = require('express');
const { registrar, iniciarSesion } = require('../controllerPersona/usuarioController');
const router = express.Router();

/**
 * @swagger
 * /users/register:
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
 *               tipoIdentificacion:
 *                 type: string
 *                 example: "Cédula de ciudadanía"
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "123456789"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/register', registrar);

/**
 * @swagger
 * /users/login:
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
 *               tipoIdentificacion:
 *                 type: string
 *                 example: "Cédula de ciudadanía"
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "123456789"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
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
router.post('/login', iniciarSesion);

module.exports = router;
