function getMin() {
    let minValue = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] < minValue) {
            minValue = arguments[i];
        }
    }
    return minValue;
}
console.log(getMin(3, 0, -3));