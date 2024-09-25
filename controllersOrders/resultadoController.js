const logic = require('../logicOrders/resultadoLogic');

const crearResultado = async (req, res) => {
  try {
    const resultado = await logic.crearResultado(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarResultados = async (req, res) => {
  try {
    const resultados = await logic.obtenerResultados();
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerResultadoPorPrueba = async (req, res) => {
  try {
    const { prueba } = req.params;
    const resultado = await logic.obtenerResultadoPorPrueba(prueba);
    res.json(resultado);
  } catch (err) {
    res.status(404).json({ error: 'Resultado no encontrado' });
  }
};

const actualizarResultado = async (req, res) => {
  try {
    const { prueba } = req.params;
    const resultado = await logic.actualizarResultado(prueba, req.body);
    res.json(resultado);
  } catch (err) {
    res.status(404).json({ error: 'Resultado no encontrado' });
  }
};

const eliminarResultado = async (req, res) => {
  try {
    const { prueba } = req.params;
    const resultado = await logic.eliminarResultado(prueba);
    res.json(resultado);
  } catch (err) {
    res.status(404).json({ error: 'Resultado no encontrado' });
  }
};

module.exports = {
  crearResultado,
  listarResultados,
  obtenerResultadoPorPrueba,
  actualizarResultado,
  eliminarResultado,
};
