const express = require('express');
const router = express.Router();
const executiveController = require('../controllers/executive.controller');

router.get('/health', executiveController.getHealth);

/**
 * @swagger
 * /executive/rpt_gestion_diaria:
 *   get:
 *     summary: Get Daily Management Report
 *     tags: [Executive]
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
 *         name: fecha_analisis_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Start analysis date (YYYY-MM-DD)
 *       - in: query
 *         name: fecha_analisis_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: End analysis date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Management report data
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
router.get('/rpt_gestion_diaria', executiveController.getRptGestionDiaria);

module.exports = router;
