// https://adventofcode.com/2015/day/14

import { getLines, perfs } from "../common";
const input = getLines('14');

interface Deer {
	// part 1
	name: string;
	rest: number;
	speed: number;
	duration: number;
	distance: number;
	remaining: number;
	isResting: boolean;

	// part 2
	points: number;
}

const func = (part2 = false) => {
	const deers: Deer[] = [];

	for (const line of input) {
		const [, name, speed, duration, rest] = line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./)!;
		deers.push({
			name,
			speed: Number(speed),
			duration: Number(duration),
			remaining: Number(duration),
			rest: Number(rest),
			isResting: false,
			distance: 0,
			points: 0,
		});
	}

	for (let tick = 1; tick < 2503; tick++) {
		deers.forEach((deer) => {
			if (!deer.isResting) deer.distance += deer.speed;
			if (!--deer.remaining) {
				deer.isResting = !deer.isResting;
				deer.remaining = deer.isResting ? deer.rest : deer.duration;
			}
		})

		const maxDist = deers.reduce((curr, deer) => curr > deer.distance ? curr : deer.distance, 0);
		deers.filter((deer) => deer.distance === maxDist).forEach((deer) => deer.points++);
	}

	return part2 
		? deers.reduce((curr, deer) => curr > deer.points   ? curr : deer.points,   0)
		: deers.reduce((curr, deer) => curr > deer.distance ? curr : deer.distance, 0);
}

perfs(func, () => func(true));