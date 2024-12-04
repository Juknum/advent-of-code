// https://adventofcode.com/2024/day/4

import { getInput, getMatrix, perfs } from '../common';
const input = getMatrix('04');

// test input
// const input = 
// `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`.split('\n').map((row) => row.split('')); 

// find XMAS words in the matrix, horizontally / vertically / diagonally (forward & backward)

type dir = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw' | '?';

const getAdjacentCells = (matrix: string[][], rowIndex: number, columnIndex: number): [number, number, dir][] => {
	const adjacent: [number, number, dir][] = [
		[rowIndex - 1, columnIndex - 1, 'nw'], [rowIndex - 1, columnIndex, 'n'], [rowIndex - 1, columnIndex + 1, 'ne'],
		[rowIndex,     columnIndex - 1, 'w' ],                                   [rowIndex,     columnIndex + 1, 'e' ],
		[rowIndex + 1, columnIndex - 1, 'sw'], [rowIndex + 1, columnIndex, 's'], [rowIndex + 1, columnIndex + 1, 'se'],
	];

	return adjacent.filter(([r, c, d]) => [r, c].every((i) => i >= 0 && i < matrix.length /* assume square matrix */));
}

const getCornerCells = (matrix: string[][], rowIndex: number, columnIndex: number): [number, number, dir][] => {
	const adjacent: [number, number, dir][] = [
		[rowIndex - 1, columnIndex - 1, 'nw'], [rowIndex - 1, columnIndex + 1, 'ne'],
		[rowIndex + 1, columnIndex - 1, 'sw'], [rowIndex + 1, columnIndex + 1, 'se'],
	];

	return adjacent.filter(([r, c, d]) => [r, c].every((i) => i >= 0 && i < matrix.length /* assume square matrix */));
}

// This is hideous i know, but it works
const getOppositeDir = (dir: dir): dir => {
	switch (dir) {
		case 'ne': return 'sw';
		case 'sw': return 'ne';
		case 'nw': return 'se';
		case 'se': return 'nw';
		case 'n': return 's';
		case 's': return 'n';
		case 'e': return 'w';
		case 'w': return 'e';
		default: return '?';
	}
}

const findXmas = (input: string[][], part2 = false) => {
	const matrix = [...input]; // copy the matrix

	const words: [string, number, number, dir][][] = [];

	matrix.forEach((row, ri) => row.forEach((cell, ci) => {
		if (!part2) {
			if (cell !== 'X') return;

			let wordCoordinates: [string, number, number, dir][] = [['X', ri, ci, '?']];

			// check if a M is adjacent to the X
			getAdjacentCells(matrix, ri, ci)
				.filter(([r, c]) => matrix[r][c] === 'M')
				.map(([r, c, d]) => { wordCoordinates.push(['M', r, c, d]); return [r, c, d] as const; })
				// check for a A in the direction of the M
				.map(([r1, c1, d1]) => getAdjacentCells(matrix, r1, c1).filter(([r2, c2, d2]) => matrix[r2][c2] === 'A' && d1 === d2))
				// remove empty arrays (no valid A found)
				.filter((arr) => arr.length !== 0).flat()
				.map(([r, c, d]) => { wordCoordinates.push(['A', r, c, d]); return [r, c, d] as const; })
				// check for a S in the direction of the A
				.map(([r2, c2, d2]) => getAdjacentCells(matrix, r2, c2).filter(([r3, c3, d3]) => matrix[r3][c3] === 'S' && d2 === d3))
				// remove empty arrays (no valid S found)
				.filter((arr) => arr.length !== 0).flat()
				.map(([r, c, d]) => { wordCoordinates.push(['S', r, c, d]); return [r, c, d] as const; })
			
			const wordsFromX = wordCoordinates.reduce((acc, [letter, r, c, d]) => {
				if (acc[d]) acc[d].push([letter, r, c, d]);
				else acc[d] = [[letter, r, c, d]];

				return acc;
			}, {} as Partial<Record<dir, [string, number, number, dir][]>>);

			for (const [dir, arr] of Object.entries(wordsFromX)) {
				if (arr.length !== 3) delete wordsFromX[dir as dir];
				else wordsFromX[dir as dir]?.unshift(['X', ri, ci, '?']);
			}

			words.push(...Object.values(wordsFromX));
		}

		else {
			if (cell !== 'A') return;

			// check if a M or S is adjacent to the A
			const r = [
				['A', ri, ci, '?'] as [string, number, number, dir],

				...getCornerCells(matrix, ri, ci)
				// only keep M or S corner cells
				.filter(([r, c]) => matrix[r][c] === 'M' || matrix[r][c] === 'S')
				// add letter before coordinates & direction
				.map(([r, c, d]) => [matrix[r][c], r, c, d] as [string, number, number, dir])
				// filter out when not all 4 corners are valid (M/S)
				.filter((_1,_2, arr) => arr.length === 4)
				// check that the opposite corner is not the same letter as the current corner
				.filter(([l1,,, d1], _, arr) => arr.find(([l2,,, d2]) => d2 === getOppositeDir(d1))![0] !== l1)
			];

			if (r.length === 5) words.push(r);
		}
	}));

	return words.length;
}

perfs(() => findXmas(input), () => findXmas(input, true));
