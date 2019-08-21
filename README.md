# json-complete-benchmarks

Tools for comparing functionality and performance of many different json alternative libraries

## Install

1. Clone repository to location
2. Navigate to location
3. Run `npm i`

## Run Benchmarks

1. Run `node benchmarks/index.js`
2. Will run tests in random order, printing results as it goes, followed by a final json output to the console

## Generate Benchmark Graphs

1. Save a file `JSON_RESULTS.json` containing the json output of the above Benchmark process
2. Run `node benchmarks/generateGraphs.js JSON_RESULTS.json`
3. A series of graph svgs will be generated in the working folder

## TODO: Running Benchmarks in Browser

