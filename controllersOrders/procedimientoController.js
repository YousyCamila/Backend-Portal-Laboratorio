// controllers/procedimientoController.js
const logic = require('../logicOrders/procedimientoLogic');

const crearProcedimiento = async (req, res) => {
  try {
    const procedimiento = await logic.crearProcedimiento(req.body);
    res.status(201).json(procedimiento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarProcedimientos = async (req, res) => {
  const procedimientos = await logic.listarProcedimientos();
  res.json(procedimientos);
};

const obtenerProcedimientoPorNombre = async (req, res) => {
  const { nombre } = req.params;
  const procedimiento = await logic.obtenerProcedimientoPorNombre(nombre);
  if (!procedimiento) {
    return res.status(404).json({ error: 'Procedimiento no encontrado' });
  }
  res.json(procedimiento);
};

const actualizarProcedimiento = async (req, res) => {
  const { nombre } = req.params;
  const procedimiento = await logic.actualizarProcedimiento(nombre, req.body);
  if (!procedimiento) {
    return res.status(404).json({ error: 'Procedimiento no encontrado' });
  }
  res.json(procedimiento);
};

const desactivarProcedimiento = async (req, res) => {
  const { nombre } = req.params;
  const procedimiento = await logic.desactivarProcedimiento(nombre);
  if (!procedimiento) {
    return res.status(404).json({ error: 'Procedimiento no encontrado' });
  }
  res.json({ message: 'Procedimiento desactivado exitosamente' });
};

module.exports = {
  crearProcedimiento,
  listarProcedimientos,
  obtenerProcedimientoPorNombre,
  actualizarProcedimiento,
  desactivarProcedimiento,
};
