// require('dotenv').config();
// const mongoose = require('mongoose');
// const Orden = require('../models/ordenModels'); // Asegúrate de que la ruta es correcta
// const Paciente = require('../models/pacienteModels'); // Asegúrate de que la ruta es correcta

// const seedOrdenes = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     console.log("Conexión a la base de datos exitosa");

//     // Limpiar órdenes existentes
//     await Orden.deleteMany({}); 

//     // Obtener todos los pacientes
//     const pacientes = await Paciente.find(); 

//     // Verificar si hay pacientes en la base de datos
//     if (pacientes.length === 0) {
//       console.log("No hay pacientes en la base de datos.");
//       return;
//     }

//     // Sembrar 10 órdenes para cada paciente
//     for (const paciente of pacientes) {
//       for (let i = 0; i < 10; i++) {
//         const orden = new Orden({
//           grupo: "Química sanguínea",
//           procedimientos: ["Glucometría", "Hierro total", "Triglicéridos"],
//           resultados: [
//             {
//               prueba: "Glucometría",
//               resultado: Math.random() > 0.5 ? "Normal" : "Alterado"
//             },
//             {
//               prueba: "Hierro total",
//               resultado: Math.random() > 0.5 ? "Normal" : "Bajo"
//             },
//             {
//               prueba: "Triglicéridos",
//               resultado: Math.random() > 0.5 ? "Normal" : "Alto"
//             }
//           ],
//           paciente: paciente._id // Relacionar la orden con el paciente
//         });

//         await orden.save(); // Guardar la orden
//       }
//     }

//     console.log("Órdenes sembradas con éxito");
//   } catch (error) {
//     console.error("Error al sembrar la base de datos:", error);
//   } finally {
//     await mongoose.connection.close(); // Cerrar la conexión al final
//   }
// };

// module.exports = seedOrdenes; // Exportar la función
