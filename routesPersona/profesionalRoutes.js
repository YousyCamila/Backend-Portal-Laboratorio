const express = require('express');
const router = express.Router();
const profesionalController = require('../controllerPersona/profesionalController');

// Crear un nuevo profesional
/**
 * @swagger
 * /profesional:
 *   post:
 *     summary: Crear un nuevo profesional
 *     tags: ["Profesionales"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoIdentificacion:
 *                 type: string
 *                 enum: ["Cédula de ciudadanía", "Tarjeta de identidad", "Pasaporte", "Otro"]
 *                 example: "Cédula de ciudadanía"
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "123456789"
 *               apellido1:
 *                 type: string
 *                 example: "Pérez"
 *               apellido2:
 *                 type: string
 *                 example: "Gómez"
 *               nombre1:
 *                 type: string
 *                 example: "Juan"
 *               nombre2:
 *                 type: string
 *                 example: "Carlos"
 *               sexoBiologico:
 *                 type: string
 *                 enum: ["Masculino", "Femenino", "Otro"]
 *                 example: "Masculino"
 *               direccion:
 *                 type: string
 *                 example: "Calle 123 #45-67"
 *               telefonoMovil:
 *                 type: string
 *                 example: "3001234567"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               especialidad:
 *                 type: string
 *                 example: "Medicina General"
 *     responses:
 *       201:
 *         description: Profesional creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: El profesional ya existe con ese email
 */
router.post('/', profesionalController.crearProfesional);

// Listar todos los profesionales
/**
 * @swagger
 * /profesional:
 *   get:
 *     summary: Listar todos los profesionales
 *     tags: ["Profesionales"]
 *     responses:
 *       200:
 *         description: Lista de profesionales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tipoIdentificacion:
 *                     type: string
 *                     example: "Cédula de ciudadanía"
 *                   numeroIdentificacion:
 *                     type: string
 *                     example: "123456789"
 *                   apellido1:
 *                     type: string
 *                     example: "Pérez"
 *                   apellido2:
 *                     type: string
 *                     example: "Gómez"
 *                   nombre1:
 *                     type: string
 *                     example: "Juan"
 *                   nombre2:
 *                     type: string
 *                     example: "Carlos"
 *                   sexoBiologico:
 *                     type: string
 *                     example: "Masculino"
 *                   direccion:
 *                     type: string
 *                     example: "Calle 123 #45-67"
 *                   telefonoMovil:
 *                     type: string
 *                     example: "3001234567"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   especialidad:
 *                     type: string
 *                     example: "Medicina General"
 *       204:
 *         description: No hay contenido
 */
router.get('/', profesionalController.listarProfesionales);

// Obtener un profesional por email
/**
 * @swagger
 * /profesional/{email}:
 *   get:
 *     summary: Obtener un profesional por email
 *     tags: ["Profesionales"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del profesional a obtener.
 *     responses:
 *       200:
 *         description: Profesional encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tipoIdentificacion:
 *                   type: string
 *                   example: "Cédula de ciudadanía"
 *                 numeroIdentificacion:
 *                   type: string
 *                   example: "123456789"
 *                 apellido1:
 *                   type: string
 *                   example: "Pérez"
 *                 apellido2:
 *                   type: string
 *                   example: "Gómez"
 *                 nombre1:
 *                   type: string
 *                   example: "Juan"
 *                 nombre2:
 *                   type: string
 *                   example: "Carlos"
 *                 sexoBiologico:
 *                   type: string
 *                   example: "Masculino"
 *                 direccion:
 *                   type: string
 *                   example: "Calle 123 #45-67"
 *                 telefonoMovil:
 *                   type: string
 *                   example: "3001234567"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 especialidad:
 *                   type: string
 *                   example: "Medicina General"
 *       404:
 *         description: Profesional no encontrado
 */
router.get('/:email', profesionalController.obtenerProfesionalPorEmail);

// Actualizar un profesional por email
/**
 * @swagger
 * /profesional/{email}:
 *   put:
 *     summary: Actualizar un profesional por email
 *     tags: ["Profesionales"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del profesional a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               especialidad:
 *                 type: string
 *                 example: "Medicina General"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *           
 *     responses:
 *       200:
 *         description: Profesional actualizado
 *       404:
 *         description: Profesional no encontrado
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:email', profesionalController.actualizarProfesional);

// Eliminar un profesional por email
/**
 * @swagger
 * /profesional/{email}:
 *   delete:
 *     summary: Eliminar un profesional por email
 *     tags: ["Profesionales"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del profesional a eliminar.
 *     responses:
 *       200:
 *         description: Profesional eliminado
 *       404:
 *         description: Profesional no encontrado
 */
router.delete('/:email', profesionalController.eliminarProfesional);

module.exports = router;
