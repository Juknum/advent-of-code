
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

export const perfs = (...parts: Array<() => void>) => {
	performance.mark('start');

	const res: unknown[] = [];
	
	parts.forEach((part, i) => {
		performance.mark(`start_part${i + 1}`);
		res.push(part());
		performance.mark(`end_part${i + 1}`);
	});

	performance.mark('end');

	performance.measure('runtime', 'start', 'end');
	parts.forEach((_, i) => performance.measure(`part${i + 1}`, `start_part${i + 1}`, `end_part${i + 1}`));

	const measures = performance.getEntriesByType('measure').filter((measure) => measure.name !== 'runtime');

	measures.forEach((measure, i) => console.log(`(${measure.duration.toPrecision(4)} ms) :`, res[i]));
	console.log(`Total  (${performance.getEntriesByName('runtime')[0].duration} ms)`);
}
