// https://adventofcode.com/2015/day/12

import { getInput, perfs } from "../common";
const input = getInput('12');

const sum = (json: string, checkRed = false) => {
	let total = 0;
	const obj = JSON.parse(json);

	const traverse = (o: object | unknown[]) => {
		if (Array.isArray(o)) return o.forEach(traverse);
		if (Object.isObject(o)) {
			// part 1
			if (!checkRed) return Object.values(o).forEach(traverse);
			// part 2
			else {
				if (Object.values(o).includes('red')) return; // ignore objects with 'red' value
				return Object.values(o).forEach(traverse);
			}
		}

		if (typeof o === 'number') total += o;
	};

	traverse(obj);
	return total;
}

perfs(() => sum(input), () => sum(input, true));