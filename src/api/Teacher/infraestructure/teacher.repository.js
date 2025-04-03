const fs = require('fs');
const path = require('path');
const Teacher = require('../domain/teacher.models');

const DB_PATH = path.join(__dirname, '../../../database/teachers.json');

class TeacherRepository {
  constructor() {
    this._initDB();
  }

  _initDB() {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
  }

  _readDB() {
    return JSON.parse(fs.readFileSync(DB_PATH));
  }

  _writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  }

  async save(teacher) {
    const teachers = this._readDB();
    teachers.push(teacher);
    this._writeDB(teachers);
    return teacher;
  }

  async findAll() {
    return this._readDB();
  }

  async findById(id) {
    const teachers = this._readDB();
    return teachers.find(t => t.id === id);
  }

  async update(id, newData) {
    const teachers = this._readDB();
    const index = teachers.findIndex(t => t.id === id);
    if (index === -1) return null;
    teachers[index] = { ...teachers[index], ...newData };
    this._writeDB(teachers);
    return teachers[index];
  }

  async delete(id) {
    const teachers = this._readDB();
    const filtered = teachers.filter(t => t.id !== id);
    this._writeDB(filtered);
    return true;
  }
}

module.exports = TeacherRepository;