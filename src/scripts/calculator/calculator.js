import {
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  PercentageCommand,
  ToggleSignCommand,
  SquareCommand,
  CubeCommand,
  PowerCommand,
  TenPowerXCommand,
  InverseCommand,
  SqrtCommand,
  CbrtCommand,
  YthRootCommand,
  FactorialCommand,
} from './calcCommands/calcCommands.js';

export class Calculator {
  constructor(inputSelector, buttonsSelector) {
    this.displayElement = document.querySelector(inputSelector);
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.memory = 0;
    this.clear();
    this.bindEvents();
    this.bindKeyboardEvents();
  }

  bindEvents() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        this.handleInput(value);
      });
    });
  }

  clear() {
    this.previousValue = null;
    this.currentInput = '0';
    this.binaryOperator = null;
    this.resultDisplayed = false;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.value = this.currentInput;
  }

  handleInput(value) {
    if (!isNaN(value) || value === '.') {
      this.appendNumber(value);
    } else if (value === 'clear') {
      this.clear();
    } else if (value === '=') {
      this.handleBinaryOperation();
    } else if (['+', '-', '*', '/', 'power', 'yth-root'].includes(value)) {
      this.setBinaryOperation(value);
    } else {
      this.handleUnaryOperation(value);
    }
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

  setBinaryOperation(op) {
    if (this.binaryOperator !== null && this.resultDisplayed) {
      this.binaryOperator = op;
      return;
    }
    if (this.previousValue !== null && this.binaryOperator !== null) {
      this.handleBinaryOperation();
    }
    this.binaryOperator = op;
    this.previousValue = parseFloat(this.currentInput);
    this.resultDisplayed = true;
  }

  handleBinaryOperation() {
    const currentValue = parseFloat(this.currentInput);

    if (
      this.resultDisplayed &&
      this.previousValue !== null &&
      this.previousValue === currentValue
    ) {
      return;
    }

    let command;

    switch (this.binaryOperator) {
      case '+':
        command = new AddCommand(currentValue);
        break;
      case '-':
        command = new SubtractCommand(currentValue);
        break;
      case '*':
        command = new MultiplyCommand(currentValue);
        break;
      case '/':
        command = new DivideCommand(currentValue);
        break;
      case 'power':
        command = new PowerCommand(currentValue);
        break;
      case 'yth-root':
        command = new YthRootCommand(currentValue);
        break;
    }

    if (command) {
      this.executeCommand(command, true);
      this.binaryOperator = null;
    }
    this.resultDisplayed = true;
  }

  handleUnaryOperation(unaryOperator) {
    const currentValue = parseFloat(this.currentInput);
    let command;

    switch (unaryOperator) {
      case 'toggle-sign':
        command = new ToggleSignCommand();
        break;
      case 'percentage':
        command = new PercentageCommand();
        break;
      case 'square':
        command = new SquareCommand();
        break;
      case 'cube':
        command = new CubeCommand();
        break;
      case 'ten-power-x':
        command = new TenPowerXCommand();
        break;
      case 'inverse':
        command = new InverseCommand();
        break;
      case 'sqrt':
        command = new SqrtCommand();
        break;
      case 'cbrt':
        command = new CbrtCommand();
        break;
      case 'factorial':
        command = new FactorialCommand();
        break;
      case 'memory-clear':
        this.memory = 0;
        return;
      case 'memory-plus':
        this.memory += currentValue;
        return;
      case 'memory-minus':
        this.memory -= currentValue;
        return;
      case 'memory-recall':
        this.currentInput = this.memory.toString();
        this.resultDisplayed = false;
        this.updateDisplay();
        return;
      default:
        return;
    }

    if (command) {
      this.executeCommand(command, false);
    }
    this.resultDisplayed = false;
  }

  executeCommand(command, isBinaryOperation = true) {
    try {
      const result = command.execute(
        isBinaryOperation ? this.previousValue : parseFloat(this.currentInput)
      );

      if (!Number.isFinite(result)) {
        throw new Error('Error');
      }
      if (isBinaryOperation) {
        this.previousValue = result;
      }
      this.currentInput = result.toString();
      this.updateDisplay();
    } catch {
      this.currentInput = '0';
      this.displayElement.value = 'Error';
    }
  }

  bindKeyboardEvents() {
    const allowedKeys = new Set([
      ...'0123456789',
      '.',
      '+',
      '-',
      '*',
      '/',
      '=',
      'Escape',
      'Backspace',
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
    ]);

    document.addEventListener('keydown', event => {
      const key = event.key;

      if (allowedKeys.has(key)) {
        if (!isNaN(key) || key === '.') {
          event.preventDefault();
          this.appendNumber(key);
        } else if (key === '=') {
          event.preventDefault();
          this.handleBinaryOperation();
        } else if (['+', '-', '*', '/'].includes(key)) {
          event.preventDefault();
          this.setBinaryOperation(key);
        } else if (key === 'Escape') {
          event.preventDefault();
          this.clear();
        } else if (key === 'Backspace') {
          event.preventDefault();
          if (this.resultDisplayed) {
            this.currentInput = '0';
            this.resultDisplayed = false;
          } else {
            this.currentInput = this.currentInput.slice(0, -1) || '0';
          }
          this.updateDisplay();
        }
      } else {
        event.preventDefault();
        return;
      }
    });
  }
}
