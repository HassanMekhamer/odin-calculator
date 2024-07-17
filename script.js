// Basic Variables
let firstOperand = 0;
let secondOperand = 0;
let operator;

// DOM elements
let display = document.querySelector('.screen');
let equalButton = document.querySelector('.equal')
let operators = document.querySelectorAll('.operators')
let allButtons = document.querySelectorAll('button')

// Basic operations
function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };

// function to operate on given variables
function operate(a, b, operation) {
    return operation(a, b)
};


// Function to populate the display
allButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        
        //// listeners for numbers and the decimal button
        if (e.target.classList == "num") {
            firstOperand = firstOperand.toString()
            secondOperand = secondOperand.toString()
            if (e.target.textContent == ".") {
                if (!operator && !firstOperand.toString().includes(".")) {
                    display.textContent = "";
                    firstOperand += e.target.value;
                    console.log("first =" + firstOperand)
                    display.textContent += e.target.value
                } else if (!operator && firstOperand.toString().includes(".")) {
                    console.log("do nothing")
                } else if (operator && !secondOperand.toString().includes(".")) {
                    secondOperand += e.target.value;
                    console.log("second =" + secondOperand)
                    display.textContent += e.target.value
                } else if (operator && secondOperand.toString().includes(".")) {
                    console.log("do nothing to second operand")
                }
            } else if (operator !== undefined) {
                console.log("second operand active")
                secondOperand += e.target.value;
                console.log("second =" + secondOperand)
                display.textContent += e.target.value
            } else if (!operator) {
                if (display.textContent == 0 && firstOperand == 0) {
                    console.log("initial firstOperand")
                    display.textContent = ""
                    firstOperand += e.target.value;
                    console.log("first =" + firstOperand)
                    display.textContent += e.target.value
                } else {
                    console.log("firstOperand")
                    firstOperand += e.target.value;
                    console.log("first =" + firstOperand)
                    display.textContent += e.target.value
                }
            }

        }

        // all operator conditions
        if (e.target.classList == "operators") {
            if (firstOperand && secondOperand && operator) {
                console.log("calculating on two operands and returning result")
                let result
                firstOperand = parseFloat(firstOperand)
                secondOperand = parseFloat(secondOperand)
                if (operator == "+") {
                    result = operate(firstOperand, secondOperand, add)
                } else if (operator == "-") {
                    result = operate(firstOperand, secondOperand, subtract)
                } else if (operator == "/") {
                    if (secondOperand == 0) {
                        return alert("You can't divide by 0!")
                    }
                    result = operate(firstOperand, secondOperand, divide)
                } else if (operator == "*") {
                    result = operate(firstOperand, secondOperand, multiply)
                }
                result = Math.round(result * 1000000) / 1000000 //Max of 6 decimal number
                operator = e.target.textContent;
                display.textContent = result + " " + operator + " "
                firstOperand = result;
                secondOperand = 0;
            } else if (operator == undefined) {
                operator = ""
                console.log("initial operator")
                operator = e.target.textContent
                display.textContent += " " + operator + " "
            } else if (operator) {
                operator = ""
                display.textContent = display.textContent.slice(0, display.textContent.length - 2)
                console.log("replacing operator")
                operator = e.target.textContent
                display.textContent += " " + operator + " "
            }
        }

        //// Clear button function
        if (e.target.classList == "clear") {
            console.log("AC clicked")
            firstOperand = 0;
            secondOperand = 0;
            operator = undefined;
            display.textContent = 0;
        }

        //// button to change the sign
        if (e.target.classList == "sign" && firstOperand) {
            firstOperand *= -1
            display.textContent = firstOperand
        }

    })

})

// Function/listener when equal key pressed to make the operation
equalButton.addEventListener("click", (e) => {
    let result = 0;
    firstOperand = parseFloat(firstOperand)
    secondOperand = parseFloat(secondOperand)

    if (firstOperand && !secondOperand) {
        result = firstOperand
    }
    if (operator == "+") {
        result = operate(firstOperand, secondOperand, add)
    } else if (operator == "-") {
        result = operate(firstOperand, secondOperand, subtract)
    } else if (operator == "/") {
        if (secondOperand == 0) {
            return alert("You can't divide by 0!")
        }
        result = operate(firstOperand, secondOperand, divide)
    } else if (operator == "*") {
        result = operate(firstOperand, secondOperand, multiply)
    }
    result = Math.round(result * 1000000) / 1000000 //Max of 6 decimal number
    display.textContent = result
    firstOperand = result;
    secondOperand = 0;
    operator = undefined;
    console.log(result)
})
