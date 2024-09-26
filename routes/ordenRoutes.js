// routesOrders/ordenRoutes.js
const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

/**
 * @swagger
 * tags:
 *   name: Órdenes
 *   description: API para manejar órdenes médicas
 */

/**
 * @swagger
 * /orden:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Órdenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo:
 *                 type: string
 *                 example: "Química sanguínea"
 *               procedimientos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de procedimientos de la orden
 *                 example: ["Glucometría", "Hierro total", "Triglicéridos"]
 *               resultados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     prueba:
 *                       type: string
 *                       description: Nombre de la prueba
 *                       example: "Glucometría"
 *                     resultado:
 *                       type: string
 *                       description: Resultado de la prueba
 *                       example: "Normal"
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: Orden creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden creada exitosamente"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error de validación"
 */
router.post('/', ordenController.crearOrden);

/**
 * @swagger
 * /orden:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Órdenes]
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
 *                   grupo:
 *                     type: string
 *                   procedimientos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   resultados:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         prueba:
 *                           type: string
 *                         resultado:
 *                           type: string
 *                   numeroIdentificacion:
 *                     type: string
 */
router.get('/', ordenController.obtenerOrdenes);

/**
 * @swagger
 * /orden/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grupo:
 *                   type: string
 *                 procedimientos:
 *                   type: array
 *                   items:
 *                     type: string
 *                 resultados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       prueba:
 *                         type: string
 *                       resultado:
 *                         type: string
 *                 numeroIdentificacion:
 *                   type: string
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id', ordenController.obtenerOrdenPorId);

/**
 * @swagger
 * /orden/{id}:
 *   put:
 *     summary: Actualizar una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo:
 *                 type: string
 *               procedimientos:
 *                 type: array
 *                 items:
 *                   type: string
 *               resultados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     prueba:
 *                       type: string
 *                     resultado:
 *                       type: string
 *     responses:
 *       200:
 *         description: Orden actualizada
 *       404:
 *         description: Orden no encontrada
 */
router.put('/:id', ordenController.actualizarOrden);

/**
 * @swagger
 * /orden/{id}:
 *   delete:
 *     summary: Eliminar una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden eliminada
 *       404:
 *         description: Orden no encontrada
 */
router.delete('/:id', ordenController.desactivarOrden);

module.exports = router;
