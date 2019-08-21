const fs = require('fs');
const util = require('util');

const awaitableReadFile = util.promisify(fs.readFile);
const awaitableWriteFile = util.promisify(fs.writeFile);

const sortByLib = (a, b) => {
    if (a.lib.toLowerCase() < b.lib.toLowerCase()) {
        return -1;
    }
    if (a.lib.toLowerCase() > b.lib.toLowerCase()) {
        return 1;
    }
    return 0;
};

const prepOps = (op) => {
    const { name, ...dataTypes } = op;
    Object.keys(dataTypes).forEach((dataType) => {
        op[dataType].items.sort(sortByLib);

        for (let i = 0; i < op[dataType].items.length; i += 1) {
            if (op[dataType].items[i].hz) {
                op[dataType].min = Math.min(op[dataType].min, op[dataType].items[i].hz);
                op[dataType].max = Math.max(op[dataType].max, op[dataType].items[i].hz);
            }
        }
    });
};

const generateBar = (lib, value, max, index) => {
    const relativeValue = (value / max) * 845;

    const libWeight = lib === 'JSON (native)' || lib === 'json-complete' ? 'bold' : 'normal';

    if (Object.is(relativeValue, NaN)) {
        return `<g transform="translate(150 ${(20 * (index + 1)) + 5})">
    <text x="-5" y="9" font-size="10" alignment-baseline="middle" text-anchor="end" font-weight="${libWeight}">${lib}</text>
    <text x="0" y="9" font-size="10" fill="#f00" alignment-baseline="middle" text-anchor="start">FAILED</text>
</g>`;
    }

    let opsTextAnchor = 'end';
    let opsTextX = relativeValue - 5;
    let opsTextColor = '#fff';
    if (relativeValue < 100) {
        opsTextAnchor = 'start';
        opsTextX = relativeValue + 5;
        opsTextColor = '#000';
    }

    return `<g transform="translate(150 ${(20 * (index + 1)) + 5})">
    <text x="-5" y="9" font-size="10" alignment-baseline="middle" text-anchor="end" font-weight="${libWeight}">${lib}</text>
    <rect x="0" y="0" width="${relativeValue}" height="16" fill="#000"></rect>
    <text x="${opsTextX}" y="9" font-size="10" fill="${opsTextColor}" alignment-baseline="middle" text-anchor="${opsTextAnchor}">${new Intl.NumberFormat().format(value)}</text>
</g>`;
};

const generateSvg = (op, dataName) => {
    const opName = op.name;

    const maxHeight = op[dataName].items.length * 20 + 25 + 20;
    const max = op[dataName].max;

    return `<svg viewBox="0 0 1000 ${maxHeight}" xmlns="http://www.w3.org/2000/svg" style="font-family: sans-serif;">
<rect x="0" y="0" width="1000" height="${maxHeight}" fill="#eee"></rect>
<text font-size="16" x="50%" y="14" dominant-baseline="middle" text-anchor="middle">${dataName} - ${opName} (ops/sec)</text>

${op[dataName].items.map((item, index) => {
    return generateBar(item.lib, item.hz, max, index);
}).join('\n\n')}

<text font-size="12" x="50%" y="${maxHeight - 12}" dominant-baseline="middle" text-anchor="middle">Larger is better</text>

</svg>`;
};

const generateAndWriteSvgs = async (op) => {
    const { name, ...dataTypes } = op;
    const dataTypeNames = Object.keys(dataTypes);
    for (let d = 0; d < dataTypeNames.length; d += 1) {
        await awaitableWriteFile(`${name}-${dataTypeNames[d]}.svg`, generateSvg(op, dataTypeNames[d]));
    }
};

(async () => {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log('Missing results file.');
        return;
    }

    let content = '';
    try {
        content = String(await awaitableReadFile(args[0]));
    } catch (e) {
        throw new Error(`Could not open file ${args[0]}`);
    }

    let data;
    try {
        data = JSON.parse(content);
    } catch(e) {
        console.log('Could not decode JSON');
        throw e;
    }

    const encodes = {
        name: 'encode',
    };
    const decodes = {
        name: 'decode',
    };

    data.forEach((result) => {
        const op = result.op === 'encode' ? encodes : decodes;
        if (!op[result.data]) {
            op[result.data] = {
                items: [],
                min: Infinity,
                max: 0,
            };
        }

        op[result.data].items.push({
            lib: result.lib,
            ...result.result,
        });
    });

    prepOps(encodes);
    prepOps(decodes);

    // console.log(JSON.stringify(encodes, null, 4))

    await generateAndWriteSvgs(encodes);
    await generateAndWriteSvgs(decodes);
})();
