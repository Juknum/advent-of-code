
import { readFileSync } from "fs";

export const getInput = (day: string): string => readFileSync(`./${day}/input.txt`, 'utf-8');
export const getLines = (day: string) => getInput(day).split("\n");