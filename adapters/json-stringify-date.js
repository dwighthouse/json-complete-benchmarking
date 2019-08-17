const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json-stringify-date');
NativeJsonProtector.kill();

module.exports = {
    name: 'json-stringify-date',
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
