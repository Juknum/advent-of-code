// https://adventofcode.com/2024/day/9

import { getInput, perfs } from '../common';

const input = getInput('09');

const part1 = () => {
	const numbers = input.trim().split('').map(Number);
	const comped: Array<'.' | number> = numbers.flatMap((n, i) => Array(n).fill(i % 2 === 0 ? i / 2 : '.'));
	
	const filled: number[] = [];
	for (let i = 0, ii = -1; comped.length + ii >= i; ) {
		if (comped.at(ii) === '.') {
			ii--;
			continue;
		}

		if (comped[i] === '.') {
			filled.push(comped.at(ii) as number);
			ii--;
		} 
		else {
			filled.push(comped[i] as number);
		}

		i++;
	}

	return filled.reduce((acc, n, i) => acc + n * i, 0);
};


const part2 = () => {
	const numbers = input.trim().split('').map(Number);
	const comped: Array<'.' | number> = numbers.flatMap((n, i) => Array(n).fill(i % 2 === 0 ? i / 2 : '.'));

	const nInARow = (arr: Array<'.' | number>, i: number) => {
		let count = 1;
		while (arr[i] === arr[i + 1]) {
			count++;
			i++;
		}
		return count;
	};

	for (let n = Math.ceil(numbers.length / 2) - 1; n >= 0; n--) {
		const index = comped.indexOf(n);
		const inARow = nInARow(comped, index);

		for (let i = 0; i < index; i++) {
			if (comped[i] === '.' && nInARow(comped, i) >= inARow) {
				comped.splice(index, inARow, ...Array(inARow).fill('.'));
				comped.splice(i, inARow, ...Array(inARow).fill(n));
				break;
			}
		}
	}

	// @ts-expect-error - I know it's a number
	return comped.reduce((acc, n, i) => n === '.' ? acc : acc + n * i, 0);
};

perfs(part1, part2);