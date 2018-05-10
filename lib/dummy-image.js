const puppeteer = require('puppeteer');
const server = require('./dummy-image-server');

const toUrlParam = function (option) {
    let prop = '';
    let param = '?';

    for (prop in option) {
        if (!option.hasOwnProperty(prop)) {
            continue;
        }

        param += `${prop}=${encodeURIComponent(option[prop])}&`;
    }

    return param;
};

class DummyImage {
    constructor (option) {
        this.lodalhost = 'http://localhost';
        this.option = {
            'port': 1000,
            'text': '',
            'font-family': 'sans-serif',
            'font-size': 24,
            'width': 640,
            'height': 400,
            'color': '#fff',
            'background-color': '#ccc'
        };
        this.browser = {};
        this.page = {};

        this.create(option || {});
    }

    create (option) {
        Object.assign(this.option, option);
    }

    write (filePath) {
        server.create(this.option.port);

        puppeteer.launch().then((browser) => {
            this.browser = browser;

            return browser.newPage();
        }).then((page) => {
            this.page = page;

            return page.goto(`${this.lodalhost}:${this.option.port}/${toUrlParam(this.option)}`);
        }).then(() => {
            this.page.setViewport({
                width: this.option.width,
                height: this.option.height
            });

            return this.page.screenshot({
                path: filePath
            });
        }).then(() => {
            return this.browser.close();
        }).catch((error) => {
            console.error(error);
        }).then(() => {
            server.close();
        });
    }
}

module.exports = DummyImage;
