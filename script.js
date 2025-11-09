class Calculator {
    
    constructor(initVal = 0) {
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.replaceFirstOperand = false;

        this.display = document.querySelector(".display p");
        this.setDisplay(initVal);

        this.keypad = document.querySelector(".keypad");
        this.keypad.addEventListener("click", (e) => {

            if (e.target.id === "ac") {
                this.reset();
            } else if (e.target.id === "result") {
                this.operate();
            } else if (e.target.className === "digit") {
                this.handleDigit(e);
            } else if (e.target.className === "operator") {
                this.handleOperator(e);
            }

            console.log({x: this.firstOperand, op: this.operator, y: this.secondOperand, replace: this.replaceFirstOperand});
        });
    }

    handleDigit(e) {
        const btnText = e.target.innerText;

        if (!this.firstOperand) {
            this.firstOperand = btnText;
        } else if (this.firstOperand && this.replaceFirstOperand) {
            this.firstOperand = btnText;
            this.replaceFirstOperand = false;
        } else if (this.firstOperand && !this.operator && !this.secondOperand) {
            this.firstOperand += btnText;
        } else if (this.firstOperand && this.operator && !this.secondOperand) {
            this.secondOperand = btnText;
        } else {
            this.secondOperand += btnText;
        }

        this.updateDisplay();
    }

    handleOperator(e) {
        const btnText = e.target.innerText;

        if (this.firstOperand && !this.operator) {
            this.operator = btnText;
        }

        this.replaceFirstOperand = false;
        this.updateDisplay();
    }

    operate() {
        let res;
        switch (this.operator) {
            case "+":
                res = this.add(this.firstOperand, this.secondOperand);
                break;
            case "−":
                res = this.substract(this.firstOperand, this.secondOperand);
                break;
            case "×":
                res = this.multiply(this.firstOperand, this.secondOperand);
                break;
            case "÷":
                res = this.divide(this.firstOperand, this.secondOperand);
                break;
        }
    
        this.reset();
        this.firstOperand = `${res}`;
        this.replaceFirstOperand = true;
        this.updateDisplay();
    }

    add(x, y) {
        return Number(x) + Number(y);
    }

    substract(x, y) {
        return Number(x) - Number(y);
    }

    multiply(x, y) {
        return Number(x) * Number(y);
    }

    divide(x, y) {
        return Number(x) / Number(y);
    }

    reset() {
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.setDisplay(0);
    }

    updateDisplay() {
        const op1 = this.firstOperand ? this.firstOperand : "";
        const op2 = this.secondOperand ? this.secondOperand : "";
        const op = this.operator ? this.operator : "";
        this.setDisplay(op1 + op + op2);
    }

    setDisplay(str) {
        this.display.textContent = `${str}`;
    }
}

const calc = new Calculator();
