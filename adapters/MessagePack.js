const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('@msgpack/msgpack');
NativeJsonProtector.kill();

module.exports = {
    name: 'MessagePack',
    restoreGlobalJson: false,
    getEncoder: () => {
        return lib.encode;
    },
    encode: (toEncode) => {
        return lib.encode(toEncode);
    },
    decode: (encoded) => {
        return lib.decode(encoded);
    },
};
