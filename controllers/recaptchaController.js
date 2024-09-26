const axios = require('axios');

// Controlador para verificar reCAPTCHA
const verifyRecaptcha = async (req, res) => {
    const { recaptchaValue } = req.body;

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET, // Asegúrate de que esta variable esté en tu .env
                response: recaptchaValue,
            },
        });

        const { success } = response.data;

        if (success) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: 'Error en reCAPTCHA' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al verificar reCAPTCHA' });
    }
};

module.exports = { verifyRecaptcha };
