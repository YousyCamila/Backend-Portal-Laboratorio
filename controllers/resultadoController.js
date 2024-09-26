const logic = require('../logic/resultadoLogic');

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

const desactivarResultado = async (req, res) => {
  const { nombre } = req.params;

  try {
      const procedimiento = await logic.desactivarResultado(nombre);
      res.json({ message: 'Resultado desactivado exitosamente', procedimiento });
  } catch (err) {
      if (err.message === 'Resultado no encontrado') {
          return res.status(404).json({ error: 'Resultado no encontrado' });
      }
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
};


module.exports = {
  crearResultado,
  listarResultados,
  obtenerResultadoPorPrueba,
  actualizarResultado,
  desactivarResultado,
};
