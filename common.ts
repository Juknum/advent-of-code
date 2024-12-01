
import { readFileSync } from "fs";

export const getInput = (day: string): string => readFileSync(`./${day}/input.txt`, 'utf-8');