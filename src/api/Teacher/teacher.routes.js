const express = require('express');
const router = express.Router();
const TeacherController = require('./infraestructure/teacher.controller');

router.post('/', TeacherController.create);
router.get('/', TeacherController.getAll);
router.get('/:id', TeacherController.getById);
router.put('/:id', TeacherController.update);
router.delete('/:id', TeacherController.delete);

module.exports = router;