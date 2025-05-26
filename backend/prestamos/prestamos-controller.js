const Prestamo = require('./prestamos-model');

exports.getAll = async (req, res) => {
  const prestamos = await Prestamo.find().populate('estudianteId aulaId');
  res.json(prestamos);
};

exports.create = async (req, res) => {
  const nuevoPrestamo = new Prestamo(req.body);
  await nuevoPrestamo.save();
  res.status(201).json(nuevoPrestamo);
};

exports.update = async (req, res) => {
  const actualizado = await Prestamo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
};

exports.delete = async (req, res) => {
  await Prestamo.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
