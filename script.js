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

function operate(operand1 = 0, operand2 = 0, operator = add) {
    const result = operator(operand1, operand2);
    return result;
}

function populateDisplay(str) {
    display.textContent = str;   
}

let operand1;
let operand2;
let operatorText;

const display = document.querySelector(".display p");

const keypad = document.querySelector(".keypad");
keypad.addEventListener("click", (e) => {
    console.log("Button was pressed");
    
    const targetClass = e.target.className;
    const targetText = e.target.innerText;
    
    if (targetClass === "digit") {
        console.log(`Digit ${targetText} was pressed`);

        if (!operand1 || (!operatorText && !operand2)) {
            operand1 = parseInt(targetText);
            populateDisplay(`${operand1}`);
        } else if (!operand2 && operatorText) {
            operand2 = parseInt(targetText);
            populateDisplay(`${operand1}${operatorText}${operand2}`)
        }
    } else if (targetClass === "operator") {
        console.log(`Operator ${targetText} was pressed`);

        if (operand1 && !operatorText) {
            operatorText = targetText;
            populateDisplay(`${operand1}${operatorText}`)
        }
    } else if (e.target.id === "result") {
        console.log("= button was clicked");

        if (operand1 && operand2 && operatorText) {
            const result = operate(operand1, operand2, opTextToFunc[operatorText]);
            populateDisplay(`${result}`);
            resetState();
        }   
    } else if (e.target.id === "clear") {
        console.log("AC button was clicked");
        populateDisplay("");
        resetState();
    } 
});

function resetState() {
    operand1 = null;
    operand2 = null;
    operatorText = null;
}

const opTextToFunc = {
    "+": add,
    "−": subtract,
    "×": multiply,
    "÷": divide,
}
