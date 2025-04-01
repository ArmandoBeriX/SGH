// Después de los middlewares básicos
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');


//app.use('/api/users', userRoutes);


// Agregar al inicio del archivo
//app.use(cors()); // Habilitar CORS
//app.use(morgan('dev')); // Logging de solicitudes

const app = express();
require('dotenv').config();

// Middlewares básicos
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear formularios

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error('Recurso no encontrado');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Configurar puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});