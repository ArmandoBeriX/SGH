class Teacher {
    constructor({ 
      id,
      nombre,      // Nombre del profesor (string)
      dueño,       // ID del usuario dueño (string)
      asignatura   // Asignatura que imparte (string o objeto mínimo)
    }) { 
      this.id = id;
      this.nombre = nombre;
      this.dueño = dueño;
      this.asignatura = asignatura;
  
      this._validate();  // Validación al crear la entidad
    }
  
    // Validación de campos obligatorios
    _validate() {
      if (!this.nombre || !this.dueño || !this.asignatura) {
        throw new Error("[Teacher] nombre, dueño y asignatura son requeridos");
      }
    }
  
    // Verifica si un usuario puede editar este profesor
    canBeEditedBy(userId) {
      return this.dueño === userId;
    }
  }
  
  module.exports = Teacher;