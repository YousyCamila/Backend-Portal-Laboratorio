const express = require('express');
const router = express.Router();
const ordenesController = require('../controllersOrders/ordenController');

// Crear una nueva orden
/**
 * @swagger
 * /ordenes:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: ["Órdenes"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaOrden:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-18T00:00:00.000Z"
 *               codigoDocumento:
 *                 type: string
 *                 example: "DOC123456"
 *               numeroOrden:
 *                 type: string
 *                 example: "ORD123456"
 *               paciente:
 *                 type: string
 *                 example: "60b8d8e4b77e6f001c123456"  // ID del paciente
 *               grupos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Grupo A"
 *                     procedimientos:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Procedimiento 1"
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: Conflicto en los datos
 */
router.post('/', ordenesController.crearOrden);

// Listar todas las órdenes
/**
 * @swagger
 * /ordenes:
 *   get:
 *     summary: Listar todas las órdenes
 *     tags: ["Órdenes"]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroOrden:
 *                     type: string
 *                     example: "ORD123456"
 *                   paciente:
 *                     type: string
 *                     example: "60b8d8e4b77e6f001c123456"  // ID del paciente
 *                   grupos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           example: "Grupo A"
 *       204:
 *         description: No hay contenido
 */
router.get('/', ordenesController.listarOrdenes);

// Obtener una orden por número de orden
/**
 * @swagger
 * /ordenes/{numeroOrden}:
 *   get:
 *     summary: Obtener una orden por número de orden
 *     tags: ["Órdenes"]
 *     parameters:
 *       - in: path
 *         name: numeroOrden
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de orden a obtener.
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroOrden:
 *                   type: string
 *                   example: "ORD123456"
 *                 paciente:
 *                   type: string
 *                   example: "60b8d8e4b77e6f001c123456"  // ID del paciente
 *                 grupos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         example: "Grupo A"
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:numeroOrden', ordenesController.obtenerOrdenPorNumero);

// Actualizar una orden por número de orden
/**
 * @swagger
 * /ordenes/{numeroOrden}:
 *   put:
 *     summary: Actualizar una orden por número de orden
 *     tags: ["Órdenes"]
 *     parameters:
 *       - in: path
 *         name: numeroOrden
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de orden a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaOrden:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-18T00:00:00.000Z"
 *               codigoDocumento:
 *                 type: string
 *                 example: "DOC123456"
 *               paciente:
 *                 type: string
 *                 example: "60b8d8e4b77e6f001c123456"  // ID del paciente
 *               grupos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Grupo A"
 *                     procedimientos:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Procedimiento 1"
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *       404:
 *         description: Orden no encontrada
 */
router.put('/:numeroOrden', ordenesController.actualizarOrden);

module.exports = router;
