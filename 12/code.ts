// https://adventofcode.com/2024/day/12

import { getMatrix, perfs } from '../common';

const matrix = getMatrix('12');
// const matrix = [
// 	['R','R','R','R','I','I','C','C','F','F'],
// 	['R','R','R','R','I','I','C','C','C','F'],
// 	['V','V','R','R','R','C','C','F','F','F'],
// 	['V','V','R','C','C','C','J','F','F','F'],
// 	['V','V','V','V','C','J','J','C','F','E'],
// 	['V','V','I','V','C','C','J','J','E','E'],
// 	['V','V','I','I','I','C','J','J','E','E'],
// 	['M','I','I','I','I','I','J','J','E','E'],
// 	['M','I','I','I','S','I','J','E','E','E'],
// 	['M','M','M','I','S','S','J','E','E','E'],
// ];

const getNeighbors = ({ x, y, v: char }: { x: number, y: number, v: string }) => {
	return [
		/*[x - 1, y - 1],*/ [x, y - 1], /*[x + 1, y - 1],*/
		[x - 1, y    ],             [x + 1, y    ],
		/*[x - 1, y + 1],*/ [x, y + 1], /*[x + 1, y + 1],*/
	]
		.map(([x, y]) => matrix[y]?.[x] ? { x, y, v: matrix[y][x] } : undefined)
		.filter(e => !!e)
		.filter(({ v }) => v === char);
};

const getAdjacent = (start: { x: number, y: number, v: string }) => {
	const visited = new Set<`${number}_${number}`>();
	const neighbors = getNeighbors(start);

	const queue = [...neighbors];
	while (queue.length > 0) {
		const current = queue.shift()!;
		const key = `${current.x}_${current.y}` as const;
		if (visited.has(key)) continue;
		visited.add(key);

		const n = getNeighbors(current);
		queue.push(...n);
	}

	return visited;
};

const getSides = (match: string, matrix: string[][], divider = '.') => {
	const cols = Math.max(...matrix.map(row => row.length)) + 1;
	const padding = Array(cols).fill(divider);
	matrix = [padding, ...matrix, padding];
	
	const rows = matrix.length;
	matrix = matrix.map(row => [divider, ...row, ...Array(cols - row.length).fill(divider)]);

	// if (match === 'I') console.log(matrix.map((r) => r.join('')).join('\n'), '\n');

	let res = 0;

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++)
		if (matrix[y + 1]?.[x] === match && matrix[y][x] === divider) {
			while (matrix[y + 1][x] === match && matrix[y][x] === divider) x++;
			res++;
		}

		for (let x = 0; x < cols; x++)
		if (matrix[y - 1]?.[x] === match && matrix[y][x] === divider) {
			while (matrix[y - 1][x] === match && matrix[y][x] === divider) x++;
			res++;
		}
	}
	//left & right side
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++)
		if (matrix[y]?.[x + 1] === match && matrix[y][x] === divider) {
			while (matrix[y + 1]?.[x + 1] === match && matrix[y][x] === divider) y++;
			res++;
		}

		for (let y = 0; y < rows; y++)
		if (matrix[y]?.[x] === match && matrix[y][x + 1] === divider) {
			while (matrix[y + 1]?.[x] === match && matrix[y][x + 1] === divider) y++;
			res++;
		}
}

	return res;
};

const part1 = () => {
	const regions = new Map<`${string}_${number}_${number}_${number}`, { area: number, perimeter: number }>();

	matrix.forEach((row, y) => row.forEach((char, x) => {
		const neighbors = getNeighbors({ x, y, v: char });
		const adjacents = getAdjacent({ x, y, v: char });

		const topLeft = adjacents.size > 0
			? Array.from(adjacents.values())
				.map((key) => key.split('_').map(Number))
				.reduce((acc, [x, y]) => {
					return [Math.min(acc[0], x), Math.min(acc[1], y)];
				})
			: [x, y];

		const regionKey = `${char}_${adjacents.size}_${topLeft[0]}_${topLeft[1]}` as const;

		if (regions.has(regionKey)) {
			const region = regions.get(regionKey)!;
			region.area += 1;
			region.perimeter += 4 - neighbors.length;

			regions.set(regionKey, region);
		}

		else regions.set(regionKey, { area: 1, perimeter: 4 - neighbors.length });
	}));

	return Array.from(regions.entries()).reduce((acc, [_, { area, perimeter }]) => acc + area * perimeter, 0);
};

const part2 = () => {
	const regions = new Map<`${string}_${number}_${number}_${number}`, { area: number, sides: number }>();

	matrix.forEach((row, y) => row.forEach((char, x) => {
		const adjacents = getAdjacent({ x, y, v: char });
		const topLeft = adjacents.size > 0
			? Array.from(adjacents.values())
				.map((key) => key.split('_').map(Number))
				.reduce((acc, [x, y]) => {
					return [Math.min(acc[0], x), Math.min(acc[1], y)];
				})
			: [x, y];

		const regionKey = `${char}_${adjacents.size}_${topLeft[0]}_${topLeft[1]}` as const;
		if (regions.has(regionKey)) return;

		regions.set(regionKey, { 
			area: adjacents.size === 0 ? 1 : adjacents.size, 
			sides: adjacents.size === 0 ? 4 : getSides(char, matrix.map((r, y1) => r.map((c, x1) => c === char && adjacents.has(`${x1}_${y1}`) ? char : '.'))) 
		})!;
	}));

	// console.log(regions);

	return Array.from(regions.entries()).reduce((acc, [_, { area, sides }]) => acc + area * sides, 0);
};

perfs(part1, part2);
