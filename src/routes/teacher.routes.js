const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacher.controller');

// Middleware de autenticación (opcional)
const authenticate = require('../middlewares/authenticate');

// Definición de rutas
router.post('/', authenticate, TeacherController.createTeacher); // POST /api/teachers
router.get('/', TeacherController.getAllTeachers);              // GET /api/teachers
router.get('/:id', TeacherController.getTeacherById);           // GET /api/teachers/:id
router.put('/:id', authenticate, TeacherController.updateTeacher); // PUT /api/teachers/:id
router.delete('/:id', authenticate, TeacherController.deleteTeacher); // DELETE /api/teachers/:id

module.exports = router;