const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
NativeJsonProtector.restore();
const lib = require('json-helpers');
NativeJsonProtector.kill();

module.exports = {
    name: 'json-helpers',
    restoreGlobalJson: true,
    getEncoder: () => {
        return lib.JSONParserV2.stringify;
    },
    encode: (toEncode) => {
        return lib.JSONParserV2.stringify(toEncode);
    },
    decode: (encoded) => {
        return lib.JSONParserV2.parse(encoded);
    },
};
