// https://adventofcode.com/2015/day/10

import { perfs } from "../common";
const input = '1113222113';

const lookAndSay = (input: string) => {
	let prevChar = '';
	let prevCharCount = 1;
	let result = '';
	input.split('').forEach((char, index) => {
		if (index === 0) {
			prevChar = char;
			return;
		};

		if (char === prevChar) prevCharCount++;
		else {
			result += prevCharCount + prevChar;
			prevCharCount = 1;
			prevChar = char;
		}

		if (index === input.length - 1) result += prevCharCount + prevChar;
	});

	return result;
}

const loop = (n: number) => {
	let str = input;
	for (let i = 0; i < n; i++) {
		str = lookAndSay(str);
	}
	
	return str.length;
}

perfs(() => loop(40), () => loop(50));