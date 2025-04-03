const Teacher = require('../domain/teacher.models');
const TeacherRepository = require('./teacher.repository');

const repository = new TeacherRepository();

class TeacherController {
  async create(req, res) {
    try {
      const { nombre, asignatura } = req.body;
      const teacher = new Teacher({ id: Date.now().toString(), nombre, asignatura });
      teacher.validate();
      const savedTeacher = await repository.save(teacher);
      res.status(201).json(savedTeacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    const teachers = await repository.findAll();
    res.json(teachers);
  }

  async getById(req, res) {
    const teacher = await repository.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Profesor no encontrado" });
    res.json(teacher);
  }

  async update(req, res) {
    try {
      const updated = await repository.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Profesor no encontrado" });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const success = await repository.delete(req.params.id);
    if (!success) return res.status(404).json({ error: "Profesor no encontrado" });
    res.status(204).send();
  }
}

module.exports = new TeacherController();