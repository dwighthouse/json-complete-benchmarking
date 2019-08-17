const NativeJsonProtector = require('../utils/NativeJsonProtector.js');

module.exports = (encodeFunc) => {
    return encodeFunc === NativeJsonProtector.get().stringify;
};
