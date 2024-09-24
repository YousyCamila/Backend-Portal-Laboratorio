const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modelsPersona/userModels'); 

// Función para iniciar sesión
const login = async (req, res) => {
  const { username, password } = req.body; // Cambia a username si es necesario

  try {
    const user = await User.findOne({ username }); // Cambia a email si el campo es 'email'
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar la función de inicio de sesión
module.exports = { login };

