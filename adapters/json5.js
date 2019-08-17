const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json5');
NativeJsonProtector.kill();

module.exports = {
    name: 'json5',
    restoreGlobalJson: false,
    getEncoder: () => {
        return lib.stringify;
    },
    encode: (toEncode) => {
        return lib.stringify(toEncode);
    },
    decode: (encoded) => {
        return lib.parse(encoded);
    },
};
