// https://adventofcode.com/2015/day/1

import { getInput } from "../common";
const input = getInput('01');

// PART 1

const part1 = input.split('').reduce((acc, curr) => curr === '(' ? acc + 1 : acc - 1, 0);
console.log('Part 1:', part1);

// PART 2

let floor = 0;

const part2 = input
	.split('')
	.findIndex((curr) => {
		floor += curr === '(' ? 1 : -1;
		return floor === -1;
	});

console.log('Part 2:', part2 + 1);