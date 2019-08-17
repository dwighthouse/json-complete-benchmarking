const depth = 50000;

const topRef = [];
let travelRef = topRef;

for (let d = 0; d < depth; d += 1) {
    if (d === depth - 1) {
        travelRef[0] = 'end';
    }
    else {
        travelRef[0] = [];
        travelRef = travelRef[0];
    }
}

module.exports = topRef;
