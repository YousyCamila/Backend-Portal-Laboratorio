const express = require('express');
const router = express.Router();
const procedimientoController = require('../controllersOrders/procedimientoController');

// Crear un nuevo procedimiento
/**
 * @swagger
 * /procedimientos:
 *   post:
 *     summary: Crear un nuevo procedimiento
 *     tags: ["Procedimientos"]
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
 *       409:
 *         description: Conflicto en los datos
 */
router.post('/', procedimientoController.crearProcedimiento);

// Listar todos los procedimientos
/**
 * @swagger
 * /procedimientos:
 *   get:
 *     summary: Listar todos los procedimientos
 *     tags: ["Procedimientos"]
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
 *       204:
 *         description: No hay contenido
 */
router.get('/', procedimientoController.listarProcedimientos);

// Obtener un procedimiento por nombre
/**
 * @swagger
 * /procedimientos/{nombre}:
 *   get:
 *     summary: Obtener un procedimiento por nombre
 *     tags: ["Procedimientos"]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del procedimiento a obtener.
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
 *       404:
 *         description: Procedimiento no encontrado
 */
router.get('/:nombre', procedimientoController.obtenerProcedimientoPorNombre);

// Actualizar un procedimiento por nombre
/**
 * @swagger
 * /procedimientos/{nombre}:
 *   put:
 *     summary: Actualizar un procedimiento por nombre
 *     tags: ["Procedimientos"]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del procedimiento a actualizar.
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
 *       200:
 *         description: Procedimiento actualizado exitosamente
 *       404:
 *         description: Procedimiento no encontrado
 */
router.put('/:nombre', procedimientoController.actualizarProcedimiento);

// Eliminar un procedimiento por nombre
/**
 * @swagger
 * /procedimientos/{nombre}:
 *   delete:
 *     summary: Eliminar un procedimiento por nombre
 *     tags: ["Procedimientos"]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del procedimiento a eliminar.
 *     responses:
 *       200:
 *         description: Procedimiento eliminado exitosamente
 *       404:
 *         description: Procedimiento no encontrado
 */
router.delete('/:nombre', procedimientoController.eliminarProcedimiento);

module.exports = router;
