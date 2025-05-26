const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  capacidad: { type: Number, required: true },
  ubicacion: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Aula', aulaSchema);
