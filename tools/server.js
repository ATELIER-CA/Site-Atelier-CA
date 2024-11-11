import http from 'node:http';
import app from './src/app.js';

const PORT = 2419;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Atelier-CA CMS started on : ${PORT} !`);
});

