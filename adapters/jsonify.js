const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('jsonify');
NativeJsonProtector.kill();

module.exports = {
    name: 'jsonify',
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
