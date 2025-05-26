const Aula = require('./aulas-model');

// Obtener todas las aulas
exports.getAllAulas = async (req, res) => {
  try {
    const aulas = await Aula.find();
    res.json(aulas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las aulas' });
  }
};

// Crear una nueva aula
exports.createAula = async (req, res) => {
  try {
    const { nombre, capacidad, ubicacion } = req.body;
    const nuevaAula = new Aula({ nombre, capacidad, ubicacion });
    await nuevaAula.save();
    res.status(201).json(nuevaAula);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear el aula' });
  }
};

// Actualizar aula
exports.updateAula = async (req, res) => {
  try {
    const { id } = req.params;
    const aulaActualizada = await Aula.findByIdAndUpdate(id, req.body, { new: true });
    if (!aulaActualizada) return res.status(404).json({ error: 'Aula no encontrada' });
    res.json(aulaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el aula' });
  }
};

// Eliminar aula
exports.deleteAula = async (req, res) => {
  try {
    const { id } = req.params;
    const aulaEliminada = await Aula.findByIdAndDelete(id);
    if (!aulaEliminada) return res.status(404).json({ error: 'Aula no encontrada' });
    res.json({ mensaje: 'Aula eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el aula' });
  }
};
