const NativeJsonProtector = require('../utils/NativeJsonProtector.js');

// Take special care to prevent the polyfill code from reverting to the built-in JSON
NativeJsonProtector.kill();
const lib = require('../node_modules/json3/lib/json3.js');

// Create a new instance of JSON3 while forcing it to use its internal representation, not fall back to native
const instance = lib.runInContext({}, {});

module.exports = {
    name: 'json3',
    restoreGlobalJson: false,
    getEncoder: () => {
        return instance.stringify;
    },
    encode: (toEncode) => {
        return instance.stringify(toEncode);
    },
    decode: (encoded) => {
        return instance.parse(encoded);
    },
};
