const DummyImage = require('node-dummy-image');

describe('DummyImage', () => {
    test('/640x400/999/fff/', () => {
        const image = new DummyImage('/640x400/999/fff/');

        image.write('./__test__/dummy-640x400.png');
    });
});
