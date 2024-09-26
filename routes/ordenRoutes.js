const express = require('express');
const {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenPorId,
    actualizarOrden,
    desactivarOrden
} = require('../controllers/ordenController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Orden:
 *       type: object
 *       properties:
 *         pacienteId:
 *           type: string
 *           description: ID del paciente
 *         orderNumber:
 *           type: string
 *           description: Número de la orden
 *         date:
 *           type: string
 *           format: date
 *           description: Fecha de creación de la orden
 *       required:
 *         - pacienteId
 *         - orderNumber
 *         - date
 */

/**
 * @swagger
 * /orden:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Ordenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orden'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       500:
 *         description: Error al crear la orden
 */
router.post('/orden', crearOrden);

/**
 * @swagger
 * /ordenes:
 *   get:
 *     summary: Obtener todas las órdenes del paciente con paginación y filtros
 *     tags: [Ordenes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página actual (por defecto 1)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Orden de la lista (ascendente o descendente)
 *       - in: query
 *         name: orderNumber
 *         schema:
 *           type: string
 *         description: Filtrar por número de orden
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar desde esta fecha
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar hasta esta fecha
 *     responses:
 *       200:
 *         description: Lista de órdenes obtenida exitosamente
 *       500:
 *         description: Error al obtener las órdenes
 */
router.get('/ordenes', obtenerOrdenes);

/**
 * @swagger
 * /orden/{id}:
 *   get:
 *     summary: Obtener una orden específica por ID
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente
 *       404:
 *         description: Orden no encontrada
 */
router.get('/orden/:id', obtenerOrdenPorId);

/**
 * @swagger
 * /orden/{id}:
 *   put:
 *     summary: Actualizar una orden por ID
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orden'
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *       404:
 *         description: Orden no encontrada
 */
router.put('/orden/:id', actualizarOrden);

/**
 * @swagger
 * /orden/{id}:
 *   delete:
 *     summary: Desactivar una orden por ID
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden desactivada exitosamente
 *       404:
 *         description: Error al desactivar la orden
 */
router.delete('/orden/:id', desactivarOrden);

module.exports = router;
