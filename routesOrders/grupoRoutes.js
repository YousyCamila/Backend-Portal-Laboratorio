// routesOrders/grupoRoutes.js
const express = require('express');
const router = express.Router();
const gruposController = require('../controllersOrders/grupoController');

// Crear un nuevo grupo
/**
 * @swagger
 * /grupo:
 *   post:
 *     summary: Crear un nuevo grupo
 *     tags: ["Grupos"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Química sanguínea"
 *               procedimientos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "triglicéridos"
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: El grupo ya existe
 */
router.post('/', gruposController.crearGrupo);

// Listar todos los grupos
/**
 * @swagger
 * /grupo:
 *   get:
 *     summary: Listar todos los grupos
 *     tags: ["Grupos"]
 *     responses:
 *       200:
 *         description: Lista de grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     example: "Grupo A"
 *                   procedimientos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "Procedimiento 1"
 *       204:
 *         description: No hay contenido
 */
router.get('/', gruposController.listarGrupos);

// Obtener un grupo por nombre
/**
 * @swagger
 * /grupo/{nombre}:
 *   get:
 *     summary: Obtener un grupo por nombre
 *     tags: ["Grupos"]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del grupo a obtener.
 *     responses:
 *       200:
 *         description: Grupo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Grupo A"
 *                 procedimientos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Procedimiento 1"
 *       404:
 *         description: Grupo no encontrado
 */
router.get('/:nombre', gruposController.obtenerGrupoPorNombre);

// Actualizar un grupo por nombre
/**
 * @swagger
 * /grupo/{nombre}:
 *   put:
 *     summary: Actualizar un grupo por nombre
 *     tags: ["Grupos"]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del grupo a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Grupo A"
 *               procedimientos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Procedimiento 1"
 *     responses:
 *       200:
 *         description: Grupo actualizado exitosamente
 *       404:
 *         description: Grupo no encontrado
 */
router.put('/:nombre', gruposController.actualizarGrupo);

// Eliminar un grupo por nombre
/**
 * @swagger
 * /grupo/{nombre}:
 *   delete:
 *     summary: Eliminar un grupo por nombre
 *     tags: ["Grupos"]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del grupo a eliminar.
 *     responses:
 *       200:
 *         description: Grupo eliminado exitosamente
 *       404:
 *         description: Grupo no encontrado
 */
router.delete('/:nombre', gruposController.desactivarGrupo);

module.exports = router;

