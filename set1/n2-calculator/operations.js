// N2 - Custom module for calculator operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero.");
    return a / b;
}
function average(numbers) {
    return numbers.reduce((total, n) => total + n, 0) / numbers.length;
}

module.exports = { add, subtract, multiply, divide, average };
