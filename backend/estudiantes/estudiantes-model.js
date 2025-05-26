const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  programa: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
