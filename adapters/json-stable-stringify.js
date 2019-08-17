const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json-stable-stringify');
NativeJsonProtector.kill();

module.exports = {
    name: 'json-stable-stringify',
    restoreGlobalJson: false,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        lib(toEncode);
    },
};
