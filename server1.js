import http from "node:http";
import { log } from "node:console";
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    
    if(req.method === "GET"){
        res.end(JSON.stringify({ message: 'GET request received!' }));
    }
    else if(req.method === "POST"){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedBody = JSON.parse(body || '{}');
            res.end(JSON.stringify({ 
                message: 'POST request received!', 
                data: parsedBody 
            }));
        })
    }
    else{
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
});

server.listen(PORT, () => {
    log(`Server is running http://localhost:${PORT}`);
});