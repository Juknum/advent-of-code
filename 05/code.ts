// https://adventofcode.com/2024/day/5

import { getInput } from '../common';
const input = getInput('05');

const [rulesStr, booksStr] = input.split('\n\n');

const rules = rulesStr.split('\n').map((rule) => rule.split('|').map((n) => Number(n)));
const books = booksStr.split('\n').map((book) => book.split(',').map((n) => Number(n)));

const isBookInvalid = (book: number[]) => {
	return book.some((page) => getInvalidPage(book, page));
}

const getInvalidPage = (book: number[], page: number) => {
	const rulesForPage = rules.filter((rule) => rule[0] === page);
	if (!rulesForPage.length) return false;

	const pagesThatShouldBeAfter = rulesForPage.map((rule) => rule[1]);
	return pagesThatShouldBeAfter.some((pageAfter) => book.indexOf(pageAfter) !== -1 && book.indexOf(pageAfter) < book.indexOf(page));
}

const invalidBooks = books.filter(isBookInvalid);
const validBooks = books.filter((book) => !isBookInvalid(book));

console.log("Part 1:", validBooks.reduce((acc, book) => acc + book[Math.round(book.length / 2) - 1], 0));

const fixBook = (book: number[]) => {
	const invalidPage = book.find((page) => getInvalidPage(book, page))!; // There is always at least one invalid page
	const rulesForPage = rules.filter((rule) => rule[0] === invalidPage);

	const indexOfInvalidPage = book.indexOf(invalidPage);
	const indexOfPagesThatShouldBeAfter = rulesForPage
		.map((rule) => book.indexOf(rule[1]))
		.filter((index) => index !== -1)
		.filter((index) => index < indexOfInvalidPage);

	const newIndex = indexOfPagesThatShouldBeAfter
		// sort in descending order, so we can swap from the end of the array to the beginning 
		// gain some performance by not sorting the whole array only 2 elements
		.sort((a, b) => a - b)
		// get the first page that should be after the invalid page
		[0];

	// remove the invalid page from the book
	const newBook = book.filter((p, index) => index !== indexOfInvalidPage);
	// add the invalid page to the new index
	newBook.splice(newIndex, 0, invalidPage);

	return newBook;
}

const revalidatedBooks = invalidBooks.map((book) => {
	let fixedBook = fixBook(book);

	while (isBookInvalid(fixedBook)) {
		fixedBook = fixBook(fixedBook);
	}

	return fixedBook;
});

console.log("Part 2:", revalidatedBooks.reduce((acc, book) => acc + book[Math.round(book.length / 2) - 1], 0));
