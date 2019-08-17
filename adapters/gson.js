const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('gson');
NativeJsonProtector.kill();

module.exports = {
    name: 'gson',
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
