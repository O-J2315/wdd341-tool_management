const express = require('express');
const router = express.Router();

const powerToolsRoutes = require('./powerTools');
const handToolsRoutes = require('./handTools');

router.use('/power-tools', powerToolsRoutes);
router.use('/hand-tools', handToolsRoutes);

module.exports = router;