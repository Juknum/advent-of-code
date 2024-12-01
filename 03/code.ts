// https://adventofcode.com/2015/day/3

import { getInput } from "../common";
const input = getInput('03');

// PART 1

const houses = new Set();
let x = 0;
let y = 0;

input.split('').forEach(direction => {
	houses.add(`${x},${y}`); // starting location
	
	switch (direction) {
		case '^': y++; break;
		case 'v': y--; break;
		case '<': x--; break;
		case '>': x++; break;
	}

	houses.add(`${x},${y}`);
});

console.log('Part 1:', houses.size);

// PART 2

const houses2 = new Set();
let santaX = 0;
let santaY = 0;

let robotX = 0;
let robotY = 0;

houses2.add(`${santaX},${santaY}`);

input.split('').forEach((direction, index) => {
	const isSanta = index % 2 === 0;
	const x = isSanta ? santaX : robotX;
	const y = isSanta ? santaY : robotY;

	houses2.add(`${x},${y}`);

	switch (direction) {
		case '^': isSanta ? santaY++ : robotY++; break;
		case 'v': isSanta ? santaY-- : robotY--; break;
		case '<': isSanta ? santaX-- : robotX--; break;
		case '>': isSanta ? santaX++ : robotX++; break;
	}

	const x2 = isSanta ? santaX : robotX;
	const y2 = isSanta ? santaY : robotY;

	houses2.add(`${x2},${y2}`);

});

console.log('Part 2:', houses2.size);