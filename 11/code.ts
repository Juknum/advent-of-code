// https://adventofcode.com/2024/day/11

import { getInput, perfs } from '../common';

const input = getInput('11').split(' ').map(Number);

// const input = '125 17'.split(' ').map(Number);

// brute force (breaks for part 2)
const getNewStones = (stoneNum: number): number[] => {
	if (stoneNum === 0) {
		return [1];
	};

	if (stoneNum.toString().length % 2 === 0) {
		const length = stoneNum.toString().length;
		const [left, right] = [stoneNum.toString().slice(0, length / 2), stoneNum.toString().slice(length / 2)].map(Number);
		return [left, right];
	}

	return [stoneNum * 2024];
};

const cache = new Map<`${number},${number}`, number>();

// recursive solution with memoization
const calcStones = (stoneNum: number, step: number, nbSteps: number): number => {
	// reset cache on step 0
	if (step === 0) cache.clear();

	if (step === nbSteps) return 1;
	if (cache.has(`${stoneNum},${step}`)) return cache.get(`${stoneNum},${step}`)!;

	let count  = 0;
	let digits = stoneNum.toString().length;

	if (stoneNum === 0) count = calcStones(1, step + 1, nbSteps);
	else if (digits % 2 === 0) {
		count = 
				calcStones(Number(stoneNum.toString().slice(0, digits / 2)), step + 1, nbSteps)
			+ calcStones(Number(stoneNum.toString().slice(digits / 2)),    step + 1, nbSteps)
		;
	}

	else count = calcStones(stoneNum * 2024, step + 1, nbSteps);
	cache.set(`${stoneNum},${step}`, count);
	
	return count;
};

// brute force
const part1 = () => {
	let stones = [...input];

	for (let blink = 1; blink < 26; blink++) {
		stones = stones.flatMap(getNewStones);
	}

	return stones.length;
};

// can't brute force this one :(
const part2 = () => {
	return input.map((stoneNum) => calcStones(stoneNum, 0, 75)).reduce((acc, curr) => acc + curr, 0);
};

// recursive solution for part 1
const part1b = () => {
	return input.map((stoneNum) => calcStones(stoneNum, 0, 25)).reduce((acc, curr) => acc + curr, 0);
}

perfs(part1, part1b, part2);