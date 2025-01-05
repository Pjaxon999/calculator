// Testing external link
console.log("testing 123");

// Have the operator toggle a boolean to true or false and use that to toggle between arrays
let activeArray = true;

// Boolean toggle for an operator press
let operatorPressed = false;

// Boolean value for toggling decimal press 
let decimalPressed = false;

// Variables for later use with the calculator
let num1 = "";
let num1Array = [];
let num2 = "";
let num2Array = [];
let operator = "+";
const screen = document.getElementById("screen");
let result;

// Variables and Event listeners for the buttons
const backspace = document.getElementById("backspace");
backspace.addEventListener("click", clear);

const allClear = document.getElementById("allClear");
allClear.addEventListener("click", allClearPress);

const seven = document.getElementById("7");
seven.addEventListener("click", display);

const eight = document.getElementById("8");
eight.addEventListener("click", display);

const nine = document.getElementById("9");
nine.addEventListener("click", display);

const division = document.getElementById("divide");
division.addEventListener("click", operatorButtonPress);

const four = document.getElementById("4");
four.addEventListener("click", display);

const five = document.getElementById("5");
five.addEventListener("click", display);

const six = document.getElementById("6");
six.addEventListener("click", display);

const multiplication = document.getElementById("multiply");
multiplication.addEventListener("click", operatorButtonPress);

const one = document.getElementById("1");
one.addEventListener("click", display);

const two = document.getElementById("2");
two.addEventListener("click", display);

const three = document.getElementById("3");
three.addEventListener("click", display);

const subtraction = document.getElementById("subtract");
subtraction.addEventListener("click", operatorButtonPress);

const zero = document.getElementById("0");
zero.addEventListener("click", display);

const decimal = document.getElementById("decimal");
decimal.addEventListener("click", decimalPress);

const equals = document.getElementById("equals");
equals.addEventListener("click", function() {operate(operator, num1, num2);});

const addition = document.getElementById("add");
addition.addEventListener("click", operatorButtonPress);

// My attempt to add some keyboard support
window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return;
        }

        switch (event.key) {
            case "0": case "1": case "3": case "4": case "5": case "6": case "7": case "8": case "9":  
                display(event.key);
                break;
            case "Enter":
                operate(operator, num1, num2);
                break;
            case "Backspace":
                clear();
                break;
            case "Delete":
                allClearPress();
                break;
            default:
                return;
        }

        event.preventDefault();
    },
    true,
);

// Takes in the button that was pressed and changes the text content of the screen.
function display(e) {
    if (num1Array.length < 13 && activeArray === true) {
        console.log(e.target.textContent);
        num1Array.push(e.target.textContent);
        screen.textContent = num1Array.join("");
        num1 = num1Array.join("");
    } else if (num2Array.length < 13 && activeArray === false){
        console.log(e.target.textContent);
        num2Array.push(e.target.textContent);
        screen.textContent = num2Array.join("");
        num2 = num2Array.join("");
    } else {
        screen.textContent = "Too Many Nums";
    }
}

// Function to handle multiple decimal presses
function decimalPress(e) {
    if (decimalPressed === true) {
        return
    } else if (decimalPressed === false) {
        decimalPressed = true;
        display(e);
    }
}

//Function to handle a C (backspace) press
function clear() {
    if (activeArray === true) {
        if (num1Array.length > 1) {
            num1Array.pop(); 
            num1 = num1Array.join(""); 
            screen.textContent = num1; 
        } else {
            num1Array = [""];
            num1 = "";
            screen.textContent = "0";
        }
    } else {
        if (num2Array.length > 1) {
            num2Array.pop();
            num2 = num2Array.join("");
            screen.textContent = num2; 
        } else {
            num2Array = [""];
            num2 = "";
            screen.textContent = "0";
        }
    }
}

// Function that handles consecutive operator presses when there are valid inputs on screen
function operatorButtonPress(e){
    if (operatorPressed === false) {
        operationHandler(e);
        operatorPressed = true; 
    } else if (operatorPressed === true && activeArray === false){
        operate(operator, num1, num2);
        operator = e.target.textContent;
        activeArray = false;
    }
}

// Function that, when an operator is pressed, updates the value of the operator and switches to the second array to populate it with numbers
function operationHandler(e){
    operator = e.target.textContent;
    if (num1 === "") {
        return;
    } else if (activeArray === true) {
        activeArray = false;
        decimalPressed = false;
    } else {
        activeArray = true;
    }
}

// Functions for basic math operations
function add(num1, num2){
    result = num1 + num2;
    postCalc();
}

function subtract(num1, num2){
    result = num1 - num2
    postCalc();
}

function multiply(num1, num2){
    result = num1 * num2;
    postCalc();
}

function divide(num1, num2){
    if (num2 === 0) {
        screen.textContent = "No.";
    } else {
    result = num1 / num2;
    postCalc();
    }
}

// Function to determine which operation should take place
function operate(operator, num1, num2){
    num1 = parseFloat(num1) || 0;
    num2 = parseFloat(num2) || 0;

    return (operator === "+") ? add(num1, num2) 
    : (operator === "-") ? subtract(num1, num2)
    : (operator === "x") ? multiply(num1, num2)
    : (operator === "÷") ? divide(num1, num2)
    : "Error, please try again";
}

// Function that clears the arrays and numbers after a calculation
function allClearPress(){
    num1 = '';
    num2 = '';
    num1Array = [];
    num2Array = [];
    activeArray = true;
    decimalPressed = false;
    operatorPressed = false;
    screen.textContent = '';
}

// Function to handle post calculation state
function postCalc(){
    result = Math.round(result * 10000000) / 10000000;
    if (result.toString().length > 12) {
        result = result
        .toString()
        .slice(0,13);
    }
    screen.textContent = result;
    num1 = result;
    num1Array = [num1]
    num2 = '';
    num2Array = [];
    activeArray = true;
    operatorPressed = false;
    return Number.isInteger(result) ? decimalPressed = false : decimalPressed = true;
}