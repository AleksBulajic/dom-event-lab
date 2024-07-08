// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', () => {
    
  // Select the display element where the result is shown
  const display = document.querySelector('#display');
  
  // Select the calculator container that holds all buttons
  const calculator = document.querySelector('#calculator');
  
  // Initialize variables to store the current number, previous number, and operator
  let currentNumber = '';
  let previousNumber = '';
  let operator = '';

  // Add a click event listener to the calculator container
  calculator.addEventListener('click', (event) => {
      
      // Ignore clicks that are not on buttons
      if (!event.target.matches('button')) return;

      // Get the button that was clicked and its value
      const button = event.target;
      const buttonValue = button.innerText;

      // If the button is a number, handle the number input
      if (button.classList.contains('number')) {
          handleNumber(buttonValue);
      // If the button is an operator, handle the operator input
      } else if (button.classList.contains('operator')) {
          handleOperator(buttonValue);
      }

      // Update the display with the current state
      updateDisplay();
  });

  // Function to handle number input
  function handleNumber(number) {
      // Append the number to the current number
      currentNumber += number;
  }

  // Function to handle operator input
  function handleOperator(op) {
      // If the operator is 'C', clear the calculator
      if (op === 'C') {
          clear();
      // If the operator is '=', calculate the result
      } else if (op === '=') {
          calculate();
      // For other operators, handle the calculation process
      } else {
          // If there is no current number, do nothing
          if (currentNumber === '') return;
          // If there is a previous number, calculate the result first
          if (previousNumber !== '') {
              calculate();
          }
          // Set the operator and move the current number to previous number
          operator = op;
          previousNumber = currentNumber;
          currentNumber = '';
      }
  }

  // Function to perform the calculation
  function calculate() {
      // Parse the numbers from the strings
      let num1 = parseFloat(previousNumber);
      let num2 = parseFloat(currentNumber);

      // If parsing failed, do nothing
      if (isNaN(num1) || isNaN(num2)) return;

      // Perform the calculation based on the operator
      if (operator === '+') {
          currentNumber = (num1 + num2).toString();
      } else if (operator === '-') {
          currentNumber = (num1 - num2).toString();
      } else if (operator === '*') {
          currentNumber = (num1 * num2).toString();
      } else if (operator === '/') {
          currentNumber = (num1 / num2).toString();
      }

      // Reset the operator and previous number
      operator = '';
      previousNumber = '';
  }

  // Function to clear the calculator
  function clear() {
      // Reset all variables
      currentNumber = '';
      previousNumber = '';
      operator = '';
  }

  // Function to update the display with the current state
  function updateDisplay() {
      // Show the current number, or previous number if current is empty, or 0 if both are empty
      display.innerText = currentNumber || previousNumber || '0';
  }
});
