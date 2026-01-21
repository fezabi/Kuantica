const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketing.controller');

router.get('/health', marketingController.getHealth);

/**
 * @swagger
 * /marketing/fct_contactos_diarios:
 *   get:
 *     summary: Get Daily Contact Metrics
 *     tags: [Marketing]
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
 *         name: contacto_key
 *         schema:
 *           type: string
 *         description: Filter by contact key
 *       - in: query
 *         name: fecha_contacto_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Start contact date
 *       - in: query
 *         name: fecha_contacto_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: End contact date
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
 *         name: es_nuevo_contacto
 *         schema:
 *           type: boolean
 *         description: Filter by new contact status
 *     responses:
 *       200:
 *         description: Contact metrics data
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
router.get('/fct_contactos_diarios', marketingController.getFctContactosDiarios);

/**
 * @swagger
 * /marketing/fct_inversion_diaria:
 *   get:
 *     summary: Get Daily Investment Metrics
 *     tags: [Marketing]
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
 *         name: fecha_inversion_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Start investment date
 *       - in: query
 *         name: fecha_inversion_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: End investment date
 *       - in: query
 *         name: proyecto_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *     responses:
 *       200:
 *         description: Investment metrics data
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
router.get('/fct_inversion_diaria', marketingController.getFctInversionDiaria);

module.exports = router;
