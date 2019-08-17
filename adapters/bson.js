const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('bson');
NativeJsonProtector.kill();

module.exports = {
    name: 'bson',
    restoreGlobalJson: false,
    getEncoder: () => {
        return lib.serialize;
    },
    encode: (toEncode) => {
        return lib.serialize(toEncode);
    },
    decode: (encoded) => {
        return lib.deserialize(encoded);
    },
};
