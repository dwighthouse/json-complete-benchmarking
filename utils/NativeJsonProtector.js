const globalThis = require('@ungap/global-this');

// Make initial copy
if (!globalThis.REAL_JSON && globalThis.JSON) {
    globalThis.REAL_JSON = {
        stringify: globalThis.JSON.stringify,
        parse: globalThis.JSON.parse,
    };
    globalThis.JSON = void 0;
}

module.exports = {
    kill: () => {
        globalThis.JSON = void 0;
    },
    restore: () => {
        globalThis.JSON = REAL_JSON;
    },
    get: () => {
        return globalThis.REAL_JSON;
    },
};
