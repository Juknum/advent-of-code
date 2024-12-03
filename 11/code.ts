// https://adventofcode.com/2015/day/11

import { perfs } from "../common";
const input = 'hxbxwxba';

const nextPassword = (pwd: string) => {
	let found = false;

	while (!found) {
		pwd = increment(pwd);
		found = isValid(pwd);
	}

	return pwd;
};

const increment = (pwd: string) => {
	let str = pwd.split('');
	let index = str.length - 1;
	while (index >= 0) {
		if (str[index] === 'z') {
			str[index] = 'a';
			index--;
		} else {
			str[index] = String.fromCharCode(str[index].charCodeAt(0) + 1);
			break;
		}
	}

	return str.join('');
};

const isValid = (pwd: string) => {
	if (pwd.split('').some((char) => ['i', 'o', 'l'].includes(char))) return false;
	if (!pwd.match(/(.)\1.*(.)\2/)) return false;
	if (!pwd.match(/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/)) return false;

	return true;
};

perfs(() => nextPassword(input), () => nextPassword(nextPassword(input)));