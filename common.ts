
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export const getInput = <T extends string>(day: `${number}`): T => readFileSync(`./${day}/input.txt`, 'utf-8') as T;
export const getLines = <T extends string[]>(day: `${number}`, split = '\n'): T => getInput(day).split(split) as T;
export const getMatrix = <T extends string[][]>(day: `${number}`, splitRow = '\n', splitCol = ''): T => getLines(day, splitRow).map((row) => row.split(splitCol)) as T;

export const outputToFile = (text: string, day: `${number}`, p: 'part1' | 'part2', name?: string) => {
	const filename = `./${day}/${p}${name ?? ''}.txt`;
	const dir = dirname(filename);

	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
	writeFileSync(filename, text);
}

export const perfs = (part1: () => void, part2?: () => void) => {

	performance.mark('start');
	performance.mark('start_part1');
	const p1res = part1();

	performance.mark('end_part1');
	performance.mark('start_part2');
	const p2res = part2?.();

	performance.mark('end_part2');
	performance.mark('end');

	performance.measure('runtime', 'start', 'end');
	performance.measure('part1', 'start_part1', 'end_part1');
	performance.measure('part2', 'start_part2', 'end_part2');

	const measures = performance.getEntriesByType('measure');

	console.log(`Part 1 (${measures[1].duration.toPrecision(4)} ms) :`, p1res);
	console.log(`Part 2 (${measures[2].duration.toPrecision(4)} ms) :`, p2res);
	console.log(`Total  (${measures[0].duration} ms)`);

}
