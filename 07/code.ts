// https://adventofcode.com/2015/day/7

import { getInput } from '../common';
const input = getInput('07');

// PART 1

class Wire {
	private __value: number | undefined;
	private calculate: () => number;

	private static modulo = 65536;

	static ops: Record<string, string> = {
		AND: '&',
		OR: '|',
		LSHIFT: '<<',
		RSHIFT: '>>',
	};

	constructor(instruction: string) {
		this.calculate = this.parse(instruction);
	}

	get value(): number {
		if (this.__value === undefined) {
			this.__value = this.calculate() % Wire.modulo;
		}
		return this.__value;
	}

	set value(value: number | undefined) {
		this.__value = value;
	}

	private parse(instruction: string): () => number {
    const assignMatch = /^(NOT )?([0-9]+|[a-z]+)$/.exec(instruction);
    const opMatch = /^([a-z]+|[0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z]+|[0-9]+)$/.exec(instruction);

    if (assignMatch) {
      return () => {
        let value = parseValue(assignMatch[2]);
        if (assignMatch[1]) {
          value = ~value;
        }
        return value;
      };
    } else if (opMatch) {
      const opCode = Wire.ops[opMatch[2]];
      return () => eval(`${parseValue(opMatch[1])} ${opCode} ${parseValue(opMatch[3])}`);
    }

    throw new Error(`Invalid instruction: ${instruction}`);
  }
}

const wires: Record<string, Wire> = {};

function parseValue(key: string): number {
	const i = parseInt(key);
	if (!isNaN(i)) {
		return i;
	}
	if (!wires[key]) {
		throw new Error(`Wire ${key} does not exist.`);
	}
	return wires[key].value;
}

input.split("\n").forEach((item) => {
	const match = /(.*) -> ([a-z]+)/.exec(item);
	if (match) {
		wires[match[2]] = new Wire(match[1]);
	}
});

const part1 = wires['a'].value;
console.log('Part 1:', part1);

// PART 2

// reset wires
Object.keys(wires).forEach((key) => {
	wires[key].value = undefined;
});

wires['b'].value = part1;
console.log('Part 2:', wires['a'].value);