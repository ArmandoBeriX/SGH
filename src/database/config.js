// Configuración para MongoDB
const mongoose = require('mongoose');
const { Database } = require('better-sqlite3');
const path = require('path');

module.exports = {
  // === MongoDB ===
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/escuela',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    connect: async () => {
      try {
        await mongoose.connect(this.mongo.uri, this.mongo.options);
        console.log('✅ MongoDB conectado');
      } catch (error) {
        console.error('❌ Error en MongoDB:', error.message);
      }
    },
    disconnect: async () => mongoose.disconnect(),
  },

  // === SQLite ===
  sqlite: {
    path: path.join(__dirname, '../../data/teachers.db'),
    connect: () => {
      try {
        const db = new Database(this.sqlite.path);
        db.pragma('journal_mode = WAL');
        console.log('✅ SQLite conectado');
        return db; // Retorna la instancia para usarla en repositorios
      } catch (error) {
        console.error('❌ Error en SQLite:', error.message);
      }
    },
    disconnect: (db) => db.close(),
  },

  // === Inicializar todas las conexiones ===
  init: async () => {
    await this.mongo.connect();
    const sqliteDB = this.sqlite.connect();
    return { mongo: mongoose, sqlite: sqliteDB }; // Retorna las instancias
  },
};