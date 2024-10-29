const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

let formDataList = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/formulario', (req, res) => {
    res.sendFile(__dirname + '/public/formulario.html');
});

app.post('/formulario', (req, res) => {
    formDataList.push(req.body);
    res.status(200).send('Datos recibidos correctamente');
});

app.get('/informacion', (req, res) => {
    let tableRows = formDataList.map((data, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${data.nombre}</td>
            <td>${data.email}</td>
        </tr>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Datos Recabados</title>
            <link rel="stylesheet" href="styles/style.css">
        </head>
        <body>
            <h1>Datos Recabados</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
                ${tableRows}
            </table>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});
