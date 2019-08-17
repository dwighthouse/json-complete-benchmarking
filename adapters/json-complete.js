const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json-complete');
NativeJsonProtector.kill();

module.exports = {
    name: 'json-complete',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib.encode;
    },
    encode: (toEncode) => {
        return lib.encode(toEncode);
    },
    decode: (encoded) => {
        return lib.decode(encoded);
    },
};
