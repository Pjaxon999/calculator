// Testing external link
console.log("testing 123");


// Have the operator toggle a boolean to true or false and use that to toggle between arrays
let activeArray = true;

// Variables for later use with the calculator
let num1 = "";
let num1Array = [];
let num2 = "";
let num2Array = [];
let operator = "+";
const screen = document.getElementById("screen");

// Variables and Event listeners for the buttons
const backspace = document.getElementById("backspace");

const allClear = document.getElementById("allClear");

const seven = document.getElementById("7");
seven.addEventListener("click", display);

const eight = document.getElementById("8");
eight.addEventListener("click", display);

const nine = document.getElementById("9");
nine.addEventListener("click", display);

const division = document.getElementById("divide");
division.addEventListener("click", operationHandler);

const four = document.getElementById("4");
four.addEventListener("click", display);

const five = document.getElementById("5");
five.addEventListener("click", display);

const six = document.getElementById("6");
six.addEventListener("click", display);

const multiplication = document.getElementById("multiply");
multiplication.addEventListener("click", operationHandler);

const one = document.getElementById("1");
one.addEventListener("click", display);

const two = document.getElementById("2");
two.addEventListener("click", display);

const three = document.getElementById("3");
three.addEventListener("click", display);

const subtraction = document.getElementById("subtract");
subtraction.addEventListener("click", operationHandler);

const zero = document.getElementById("0");
zero.addEventListener("click", display);

const decimal = document.getElementById("decimal");
decimal.addEventListener("click", display);

const equals = document.getElementById("equals");
equals.addEventListener("click", function() {operate(operator, num1, num2);});

const addition = document.getElementById("add");
addition.addEventListener("click", operationHandler);

// Functions to populate the display.
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

// Function that, when an operator is pressed, updates the value of the operator
// and switches to the second array to populate it with numbers
function operationHandler(e){
    operator = e.target.textContent;
    screen.textContent = "";
    if (activeArray === true) {
        activeArray = false;
    } else {
        activeArray = true;
    }
}

// Functions for basic math operations
function add(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    screen.textContent = num1 + num2;
}

function subtract(num1, num2){
    screen.textContent = num1 - num2;
}

function multiply(num1, num2){
    screen.textContent = num1 * num2
}

function divide(num1, num2){
    screen.textContent = num1 / num2
}

// Function to determine which operation should take place
function operate(operator, num1, num2){
    return (operator === "+") ? add(num1, num2) 
    : (operator === "-") ? subtract(num1, num2)
    : (operator === "x") ? multiply(num1, num2)
    : (operator === "÷") ? divide(num1, num2)
    : "Error, please try again";
}
