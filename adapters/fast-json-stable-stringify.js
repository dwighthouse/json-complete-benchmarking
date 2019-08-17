const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('fast-json-stable-stringify');
NativeJsonProtector.kill();

module.exports = {
    name: 'fast-json-stable-stringify',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        lib(toEncode);
    },
};
