function pipe(number) {
    for (let i = 1; i < arguments.length; i++) {
        number = arguments[i](number);
    }
    return number;
}
function addOne(x) {
  return x + 1;
}
console.log(pipe(1, addOne));
console.log(pipe(1, addOne, addOne));
console.log(pipe(1, x => x + 1, x => x + 3, x => x + 5, x => x * 2, x => x * 10));