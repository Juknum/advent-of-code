// https://adventofcode.com/2015/day/9

import { getInput } from '../common';
const input = getInput('09');

const lines = input.split('\n');

// PART 1 & 2

const distances: Record<string, Record<string, number>> = {};

for (const line of lines) {
	const [_, from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/)!;
	if (!distances[from]) distances[from] = {};
	if (!distances[to]) distances[to] = {};
	distances[from][to] = +distance;
	distances[to][from] = +distance;
}

const cities = Object.keys(distances);
let shortest = Infinity;
let longest = 0;

// find both shortest and longest path
function exec(path: string[] = []) {
	if (path.length === cities.length) {
		let distance = 0;
		for (let i = 0; i < path.length - 1; i++) {
			distance += distances[path[i]][path[i + 1]];
		}
		shortest = Math.min(shortest, distance);
		longest = Math.max(longest, distance);
		return;
	}

	for (const city of cities) {
		if (path.includes(city)) continue;
		exec([...path, city]);
	}
}

exec();
console.log("Part 1:", shortest);
console.log("Part 2:", longest);
