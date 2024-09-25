import { log } from "node:console";
import http from "node:http";
import path from "node:path";
import url from "node:url";
import fs from "node:fs";
const PORT = 3000;

const mimeTypes = {
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpg"
}

const getStaticFile = (res, filePath, ext) => {
    res.setHeader("Content-Type", mimeTypes[ext]);
    fs.readFile(path.join(".", "public", filePath), (err, data) => {
        if (err){
            res.statusCode = 404;
            res.end();
        }
        else{
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    const queryParams = url.parse(req.url, true).query;
    const url = req.url;
    console.log(queryParams);
    switch(url){
        case '/':
            res.write(
                fs.readFileSync(
                    path.join(import.meta.dirname, "public", "pages", "index.html")
            ));
            res.end();
            break;
        case '/contacts':
            res.write(
                fs.readFileSync(
                    path.join(import.meta.dirname, "public", "pages", "contacts.html")
            ));
            res.end();
            break;
        case '/products':
            console.log(req.url.querystring);
            res.write(
                fs.readFileSync(
                    path.join(import.meta.dirname, "public", "pages", "form.html")
            ));
            res.end();
            break;
        default:
            const ext = path.extname(url);
            if(ext in mimeTypes){
                getStaticFile(res, url, ext);
            }
            else{
                res.statusCode = 404;
                res.end();
            }
            break;
    }
});

server.listen(PORT, () => {
    log(`Server is running http://localhost:${PORT}`);
});