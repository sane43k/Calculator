import { Calculator } from './calculator';
import { expect, jest } from '@jest/globals';

describe('Class Calculator', () => {
  let calc;

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="calculator">
      <div class="calculator__input">
        <input type="text" />
      </div>
      <div class="calculator__btns">
        <button type="button" data-value="memory-clear">mc</button>
        <button type="button" data-value="memory-plus">m+</button>
        <button type="button" data-value="memory-minus">m-</button>
        <button type="button" data-value="memory-recall">mr</button>

        <button type="button" data-value="clear">AC</button>
        <button type="button" data-value="toggle-sign">±</button>
        <button type="button" data-value="percentage">%</button>
        <button type="button" data-value="/">÷</button>

        <button type="button" data-value="square">x²</button>
        <button type="button" data-value="cube">x³</button>
        <button type="button" data-value="power">x<sup>y</sup></button>
        <button type="button" data-value="ten-power-x">10<sup>x</sup></button>

        <button type="button" data-value="7">7</button>
        <button type="button" data-value="8">8</button>
        <button type="button" data-value="9">9</button>
        <button type="button" data-value="*">×</button>

        <button type="button" data-value="inverse">1/x</button>
        <button type="button" data-value="sqrt">√x</button>
        <button type="button" data-value="cbrt">³√x</button>
        <button type="button" data-value="yth-root">ʸ√x</button>

        <button type="button" data-value="4">4</button>
        <button type="button" data-value="5">5</button>
        <button type="button" data-value="6">6</button>
        <button type="button" data-value="-">-</button>

        <button type="button" data-value="factorial">x!</button>

        <button type="button" data-value="1">1</button>
        <button type="button" data-value="2">2</button>
        <button type="button" data-value="3">3</button>
        <button type="button" data-value="+">+</button>

        <button type="button" data-value="0">0</button>
        <button type="button" data-value=".">.</button>
        <button type="button" data-value="=">=</button>
      </div>
    </div>
  `;
    calc = new Calculator('.calculator__input input', '.calculator__btns button');
  });

  test('clear() resets all values', () => {
    calc.previousValue = 10;
    calc.currentInput = '3';
    calc.binaryOperator = '-';
    calc.resultDisplayed = true;
    calc.clear();
    expect(calc.previousValue).toBeNull();
    expect(calc.currentInput).toBe('0');
    expect(calc.binaryOperator).toBeNull();
    expect(calc.resultDisplayed).toBeFalsy();
  });

  test('updateDisplay() works correctly', () => {
    expect(calc.displayElement.value).toBe(calc.currentInput);
  });

  test('Every button should trigger handleInput(value) on click', () => {
    const spy = jest.spyOn(calc, 'handleInput');

    calc.buttons.forEach(btn => {
      btn.click();
    });

    expect(spy).toHaveBeenCalledTimes(calc.buttons.length);
    spy.mockRestore();
  });

  describe('appendNumber(number)', () => {
    test('appendNumber prevents multiple dots', () => {
      calc.appendNumber('2');
      calc.appendNumber('.');
      calc.appendNumber('.');
      calc.appendNumber('5');
      expect(calc.currentInput).toBe('2.5');
    });

    test('appendNumber replaces the result with the new input value', () => {
      calc.appendNumber('3');
      calc.resultDisplayed = true;
      calc.appendNumber('.');
      calc.appendNumber('5');
      expect(calc.currentInput).toBe('0.5');
      calc.resultDisplayed = true;
      calc.appendNumber('7');
      expect(calc.currentInput).toBe('7');
    });
  });

  test('setBinaryOperation(op) updates the operator when it is re-entered', () => {
    const spy = jest.spyOn(calc, 'handleBinaryOperation');

    calc.appendNumber(10);
    calc.setBinaryOperation('+');
    calc.setBinaryOperation('/');

    expect(calc.binaryOperator).toBe('/');
    expect(spy).not.toHaveBeenCalled();
    expect(calc.previousValue).toBe(10);
    expect(calc.resultDisplayed).toBeTruthy();

    spy.mockRestore();
  });

  test('handleBinaryOperation() does not call executeCommand() when pressing = without a second operand', () => {
    const spy = jest.spyOn(calc, 'executeCommand');

    calc.appendNumber(5);
    calc.setBinaryOperation('+');
    calc.handleBinaryOperation();

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test('executeCommand() throws error when the result is infinite', () => {
    calc.appendNumber(200);
    calc.handleUnaryOperation('factorial');

    expect(calc.currentInput).toBe('0');
    expect(calc.displayElement.value).toBe('Error');
  });
});
