const puppeteer = require('puppeteer');
const Server = require('./dummy-image-server');

const getSizeByParam = function (param) {
    let size = param.split('/')[1].split('x');

    return {
        width: size[0],
        height: size[1]
    };
};

class DummyImage {
    constructor (option) {
        this.localhost = 'http://localhost';
        this.option = {
            port: 1000,
            param: '/640x400/999/fff/'
        };
        this.browser = {};
        this.page = {};

        this.create(option || {});
    }

    create (option) {
        if (typeof option === 'string') {
            option = {
                param: option
            };
        }

        if (option.param[0] !== '/') {
            option.param = `/${option.param}`;
        }

        Object.assign(this.option, option);
    }

    write (filePath) {
        const server = new Server();

        server.create(this.option);

        puppeteer.launch().then((browser) => {
            this.browser = browser;

            return browser.newPage();
        }).then((page) => {
            this.page = page;

            return page.goto(`${this.localhost}:${this.option.port}${this.option.param}`);
        }).then(() => {
            let size = getSizeByParam(this.option.param);

            this.page.setViewport({
                width: size.width * 1,
                height: size.height * 1
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
