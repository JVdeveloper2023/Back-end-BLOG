require('dotenv').config();
const { conection } = require('./dataBase/conection');
const express = require('express')
const cors = require('cors')

//Iniciar App
console.log("App Iniciada------!");

// Conectar Base de Datos
conection();

//Crear servidor Node

const app = express()
const port = process.env.PORT

//Configurar Cors
 app.use(cors())

// Convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
const routes_article  = require('./routes/article');

//Cargo las rutas
 app.use('/api',routes_article);



//Crear servidor y escuchar peticiones http
app.listen(port,() => {
    console.log(`API RESTful ok y ejecutandose en el puerto ${port} `);

})