
import { readFileSync } from 'fs';

export const getInput = (day: string) => readFileSync(`${__dirname}/${day}/input.txt`, 'utf8');