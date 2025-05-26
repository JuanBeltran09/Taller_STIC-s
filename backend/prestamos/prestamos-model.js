const mongoose = require('mongoose');

const PrestamoSchema = new mongoose.Schema({
  estudianteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    required: true
  },
  aulaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aula',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  motivo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);
