const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('fast-safe-stringify');
NativeJsonProtector.kill();

module.exports = {
    name: 'fast-safe-stringify',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        lib(toEncode);
    },
};
