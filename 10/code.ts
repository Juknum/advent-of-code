// https://adventofcode.com/2024/day/10

import { getMatrix, perfs } from '../common';
const matrix = getMatrix('10').map((r) => r.map(Number));

const isInbound = ([y, x]: readonly [number, number]) => {
	return x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length;
};

function step(n: number, [y, x]: readonly [number, number]): number;
function step(n: number, [y, x]: readonly [number, number], nines: Map<`${number},${number}`, boolean>): Map<`${number},${number}`, boolean>; 
function step(n: number, [y, x]: readonly [number, number], nines?: Map<`${number},${number}`, boolean>): unknown {
	if (n === 9) return nines ? nines.set(`${y},${x}`, true) : 1;
	let count = 0;

	[[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([dy, dx]) => {
		const point = [y + dy, x + dx] as const;
		if (isInbound(point) && matrix[point[0]][point[1]] === n + 1) {
			if (nines) step(n + 1, point, nines);
			else count += step(n + 1, point);
		}
	});

	if (!nines) return count;
};

const part1 = () => {
	const zeros: [number, number][] = [];
	let result = 0;

	matrix.forEach((r, y) => r.forEach((n, x) => {
		if (n === 0) zeros.push([y, x]);
	}));

	zeros.forEach((zero) => {
		let nines = new Map<`${number},${number}`, boolean>();
		step(0, zero, nines);
		result += nines.size;
	});

	return result;
};

const part2 = () => {
	let result = 0;

	matrix.forEach((r, y) => r.forEach((n, x) => {
		if (n === 0) result += step(0, [y, x])
	}));

	return result;
};

perfs(part1, part2);