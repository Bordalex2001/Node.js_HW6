import { log } from "node:console";
import http from "node:http";
import path from "node:path";
import url from "node:url";
import fs from "node:fs";
import querystring from "node:querystring";
const PORT = 3000;

const server = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    switch(myUrl.pathname){
        case '/':
            res.write(
                fs.readFileSync(
                    path.join(import.meta.dirname, "public", "pages", "index.html")
            ));
            res.end();
            break;
        case '/form':
            if(req.method === 'GET'){
                res.write(
                    fs.readFileSync(
                        path.join(import.meta.dirname, "public", "pages", "form.html")
                ));
                res.end();
            }
            else if(req.method === 'POST'){
                let body = '';

                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', () => {
                    const parsedData = querystring.parse(body);
                    const { login, password } = parsedData;
         
                    console.log(`Login: ${login}, Password: ${password}`);
        
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                    res.end('Authorization completed successfully!');
                });
            };
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain;' });
            res.end(`Page not found`);
            break;
    }
});

server.listen(PORT, () => {
    log(`Server is running http://localhost:${PORT}`);
});