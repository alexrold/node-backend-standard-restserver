require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //* Middlewares
    this.middlewares();

    //* Routes app
    this.routes();
  }

  middlewares() {
    //* cors
    this.app.use(cors());

    //* lectura y parseo del body
    this.app.use(express.json());

    //* Directorio Publico
    this.app.use(express.static(`public`));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
module.exports = Server;
