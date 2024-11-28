const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Importa el paquete cors

const app = express();

// Configuración para el uso de peticiones POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Para manejar datos JSON

// Habilita CORS para todas las rutas
app.use(cors());

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Crear la conexión
const db = mysql.createConnection({
    host: 'localhost', // server
    user: 'root', // usuario de la DB
    password: '', // pass de tu DB
    database: 'fes_aragon3', // nombre de la base de datos
    port: 3306 // puerto
});

// Comprobación de la conexión de la base de datos
db.connect(err => {
    if (err) {
        console.log(`Error en la conexión de base de datos BB ${err}`);
    } else {
        console.log(`Conexión exitosa de la base de datos`);
    }
});

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Servir el archivo HTML con el formulario
});

// Agregar
app.post('/agregar', (req, res) => {
    const { nombre, apellido, email, telefono, direccion, genero, curso, cuenta } = req.body; // Obtener los datos del formulario
    // Comando SQL para insertar datos
    const sql = 'INSERT INTO estudiantes (nombre, apellido, email, telefono, direccion, genero, curso, cuenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // Ejecutar el comando SQL
    db.query(sql, [nombre, apellido, email, telefono, direccion, genero, curso, cuenta], (err, result) => {
        if (err) {
            console.error(`Error al insertar datos: ${err.message}`);
            res.status(500).send('Hubo un error al agregar el estudiante');
        } else {
            // Después de agregar el estudiante, obtenemos la lista de estudiantes
            const sqlGet = 'SELECT * FROM estudiantes';
            db.query(sqlGet, (err, results) => {
                if (err) {
                    console.error('Error al obtener la lista de estudiantes:', err.message);
                    res.status(500).send('Hubo un error al obtener la lista de estudiantes');
                } else {
                    // Enviamos la lista actualizada de estudiantes como respuesta
                    res.json(results);
                }
            });
        }
    });
});

// Listar estudiantes
app.get('/listar', (req, res) => {
    const sql = 'SELECT * FROM estudiantes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(`Error al listar estudiantes: ${err.message}`);
            res.status(500).send('Hubo un error al listar los estudiantes');
        } else {
            res.json(results); 
        }
    });
});

// Editar estudiante
app.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, genero, curso, cuenta } = req.body;
    const sql = `UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, genero = ?, curso = ?, cuenta = ? WHERE id = ?`;
    db.query(sql, [nombre, apellido, email, telefono, direccion, genero, curso, cuenta, id], (err, result) => {
        if (err) {
            console.error(`Error al editar estudiante: ${err.message}`);
            res.status(500).send('Hubo un error al editar el estudiante');
        } else {
            console.log('Estudiante editado:', result);
            res.send('Estudiante editado exitosamente');
        }
    });
});

// Eliminar estudiante
app.post('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM estudiantes WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(`Error al eliminar estudiante: ${err.message}`);
            res.status(500).send('Hubo un error al eliminar el estudiante');
        } else {
            console.log('Estudiante eliminado:', result);
            res.send('Estudiante eliminado exitosamente');
        }
    });
});

// Iniciar el servidor
const port = 3009;
app.listen(port, () => {
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});