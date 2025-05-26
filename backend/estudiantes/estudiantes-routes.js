const express = require('express');
const router = express.Router();
const controller = require('./estudiantes-controller');

router.get('/', controller.getEstudiantes);
router.post('/', controller.createEstudiante);
router.put('/:id', controller.updateEstudiante);
router.delete('/:id', controller.deleteEstudiante);

module.exports = router;
