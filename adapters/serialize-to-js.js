const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('serialize-to-js');
NativeJsonProtector.kill();

module.exports = {
    name: 'serialize-to-js',
    restoreGlobalJson: false,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        lib(toEncode);
    },
};
