const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('run server ...');
    res.write('<h1>Hello world!!!</h1>');
    res.end();
})

server.listen(port, () => {
    console.log(`your website --> http://localhost:${port}`);
})