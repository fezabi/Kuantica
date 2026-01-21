const express = require('express');
const router = express.Router();
const commercialRoutes = require('./commercial.routes');
const executiveRoutes = require('./executive.routes');
const marketingRoutes = require('./marketing.routes');

router.use('/commercial', commercialRoutes);
router.use('/executive', executiveRoutes);
router.use('/marketing', marketingRoutes);

module.exports = router;
