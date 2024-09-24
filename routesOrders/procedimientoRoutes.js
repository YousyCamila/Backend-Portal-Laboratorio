// routes/procedimientoRoutes.js
const express = require('express');
const router = express.Router();
const procedimientoController = require('../controllersOrders/procedimientoController');

/**
 * @swagger
 * tags:
 *   name: Procedimientos
 *   description: API para manejar procedimientos médicos
 */

/**
 * @swagger
 * /procedimiento:
 *   post:
 *     summary: Crear un nuevo procedimiento
 *     tags: [Procedimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Glucometría"
 *     responses:
 *       201:
 *         description: Procedimiento creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', procedimientoController.crearProcedimiento);

/**
 * @swagger
 * /procedimiento:
 *   get:
 *     summary: Listar todos los procedimientos
 *     tags: [Procedimientos]
 *     responses:
 *       200:
 *         description: Lista de procedimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     example: "Glucometría"
 *                   activo:
 *                     type: boolean
 *                     example: true
 *       204:
 *         description: No hay contenido
 */
router.get('/', procedimientoController.listarProcedimientos);

/**
 * @swagger
 * /procedimiento/{nombre}:
 *   get:
 *     summary: Obtener un procedimiento por nombre
 *     tags: [Procedimientos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del procedimiento a obtener
 *     responses:
 *       200:
 *         description: Procedimiento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Glucometría"
 *                 activo:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Procedimiento no encontrado
 */
router.get('/:nombre', procedimientoController.obtenerProcedimientoPorNombre);

/**
 * @swagger
 * /procedimiento/{nombre}:
 *   put:
 *     summary: Actualizar un procedimiento por nombre
 *     tags: [Procedimientos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del procedimiento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Glucometría"
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Procedimiento actualizado exitosamente
 *       404:
 *         description: Procedimiento no encontrado
 */
router.put('/:nombre', procedimientoController.actualizarProcedimiento);

/**
 * @swagger
 * /procedimiento/{nombre}:
 *   delete:
 *     summary: Desactivar un procedimiento por nombre
 *     tags: [Procedimientos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del procedimiento a desactivar
 *     responses:
 *       200:
 *         description: Procedimiento desactivado exitosamente
 *       404:
 *         description: Procedimiento no encontrado
 */
router.delete('/:nombre', procedimientoController.desactivarProcedimiento);

module.exports = router;
