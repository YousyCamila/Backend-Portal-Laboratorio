const express = require('express');
const router = express.Router();
const ordenController = require('../controllersOrders/ordenController');

// Listar órdenes por número de identificación
/**
 * @swagger
 * /ordens/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener órdenes por número de identificación
 *     tags: ["Ordenes"]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del paciente
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
 *                   fechaOrden:
 *                     type: string
 *                     example: "2024-09-01T00:00:00.000Z"
 *                   codigoDocumento:
 *                     type: string
 *                     example: "ORD-12345"
 *                   numeroIdentificacion:
 *                     type: string
 *                     example: "1017543765"
 *       404:
 *         description: No se encontraron órdenes
 */
router.get('/ordens/:numeroIdentificacion', ordenController.obtenerOrdenes);

module.exports = router;
