const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json-cycle');
NativeJsonProtector.kill();

module.exports = {
    name: 'json-cycle',
    restoreGlobalJson: true, // Uses for final encoding
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
