// https://adventofcode.com/2015/day/8

import { getInput } from '../common';
const input = getInput('08');
const lines = input.split('\n');

// PART 1

const codeChars = lines.reduce((acc: number, line: string) => acc + line.length, 0);
const memoryChars = lines.reduce((acc: number, line: string) => {
	const unescaped = line.slice(1, -1).replace(/\\x[0-9a-f]{2}/g, 'X').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
	return acc + unescaped.length;
}, 0);

console.log("Part 1:", codeChars - memoryChars);

// PART 2

const encodedChars = lines.reduce((acc: number, line: string) => {
	const encoded = line.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
	return acc + encoded.length + 2;
}, 0);

console.log("Part 2:", encodedChars - codeChars);