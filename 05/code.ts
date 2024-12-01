// https://adventofcode.com/2015/day/5

import { getInput } from "../common";
const input = getInput('05');

// PART 1

const vowels = new Set('aeiou');
const forbidden = ['ab', 'cd', 'pq', 'xy'];

const hasDoubleLetter = (str: string) => str.split('').some((c, i) => c === str[i + 1]);
const hasThreeVowels = (str: string) => str.split('').filter(c => vowels.has(c)).length >= 3;
const hasNoForbidden = (str: string) => !forbidden.some(f => str.includes(f));

const nice = input.split('\n').reduce((acc: number, str: string) => hasDoubleLetter(str) && hasThreeVowels(str) && hasNoForbidden(str) ? acc + 1 : acc, 0);

console.log('Part 1:', nice);

// PART 2

const hasPairTwice = (str: string) => {
	// split word into pairs
	const pairs: string[] = [];
	for (let i = 0; i < str.length - 1; i++) pairs.push(str.slice(i, i + 2));

	// check if a pair appears twice
	const pairTwice = pairs.some((pair, i) => pairs.slice(i + 2).includes(pair));
	if (!pairTwice) return false;

	// check if a letter repeats with one letter between them
	return str.split('').some((c, i) => c === str[i + 2]);
}

const hasRepeatingLetterSeparated = (str: string) => str.split('').some((c, i) => c === str[i + 2]);

const p2 = input.split('\n').reduce((acc: number, str: string) => hasPairTwice(str) && hasRepeatingLetterSeparated(str) ? acc + 1 : acc, 0);
console.log('Part 2:', p2);