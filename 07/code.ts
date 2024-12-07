// https://adventofcode.com/2024/day/7

import { getLines, perfs } from "../common";
const input = getLines("07");

// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`.split('\n');

type operators = '+' | '*' | '||';

const compute = (a: number, b: number, op: operators) => {
	if (op === '+') return a + b;
	if (op === '*') return a * b;
	if (op === '||') return Number(`${a}${b}`);
	throw new Error("Invalid operator");
};

const parseLine = (line: string) => {
	const [left, right] = line.split(': ');

	const target = Number(left);
	const numbers = right.split(' ').map(Number);

	return { target, numbers };
};

const isValid = (target: number, numbers: number[], ops: operators[]): boolean => {
	const results = new Set<number>();

	const recursive = (current: number, index = 1) => {
		if (index === numbers.length) return results.add(current);

		for (const op of ops) {
			recursive(compute(current, numbers[index], op), index + 1);
		}
	}

	recursive(numbers[0]);
	return results.has(target);
};

const part1 = () => {
	let result = 0;

	for (const { target, numbers } of input.map(parseLine)) {
		if (isValid(target, numbers, ['+', '*'])) {
			result += target;
		}
	}

	return result;
}

const part2 = () => {
	let result = 0;

	for (const { target, numbers } of input.map(parseLine)) {
		if (isValid(target, numbers, ['+', '*', '||'])) {
			result += target;
		}
	}

	return result;
}

perfs(part1, part2);
