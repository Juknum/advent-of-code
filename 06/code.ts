// https://adventofcode.com/2024/day/6

import { getMatrix, outputToFile, perfs } from '../common';

const testData = false;

const matrix: readonly tileType[][] = testData === false 
	? getMatrix<tileType[][]>('06') 
	: [
			['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'], 
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'], 
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
			['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'], 
			['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'], 
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
			['.', '#', '.', '.', '^', '.', '.', '.', '.', '.'], 
			['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'], 
			['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
			['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'], 
		];

// Part 1

type tileType = '.' | '#' | '█' | 'O' | '+' | guardType;
type guardType = '^' | '>' | '<' | 'v';

type tile = { x: number, y: number, type: tileType };
type guard = { x: number, y: number };

const dirs: readonly [0 | 1 | -1, 0 | 1 | -1][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const outputP1: tileType[][] = [];

const walkGuard = (guard: guard, m: typeof matrix, t: tile[], tryBlocking = false) => {
	let turnCounter  = 0;

	const tiles = [...t]; // copy to avoid reference

	const visited = new Set<`${guard['x']}_${guard['y']}_${string}`>();
	
	while (true) {
		let newX = guard.x + dirs[turnCounter % 4][0];
		let newY = guard.y + dirs[turnCounter % 4][1];

		if ([-1, m[0].length].includes(newX) || [-1, m.length].includes(newY)) {
			return [false, tiles] as const;
		}
		
		if (tryBlocking) {
			if (visited.has(`${guard.x}_${guard.y}_${dirs[turnCounter % 4].join('')}`)) {
				return [true, tiles] as const;				
			}

			visited.add(`${guard.x}_${guard.y}_${dirs[turnCounter % 4].join('')}`);
		}

		if (m[newY][newX] === '#' || m[newY][newX] === 'O') {
			turnCounter++;
		}
		else {
			const tileToUpdate = tiles.findIndex(({ x, y }) => x === newX && y === newY);
			tiles[tileToUpdate].type = '█';
	
			guard = { x: newX, y: newY };
		}
	}
}

const toMatrix = (tiles: tile[]): tileType[][] => {
	const output = tiles.reduce((acc, tile) => { 
		acc[tile.y][tile.x] = tile.type; 
		return acc 
	}, [...Array(matrix.length)].map(() => Array(matrix[0].length).fill('.'))); // need to copy to avoid reference

	return output;
}

const part1 = () => {
	const tiles: tile[] = [];
	let guard: guard = { x: -1, y: -1 };

	matrix.forEach((row, y) => {
		row.forEach((type, x) => {
			tiles.push({ x, y, type });
			// default guard position is upward
			if (type === '^') guard = { x, y };
		});
	});
	
	const [, writtenTiles] = walkGuard(guard, matrix, tiles);
	outputP1.push(...toMatrix(writtenTiles));
	outputToFile(outputP1.map((r) => r.join('')).join('\n'), '06', 'part1', testData ? '_test' : undefined);

	return writtenTiles.filter(({ type }) => type === '█').length;
};

const part2 = () => {
	const guardPath: tile[] = [];
	const guard: guard = { x: -1, y: -1 };

	// find guard start position
	matrix.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cell === '^') {
				guard.x = x;
				guard.y = y;
			};
		});
	});

	// fill tiles where the guard is going	
	outputP1.forEach((row, y) => {
		row.forEach((type, x) => {
			if (type === '█') guardPath.push({ x, y, type });
		});
	});

	let stuckGuards = 0;
	
	guardPath.forEach((tile) => {
		const modifiedMatrix = matrix.map((r) => [...r]);
		modifiedMatrix[tile.y][tile.x] = 'O';

		const logM: tile[] = []; // used for logs only
		modifiedMatrix.forEach((row, y) => {
			row.forEach((type, x) => {
				logM.push({ x, y, type });
			});
		});

		const [isStuck, log] = walkGuard(guard, modifiedMatrix, logM, true);

		if (isStuck) {
			stuckGuards++;

			// save logs to file
			const output = toMatrix(log);
			if (testData) outputToFile(output.map((r) => r.join('')).join('\n'), '06', 'part2', `_test_${tile.x}_${tile.y}`);
		}
	})
	
	return stuckGuards - 1; // -1 because the guard can't be stuck at the start
};

perfs(part1, part2);
