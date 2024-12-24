// Select elements
const display = document.getElementById('display');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';
let isSecondNumber = false;

// Basic math functions
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
  if (b === 0) {
    return 'Error';
  }
  return a / b;
}

// Operate function to perform the calculation
function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Handle number click
function handleNumberClick(value) {
  if (!isSecondNumber) {
    firstNumber += value;
    updateDisplay(firstNumber);
  } else {
    secondNumber += value;
    updateDisplay(secondNumber);
  }
}

// Handle operator click
function handleOperatorClick(op) {
  if (firstNumber && secondNumber) {
    firstNumber = operate(operator, firstNumber, secondNumber);
    secondNumber = '';
    updateDisplay(firstNumber);
  }
  operator = op;
  isSecondNumber = true;
}

// Handle equals click
function handleEqualsClick() {
  if (firstNumber && operator && secondNumber) {
    result = operate(operator, firstNumber, secondNumber);
    if (result === 'Error') {
      updateDisplay('Error');
      clearData();
    } else {
      firstNumber = result.toString();
      updateDisplay(result);
    }
    operator = '';
    secondNumber = '';
    isSecondNumber = false;
  }
}

// Handle clear click
function clearData() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  isSecondNumber = false;
  updateDisplay(0);
}

// Add event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;
    if (!isNaN(value)) {
      // If it's a number
      handleNumberClick(value);
    } else if (value === 'C') {
      clearData();
    } else if (value === '=') {
      handleEqualsClick();
    } else {
      handleOperatorClick(value);
    }
  });
});

// Set initial display
updateDisplay(0);