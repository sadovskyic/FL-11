let triangle = {
    side: {
        a: 0,
        b: 0,
        c: 0
    },
    type: 'Triangle doesn’t exist'
};
for (let key in triangle.side) {
    if (triangle.side.hasOwnProperty(key)) {
        exitRequest: for (;;) {
            triangle.side[key] = +prompt('Enter the length of the triangle’s side ' + key, '0');
            if (isNaN(triangle.side[key])) {
                alert('Enter numeric value');
            } else if (triangle.side[key] < 0) {
                alert('Side’s length can not be negative, enter a positive integer');
            } else {
                break exitRequest;
            }
        }
    }
}
let isExist = triangle.side.a + triangle.side.b > triangle.side.c &&
              triangle.side.a + triangle.side.c > triangle.side.b &&
              triangle.side.b + triangle.side.c > triangle.side.a;
if (isExist) {
    triangle.type = 'Normal triangle';
    let isIsosceles = triangle.side.a === triangle.side.b ||
                      triangle.side.a === triangle.side.c ||
                      triangle.side.b === triangle.side.c;
        if (isIsosceles) {
            triangle.type = 'Isosceles triangle';
            if (triangle.side.a === triangle.side.b && triangle.side.a === triangle.side.c) {
                triangle.type = 'Eequivalent triangle';
            }
        }
} else {
    alert('Triangle doesn’t exist');
}
console.log(triangle.type);