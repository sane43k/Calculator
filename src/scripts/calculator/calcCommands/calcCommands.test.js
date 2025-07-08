import {
  Command,
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
} from './calcCommands.js';

describe('Abstract class Command', () => {
  class ConcreteCommand extends Command {}
  test('Throw error when ConcreteCommand does not implement execute()', () => {
    expect(() => new ConcreteCommand().execute(1)).toThrow(
      'ConcreteCommand must implement execute()'
    );
  });

  test('Throw error when execute() is called directly from Command', () => {
    expect(() => new Command().execute(2)).toThrow('ConcreteCommand must implement execute()');
  });
});

describe('Binary operations', () => {
  test('AddCommand adds correctly', () => {
    expect(new AddCommand(5).execute(3)).toBe(8);
  });

  test('SubtractCommand subtracts correctly', () => {
    expect(new SubtractCommand(2).execute(10)).toBe(8);
  });

  test('MultiplyCommand multiplies correctly', () => {
    expect(new MultiplyCommand(4).execute(3)).toBe(12);
  });

  test('DivideCommand divides correctly', () => {
    expect(new DivideCommand(2).execute(10)).toBe(5);
  });
  test('DivideCommand throws error for division by zero', () => {
    expect(() => new DivideCommand(0).execute(10)).toThrow('Division by zero');
  });

  test('PowerCommand computes power correctly', () => {
    expect(new PowerCommand(3).execute(2)).toBe(8);
  });

  test('YthRootCommand computes root correctly', () => {
    expect(new YthRootCommand(3).execute(8)).toBe(2);
  });
  test('YthRootCommand throws error for zero degree', () => {
    expect(() => new YthRootCommand(0).execute(8)).toThrow('Root of degree zero is undefined');
  });
  test('YthRootCommand throws error for even root of negative number', () => {
    expect(() => new YthRootCommand(2).execute(-4)).toThrow('Even root of a negative number');
  });
});

describe('Unary operations', () => {
  test('PercentageCommand returns percent', () => {
    expect(new PercentageCommand().execute(50)).toBe(0.5);
  });

  test('ToggleSignCommand negates value', () => {
    expect(new ToggleSignCommand().execute(3)).toBe(-3);
  });

  test('SquareCommand squares correctly', () => {
    expect(new SquareCommand().execute(4)).toBe(16);
  });

  test('CubeCommand cubes correctly', () => {
    expect(new CubeCommand().execute(2)).toBe(8);
  });

  test('TenPowerXCommand computes correctly', () => {
    expect(new TenPowerXCommand().execute(3)).toBe(1000);
  });

  test('InverseCommand computes correctly', () => {
    expect(new InverseCommand().execute(2)).toBe(0.5);
  });
  test('InverseCommand throws error for zero', () => {
    expect(() => new InverseCommand().execute(0)).toThrow('Division by zero');
  });

  test('SqrtCommand computes square root correctly', () => {
    expect(new SqrtCommand().execute(9)).toBe(3);
  });
  test('SqrtCommand throws error for negative number', () => {
    expect(() => new SqrtCommand().execute(-4)).toThrow('Even root of a negative number');
  });

  test('CbrtCommand computes cube root correctly', () => {
    expect(new CbrtCommand().execute(-8)).toBe(-2);
  });

  test('FactorialCommand returns factorial', () => {
    expect(new FactorialCommand().execute(5)).toBe(120);
  });
  test('FactorialCommand throws error for negative number', () => {
    expect(() => new FactorialCommand().execute(-4)).toThrow('Invalid input for factorial');
  });
  test('FactorialCommand throws error for non-integer number', () => {
    expect(() => new FactorialCommand().execute(3.5)).toThrow('Invalid input for factorial');
  });
});
