// https://adventofcode.com/2015/day/15

import { getLines, perfs } from "../common";
const input = getLines('15');

interface Ingredient {
	name: string;
	capacity: number;
	durability: number;
	flavor: number;
	texture: number;
	calories: number;
}

const func = (part2 = false) => {
	const ingredients: Ingredient[] = [];

	for (const line of input) {
		const [, name, capacity, durability, flavor, texture, calories] = line.match(/(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/)!;
		ingredients.push({ name, capacity: Number(capacity), durability: Number(durability), flavor: Number(flavor), texture: Number(texture), calories: Number(calories) });
	}

	let maxScore = 0;

	for (let i = 0; i <= 100; i++) {
		for (let ii = 0; ii <= 100 - i; ii++) {
			for (let iii = 0; iii <= 100 - i - ii; iii++) {
				const teaspoon = 100 - i - ii - iii;

				const capacity = Math.max(0, i * ingredients[0].capacity + ii * ingredients[1].capacity + iii * ingredients[2].capacity + teaspoon * ingredients[3].capacity);
				const durability = Math.max(0, i * ingredients[0].durability + ii * ingredients[1].durability + iii * ingredients[2].durability + teaspoon * ingredients[3].durability);
				const flavor = Math.max(0, i * ingredients[0].flavor + ii * ingredients[1].flavor + iii * ingredients[2].flavor + teaspoon * ingredients[3].flavor);
				const texture = Math.max(0, i * ingredients[0].texture + ii * ingredients[1].texture + iii * ingredients[2].texture + teaspoon * ingredients[3].texture);
				const calories = Math.max(0, i * ingredients[0].calories + ii * ingredients[1].calories + iii * ingredients[2].calories + teaspoon * ingredients[3].calories);

				if (part2 && calories !== 500) continue;

				const score = capacity * durability * flavor * texture;
				if (score > maxScore) maxScore = score;
			}
		}
	}
	
	return maxScore;
}

perfs(func, () => func(true));
