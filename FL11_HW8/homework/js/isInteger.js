function isInteger(number) {
    return (~~number) === number;
}
console.log(isInteger(5.0));
console.log(isInteger(5.1));