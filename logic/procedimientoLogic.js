// logic/procedimientoLogic.js
const Procedimiento = require('../models/procedimientoModels');

const crearProcedimiento = async (data) => {
  const procedimiento = new Procedimiento(data);
  await procedimiento.save();
  return procedimiento;
};

const listarProcedimientos = async () => {
  return await Procedimiento.find();
};

const obtenerProcedimientoPorNombre = async (nombre) => {
  return await Procedimiento.findOne({ nombre });
};

const actualizarProcedimiento = async (nombre, data) => {
  return await Procedimiento.findOneAndUpdate({ nombre }, data, { new: true });
};

const desactivarProcedimiento = async (nombre) => {
  return await Procedimiento.findOneAndUpdate({ nombre }, { activo: false }, { new: true });
};

module.exports = {
  crearProcedimiento,
  listarProcedimientos,
  obtenerProcedimientoPorNombre,
  actualizarProcedimiento,
  desactivarProcedimiento,
};

