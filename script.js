function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const operand1 = 0;
const operand2 = 0;
const operator = "+";

function operate(operand1 = 0, operand2 = 0, operator = add) {
    console.log(operator(operand1, operand2));
}

operate(3, 5, multiply);
