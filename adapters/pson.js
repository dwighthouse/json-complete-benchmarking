const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('../node_modules/pson/dist/PSON.min.js');
NativeJsonProtector.kill();

const instance = new lib.ProgressivePair();

module.exports = {
    name: 'pson',
    restoreGlobalJson: false,
    getEncoder: () => {
        return instance.toArrayBuffer;
    },
    encode: (toEncode) => {
        return instance.toArrayBuffer(toEncode);
    },
    decode: (encoded) => {
        return instance.decode(encoded);
    },
};
