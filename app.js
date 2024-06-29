document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('#display');
    const calculator = document.querySelector('#calculator');
    let currentNumber = '';
    let previousNumber = '';
    let operator = '';
  
    calculator.addEventListener('click', (event) => {
      if (!event.target.matches('button')) return;
  
      const button = event.target;
      const buttonValue = button.innerText;
  
      if (button.classList.contains('number')) {
        handleNumber(buttonValue);
      } else if (button.classList.contains('operator')) {
        handleOperator(buttonValue);
      }
  
      updateDisplay();
    });
  
    function handleNumber(number) {
      currentNumber += number;
    }
  
    function handleOperator(op) {
      if (op === 'C') {
        clear();
      } else if (op === '=') {
        calculate();
      } else {
        if (currentNumber === '') return;
        if (previousNumber !== '') {
          calculate();
        }
        operator = op;
        previousNumber = currentNumber;
        currentNumber = '';
      }
    }
  
    function calculate() {
      let num1 = parseFloat(previousNumber);
      let num2 = parseFloat(currentNumber);
  
      if (isNaN(num1) || isNaN(num2)) return;
  
      if (operator === '+') {
        currentNumber = (num1 + num2).toString();
      } else if (operator === '-') {
        currentNumber = (num1 - num2).toString();
      } else if (operator === '*') {
        currentNumber = (num1 * num2).toString();
      } else if (operator === '/') {
        currentNumber = (num1 / num2).toString();
      }
  
      operator = '';
      previousNumber = '';
    }
  
    function clear() {
      currentNumber = '';
      previousNumber = '';
      operator = '';
    }
  
    function updateDisplay() {
      display.innerText = currentNumber || previousNumber || '0';
    }
  });
  