const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('altjson');
NativeJsonProtector.kill();

module.exports = {
    name: 'altjson',
    restoreGlobalJson: false,
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
