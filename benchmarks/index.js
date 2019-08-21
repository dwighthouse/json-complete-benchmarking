const NativeJsonProtector = require('../utils/NativeJsonProtector.js');
const generateBenchmarks = require('../benchmarks/generateBenchmarks.js');
NativeJsonProtector.restore();
const Benchmark = require('benchmark');
NativeJsonProtector.kill();

generateBenchmarks(Benchmark);
