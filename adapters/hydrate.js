const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const globalThis = require('@ungap/global-this');
const lib = require('hydrate');
NativeJsonProtector.kill();

const instance = new lib(globalThis);

module.exports = {
    name: 'hydrate',
    restoreGlobalJson: true,
    getEncoder: () => {
        return instance.stringify;
    },
    encode: (toEncode) => {
        return instance.stringify(toEncode);
    },
    decode: (encoded) => {
        return instance.parse(encoded);
    },
};
