export class Calculator {
  constructor(inputSelector, buttonSelector) {
    this.input = document.querySelector(inputSelector);
    this.buttons = document.querySelectorAll(buttonSelector);
    this.currentInput = '0';
    this.previousInput = '';
    this.operation = '';
    this.resultDisplayed = false;
    this.init();
  }

  init() {
    this.updateDisplay();

    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        this.handleInput(value);
      });
    });

    document.addEventListener('keydown', e => this.handleKeyboardInput(e));
  }

  updateDisplay() {
    this.input.value = this.currentInput;
  }

  clear() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operation = '';
    this.resultDisplayed = false;
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentInput !== '0') {
      this.currentInput = this.currentInput.startsWith('-')
        ? this.currentInput.slice(1)
        : '-' + this.currentInput;
    }
    this.updateDisplay();
  }

  percentage() {
    this.currentInput = (parseFloat(this.currentInput) / 100).toString();
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.resultDisplayed) {
      if (number === '.') {
        this.currentInput = '0' + number;
      } else {
        this.currentInput = number;
      }
      this.resultDisplayed = false;
    } else {
      if (this.currentInput === '0' && number !== '.') {
        this.currentInput = number;
      } else if (number === '.' && this.currentInput.includes('.')) {
        return;
      } else {
        this.currentInput += number;
      }
    }
    this.updateDisplay();
  }

  chooseOperation(op) {
    if (this.currentInput === '') {
      return;
    }
    if (this.previousInput !== '') {
      this.compute();
    }
    this.operation = op;
    this.previousInput = this.currentInput;
    this.currentInput = '0';
  }

  compute() {
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    let result;

    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = current === 0 ? 'Error' : prev / current;
        break;
      default:
        return;
    }

    this.currentInput = result.toString();
    this.previousInput = '';
    this.operation = '';
    this.resultDisplayed = true;
    this.updateDisplay();
  }

  handleInput(value) {
    if (!value) {
      return;
    }
    switch (value) {
      case 'clear':
        this.clear();
        break;
      case 'toggle-sign':
        this.toggleSign();
        break;
      case 'percentage':
        this.percentage();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.chooseOperation(value);
        break;
      case '=':
        this.compute();
        break;
      default:
        this.appendNumber(value);
        break;
    }
  }

  handleKeyboardInput(event) {
    const allowedKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      '+',
      '-',
      '*',
      '/',
      '=',
      'Enter',
      'Backspace',
      'Escape',
      '%',
    ];

    if (!allowedKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (event.key === 'Enter') {
      this.compute();
    } else if (event.key === 'Escape') {
      this.clear();
    } else if (event.key === 'Backspace') {
      this.currentInput = this.currentInput.slice(0, -1) || '0';
      this.updateDisplay();
    } else if (event.key === '%') {
      this.percentage();
    } else if (['+', '-', '*', '/'].includes(event.key)) {
      this.chooseOperation(event.key);
    } else if (event.key === '.' || !isNaN(event.key)) {
      this.appendNumber(event.key);
    }
  }
}
