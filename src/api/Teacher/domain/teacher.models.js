class Teacher {
  constructor({ id, nombre, asignatura }) {
    this.id = id;
    this.nombre = nombre;
    this.asignatura = asignatura;
    this.fechaCreacion = new Date().toISOString();
  }

  validate() {
    if (!this.nombre || !this.asignatura) {
      throw new Error("Nombre y asignatura son requeridos");
    }
  }
}

module.exports = Teacher;