// Después de los middlewares básicos
var userRoutes = require('./routes/userRoutes');
var cors = require('cors');
var morgan = require('morgan');
var express = require('express');
//app.use('/api/users', userRoutes);
// Agregar al inicio del archivo
//app.use(cors()); // Habilitar CORS
//app.use(morgan('dev')); // Logging de solicitudes
var app = express();
require('dotenv').config();
// Middlewares básicos
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear formularios
// Ruta de prueba
app.get('/', function (req, res) {
    res.send('<mark>¡Backend funciona!');
});
// Manejo de errores
app.use(function (req, res, next) {
    var error = new Error('Recurso no encontrado');
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// Configurar puerto
var PORT = process.env.PORT || 3000;
// Iniciar servidor
app.listen(PORT, function () {
    console.log("Servidor corriendo en http://localhost:".concat(PORT));
});
