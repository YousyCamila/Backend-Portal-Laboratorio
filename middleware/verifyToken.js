// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Se requiere un token para acceder a esta ruta.' });
    }

    const tokenValue = token.split(' ')[1];
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }
        req.userId = decoded.id; // Guardar el ID del usuario en la solicitud
        next();
    });
};

module.exports = verifyToken;
