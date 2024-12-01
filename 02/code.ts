// https://adventofcode.com/2015/day/2

import { getInput } from "../common";
const input = getInput('02');

// PART 1

const area = input.split('\n').reduce((acc, box) => {
	const [l, w, h] = box.split('x').map(Number);

	const surface = [2*l*w, 2*w*h, 2*h*l];
	const slack = Math.min(...surface) / 2;

	return acc + surface.reduce((a, b) => a + b, 0) + slack;
}, 0);

console.log('Part 1:', area);

// PART 2 

const ribbon = input.split('\n').reduce((acc, box) => {
	const [l, w, h] = box.split('x').map(Number);

	const sides = [l, w, h].sort((a, b) => a - b);
	const bow = l * w * h;

	return acc + sides[0] * 2 + sides[1] * 2 + bow;
}, 0);

console.log('Part 2:', ribbon);