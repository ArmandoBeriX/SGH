const express = require('express');
const router = express.Router();
const TeacherController = require('./infraestructure/teacher.controller');
const TeacherService = require('./application/teacher.service');
const TeacherRepository = require('./infrastructure/MongoTeacherRepository'); // O el repositorio que uses

// Inyección de dependencias
const teacherRepository = new TeacherRepository();
const teacherService = new TeacherService(teacherRepository);
const teacherController = new TeacherController(teacherService);

// Middleware para validar autenticación (ejemplo)
const authenticate = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autorizado' });
  next();
};

// Rutas
router.post('/', authenticate, (req, res) => teacherController.create(req, res));
router.get('/:id', authenticate, (req, res) => teacherController.getById(req, res));
router.put('/:id', authenticate, (req, res) => teacherController.update(req, res));
router.delete('/:id', authenticate, (req, res) => teacherController.delete(req, res));

// Otras rutas personalizadas (ej: obtener profesores por dueño)
router.get('/dueño/:userId', authenticate, (req, res) => teacherController.getByOwner(req, res));

module.exports = router;
