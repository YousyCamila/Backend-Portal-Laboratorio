const logic = require('../logicOrders/grupoLogic'); // Asegúrate de que la ruta sea correcta
const { grupoSchemaValidation } = require('../validationsOrders/grupoValidations'); // Suponiendo que tienes un esquema de validación

// Controlador para listar todos los grupos
const listarGrupos = async (req, res) => {
    try {
        const grupos = await logic.obtenerGrupos();
        if (grupos.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(grupos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo grupo
const crearGrupo = async (req, res) => {
    const body = req.body;
    const { error, value } = grupoSchemaValidation.validate({
        nombre: body.nombre,
        // otros campos que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoGrupo = await logic.crearGrupo(value);
        res.status(201).json(nuevoGrupo);
    } catch (err) {
        if (err.message === 'El grupo ya existe con ese nombre.') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un grupo por nombre
const obtenerGrupoPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const grupo = await logic.obtenerGrupoPorNombre(nombre);
        res.json(grupo);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para actualizar un grupo por nombre
const actualizarGrupo = async (req, res) => {
    const { nombre } = req.params;
    const body = req.body;
    const { error, value } = grupoSchemaValidation.validate({
        nombre: body.nombre,
        // otros campos que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const grupoActualizado = await logic.actualizarGrupo(nombre, value);
        res.json(grupoActualizado);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Controlador para eliminar un grupo por nombre
const eliminarGrupo = async (req, res) => {
    const { nombre } = req.params;
    try {
        const result = await logic.eliminarGrupo(nombre);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarGrupos,
    crearGrupo,
    obtenerGrupoPorNombre,
    actualizarGrupo,
    eliminarGrupo,
};
