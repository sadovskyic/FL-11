let A = {
    x:0,
    y:0,
    name:'A'
}, B = {
    x:0,
    y:0,
    name:'B'
}, C = {
    x:0,
    y:0,
    name:'C'
};
let points = [A, B, C];
for(let j = 0; j < points.length; j++) {
    let keys = Object.keys(points[j]);
    for (let i = 0; i < keys.length - 1; i++) {
        do {
            points[j][keys[i]] = +prompt('Enter point`s ' + points[j].name + ' coordinate ' + keys[i], '0');
            if (isNaN(points[j][keys[i]])) {
                alert('Enter correct number');
            }
        } while (isNaN(points[j][keys[i]]));
    }
}
let devidesByHalf = true;
const dividerInHalf = 2;
let midAbsciss = (A.x + B.x) / dividerInHalf;
let midOrdinate = (A.y + B.y) / dividerInHalf;
if (C.x === midAbsciss && C.y === midOrdinate) {
    console.log(devidesByHalf);
} else {
    devidesByHalf = false;
    console.log(devidesByHalf);
}