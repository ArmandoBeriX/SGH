const Teacher = require('../domain/teacher.models');
// Si usas casos de uso, importa tu servicio aquí:
// const TeacherService = require('../application/teacher.service');

class TeacherController {
  constructor(teacherService) {
    this.teacherService = teacherService; // Inyección de dependencias
  }

  // Ejemplo: Crear un profesor
  async createTeacher(req, res) {
    try {
      const { nombre, dueño, asignatura } = req.body;

      // 1. Crea la entidad Teacher (validación ocurre aquí)
      const newTeacher = new Teacher({
        id: generateId(), // Usa UUID o tu lógica de ID
        nombre,
        dueño,
        asignatura,
      });

      // 2. Persistir (ejemplo con un servicio)
      const savedTeacher = await this.teacherService.createTeacher(newTeacher);

      // 3. Respuesta
      res.status(201).json(savedTeacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Ejemplo: Obtener profesor por ID (solo si el dueño tiene permisos)
  async getTeacherById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Asume que el usuario está autenticado

      const teacher = await this.teacherService.getTeacherById(id);

      // Verifica permisos
      if (!teacher.canBeEditedBy(userId)) {
        return res.status(403).json({ error: "No tienes permisos" });
      }

      res.status(200).json(teacher);
    } catch (error) {
      res.status(404).json({ error: "Profesor no encontrado" });
    }
  }

  // Otros métodos: updateTeacher, deleteTeacher, etc.
}

module.exports = TeacherController;