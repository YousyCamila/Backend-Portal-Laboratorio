// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllerPersona/usuarioController');

/**
 * @swagger
 * /users/registrar:
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
 *                 example: "1990-01-01"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post('/registrar', usuarioController.registrar);

/**
 * @swagger
 * /users/iniciar-sesion:
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
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "123456789"
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
 *       401:
 *         description: Usuario no encontrado o contraseña incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post('/iniciar-sesion', usuarioController.iniciarSesion);

module.exports = router;
