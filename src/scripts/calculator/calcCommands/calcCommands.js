export class Command {
  execute(previousValue) {
    throw new Error('ConcreteCommand must implement execute()');
  }
}

export class AddCommand extends Command {
  constructor(operand) {
    super();
    this.operand = operand;
  }
  execute(previousValue) {
    return previousValue + this.operand;
  }
}

export class SubtractCommand extends Command {
  constructor(operand) {
    super();
    this.operand = operand;
  }
  execute(previousValue) {
    return previousValue - this.operand;
  }
}

export class MultiplyCommand extends Command {
  constructor(operand) {
    super();
    this.operand = operand;
  }
  execute(previousValue) {
    return previousValue * this.operand;
  }
}

export class DivideCommand extends Command {
  constructor(operand) {
    super();
    this.operand = operand;
  }
  execute(previousValue) {
    if (this.operand === 0) {
      throw new Error('Division by zero');
    }
    return previousValue / this.operand;
  }
}

export class PercentageCommand extends Command {
  execute(previousValue) {
    return previousValue / 100;
  }
}

export class ToggleSignCommand extends Command {
  execute(previousValue) {
    return -previousValue;
  }
}

export class SquareCommand extends Command {
  execute(previousValue) {
    return previousValue ** 2;
  }
}

export class CubeCommand extends Command {
  execute(previousValue) {
    return previousValue ** 3;
  }
}

export class PowerCommand extends Command {
  constructor(power) {
    super();
    this.power = power;
  }
  execute(previousValue) {
    return previousValue ** this.power;
  }
}

export class TenPowerXCommand extends Command {
  execute(previousValue) {
    return 10 ** previousValue;
  }
}

export class InverseCommand extends Command {
  execute(previousValue) {
    if (previousValue === 0) {
      throw new Error('Division by zero');
    }
    return 1 / previousValue;
  }
}

export class SqrtCommand extends Command {
  execute(previousValue) {
    if (previousValue < 0) {
      throw new Error('Even root of a negative number');
    }
    return Math.sqrt(previousValue);
  }
}

export class CbrtCommand extends Command {
  execute(previousValue) {
    return Math.cbrt(previousValue);
  }
}

export class YthRootCommand extends Command {
  constructor(degree) {
    super();
    this.degree = degree;
  }
  execute(previousValue) {
    if (this.degree === 0) {
      throw new Error('Root of degree zero is undefined');
    }
    if (this.degree % 2 === 0 && previousValue < 0) {
      throw new Error('Even root of a negative number');
    }
    return previousValue ** (1 / this.degree);
  }
}

export class FactorialCommand extends Command {
  execute(previousValue) {
    if (previousValue < 0 || !Number.isInteger(previousValue)) {
      throw new Error('Invalid input for factorial');
    }
    let result = 1;
    for (let i = 2; i <= previousValue; i++) {
      result *= i;
    }
    return result;
  }
}
