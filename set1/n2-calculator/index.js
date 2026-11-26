// Name: Abalos, Christian James S.
// Section: IV-BSIT-C
// Activity: N2 - Modular Calculator

const path = require("node:path");  // built-in Node.js module
const operations = require("./operations");
const { formatResult } = require("./formatter");

const [operation, ...inputs] = process.argv.slice(2);
const allowed = ["add", "subtract", "multiply", "divide", "average"];

console.log("===== MODULAR CALCULATOR =====");
console.log("Name: Abalos, Christian James S.");
console.log("Program:", path.basename(__filename));

if (!allowed.includes(operation)) {
    console.log("Error: Unknown operation. Use add, subtract, multiply, divide, or average.");
} else {
    const numbers = inputs.map(Number);
    const validCount = operation === "average" ? inputs.length >= 2 : inputs.length === 2;
    if (!validCount || inputs.some(x => x.trim() === "") || numbers.some(x => !Number.isFinite(x))) {
        console.log("Error: Enter valid numbers (two numbers, or at least two for average).");
    } else {
        try {
            const result = operation === "average"
                ? operations.average(numbers)
                : operations[operation](numbers[0], numbers[1]);
            console.log(formatResult(operation, numbers, result));
        } catch (error) {
            console.log("Error:", error.message);
        }
    }
}
