const express = require('express');
const router = express.Router();
const commercialController = require('../controllers/commercial.controller');

/**
 * @swagger
 * /commercial/fct_funnel_diario:
 *   get:
 *     summary: Get Daily Funnel Report
 *     tags: [Commercial]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *       - in: query
 *         name: fecha_dato_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: fecha_dato_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: proyecto_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *     responses:
 *       200:
 *         description: Funnel report data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */
router.get('/fct_funnel_diario', commercialController.getFunnelDiario);

/**
 * @swagger
 * /commercial/fct_reservas_atribuidas:
 *   get:
 *     summary: Get Attributed Reservations
 *     tags: [Commercial]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *       - in: query
 *         name: fecha_reserva_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Start reservation date
 *       - in: query
 *         name: fecha_reserva_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: End reservation date
 *       - in: query
 *         name: proyecto_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *       - in: query
 *         name: rut_cliente
 *         schema:
 *           type: string
 *         description: Filter by client RUT
 *       - in: query
 *         name: estado_reserva
 *         schema:
 *           type: string
 *         description: Filter by reservation status
 *     responses:
 *       200:
 *         description: Reservations data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */
router.get('/fct_reservas_atribuidas', commercialController.getReservasAtribuidas);

/**
 * @swagger
 * /commercial/fct_reservas_por_mes:
 *   get:
 *     summary: Get Reservations by Month
 *     tags: [Commercial]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *       - in: query
 *         name: fecha_reserva_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Start reservation date
 *       - in: query
 *         name: fecha_reserva_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: End reservation date
 *       - in: query
 *         name: proyecto_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *       - in: query
 *         name: rut_cliente
 *         schema:
 *           type: string
 *         description: Filter by client RUT
 *       - in: query
 *         name: estado_reserva
 *         schema:
 *           type: string
 *         description: Filter by reservation status
 *     responses:
 *       200:
 *         description: Reservations by month data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/fct_reservas_por_mes', commercialController.getReservasPorMes);

module.exports = router;
