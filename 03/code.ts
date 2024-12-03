// https://adventofcode.com/2024/day/3

import { getInput, perfs } from '../common';
const input = getInput('03');

// PART 1: keep valid mul(X,Y) and sum X*Y

const part1 = () => input
	.split('mul(')
	.map((str) => str.split(')')[0].split(','))
	.filter((arr) => arr.length === 2 && !isNaN(Number(arr[0])) && !isNaN(Number(arr[1])))
	.map((arr) => Number(arr[0]) * Number(arr[1]))
	.reduce((acc, val) => acc + val, 0);

// PART 2: keep valid mul(X,Y) and sum X*Y, within do() and don't() and not within don't() and do()

const part2 = () => input
	.split('do()')
	.map((str) => str.split('don\'t()')[0])
	.map((str) => str.split('mul('))
	.flat()
	.map((str) => str.split(')')[0].split(','))
	.filter((arr) => arr.length === 2 && !isNaN(Number(arr[0])) && !isNaN(Number(arr[1])))
	.map((arr) => Number(arr[0]) * Number(arr[1]))
	.reduce((acc, val) => acc + val, 0);

perfs(part1, part2);
