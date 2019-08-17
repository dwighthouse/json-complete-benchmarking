const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('qjson');
NativeJsonProtector.kill();

module.exports = {
    name: 'qjson',
    restoreGlobalJson: true,
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
