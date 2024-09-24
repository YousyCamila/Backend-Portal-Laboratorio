const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).send('Token no proporcionado');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token no válido');
    req.user = user;
    next();
  });
};

// Usar este middleware en rutas protegidas
app.get('/api/protegida', verifyToken, (req, res) => {
  res.send('Esta es una ruta protegida');
});
