// https://adventofcode.com/2015/day/6

import { getInput } from "../common";
const input = getInput('06');

// PART 1

const lights = new Set();

const turnOn = (x: number, y: number) => lights.add(`${x},${y}`);
const turnOff = (x: number, y: number) => lights.delete(`${x},${y}`);

input.split('\n').forEach((line: string) => {
	// eg; turn on  X1,Y1 through X2,Y2
	// eg; toggle   X1,Y1 through X2,Y2
	// eg; turn off X1,Y1 through X2,Y2
	const res = line.match(/(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/);
	if (!res) return console.error('Invalid instruction:', line);

	const [, action, x1, y1, x2, y2] = [res[0], res[1], ...res.slice(2).map(Number)];
	
	// action on the lights inside the rectangle
	switch (action) {
		case 'turn on':
			for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) turnOn(x, y);
			break;

		case 'toggle':
			for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) {
				if (lights.has(`${x},${y}`)) turnOff(x, y);
				else turnOn(x, y);
			}
			break;

		case 'turn off':
			for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) turnOff(x, y);
			break;

		default:
			console.error('Unknown action:', action);
			break;
	}
});

console.log('Part 1:', lights.size);

// PART 2

const brightness = new Map<string, number>();

const increaseBrightness = (x: number, y: number, l = 1) => {
	const v = brightness.get(`${x},${y}`);

	if (!v) brightness.set(`${x},${y}`, l);
	else brightness.set(`${x},${y}`, v + l);
}

const decreaseBrightness = (x: number, y: number) => {
	const v = brightness.get(`${x},${y}`);

	if (!v) brightness.set(`${x},${y}`, 0);
	else brightness.set(`${x},${y}`, v - 1 < 0 ? 0 : v - 1);
};

input.split('\n').forEach((line: string) => {
	// eg; turn on  X1,Y1 through X2,Y2
	// eg; toggle   X1,Y1 through X2,Y2
	// eg; turn off X1,Y1 through X2,Y2
	const res = line.match(/(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/);
	if (!res) return console.error('Invalid instruction:', line);

	const [, action, x1, y1, x2, y2] = [res[0], res[1], ...res.slice(2).map(Number)];
	
	for (let x = x1; x <= x2; x++) 
	for (let y = y1; y <= y2; y++) {
		if (action === 'turn on' || action === 'toggle') increaseBrightness(x, y, action === 'toggle' ? 2 : 1);
		else decreaseBrightness(x, y);
	}
});

console.log('Part 2:', [...brightness.values()].reduce((a, b) => a + b, 0));