// https://adventofcode.com/2015/day/16

import { getLines, perfs } from "../common";
const input = getLines('16');

interface Sue {
	sue: number,
	props: {
		children?: string,
		cats?: string,
		samoyeds?: string,
		pomeranians?: string,
		akitas?: string,
		vizslas?: string,
		goldfish?: string,
		trees?: string,
		cars?: string,
		perfumes?: string
	}
}

const func = (part2 = false) => {
	const sues: Sue[] = input.map((line) => {
		const [s, sue, ...rest] = line.split(' ');
		const sueNumber = parseInt(sue.replace(':', ''));

		const props = rest.join(' ').split(',').map((x) => (x.trim().split(': ')));
		const sueObj = Object.fromEntries(props);

		return { sue: sueNumber, props: sueObj };
	})

	if (part2) {
		return sues.filter((sue) => {
			if (sue.props.children && sue.props.children !== '3') return false;
			if (sue.props.cats && Number(sue.props.cats) <= 7) return false;
			if (sue.props.samoyeds && sue.props.samoyeds !== '2') return false;
			if (sue.props.pomeranians && Number(sue.props.pomeranians) >= 3) return false;
			if (sue.props.akitas && sue.props.akitas !== '0') return false;
			if (sue.props.vizslas && sue.props.vizslas !== '0') return false;
			if (sue.props.goldfish && Number(sue.props.goldfish) >= 5) return false;
			if (sue.props.trees && Number(sue.props.trees) <= 3) return false;
			if (sue.props.cars && sue.props.cars !== '2') return false;
			if (sue.props.perfumes && sue.props.perfumes !== '1') return false;
			return true;
		})
	}

	else {
		return sues.filter((sue) => {
			if (sue.props.children && sue.props.children !== '3') return false;
			if (sue.props.cats && sue.props.cats !== '7') return false;
			if (sue.props.samoyeds && sue.props.samoyeds !== '2') return false;
			if (sue.props.pomeranians && sue.props.pomeranians !== '3') return false;
			if (sue.props.akitas && sue.props.akitas !== '0') return false;
			if (sue.props.vizslas && sue.props.vizslas !== '0') return false;
			if (sue.props.goldfish && sue.props.goldfish !== '5') return false;
			if (sue.props.trees && sue.props.trees !== '3') return false;
			if (sue.props.cars && sue.props.cars !== '2') return false;
			if (sue.props.perfumes && sue.props.perfumes !== '1') return false;
			return true;
		})
	}
}

perfs(() => func(), () => func(true));