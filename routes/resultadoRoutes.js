const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultadoController');

// Crear un nuevo resultado
/**
 * @swagger
 * /resultado:
 *   post:
 *     summary: Crear un nuevo resultado
 *     tags: ["Resultados"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prueba:
 *                 type: string
 *                 example: "Glucometría"
 *               resultado:
 *                 type: string
 *                 example: "100 mg/dL"
 *               unidad:
 *                 type: string
 *                 example: "mg/dL"
 *               rangoReferencia:
 *                 type: string
 *                 example: "70-140 mg/dL"
 *     responses:
 *       201:
 *         description: Resultado creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', resultadoController.crearResultado);

// Listar todos los resultados
/**
 * @swagger
 * /resultado:
 *   get:
 *     summary: Listar todos los resultados
 *     tags: ["Resultados"]
 *     responses:
 *       200:
 *         description: Lista de resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   prueba:
 *                     type: string
 *                     example: "Glucometría"
 *                   resultado:
 *                     type: string
 *                     example: "100 mg/dL"
 *                   unidad:
 *                     type: string
 *                     example: "mg/dL"
 *                   rangoReferencia:
 *                     type: string
 *                     example: "70-140 mg/dL"
 *       204:
 *         description: No hay contenido
 */
router.get('/', resultadoController.listarResultados);

// Obtener un resultado por nombre de prueba
/**
 * @swagger
 * /resultado/{prueba}:
 *   get:
 *     summary: Obtener un resultado por nombre de prueba
 *     tags: ["Resultados"]
 *     parameters:
 *       - in: path
 *         name: prueba
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la prueba a obtener.
 *     responses:
 *       200:
 *         description: Resultado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prueba:
 *                   type: string
 *                   example: "Glucometría"
 *                 resultado:
 *                   type: string
 *                   example: "100 mg/dL"
 *                 unidad:
 *                   type: string
 *                   example: "mg/dL"
 *                 rangoReferencia:
 *                   type: string
 *                   example: "70-140 mg/dL"
 *       404:
 *         description: Resultado no encontrado
 */
router.get('/:prueba', resultadoController.obtenerResultadoPorPrueba);

// Actualizar un resultado por nombre de prueba
/**
 * @swagger
 * /resultado/{prueba}:
 *   put:
 *     summary: Actualizar un resultado por nombre de prueba
 *     tags: ["Resultados"]
 *     parameters:
 *       - in: path
 *         name: prueba
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la prueba a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resultado:
 *                 type: string
 *                 example: "95 mg/dL"
 *               unidad:
 *                 type: string
 *                 example: "mg/dL"
 *               rangoReferencia:
 *                 type: string
 *                 example: "70-140 mg/dL"
 *     responses:
 *       200:
 *         description: Resultado actualizado exitosamente
 *       404:
 *         description: Resultado no encontrado
 */
router.put('/:prueba', resultadoController.actualizarResultado);

// Eliminar un resultado por nombre de prueba
/**
 * @swagger
 * /resultado/{prueba}:
 *   delete:
 *     summary: Eliminar un resultado por nombre de prueba
 *     tags: ["Resultados"]
 *     parameters:
 *       - in: path
 *         name: prueba
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la prueba a eliminar.
 *     responses:
 *       200:
 *         description: Resultado eliminado exitosamente
 *       404:
 *         description: Resultado no encontrado
 */
router.delete('/:prueba', resultadoController.desactivarResultado);

module.exports = router;
