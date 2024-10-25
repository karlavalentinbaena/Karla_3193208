//Importar mmodulo http incluido en node
const http = require('http');
//definir puerto del servidor
const port = 3006;

//crear servidor
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Karla Valentin Baena - 319320866')
    
});

server.listen(port, ()=>{
    console.log(`El servidor se encuentra en http://localhost:${port}`);
});
