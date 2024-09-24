const express = require('express');
const router = express.Router();
const pacienteController = require('../controllerPersona/pacienteController');

// Crear un nuevo paciente
/**
 * @swagger
 * /paciente:
 *   post:
 *     summary: Crear un nuevo paciente
 *     tags: ["Pacientes"]
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
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: El paciente ya existe con ese email
 */
router.post('/', pacienteController.crearPaciente);

// Listar todos los pacientes
/**
 * @swagger
 * /paciente:
 *   get:
 *     summary: Listar todos los pacientes
 *     tags: ["Pacientes"]
 *     responses:
 *       200:
 *         description: Lista de pacientes
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
 *                   fechaNacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *       204:
 *         description: No hay contenido
 */
router.get('/', pacienteController.listarPaciente);

// Obtener un paciente por email
/**
 * @swagger
 * /paciente/{email}:
 *   get:
 *     summary: Obtener un paciente por email
 *     tags: ["Pacientes"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del paciente a obtener.
 *     responses:
 *       200:
 *         description: Paciente encontrado
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
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/:email', pacienteController.obtenerPacientePorEmail);

// Actualizar un paciente por email
/**
 * @swagger
 * /paciente/{email}:
 *   put:
 *     summary: Actualizar un paciente por email
 *     tags: ["Pacientes"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del paciente a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               tipoIdentificacion:
 *                 type: string
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
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *       404:
 *         description: Paciente no encontrado
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:email', pacienteController.actualizarPaciente);

// Eliminar un paciente por email
/**
 * @swagger
 * /paciente/{email}:
 *   delete:
 *     summary: Eliminar un paciente por email
 *     tags: ["Pacientes"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del paciente a eliminar.
 *     responses:
 *       200:
 *         description: Paciente eliminado
 *       404:
 *         description: Paciente no encontrado
 */
router.delete('/:email', pacienteController.eliminarPaciente);

module.exports = router;
