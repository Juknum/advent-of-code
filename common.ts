
import { readFileSync } from "fs";

export const getInput = (day: string): string => readFileSync(`./${day}/input.txt`, 'utf-8');
export const getLines = (day: string) => getInput(day).split("\n");

export const perfs = (part1: () => void, part2: () => void) => {

	performance.mark('start');
	performance.mark('start_part1');
	const p1res = part1();

	performance.mark('end_part1');
	performance.mark('start_part2');
	const p2res = part2();

	performance.mark('end_part2');
	performance.mark('end');

	performance.measure('runtime', 'start', 'end');
	performance.measure('part1', 'start_part1', 'end_part1');
	performance.measure('part2', 'start_part2', 'end_part2');

	const measures = performance.getEntriesByType('measure');

	console.log(`Part 1 (${measures[1].duration.toPrecision(4)} ms) :`, p1res);
	console.log(`Part 2 (${measures[2].duration.toPrecision(4)} ms) :`, p2res);
	console.log(`Total  (${measures[0].duration.toPrecision(5)} ms)`);

}
