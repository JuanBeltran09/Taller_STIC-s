const express = require('express');
const router = express.Router();
const controller = require('./reportes-controller');

router.get('/sala-mas-usada', controller.salaMasUsada);
router.get('/semanal', controller.prestamosSemanales);
router.get('/mensual', controller.prestamosMensuales);
router.get('/estudiantes-frecuentes', controller.estudiantesFrecuentes);

module.exports = router;
