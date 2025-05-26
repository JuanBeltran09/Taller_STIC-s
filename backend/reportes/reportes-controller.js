const mongoose = require('mongoose');
const Prestamo = require('./models/prestamo'); // importar modelo de préstamo

// Sala con mayor frecuencia de préstamo
exports.salaMasUsada = async (req, res) => {
  const resultado = await Prestamo.aggregate([
    { $group: { _id: "$aulaId", total: { $sum: 1 } } },
    { $sort: { total: -1 } },
    { $limit: 1 }
  ]);
  res.json(resultado);
};

// Préstamos semanales
exports.prestamosSemanales = async (req, res) => {
  const unaSemanaAtras = new Date();
  unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);

  const resultado = await Prestamo.find({ fecha: { $gte: unaSemanaAtras } });
  res.json(resultado);
};

// Préstamos mensuales
exports.prestamosMensuales = async (req, res) => {
  const unMesAtras = new Date();
  unMesAtras.setMonth(unMesAtras.getMonth() - 1);

  const resultado = await Prestamo.find({ fecha: { $gte: unMesAtras } });
  res.json(resultado);
};

// Estudiantes con más uso
exports.estudiantesFrecuentes = async (req, res) => {
  const resultado = await Prestamo.aggregate([
    { $group: { _id: "$estudianteId", total: { $sum: 1 } } },
    { $sort: { total: -1 } }
  ]);
  res.json(resultado);
};
