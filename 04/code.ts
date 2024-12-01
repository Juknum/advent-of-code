// https://adventofcode.com/2015/day/4

import { createHash } from 'crypto';
const input = 'yzbqklnj';

// PART 1

let number = 0;

while (true) {
	const hash = createHash('md5').update(`${input}${number}`).digest('hex');
	if (hash.startsWith('00000')) {
		console.log('Part 1:', number, hash);
		break;
	}
	else number++;
}

// PART 2

// I love brut force lol (computer go brr)
while (true) {
	const hash = createHash('md5').update(`${input}${number}`).digest('hex');
	if (hash.startsWith('000000')) {
		console.log('Part 2:', number, hash);
		break;
	}
	else number++;
}