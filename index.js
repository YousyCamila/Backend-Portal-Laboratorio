const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');
dotenv.config(); // Carga las variables del archivo .env

connectDB();


// Swagger
const { swaggerUi, swaggerSpec } = require('./swagger/swagger'); // Swagger Spec
const swaggerUI = require('swagger-ui-express');

// Importar las rutas
const pacienteRoutes = require('./routesPersona/pacienteRoutes');
const profesionalesRoutes = require('./routesPersona/profesionalRoutes'); // Asegúrate de que la ruta sea correcta
const grupoRoutes = require('./routesOrders/grupoRoutes'); // Asegúrate de que la ruta sea correcta
const ordenRoutes = require('./routesOrders/ordenRoutes'); // Asegúrate de que la ruta sea correcta
const procedimientoRoutes = require('./routesOrders/procedimientoRoutes'); // Asegúrate de que la ruta sea correcta
const resultadoRoutes = require('./routesOrders/resultadoRoutes'); // Asegúrate de que la ruta sea correcta
const usersRoutes = require ('./routesPersona/usuarioRoutes');
const { verifyRecaptcha } = require('./controllersOrders/recaptchaController');

// Inicializar la aplicación Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
    origin: '*', // Ajusta esto con los dominios permitidos de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Rutas de Swagger para documentación
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Configurar rutas de API
app.use('/api/paciente', pacienteRoutes);
app.use('/api/profesional', profesionalesRoutes);
app.use('/api/grupo', grupoRoutes);
app.use('/api/orden', ordenRoutes);
app.use('/api/procedimiento', procedimientoRoutes);
app.use('/api/resultado', resultadoRoutes);
app.use('/api/users', usersRoutes);

app.post('/api/verify-recaptcha', verifyRecaptcha);


const port = 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('API REST ejecutándose correctamente...');
});


