const mongoose = require('mongoose');

// Definir el esquema de MongoDB
const teacherSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del profesor es obligatorio'],
    trim: true,
  },
  dueño: {
    type: mongoose.Schema.Types.ObjectId, // Relación con colección 'User'
    ref: 'User', // Referencia al modelo de usuario
    required: [true, 'El dueño (usuario) es obligatorio'],
  },
  asignatura: {
    type: String,
    required: [true, 'La asignatura es obligatoria'],
    enum: ['Matemáticas', 'Física', 'Programación'], // Opcional: valores permitidos
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

// Middlewares/hooks (opcional)
teacherSchema.pre('save', function (next) {
  console.log(`Guardando profesor: ${this.nombre}`);
  next();
});

// Métodos personalizados (opcional)
teacherSchema.methods.marcarComoInactivo = function () {
  this.activo = false;
  return this.save();
};

// Crear el modelo
const TeacherModel = mongoose.model('Teacher', teacherSchema);

module.exports = TeacherModel;