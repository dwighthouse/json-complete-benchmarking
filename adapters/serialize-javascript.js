const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('serialize-javascript');
NativeJsonProtector.kill();

module.exports = {
    name: 'serialize-javascript',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        lib(toEncode);
    },
};
