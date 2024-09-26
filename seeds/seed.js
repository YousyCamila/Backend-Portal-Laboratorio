// const mongoose = require('mongoose');
// const Orden = require('../models/Orden');
// const Paciente = require('../models/pacienteModels');

// // Conexión a la base de datos MongoDB
// mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('Conectado a MongoDB'))
//   .catch((err) => console.error('Error al conectar a MongoDB:', err));

// // Función para crear órdenes estáticas
// const seedOrdenes = async () => {
//     try {
//         // Buscar un paciente específico por su ID (ajustar con un ID existente)
//         const paciente = await Paciente.findOne({ numeroIdentificacion: '1234567890' }); // Cambia el número de identificación según tu paciente registrado

//         if (!paciente) {
//             console.log('Paciente no encontrado');
//             return;
//         }

//         // Crear una orden estática
//         const ordenesEstaticas = [
//             {
//                 grupo: 'Química Sanguínea',
//                 procedimientos: ['Glucosa', 'Colesterol', 'Triglicéridos'],
//                 resultados: [
//                     { prueba: 'Glucosa', resultado: '85 mg/dL' },
//                     { prueba: 'Colesterol', resultado: '200 mg/dL' },
//                     { prueba: 'Triglicéridos', resultado: '150 mg/dL' },
//                 ],
//                 paciente: paciente._id, // Asociar al paciente
//             },
//             {
//                 grupo: 'Hematología',
//                 procedimientos: ['Hemoglobina', 'Hematocrito'],
//                 resultados: [
//                     { prueba: 'Hemoglobina', resultado: '14 g/dL' },
//                     { prueba: 'Hematocrito', resultado: '42%' },
//                 ],
//                 paciente: paciente._id, // Asociar al paciente
//             }
//         ];

//         // Guardar las órdenes en la base de datos
//         await Orden.insertMany(ordenesEstaticas);
//         console.log('Órdenes estáticas creadas exitosamente');

//     } catch (err) {
//         console.error('Error al crear órdenes:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// // Ejecutar la función para crear órdenes estáticas
// seedOrdenes();
