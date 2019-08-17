const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('resurrect-js');
NativeJsonProtector.kill();

const instance = new lib();

module.exports = {
    name: 'resurrect-js',
    restoreGlobalJson: true,
    getEncoder: () => {
        return instance.stringify;
    },
    encode: (toEncode) => {
        return instance.stringify(toEncode);
    },
    decode: (encoded) => {
        return instance.resurrect(encoded);
    },
};
