// https://adventofcode.com/2024/day/2

import { getLines } from "../common";
const input = getLines("02");

// const input = [
// 	'7 6 4 2 1',
// 	'1 2 7 8 9',
// 	'9 7 6 2 1',
// 	'1 3 2 4 5',
// 	'8 6 4 4 1',
// 	'1 3 6 7 9',
// ]

console.log("Advent of code 2024 - Day 2")

const hasFailure = (numbers: number[]): boolean => {

	// check if ordering the numbers in ascending order would be the same as the original line
	const sortedAsc  = [...numbers].sort((a, b) => a - b).join(' ')
	const sortedDesc = [...numbers].sort((a, b) => b - a).join(' ')

	if (numbers.join(' ') !== sortedAsc && numbers.join(' ') !== sortedDesc) return true;

	// check duplicates
	const unique = new Set(numbers)
	if (unique.size !== numbers.length) return true;

	// check diff to be at least 1 and at most 3
	for (const [i, num] of numbers.entries()) {
		const next = numbers[i + 1];
		if (next && ![1, 2, 3].includes(Math.abs(num - next))) return true;
	}

	return false;
}

let isSafe = 0;
let isSafeDampener = 0;

input.forEach(line => {
	const numbers = line.split(' ').map(Number);

	// part 1: only check once
	if (!hasFailure(numbers)) isSafe++;
	else {
		// part 2 : check again with one value removed (only one needs to pass)
		for (const [i, num] of numbers.entries()) {
			const copy = [...numbers];
			copy.splice(i, 1);

			if (!hasFailure(copy)) {
				isSafeDampener++;
				break;
			}
		}
	}

});

console.log("Part 1:", isSafe);
console.log("Part 2:", isSafe + isSafeDampener);