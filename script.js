class Calculator {
    
    constructor(initVal = 0) {
        this.display = document.querySelector(".display p");
        this.keypad = document.querySelector(".keypad");
        
        this.reset(initVal)
        
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

            console.log({x: this.x, op: this.op, y: this.y, replace: this.replaceX});
        });
    }

    handleDigit(e) {
        const btnText = e.target.innerText;

        if (!this.x) {
            this.x = btnText;
            this.setDisplay(this.x);
        } else if (this.x && this.replaceX) {
            this.x = btnText;
            this.replaceX = false;
            this.setDisplay(this.x);
        } else if (this.x && !this.op && !this.y) {
            this.x += btnText;
            this.setDisplay(this.x);
        } else if (this.x && this.op && !this.y) {
            this.y = btnText;
            this.setDisplay(this.y);
        } else {
            this.y += btnText;
            this.setDisplay(this.y);
        }
    }

    handleOperator(e) {
        const btnText = e.target.innerText;

        if (this.x && !this.op) {
            this.op = btnText;
        } else if (this.x && this.op && this.y) {
            this.operate();
            this.op = btnText;
        }

        this.replaceX = false;
    }

    operate() {
        if (!(this.x && this.op  && this.y)) {
            return;
        }

        let res;
        switch (this.op) {
            case "+":
                res = this.add();
                break;
            case "−":
                res = this.substract();
                break;
            case "×":
                res = this.multiply();
                break;
            case "÷":
                res = this.divide();
                break;
        }
    
        this.reset();
        this.replaceX = true;
        this.x = `${res}`;
        this.setDisplay(this.x);
    }

    add() {
        return Number(this.x) + Number(this.y);
    }

    substract() {
        return Number(this.x) - Number(this.y);
    }

    multiply() {
        return Number(this.x) * Number(this.y);
    }

    divide() {
        return Number(this.x) / Number(this.y);
    }

    reset(str = 0) {
        this.x = null;
        this.y = null;
        this.op = null;
        this.replaceX = false;
        this.setDisplay(str);
    }

    setDisplay(str) {
        this.display.textContent = `${str}`;
    }
}

const calc = new Calculator();
