function reverseNumber(number) {
    let reverseNumber = 0;
    const DIGIT = 10;
    while(number) {
        reverseNumber = reverseNumber * DIGIT + number % DIGIT;
        number = number / DIGIT ^ 0;
    }
    return reverseNumber;
}
console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(10000));