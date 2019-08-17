const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('snapshot');
NativeJsonProtector.kill();

module.exports = {
    name: 'snapshot',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib;
    },
    encode: (toEncode) => {
        return lib(toEncode);
    },
};
