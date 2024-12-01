// https://adventofcode.com/2024/day/1

import { getInput } from "../common";
const input = getInput("01");

console.log("Advent of code 2024 - Day 1")

// PART 1

const leftColumn: number[] = []; // [3,4,2,1,3,3];
const rightColumn: number[] = []; // [4,3,5,3,9,3];

input.split('\n').forEach((line) => {
	const [left, right] = line.split('   ').map(Number);
	leftColumn.push(left);
	rightColumn.push(right);
})

leftColumn.sort((a, b) => a - b);
rightColumn.sort((a, b) => a - b);

const dist = leftColumn.map((left, index) => Math.abs(left - rightColumn[index]));
const total = dist.reduce((acc, curr) => acc + curr, 0);

console.log("Part 1:", total);

// PART 2

let similarity = 0;

leftColumn.forEach((num) => {
	// count each time the number appears in the right column
	const count = rightColumn.filter((right) => right === num).length;
	similarity += count * num;
});

console.log("Part 2:", similarity);
