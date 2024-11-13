const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app= express();
//configuracion para el uso peticiones post
app.use( bodyParser.urlencoded({extended:false}));

//platillas que sean dinamicas
//app.set('view engine','ejs');

//crear la conexion
const db = mysql.createConnection({
    host: 'localhost',//server
    user: 'root',//usuario de la DB
    password: '',//pass de tu DB
    database: 'fes_aragon3',//nombre de la base de datos
    port: 3306//puerto
});

//comprobacion de la conexion de la base de datos
db.connect(err=>{
    if(err){
        console.log(`Error en la conexion de base de datos BB ${err}`);
    }else {
        console.log(`Conexión exitosa de la base de datos`)    
    }
});

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Servir el archivo HTML con el formulario
});

app.post('/agregar', (req, res) => {
    const { nombre, apellido, email } = req.body; // Obtener los datos del formulario

    // Comando SQL para insertar datos
    const sql = 'INSERT INTO estudiantes (nombre, apellido, email) VALUES (?, ?, ?)';
    
    // Ejecutar el comando SQL
    db.query(sql, [nombre, apellido, email], (err, result) => {
        if (err) {
            console.error(`Error al insertar datos: ${err.message}`);
            res.status(500).send('Hubo un error al agregar el estudiante');
        } else {
            console.log('Estudiante agregado:', result);
            res.send('Estudiante agregado exitosamente');
        }
    });
});

//iniciamos el server

const port = 3009;
app.listen(port,()=>{
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});
