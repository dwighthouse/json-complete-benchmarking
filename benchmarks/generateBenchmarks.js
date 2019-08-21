const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
const shuffle = require('../utils/shuffle.js');

module.exports = async (Benchmark) => {
    const adapters = shuffle([
        require('../adapters/jsonNATIVE.js'),
        require('../adapters/altjson.js'),
        require('../adapters/bson.js'),
        require('../adapters/fast-json-stable-stringify.js'),
        require('../adapters/fast-safe-stringify.js'),
        require('../adapters/flatted.js'),
        require('../adapters/gson.js'),
        require('../adapters/ison.js'),
        require('../adapters/json-complete.js'),
        require('../adapters/json-cycle.js'),
        require('../adapters/json-helpers.js'),
        require('../adapters/json-literal.js'),
        require('../adapters/json-stable-stringify.js'),
        require('../adapters/json-stringify-date.js'),
        require('../adapters/json-stringify-safe.js'),
        require('../adapters/json3.js'),
        require('../adapters/json5.js'),
        require('../adapters/json7.js'),
        require('../adapters/jsonify.js'),
        require('../adapters/kson.js'),
        require('../adapters/MessagePack.js'),
        require('../adapters/pson.js'),
        require('../adapters/qjson.js'),
        require('../adapters/resurrect-js.js'),
        require('../adapters/rrjson.js'),
        require('../adapters/rson.js'),
        require('../adapters/serialize-javascript.js'),
        require('../adapters/serialize-to-js.js'),
        require('../adapters/snapshot.js'),
        require('../adapters/telejson.js'),
        require('../adapters/xson.js'),
        require('../adapters/zson.js'),

        // require('../adapters/cryo.js'), // Skipped: security vulnerabilities
        // require('../adapters/hydrate.js'), // Skipped: it appears to be using an older version of Coffeescript that can't be compiled without modifications
        // require('../adapters/serializr.js'), // Skipped: doesn't support standard JSON at even a basic level, aimed at other uses
    ]);

    const dataItems = {
        singleValue: require('../data/singleValue.js'),
        smallData: require('../data/smallData.js'),
        largeData: require('../data/largeData.js'),
        // extremeLargeData: require('../data/extremeLargeData.js'), // TODO: Currently unreasonably slow to decode in json-complete, so investigation will have to occur before returning this to the test suite
        // TODO: Extreme depth test
        // TODO: Data with repeated references
        // TODO: Data with circular references
    };

    const getEncodedData = (adapter, data, onReady) => {
        if (adapter.deferredEncode && adapter.encode) {
            adapter.encode(data, onReady);
            return;
        }

        else if (adapter.encode) {
            onReady(adapter.encode(data));
            return;
        }

        onReady(NativeJsonProtector.get().stringify(data));
    };

    const results = [];

    const createBenchmarksForAdapter = (benchmarks, adapter, dataItems) => {
        Object.keys(dataItems).forEach((dataKey) => {
            const dataItem = dataItems[dataKey];

            if (adapter.encode) {
                if (adapter.getEncoder && adapter.getEncoder === NativeJsonProtector.get().stringify) {
                    throw new Error(`Library ${adapter.name} has overwritten the built-in JSON stringify function inappropriately.`);
                }

                const options = {
                    name: `${adapter.name} - ${dataKey} - encode`,
                };

                if (adapter.deferredEncode) {
                    options.defer = true;
                    options.fn = (deferred) => {
                        adapter.encode(dataItem, (x) => {
                            deferred.resolve();
                        });
                    };
                }
                else {
                    options.fn = () => {
                        adapter.encode(dataItem);
                    };
                }

                benchmarks.add(options);
            }
            else {
                results.push({
                    lib: adapter.name,
                    op: 'encode',
                    data: dataKey,
                    result: 'Unsupported',
                });
            }

            if (adapter.decode) {
                getEncodedData(adapter, dataItem, (encoded) => {
                    const options = {
                        name: `${adapter.name} - ${dataKey} - decode`,
                    };

                    if (adapter.deferredDecode) {
                        options.defer = true;
                        options.fn = (deferred) => {
                            adapter.decode(encoded, () => {
                                deferred.resolve();
                            });
                        };
                    }
                    else {
                        options.fn = () => {
                            adapter.decode(encoded);
                        };
                    }

                    benchmarks.add(options);
                });
            }
            else {
                results.push({
                    lib: adapter.name,
                    op: 'decode',
                    data: dataKey,
                    result: 'Unsupported',
                });
            }
        });
    };

    for (let a = 0; a < adapters.length; a += 1) {
        const adapter = adapters[a];
        const benchmarkNormalSuite = new Benchmark.Suite;

        benchmarkNormalSuite.on('cycle', function (event) {
            const names = event.target.name.split(' - ');

            let result = '';
            if (event.target.aborted) {
                result = 'Failed';
            }
            else {
                const hz = event.target.hz;

                result = {
                    hz: Number(hz.toFixed(hz < 100 ? 2 : 0)),
                    rme: event.target.stats.rme.toFixed(2),
                };
            }

            results.push({
                lib: adapter.name,
                op: names[2],
                data: names[1],
                result: result,
            });

            console.log(String(event.target));
        });

        if (adapter.restoreGlobalJson) {
            NativeJsonProtector.restore();
        }

        benchmarkNormalSuite.on('complete', () => {
            if (adapter.restoreGlobalJson) {
                NativeJsonProtector.kill();
            }

            resolver(); // End the waiting
        });

        createBenchmarksForAdapter(benchmarkNormalSuite, adapter, dataItems);

        benchmarkNormalSuite.run({ 'async': true });

        let resolver;
        const waiting = new Promise((resolve) => {
            resolver = resolve;
        });
        await waiting;
    }

    console.log(NativeJsonProtector.get().stringify(results, null, 4));
};
