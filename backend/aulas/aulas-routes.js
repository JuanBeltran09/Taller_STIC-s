const express = require('express');
const router = express.Router();
const aulasController = require('./aulas-controller');

router.get('/', aulasController.getAllAulas);
router.post('/', aulasController.createAula);
router.put('/:id', aulasController.updateAula);
router.delete('/:id', aulasController.deleteAula);

module.exports = router;
