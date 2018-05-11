# node-dummy-image

A node.js module that generates dummy images.

Since the image is generated with the headless browser, we do not use the dummy image generation Web service.

## use

```js
const DummyImage = require('./dummy-image.js');
const image = new DummyImage('/640x400/999/fff/');

image.write('./__test__/dummy-640x400.png');
```

![Dummy Image](__test__/dummy-640x400.png)

## License

[MIT License](https://github.com/kmrk/node-dummy-image/blob/master/LICENSE)
