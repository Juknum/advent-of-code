// https://adventofcode.com/2015/day/13

import { getLines, perfs } from "../common";
const input = getLines('13');

const func = (me = false) => {
	const people = new Set<string>();
	const happiness = new Map<string, Map<string, number>>();
	
	for (const line of input) {
		const [, a, sign, amount, b] = line.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/)!;
		people.add(a);
		people.add(b);
		happiness.set(a, happiness.get(a) || new Map<string, number>());
		happiness.get(a)!.set(b, sign === 'gain' ? +amount : -amount);
	}

	if (me) {
		people.add('me');
		happiness.set('me', new Map<string, number>());

		for (const person of people) {
			happiness.get(person)!.set('me', 0);
			happiness.get('me')!.set(person, 0);
		}
	}
	
	const permute = (arr: string[]): string[][] => {
		if (arr.length === 0) return [[]];
		const result: string[][] = [];
		
		for (let i = 0; i < arr.length; i++) {
			const rest = [...arr];
			rest.splice(i, 1);
			const restPermutations = permute(rest);
			for (const restPermutation of restPermutations) {
				result.push([arr[i], ...restPermutation]);
			}
		}
		return result;
	}

	// find all permutations of people
	const permutations = permute([...people]);
	let maxHappiness = 0;

	for (const permutation of permutations) {
		let happinessSum = 0;
		for (let i = 0; i < permutation.length; i++) {
			const a = permutation[i];
			const b = permutation[(i + 1) % permutation.length];
			happinessSum += happiness.get(a)!.get(b)! + happiness.get(b)!.get(a)!;
		}
		maxHappiness = Math.max(maxHappiness, happinessSum);
	}

	return maxHappiness;
};


perfs(() => func(), () => func(true));
