const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json-stringify-safe');
NativeJsonProtector.kill();

module.exports = {
    name: 'json-stringify-safe',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        lib(toEncode);
    },
};
