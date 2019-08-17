const NativeJsonProtector = require('../utils/NativeJsonProtector.js');

module.exports = {
    name: 'JSON (native)',
    restoreGlobalJson: false,
    encode: (toEncode) => {
        return NativeJsonProtector.get().stringify(toEncode);
    },
    decode: (encoded) => {
        return NativeJsonProtector.get().parse(encoded);
    },
};
