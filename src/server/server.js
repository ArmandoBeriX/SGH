const express = require('express');
const path = require('path');

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, '../public'))); // Ruta ajustada
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api/teachers', require('../api/Teacher/teacher.routes'));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;