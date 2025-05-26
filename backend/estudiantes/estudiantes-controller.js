const Estudiante = require('./estudiantes-model');

// GET all
exports.getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    const saved = await nuevoEstudiante.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
exports.updateEstudiante = async (req, res) => {
  try {
    const updated = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteEstudiante = async (req, res) => {
  try {
    await Estudiante.findByIdAndDelete(req.params.id);
    res.json({ message: 'Estudiante eliminado' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
