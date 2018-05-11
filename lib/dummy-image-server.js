const fs = require('fs');
const http = require('http');
const ejs = require('ejs');

class Server {
    constructor () {
        this.server = http.createServer();
        this.request = {};
        this.view = './lib/view/index.ejs';
        this.option = {};
    }

    create (option) {
        this.option = option;

        this.server.on('request', (request, response) => {
            let Response = this.initResponse(response);

            this.request = request;

            try {
                fs.accessSync(this.view, fs.constants.R_OK | fs.constants.W_OK);
            } catch (error) {
                Response['404']();
            }

            fs.readFile(this.view, 'binary', (error, source) => {
                if (error) {
                    Response['500'](error);

                    return;
                }

                Response['200'](source, this.view);
            });
        }).listen(parseInt(option.port, 10));
    }

    close () {
        this.server.close();
        this.request.connection.end();
        this.request.connection.destroy();
    }

    initResponse (response) {
        return {
            '200': (template) => {
                let source = ejs.render(template, {
                    param: this.option.param
                });

                response.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'text/html'
                });
                response.write(source, 'binary');
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

module.exports = Server;
