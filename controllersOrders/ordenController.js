// controllers/ordenesController.js
const logic = require('../logicOrders/ordenLogic'); // Ajusta la ruta según tu estructura

const obtenerOrdenes = async (req, res) => {
  const { numeroIdentificacion } = req.params;

  try {
    const ordenes = await logic.obtenerOrdenesPorNumeroIdentificacion(numeroIdentificacion);
    res.json(ordenes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  obtenerOrdenes,
};
