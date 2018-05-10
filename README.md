# node-dummy-image

A node.js module that generates dummy images.

## use

```js
const DummyImage = require('lib/dummy-image');
const image = new DummyImage({
    'text': 'Dummy Image',
    'color': '#fff',
    'background-color': '#ccc',
    'width': 640,
    'height': 400,
    'font-size': 24,
    'font-family': 'serif'
});

image.write('dummy.png');
```

![Dummy Image](dummy.png)

## License

[MIT License](https://github.com/kmrk/node-dummy-image/blob/master/LICENSE)
