const express = require('express');
const cors = require("cors");
const dbConnection = require("../database/config.database");

class ServerModel {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath = '/api/categorias';
        // Conexión a la base de datos
        this.connectarDB();
        // middlewares
        this.middlewares()
        // routes
        this.routes();
    }

    async connectarDB(){
        await dbConnection();
    }

    //aqui se especifican los middlewares o las carpetas que contienen los archivos public
    middlewares() {
        this.app.use(cors());//permite que se puedan hacer peticiones desde cualquier lugar
        // Lectura y Parseo del body
        // cualquier informacion que venga en la peticion la va a intentar serializar a json
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        //aqui se especifica la ruta de la carpeta usuarios
        this.app.use(this.authPath, require('../routes/auth.route'));
        this.app.use(this.usuariosPath, require('../routes/usuarios.route'));
        this.app.use(this.categoriasPath, require('../routes/categorias.route'));
        // y el archivo que se va a utilizar
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = ServerModel;