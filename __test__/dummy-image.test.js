const DummyImage = require('node-dummy-image');
let image = null;

describe('DummyImage', () => {
    test('instance', () => {
        image = new DummyImage();
    });

    test('create', () => {
        image.create({
            'text': 'Dummy Image',
            'color': '#fff',
            'background-color': '#ccc',
            'width': 640,
            'height': 400,
            'font-size': 24,
            'font-family': 'serif'
        });
    });

    test('write', () => {
        image.write('./dummy.png');
    });
});
