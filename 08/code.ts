// https://adventofcode.com/2024/day/8

import { getMatrix, perfs } from '../common';

const input = getMatrix('08');

// const input = [
// 	['T','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','T','.','.','.','.','.','.'],
// 	['.','T','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.'],
// ];


// const input = [
// 	['.','.','.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','0','.','.','.'],
// 	['.','.','.','.','.','0','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','0','.','.','.','.'],
// 	['.','.','.','.','0','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','A','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','A','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','A','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.','.','.'],
// 	['.','.','.','.','.','.','.','.','.','.','.','.'],
// ];

type vec = { x: number, y: number };

const getAntennasCoordinatesAndMatrix = (antenna: string): [vec[], string[][]] => {
	const antennasCoordinates: vec[] = [];
	const antennaMatrix = input.map((r, y) => r.map((c, x) => {
		if (c === antenna) {
			antennasCoordinates.push({ x, y });
			return antenna;
		}
		return '.';
	}));

	return [antennasCoordinates, antennaMatrix];
}

const getVecDirectors = (antennasCoordinates: vec[]): vec[] => {
	return antennasCoordinates.map(({ x: x1, y: y1 }) => {
		const vectorsForThisAntenna: { x: number, y: number }[] = [];
		antennasCoordinates.forEach(({ x: x2, y: y2 }) => {
			if (x1 === x2 && y1 === y2) return; // avoid the same antenna
			vectorsForThisAntenna.push({ x: x2 - x1, y: y2 - y1 });
		});

		return vectorsForThisAntenna;
	}).flat();
}

const part1 = () => {
	const antennas  = new Set<string>(input.flat().filter(c => c !== '.'));
	const antinodes = new Set<`${number},${number}`>();

	for (const antenna of antennas) {
		const [coordinates, antennaMatrix] = getAntennasCoordinatesAndMatrix(antenna);
		const vectors = getVecDirectors(coordinates);
	
		// draw "#" where it lands
		antennaMatrix.forEach((r, y1) => r.forEach((c, x1) => {
			if (c !== antenna) return;
			// console.log('antenna', x1, y1);
	
			vectors.forEach(({ x: x2, y: y2 }) => {
				// console.log('vec', x2, y2);
				
				// one of those should be an antenna and the other should be the antinode
				const ptA = { x: x1 - x2, y: y1 - y2 };
				const ptB = { x: x1 + x2, y: y1 + y2 };
	
				// check if there is an antenna at either ptA or ptB
				const ptAValue = antennaMatrix[ptA.y]?.[ptA.x];
				const ptBValue = antennaMatrix[ptB.y]?.[ptB.x];
	
				// no corresponding antenna at the opposite coordinates with this vector, skip
				if (ptAValue !== antenna && ptBValue !== antenna) return;
	
				// draw antinode if ptX isn't an antenna nor undefined (out of bound)
				if (ptAValue && ptAValue !== antenna) {
					antennaMatrix[ptA.y][ptA.x] = '#';
					antinodes.add(`${ptA.x},${ptA.y}`);
				}
				if (ptBValue && ptBValue !== antenna) {
					antennaMatrix[ptB.y][ptB.x] = '#';
					antinodes.add(`${ptB.x},${ptB.y}`);
				}
			});
		}));
	
		// print the matrix
		// console.log(antennaMatrix.map(r => r.join(' ')).join('\n') + '\n');
	}

	// draw final matrix
	const p1Matrix = input.map((r, y1) => r.map((c, x1) => {
		if (antinodes.has(`${x1},${y1}`) && c === '.') return '#';
		return c;
	}).join(' ')).join('\n');

	console.log(p1Matrix + '\n');

	return antinodes.size;
};

const part2 = () => {
	const antennas  = new Set<string>(input.flat().filter(c => c !== '.'));
	const antinodes = new Set<`${number},${number}`>();

	for (const antenna of antennas) {
		const [coordinates, antennaMatrix] = getAntennasCoordinatesAndMatrix(antenna);
		const vectors = getVecDirectors(coordinates);

		antennaMatrix.forEach((r, y1) => r.forEach((c, x1) => {
			if (c !== antenna) return;

			vectors.forEach(({ x: x2, y: y2 }) => {
				const ptA = { x: x1 - x2, y: y1 - y2 };
				const ptB = { x: x1 + x2, y: y1 + y2 };

				const ptAValue = antennaMatrix[ptA.y]?.[ptA.x];
				const ptBValue = antennaMatrix[ptB.y]?.[ptB.x];

				if (ptAValue !== antenna && ptBValue !== antenna) return;

				// base case (part1)
				let nx = ptAValue === antenna ? ptB.x : ptA.x;
				let ny = ptAValue === antenna ? ptB.y : ptA.y;

				// keep drawing antinodes until we get out of bound
				while (antennaMatrix[ny]?.[nx]) {
					// draw if not antenna (easier to debug)
					if (antennaMatrix[ny][nx] === '.') {
						antennaMatrix[ny][nx] = '#';
					}
					// even if it's an antenna, we still need to add it to the antinodes
					antinodes.add(`${nx},${ny}`);

					nx += x2;
					ny += y2;
				}
			});


		}));

		// print the matrix
		// console.log(antennaMatrix.map(r => r.join(' ')).join('\n') + '\n');
	}

	// draw final matrix
	const p2Matrix = input.map((r, y1) => r.map((c, x1) => {
		if (antinodes.has(`${x1},${y1}`) && c === '.') return '#';
		return c;
	}).join(' ')).join('\n');

	console.log(p2Matrix);
	return antinodes.size;
};

perfs(part1, part2);