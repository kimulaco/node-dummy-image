const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

class Server {
    constructor () {
        this.server = http.createServer();
        this.request = {};
    }

    create (port) {
        this.server.on('request', (request, response) => {
            let Response = this.initResponse(response);
            let uri = url.parse(request.url).pathname;

            if (fs.statSync(uri).isDirectory()) {
                uri = path.join(uri, './lib/api/');
            }

            let filePath = path.join(process.cwd(), uri);

            this.request = request;

            try {
                fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
            } catch (error) {
                Response['404']();
            }

            if (fs.statSync(filePath).isDirectory()) {
                filePath = path.join(filePath, '/index.html');
            }

            fs.readFile(filePath, 'binary', (error, file) => {
                if (error) {
                    Response['500'](error);
                    return;
                }

                Response['200'](file, filePath);
            });
        }).listen(parseInt(port, 10));

        console.log(`Server running at http://localhost:${port}`);
    }

    close () {
        this.server.close();
        this.request.connection.end();
        this.request.connection.destroy();
        console.log(`Server closed at http://localhost:${port}`);
    }

    initResponse (response) {
        return {
            '200': (file) => {
                response.writeHead(200, {
                    'Access-Control-Allow-Origin':'*',
                    'Pragma': 'no-cache',
                    'Cache-Control' : 'no-cache'
                });
                response.write(file, 'binary');
                response.end();
            },
            '404': () => {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write('404 Not Found\n');
                response.end();
            },
            '500': (error) => {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.write(error + '\n');
                response.end();
            }
        };
    }
}

module.exports = new Server();
